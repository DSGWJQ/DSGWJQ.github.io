import { BlogHeader } from "@/components/blog-header"
import Link from "next/link"

const posts = [
  { date: "2024.01.15", title: "对抗虚无的方式", category: "思考", slug: "sample-1" },
  { date: "2024.01.10", title: "使用 Obsidian 和 Git 构建博客工作流", category: "技术", slug: "sample-2" },
  { date: "2024.01.05", title: "留白的力量", category: "设计", slug: "sample-3" },
]

const groupByYear = (posts: typeof posts) => {
  const grouped: Record<string, typeof posts> = {}
  posts.forEach((post) => {
    const year = post.date.split(".")[0]
    if (!grouped[year]) grouped[year] = []
    grouped[year].push(post)
  })
  return grouped
}

export default function ArchivePage() {
  const groupedPosts = groupByYear(posts)

  return (
    <div className="min-h-screen">
      <BlogHeader />

      <main className="mx-auto max-w-4xl px-6 sm:px-12 lg:px-24 pt-32 pb-24">
        <div className="space-y-16">
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight">Archive</h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
              Browse all posts in chronological order.
            </p>
          </div>

          {/* Posts by Year */}
          <div className="space-y-12">
            {Object.entries(groupedPosts)
              .reverse()
              .map(([year, yearPosts]) => (
                <div key={year} className="space-y-6">
                  <h2 className="text-2xl font-light">{year}</h2>
                  <div className="space-y-4">
                    {yearPosts.map((post) => (
                      <Link key={post.slug} href={`/posts/${post.slug}`} className="group block">
                        <div className="flex items-baseline gap-4 py-2 border-l border-border/50 pl-6 hover:border-foreground transition-colors">
                          <time className="text-xs text-muted-foreground w-20 flex-shrink-0">{post.date}</time>
                          <span className="text-sm group-hover:text-muted-foreground transition-colors flex-1">
                            {post.title}
                          </span>
                          <span className="text-xs text-muted-foreground">{post.category}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  )
}
