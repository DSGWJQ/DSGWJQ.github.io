---
slug: langchain-to-langgraph
title: 从 LangChain 到 LangGraph
date: 2025-12-20
tags:
  - LangChain
  - LangGraph
  - Agent
  - 架构
summary: 从大模型层/记忆层/工具层视角梳理 LangChain，并对比 LangGraph 的状态机式流程控制与可恢复性。
cover: /dark-minimalist-abstract-void-cosmos.jpg
---

以下观点是个人在学习中的思考，如果有不对的地方欢迎指正。  
我会尽量从「设计框架」的视角来讲：每一层解决什么问题。

# 从 LangChain 到 LangGraph

## 0. “智能体”的最终形态
- 单个智能体的理想形态：像人一样，能在环境里自动获取信息；主动规划怎么解决任务；会用工具做事；做完能反思要不要调整；需要调整就记住，方便下次更好地做。
- 所以一个智能体框架最重要的三层：`大模型层`、`工具层`、`记忆层`。

---

## 1. 大模型层：我输入，它输出（但要先把“怎么问”整理好）

### 1.1 大模型按功能的三种常见形态
- `Text LLM`（文本补全）：更像“续写器”，通常输入是一段纯文本。
  - 你：请帮我翻译 HELLO
  - 模型：你好
- `Chat Model`（对话模型）：通常用 `messages` 来组织角色、历史消息（本质仍是 LLM，只是接口/训练方式更偏对话）。
  - 你：你好吗  
  - 输入会被组织成：System / Human / AI（历史）…  
  - 模型：我很好
- `Embedding Model`（嵌入模型）：把文本变成浮点数向量，用来做检索/相似度。
  - 你：你好
  - 模型：[0.1121, 0.4552]（这里只是举例）

简单理解就是：大模型像一个函数，你给它输入，它给你输出；不同类型主要是「输入输出的形态」和「适用场景」不一样。日常做 agent 绝大部分时候用的是对话模型。

### 1.2 大模型参数：告诉模型“怎么想”，以及“发给谁”
- “发给谁”（连接/路由类参数）：`base_url` / `api_key` / `model`。
- “怎么想”（采样/长度类参数）：`temperature` / `max_tokens` / `top_p`（以及一些模型还会有其它控制项）。

如果说我们的提示词是在说“思考什么”，那这些参数就在说“如何去思考”。

### 1.3 框架在大模型层要封装什么
至少要做两件事：`输入处理` + `请求发送`（以及对应的输出接收）。

典型流程：
`用户代码层（设置模型+参数） -> LangChain SDK（存储参数/组装请求） -> HTTP 客户端（发请求） -> 模型服务（返回结果）`

用户层代码可能是：
```python
response = llm.invoke("你好")

chain = llm | StrOutputParser()
response = chain.invoke("你好，请介绍一下人工智能")
```

`invoke()` 大概做了这些事（伪代码）：
```text
1) 把用户输入转换成模型需要的格式（尤其是 messages）
2) 构建 HTTP 请求体（参数 + 输入）
3) 构建 HTTP 请求头（认证等）
4) POST 发出去，收结果
```

### 1.4 LangChain 在大模型层的设计：Model I/O
LangChain 的 `Model I/O` 大致就是：输入怎么组织、输出怎么结构化。

**输入处理**
- `消息（messages）`：SystemMessage / HumanMessage / AIMessage / ToolMessage…（用来表达角色、历史、工具回传等）。
- `提示词模板（prompt templates）`：当你不想每次手写“系统消息+历史+用户输入”时，就需要一个可复用、可注入变量的模板。
  - `PromptTemplate`：普通文本模板，变量注入。
  - `ChatPromptTemplate`：生成 messages 列表的模板。
  - `XxxMessagePromptTemplate`：更细粒度的 message 模板（比如 System/Human 这类）。
  - `FewShotPromptTemplate`：放少量样例做示范（few-shot）。

**输出处理**
- 模型很多时候只回字符串，但我们常常要结构化结果，所以需要 `OutputParser`（以及更严格的结构化输出方式）。
- 常见做法是两步：
  1) 在提示词里先“约定输出格式”（比如 JSON 结构）。
  2) 拿到输出后做解析/校验，不符合就再修一下（或者让模型重试）。

---

## 2. 记忆层
- 模型本身不会“记得”任何事情。短期记忆可以每次请求都附带历史消息，但历史越多，token 成本越高，也会拖慢响应。

### 2.1 LangChain 的一些经典短期记忆形态
- `ChatMessageHistory`：直接操作消息列表；重启就没了（不持久化）。
- `ConversationBufferMemory`：全量对话都喂给模型，简单但很烧 token。
- `ConversationBufferWindowMemory`：只保留最近 k 轮，对早期上下文会丢。
- `ConversationSummaryMemory`：把历史总结成摘要，压缩 token。
- `ConversationSummaryBufferMemory`：混合：最近窗口 + 更早摘要。

