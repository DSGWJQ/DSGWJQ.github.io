import { BlogHeader } from "@/components/blog-header"
import Link from "next/link"

const tags = [
  { name: "哲学", count: 12 },
  { name: "极简主义", count: 8 },
  { name: "设计", count: 15 },
  { name: "UI/UX", count: 10 },
  { name: "工作流", count: 6 },
  { name: "Obsidian", count: 5 },
  { name: "技术", count: 18 },
  { name: "思考", count: 20 },
  { name: "Next.js", count: 7 },
  { name: "前端开发", count: 14 },
]

export default function TagsPage() {
  return (
    <div className="min-h-screen">
      <BlogHeader />

      <main className="mx-auto max-w-4xl px-6 sm:px-12 lg:px-24 pt-32 pb-24">
        <div className="space-y-16">
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight">Tags</h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
              Explore articles by different topics.
            </p>
          </div>

          {/* Tag Cloud */}
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <Link key={tag.name} href={`/tags/${tag.name}`} className="group">
                <div className="flex items-baseline gap-2 px-4 py-2 border border-border hover:border-foreground transition-colors rounded">
                  <span className="text-sm group-hover:text-foreground transition-colors">{tag.name}</span>
                  <span className="text-xs text-muted-foreground">{tag.count}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
