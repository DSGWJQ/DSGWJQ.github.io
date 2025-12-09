import { BlogHeader } from "@/components/blog-header"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"

export default function PostsPage() {
  return (
    <div className="min-h-screen">
      <BlogHeader />

      <main className="mx-auto max-w-4xl px-6 sm:px-12 lg:px-24 pt-32 pb-24">
        <div className="space-y-16">
          {/* Page Title */}
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight">Posts</h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
              Recording traces of thoughts, leaving glimmers in the void.
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search posts..." className="pl-10 h-10 text-sm" />
          </div>

          {/* Posts List */}
          <div className="space-y-12">
            <Link href="/posts/sample-1" className="group block">
              <article className="space-y-4 border-l-2 border-border/50 pl-6 hover:border-foreground transition-colors">
                <div className="flex items-baseline gap-4 flex-wrap">
                  <time className="text-xs text-muted-foreground">2024.01.15</time>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">思考</span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">5 分钟阅读</span>
                </div>
                <h3 className="text-xl font-normal group-hover:text-muted-foreground transition-colors">
                  对抗虚无的方式
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  在无尽的黑暗中，我们能做的只是点燃一根火柴。即使明知它会熄灭，即使明知光芒微弱，但这微不足道的努力，正是我们存在的证明...
                </p>
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-1 border border-border rounded text-muted-foreground">哲学</span>
                  <span className="text-xs px-2 py-1 border border-border rounded text-muted-foreground">极简主义</span>
                </div>
              </article>
            </Link>

            <Link href="/posts/sample-2" className="group block">
              <article className="space-y-4 border-l-2 border-border/50 pl-6 hover:border-foreground transition-colors">
                <div className="flex items-baseline gap-4 flex-wrap">
                  <time className="text-xs text-muted-foreground">2024.01.10</time>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">技术</span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">8 分钟阅读</span>
                </div>
                <h3 className="text-xl font-normal group-hover:text-muted-foreground transition-colors">
                  使用 Obsidian 和 Git 构建博客工作流
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  极简主义不仅是设计哲学，更是一种工作方式。本文分享如何用最简单的工具构建高效的写作系统，让创作回归本质...
                </p>
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-1 border border-border rounded text-muted-foreground">工作流</span>
                  <span className="text-xs px-2 py-1 border border-border rounded text-muted-foreground">Obsidian</span>
                </div>
              </article>
            </Link>

            <Link href="/posts/sample-3" className="group block">
              <article className="space-y-4 border-l-2 border-border/50 pl-6 hover:border-foreground transition-colors">
                <div className="flex items-baseline gap-4 flex-wrap">
                  <time className="text-xs text-muted-foreground">2024.01.05</time>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">设计</span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">6 分钟阅读</span>
                </div>
                <h3 className="text-xl font-normal group-hover:text-muted-foreground transition-colors">留白的力量</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  负空间不是空无一物，而是给予思考的空间。在设计中，我们通过留白来强调重要的事物，在虚空中凸显微光...
                </p>
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-1 border border-border rounded text-muted-foreground">设计</span>
                  <span className="text-xs px-2 py-1 border border-border rounded text-muted-foreground">UI/UX</span>
                </div>
              </article>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