（补一句：LangChain 新版本在“记忆”这块也有新写法/新推荐用法，但上面这些作为理解“记忆谱系”依然挺直观。）

### 2.2 长期记忆：RAG
短期记忆解决“刚刚聊过什么”，长期记忆更多解决“很久以前的知识/资料怎么召回”。最常见的技术就是 `RAG`。

---

## 3. 工具层：让模型能“动手”，而不是只会说

### 3.1 Tool：工具从定义到执行
工具层是模型和外部世界交互的核心组件。我对 LangChain 的工具体系理解是：
- 工具定义：用 `@tool`（或类似机制）定义工具的 `name/args/description/return`。
- 工具绑定：把可用工具列表交给 agent/模型，让它知道能用哪些工具。
- 工具调用：模型决定“要用哪个工具+参数是什么”（很多时候依赖 function calling/结构化调用）。
- 工具执行：框架真的去调用工具，把结果回传给模型/状态。

### 3.2 MCP
如果说我们自己写的 tool 更像“我自己长出来的手脚”，那 `MCP（Model Context Protocol，由 Anthropic 提出）`更像“外接各种现成工具/资源的统一接口”。重点是：工具不一定是你写的，而是外部按协议提供的；你按协议去连、去用（常见是对接 MCP server 暴露的 tools/resources 等）。

### 3.3 RAG 也是一种“工具化能力”
`RAG（检索增强生成）`经常被当作工具层的一部分能力：让模型在生成前先去“查”。

完整流程是：
1. 文件处理：解析（各种格式提取文字）+ 切分（chunk）。
2. 入库：向量化（embedding）+ 写入向量库。
3. 用户提问：检索 -> 把相关片段塞进上下文 -> 生成回答。

---

## 4. 关于智能体的构建：Chain / LCEL 把步骤串起来
- `Chain`（链）这套思路很直观：把一步一步的操作组合起来，每一步都明确输入输出是什么。
- 这其实就是一种“提示链模式”：复杂任务拆解成多个小步，然后串起来跑。

LangChain 里常见的表达是 `LCEL（LangChain Expression Language）`，类似这样：
```python
# 1. 导入所需组件
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_openai import ChatOpenAI

# 2. 初始化模型
chat_model = ChatOpenAI(
    model="gpt-4",
    temperature=0.7,
    api_key="your-api-key-here",
)

# 3. 创建 JSON 输出解析器
json_parser = JsonOutputParser()

# 4. 创建提示词模板
prompt_template = PromptTemplate(
    template="""请用简单的一句话描述一下什么是{name}？

请严格按照以下格式输出：
{format_instructions}

描述：""",
    input_variables=["name"],
    partial_variables={"format_instructions": json_parser.get_format_instructions()},
)

# 5. 使用 LCEL 构建链
chain = prompt_template | chat_model | json_parser

# 6. 调用链
response = chain.invoke({"name": "反洗钱"})
print("解析后的结构化数据：", response)
```

---

## 5. LangGraph 解决的核心：把“黑盒 while”变成“可视的状态机”

### 5.1 先说痛点：用 LangChain 也能写循环，但很容易变黑盒
（下面是伪代码，表达的是“痛点”，不是说 LangChain 只能这样写）
```python
chat_history = []  # 必须手动维护的消息池
max_retries = 3
current_step = 0

while current_step < max_retries:
    try:
        response = agent_chain.invoke({"input": "查询天气", "history": chat_history})

        if response.is_error:
            chat_history.append(ErrorMessage(content=response.error))
            current_step += 1
            continue
        else:
            save_to_db(chat_history)
            break
    except Exception:
        print("系统崩溃，进度全丢")
```

这里能总结出几个问题：
1. 状态要你手动维护：每个 chain 都是相对独立的，你得自己在循环里喂 history、接结果、再塞回去。
2. 宕机恢复麻烦：状态在进程内存里，一崩就断点丢；要“可恢复”你得自己做持久化和恢复逻辑。
3. 可观测性弱：while 循环是黑盒，什么时候重试、卡在哪里、为什么跳转，很难一眼看出来。

### 5.2 LangGraph 的做法：全局状态 + 节点更新 + 检查点（快照）
我对 LangGraph 的理解是：
- 你定义一个全局 `State`（通常就是字典/TypedDict），节点从 state 取需要的东西，执行完再把“更新”写回 state。
- 引擎可以在每个节点之后做 `checkpoint`（快照），所以崩了也能从最后一次快照恢复。
- 流程是“图”而不是“线性链+while”，所以路由/重试/并行这些逻辑更显式、更可视化。

