import { BlogHeader } from "@/components/blog-header"
import { HeroSection } from "@/components/hero-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <BlogHeader />

      {/* Hero Section - 大量留白体现虚空 */}
      <HeroSection />

      {/* Latest Posts Section */}
      <main className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
        <section className="py-24 space-y-16">
          <div className="space-y-2">
            <h2 className="text-xs tracking-widest text-muted-foreground uppercase">Latest Posts</h2>
          </div>

          <div className="space-y-12">
            {/* Post 1 */}
            <Link href="/posts/sample-1" className="group block">
              <article className="space-y-4 border-l border-border/50 pl-6 hover:border-foreground/50 transition-colors">
                <div className="flex items-baseline gap-4">
                  <time className="text-xs text-muted-foreground">2024.01.15</time>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">思考</span>
                </div>
                <h3 className="text-lg font-normal group-hover:text-muted-foreground transition-colors">
                  对抗虚无的方式
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  在无尽的黑暗中，我们能做的只是点燃一根火柴。即使明知它会熄灭，即使明知光芒微弱...
                </p>
              </article>
            </Link>

            {/* Post 2 */}
            <Link href="/posts/sample-2" className="group block">
              <article className="space-y-4 border-l border-border/50 pl-6 hover:border-foreground/50 transition-colors">
                <div className="flex items-baseline gap-4">
                  <time className="text-xs text-muted-foreground">2024.01.10</time>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">技术</span>
                </div>
                <h3 className="text-lg font-normal group-hover:text-muted-foreground transition-colors">
                  使用 Obsidian 和 Git 构建博客工作流
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  极简主义不仅是设计哲学，更是一种工作方式。本文分享如何用最简单的工具构建高效的写作系统...
                </p>
              </article>
            </Link>

            {/* Post 3 */}
            <Link href="/posts/sample-3" className="group block">
              <article className="space-y-4 border-l border-border/50 pl-6 hover:border-foreground/50 transition-colors">
                <div className="flex items-baseline gap-4">
                  <time className="text-xs text-muted-foreground">2024.01.05</time>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">设计</span>
                </div>
                <h3 className="text-lg font-normal group-hover:text-muted-foreground transition-colors">留白的力量</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  负空间不是空无一物，而是给予思考的空间。在设计中，我们通过留白来强调重要的事物...
                </p>
              </article>
            </Link>
          </div>

          <div className="pt-8">
            <Link href="/posts">
              <Button variant="ghost" size="sm" className="h-9 px-6 text-xs">
                View All Posts →
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24 py-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">© 2025 Blog. Keep moving forward.</p>
            <p className="text-xs text-muted-foreground">Powered by Obsidian × Git × Next.js</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
