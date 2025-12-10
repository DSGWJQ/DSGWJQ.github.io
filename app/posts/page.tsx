import posts from "@/data/posts.json"
import { BlogHeader } from "@/components/blog-header"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"

type Post = {
  slug: string
  title: string
  date: string
  tags: string[]
  summary?: string
  readingTime?: number
}

function formatDate(date: string) {
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return date
  return d.toISOString().slice(0, 10).replace(/-/g, ".")
}

const sortedPosts = (posts as Post[]).slice().sort((a, b) => {
  const ta = new Date(a.date).getTime()
  const tb = new Date(b.date).getTime()
  if (Number.isNaN(ta) || Number.isNaN(tb)) return 0
  return tb - ta
})

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

          {/* Search (静态展示，可后续接入筛选) */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search posts..." className="pl-10 h-10 text-sm" disabled />
          </div>

          {/* Posts List */}
          <div className="space-y-12">
            {sortedPosts.map((post) => (
              <Link key={post.slug} href={`/posts/${post.slug}`} className="group block">
                <article className="space-y-4 border-l-2 border-border/50 pl-6 hover:border-foreground transition-colors">
                  <div className="flex items-baseline gap-4 flex-wrap">
                    <time className="text-xs text-muted-foreground">{formatDate(post.date)}</time>
                    {post.readingTime ? (
                      <>
                        <span className="text-xs text-muted-foreground">·</span>
                        <span className="text-xs text-muted-foreground">{post.readingTime} 分钟阅读</span>
                      </>
                    ) : null}
                  </div>
                  <h3 className="text-xl font-normal group-hover:text-muted-foreground transition-colors">
                    {post.title}
                  </h3>
                  {post.summary ? (
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.summary}</p>
                  ) : null}
                  <div className="flex gap-2 flex-wrap">
                    {post.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 border border-border rounded text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