同样用伪代码表达一下（示意用法）：
```python
class State(TypedDict):
    messages: Annotated[list, add_messages]
    retry_count: int

def call_agent(state: State):
    return {"messages": [llm.invoke(state["messages"])]}

def call_tool(state: State):
    return {
        "messages": [tool.invoke(...)],
        "retry_count": state["retry_count"] + 1,
    }

workflow = StateGraph(State)
workflow.add_node("agent", call_agent)
workflow.add_node("tool", call_tool)

workflow.add_conditional_edges(
    "tool",
    should_retry,
    {"retry": "agent", "end": END},
)

app = workflow.compile(checkpointer=MemorySaver())
```

---

## 6. LangGraph 的基础构件（词汇表）
- `State`：全局共享的数据结构（也是每一步的“快照内容”）；决定了信息怎么被保存、怎么被合并。
- `Node`：节点，一个步骤/一个函数；理想情况下尽量小而清晰（不一定要求绝对无状态，但“单一职责”会更好维护）。
- `Edge`：边，决定节点之间怎么连、按什么顺序执行；包括普通边和条件边（conditional）。
- `Command / Send`：可以理解成“更强的流程控制能力”，比如显式跳转、并行派发子任务等（具体能力和写法要以版本为准）。

### 6.1 基本搭建流程
1. 定义 `State`：决定全局状态类型，以及状态更新/合并规则（比如新值覆盖旧值，还是 append 到列表尾）。
2. 定义节点：
   - 节点函数：接收 state，返回“要更新的字段”。
   - 条件函数：读取 state，返回下一步该走哪个节点。
3. 组装图：
   - `StateGraph(...)`
   - `add_node(...)`
   - 设入口/出口
   - 连线（普通边/条件边）
4. 编译与运行：
   - `compile(...)`
   - 执行工作流

---

## 7. 依旧关于 LangGraph 的“优化点”：并行、路由、反思、规划
Google 的《智能体设计模式》里提到很多模式（据说有 21 种），这里先收敛成一条“演化路线”：
1. 提示链模式：把复杂任务拆分。
2. 路由模式：根据输入/状态选择子模块。
3. 并行模式：任务更复杂时，性能优化会变成刚需。
4. 反思模式：做完能自评、能迭代。
5. 工具模式：突破训练数据的局限，让模型能动手。
6. 规划模式：让模型主动把任务拆成子任务。

### 7.1 路由这块：我对 LangChain vs LangGraph 的对比
先回顾一下 LangChain 路由（偏“固定流程”）：
1. 意图识别：用 LLM 对输入做分类（比如“怎么解方程” -> 数学）。
2. 动态映射：配置一堆类似 if-else 的映射，把标签映射到提示词模板/子链。
3. 执行：按映射结果跑下去。

问题是：逻辑路线本质上是事先固定的；而且很多时候每一步只是“产出数据”，很难做更复杂的流程控制（比如“发现风险就跳到某节点”，或者“拆成 5 个子任务并行”）。

LangGraph 的路由更像“状态驱动 + 节点自治”：
- 节点可以在更新 state 的同时，给出“下一步该去哪里”的指令（比如跳转到某节点）（ `Command`）。
- 当 Agent 拆解出多个子任务时，可以把这些任务并行派发出去（`Send`）。并行分支一般会各自跑在隔离的状态副本上，跑完之后再按 state 的合并规则把结果汇总回主路径。

所以结论还是：智能体的理想形态就是“像人一样”的那套流程（获取信息 -> 规划 -> 用工具 -> 反思 -> 记忆）。

LangGraph 主要把这几个点“工程化”了：`路由更显式`、`并行更自然`、`反思/重试更可控`、`长流程更可恢复（checkpoint）`。  
尤其是：当你不得不循环时，循环不能是黑盒；要可视化、可控、可恢复，最好还能把状态更新自动化。

---

## 8. 多智能体协作：从中心化到去中心化（为什么）
随着任务复杂度上涨，单智能体会碰天花板，多智能体的形态常见有：
- 简单线性：AgentA -> AgentB -> end
- 路由分发：用户输入 -> 路由判断 -> 特定 Agent
- 中心化编排：主管 Agent 动态分配任务
- 去中心化/网状协作：Agent 通过状态/指令自主触发协作

“从中心化到去中心化”的核心原因：
- 主管要吃掉所有反馈，提示词变得臃肿，幻觉风险会上升。
- 通信链路变长：A 和 B 通信还得绕主管，延迟也会增加。

LangGraph 这种“全局状态 + 显式流程控制”对去中心化更友好：通过共享状态让大家不偏航，也更可控。  
更重要的一点是：如果去中心化吵起来陷入死循环，系统能中断，必要时人类介入接管。
