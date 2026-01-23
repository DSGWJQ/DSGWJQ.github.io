import { BlogHeader } from "@/components/blog-header"
import { ReadingProgress } from "@/components/reading-progress"
import { FontSizeControls } from "@/components/font-size-controls"
import { StarTrailCursor } from "@/components/star-trail-cursor"
import { FocusMode } from "@/components/focus-mode"
import { BloomImage } from "@/components/bloom-image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import posts from "@/data/posts.json"
import { notFound } from "next/navigation"

type Post = {
  slug: string
  title: string
  date: string
  tags: string[]
  summary?: string
  cover?: string
  readingTime?: number
  contentHtml: string
}

const postsData = posts as Post[]

export const dynamicParams = false

export function generateStaticParams() {
  return postsData.map((post) => ({ slug: post.slug }))
}

function formatDate(date: string) {
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return date
  return d.toISOString().slice(0, 10).replace(/-/g, ".")
}

type PostParams = { slug: string }

export default async function PostPage({ params }: { params: PostParams | Promise<PostParams> }) {
  const { slug } = await params
  const post = postsData.find((p) => p.slug === slug)

  if (!post) return notFound()

  return (
    <div className="min-h-screen cursor-none relative">
      <StarTrailCursor />
      <BlogHeader />
      <ReadingProgress />
      <FocusMode />

      <div className="fixed inset-0 pointer-events-none z-10">
        {/* 左侧渐变 */}
        <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-gradient-to-r from-black/80 to-transparent" />
        {/* 右侧渐变 */}
        <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-gradient-to-l from-black/80 to-transparent" />
        {/* 顶部渐变 */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />
        {/* 底部渐变 */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute left-1/2 top-0 bottom-0 w-[600px] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent" />
      </div>

      <main className="relative z-20 mx-auto max-w-xl px-6 pt-32 pb-24">
        {/* Back Button */}
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white/50 transition-colors mb-16 cursor-none"
        >
          <ArrowLeft className="h-3 w-3" />
          Back
        </Link>

        {/* Article */}
        <article className="space-y-16">
          <header className="space-y-8 pb-12 border-b border-white/5">
            <div className="space-y-6">
              <div className="flex items-baseline gap-3 flex-wrap text-[10px] text-white/20 tracking-widest uppercase">
                <time>{formatDate(post.date)}</time>
                {post.readingTime ? (
                  <>
                    <span className="text-white/10">·</span>
                    <span>{post.readingTime} min read</span>
                  </>
                ) : null}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extralight tracking-tight text-white/70 text-balance leading-relaxed">
                {post.title}
              </h1>

              {post.summary ? (
                <p className="text-sm text-white/25 leading-relaxed font-light">{post.summary}</p>
              ) : null}
            </div>

            <div className="flex gap-2 flex-wrap">
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-1 border border-white/10 rounded-sm text-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Font Size Controls */}
          <FontSizeControls />

          {post.cover ? (
            <div className="my-8">
              <BloomImage src={post.cover} alt={post.title} aspectRatio="video" />
            </div>
          ) : null}

          <div
            className="space-y-8 prose prose-invert max-w-none text-sm leading-[2] text-white/40 font-light"
            id="article-content"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          <footer className="pt-16 border-t border-white/5 space-y-8">
            <div className="flex items-center justify-between text-[11px] text-white/20">
              <Link href="/posts" className="hover:text-white/40 transition-colors cursor-none">
                ← 返回列表
              </Link>
              <span className="text-white/10">···</span>
            </div>
          </footer>
        </article>
      </main>
    </div>
  )
}
