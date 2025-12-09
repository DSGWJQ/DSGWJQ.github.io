import { BlogHeader } from "@/components/blog-header"
import { ReadingProgress } from "@/components/reading-progress"
import { FontSizeControls } from "@/components/font-size-controls"
import { StarTrailCursor } from "@/components/star-trail-cursor"
import { FocusMode } from "@/components/focus-mode"
import { BloomImage } from "@/components/bloom-image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const dynamicParams = false

export function generateStaticParams() {
  return ["sample-1", "sample-2", "sample-3"].map((slug) => ({ slug }))
}

export default function PostPage() {
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
                <time>2024.01.15</time>
                <span className="text-white/10">·</span>
                <span>Reflection</span>
                <span className="text-white/10">·</span>
                <span>5 min read</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extralight tracking-tight text-white/70 text-balance leading-relaxed">
                Ways to Resist the Void
              </h1>

              <p className="text-sm text-white/25 leading-relaxed font-light">
                Leaving traces of thoughts in the void, a tiny glimmer in infinite darkness...
              </p>
            </div>

            <div className="flex gap-2">
              <span className="text-[10px] px-2 py-1 border border-white/10 rounded-sm text-white/20">哲学</span>
              <span className="text-[10px] px-2 py-1 border border-white/10 rounded-sm text-white/20">极简主义</span>
            </div>
          </header>

          {/* Font Size Controls */}
          <FontSizeControls />

          <div className="space-y-8" id="article-content">
            <p className="text-sm leading-[2] text-white/40 font-light">
              在西西弗斯推石上山的神话中，加缪看到了人类存在的荒诞。石头永远会滚下来，努力永远不会有结果。但正是在这种明知不可能的坚持中，西西弗斯找到了自己的意义。
            </p>

            <h2 className="text-lg font-extralight mt-16 mb-8 text-white/55 tracking-wide">虚空的本质</h2>

            <p className="text-sm leading-[2] text-white/40 font-light">
              我们生活在一个巨大的虚空中。宇宙的尺度让我们显得如此渺小，时间的长河让我们的生命显得如此短暂。在这样的背景下，个体的努力似乎毫无意义。
            </p>

            <div className="my-16">
              <BloomImage src="/dark-minimalist-abstract-void-cosmos.jpg" alt="虚空中的微光" aspectRatio="video" />
              <p className="text-[10px] text-white/20 mt-4 text-center tracking-wider">图 1 · 虚空中的微光</p>
            </div>

            <p className="text-sm leading-[2] text-white/40 font-light">
              但这正是极简主义的核心洞察：在巨大的虚空面前，我们不需要宏大的叙事，不需要复杂的装饰。我们需要的，是那一点点真实的、微不足道的努力。
            </p>

            <blockquote className="relative my-12 py-6 pl-8 border-l border-white/10">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-white/30 blur-[2px]" />
              <p className="text-sm italic text-white/50 font-light">"即使知道不可能，但仍然去做。"</p>
            </blockquote>

            <h2 className="text-lg font-extralight mt-16 mb-8 text-white/55 tracking-wide">微光的意义</h2>

            <p className="text-sm leading-[2] text-white/40 font-light">
              在黑暗中点燃一根火柴，光芒微弱，但它是真实的。这就是我们能做的全部，也是我们应该做的全部。不是因为它会改变世界，而是因为它证明了我们的存在。
            </p>

            <div className="my-16">
              <BloomImage
                src="/single-candle-flame-in-complete-darkness-minimalis.jpg"
                alt="黑暗中的火柴"
                aspectRatio="square"
              />
              <p className="text-[10px] text-white/20 mt-4 text-center tracking-wider">图 2 · 黑暗中点燃的微光</p>
            </div>

            <p className="text-sm leading-[2] text-white/40 font-light">
              留白不是空无一物，而是给予思考的空间。负空间让我们能够看清那微弱的光芒。在极简的设计中，每一个元素都变得重要，每一个努力都变得可见。
            </p>

            <h2 className="text-lg font-extralight mt-16 mb-8 text-white/55 tracking-wide">持续的行动</h2>

            <p className="text-sm leading-[2] text-white/40 font-light">
              这不是悲观主义，而是清醒的现实主义。我们接受虚无的存在，但不被它击败。我们继续写作，继续创造，继续在虚空中留下痕迹。
            </p>

            <div className="my-16 -mx-6 sm:-mx-12">
              <BloomImage
                src="/vast-empty-dark-landscape-with-distant-light-horiz.jpg"
                alt="无尽的地平线"
                aspectRatio="wide"
              />
              <p className="text-[10px] text-white/20 mt-4 text-center tracking-wider">图 3 · 地平线上的远方</p>
            </div>

            <p className="text-sm leading-[2] text-white/40 font-light">
              就像西西弗斯推着石头，我们继续前行。不是因为相信终点，而是因为前行本身就是意义。
            </p>

            <div className="h-24" />

            <h2 className="text-lg font-extralight mt-16 mb-8 text-white/55 tracking-wide">虚空中的痕迹</h2>

            <p className="text-sm leading-[2] text-white/40 font-light">
              写作是一种对抗虚无的方式。每一个字，每一个句子，都是在黑暗中划出的一道光痕。它们微弱，但真实存在。它们短暂，但曾经发光。
            </p>

            <p className="text-sm leading-[2] text-white/40 font-light">
              我们不追求永恒，因为永恒本身就是一个幻觉。我们追求的是此刻的真实，是当下的努力，是明知不可能却依然去做的勇气。
            </p>

            <p className="text-sm leading-[2] text-white/40 font-light">
              这就是极简主义的终极意义：剥离一切装饰，直面虚空，然后在虚空中留下属于自己的微光。
            </p>

            <div className="h-32" />
          </div>

          <footer className="pt-16 border-t border-white/5 space-y-8">
            <div className="flex items-center justify-between text-[11px]">
              <Link href="/posts/sample-3" className="text-white/20 hover:text-white/40 transition-colors cursor-none">
                ← 留白的力量
              </Link>
              <Link href="/posts/sample-2" className="text-white/20 hover:text-white/40 transition-colors cursor-none">
                构建博客工作流 →
              </Link>
            </div>
          </footer>
        </article>
      </main>
    </div>
  )
}
