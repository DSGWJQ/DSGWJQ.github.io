"use client"

import { useState, useEffect, useCallback } from "react"
import { Focus, X } from "lucide-react"

export function FocusMode() {
  const [isActive, setIsActive] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [paragraphs, setParagraphs] = useState<HTMLElement[]>([])

  // 收集所有可聚焦的段落
  useEffect(() => {
    if (isActive) {
      const content = document.getElementById("article-content")
      if (content) {
        const elements = content.querySelectorAll("p, h2, blockquote")
        setParagraphs(Array.from(elements) as HTMLElement[])
      }
      // 禁用滚动
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isActive])

  // 键盘导航
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isActive) return

      if (e.key === "ArrowDown" || e.key === "j") {
        e.preventDefault()
        setFocusedIndex((prev) => Math.min(prev + 1, paragraphs.length - 1))
      } else if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault()
        setFocusedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === "Escape") {
        setIsActive(false)
      }
    },
    [isActive, paragraphs.length],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  // 滚动到当前段落
  useEffect(() => {
    if (isActive && paragraphs[focusedIndex]) {
      paragraphs[focusedIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }, [focusedIndex, isActive, paragraphs])

  return (
    <>
      {/* 聚焦模式切换按钮 */}
      <button
        onClick={() => setIsActive(!isActive)}
        className="fixed bottom-8 right-8 z-[100] p-3 rounded-full bg-white/5 border border-white/10 
                   text-white/40 hover:text-white/70 hover:bg-white/10 transition-all duration-500
                   backdrop-blur-sm cursor-none group"
        title="聚焦模式 (F)"
      >
        {isActive ? <X className="h-4 w-4" /> : <Focus className="h-4 w-4" />}
        <span
          className="absolute right-full mr-3 top-1/2 -translate-y-1/2 text-[10px] text-white/30 
                         opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
        >
          {isActive ? "退出聚焦" : "聚焦模式"}
        </span>
      </button>

      {/* 聚焦模式遮罩层 */}
      {isActive && (
        <div className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-xl transition-all duration-700">
          {/* 深度黑暗背景 */}
          <div className="absolute inset-0 bg-gradient-radial from-black via-black to-black" />

          {/* 导航提示 */}
          <div className="fixed top-8 left-1/2 -translate-x-1/2 flex items-center gap-6 text-[10px] text-white/20">
            <span className="flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 border border-white/10 rounded text-white/30">↑</kbd>
              <kbd className="px-1.5 py-0.5 border border-white/10 rounded text-white/30">↓</kbd>
              <span>导航</span>
            </span>
            <span className="flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 border border-white/10 rounded text-white/30">ESC</kbd>
              <span>退出</span>
            </span>
          </div>

          {/* 进度指示 */}
          <div className="fixed top-8 right-8 text-[10px] text-white/15">
            {focusedIndex + 1} / {paragraphs.length}
          </div>

          {/* 聚焦内容区域 */}
          <div className="absolute inset-0 flex items-center justify-center px-8">
            <div className="relative max-w-lg w-full">
              {/* 左侧冷光竖条 */}
              <div className="absolute -left-8 top-0 bottom-0 w-[2px]">
                {/* 主光条 */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent" />
                {/* 光晕效果 */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-300/20 to-transparent blur-sm" />
                <div className="absolute -left-1 inset-y-0 w-4 bg-gradient-to-r from-cyan-400/5 to-transparent blur-md" />
              </div>

              {/* 聚焦的段落 */}
              <div className="relative">
                {paragraphs[focusedIndex] && (
                  <div
                    className="text-white/70 leading-[2.5] font-light animate-focus-fade-in"
                    style={{
                      fontSize: paragraphs[focusedIndex].tagName === "H2" ? "1.25rem" : "0.9rem",
                      fontStyle: paragraphs[focusedIndex].tagName === "BLOCKQUOTE" ? "italic" : "normal",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: paragraphs[focusedIndex].innerHTML,
                    }}
                  />
                )}
              </div>

              {/* 上下文预览 - 极度模糊 */}
              <div className="absolute -top-32 left-0 right-0 text-white/10 text-sm blur-[3px] opacity-30 line-clamp-2 pointer-events-none">
                {paragraphs[focusedIndex - 1]?.textContent}
              </div>
              <div className="absolute -bottom-32 left-0 right-0 text-white/10 text-sm blur-[3px] opacity-30 line-clamp-2 pointer-events-none">
                {paragraphs[focusedIndex + 1]?.textContent}
              </div>
            </div>
          </div>

          {/* 边缘渐变 - 电影景深效果 */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/80" />
            <div className="absolute top-0 inset-x-0 h-1/3 bg-gradient-to-b from-black to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
          </div>
        </div>
      )}
    </>
  )
}
