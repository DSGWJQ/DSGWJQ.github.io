import { BlogHeader } from "@/components/blog-header"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <BlogHeader />

      <main className="mx-auto max-w-3xl px-6 sm:px-12 pt-32 pb-24">
        <article className="space-y-12">
          <header className="space-y-8">
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight">About</h1>
          </header>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            <p className="text-base leading-relaxed">
              This is a blog about persistence. About the belief that even knowing something is impossible, we still do
              it.
            </p>

            <h2 className="text-2xl font-light mt-12 mb-6">Why Write</h2>

            <p className="text-base leading-relaxed">
              In the face of immense void, writing is the match I light. Words make thoughts visible and efforts
              traceable. Even if these words will eventually disappear in the river of time, at the moment they are
              written, they are real.
            </p>

            <h2 className="text-2xl font-light mt-12 mb-6">Design Philosophy</h2>

            <p className="text-base leading-relaxed">
              Minimalism is not about being simple, but about being refined. Through extensive whitespace, we emphasize
              what truly matters. Black and white, the purest contrast, the most direct expression.
            </p>

            <p className="text-base leading-relaxed">
              Negative space is not waste, but necessity. It gives room for thought, lets content breathe, and allows
              readers to pause.
            </p>

            <h2 className="text-2xl font-light mt-12 mb-6">Tech Stack</h2>

            <ul className="space-y-2 text-base leading-relaxed">
              <li>Writing: Obsidian</li>
              <li>Version Control: Git</li>
              <li>Framework: Next.js</li>
              <li>Styling: Tailwind CSS</li>
              <li>Deployment: Vercel</li>
            </ul>

            <h2 className="text-2xl font-light mt-12 mb-6">Contact</h2>

            <p className="text-base leading-relaxed">
              If you resonate with this blog's philosophy or want to discuss anything, feel free to reach out:
            </p>

            <ul className="space-y-2 text-base leading-relaxed">
              <li>Email: your@email.com</li>
              <li>GitHub: @yourusername</li>
              <li>Twitter: @yourusername</li>
            </ul>
          </div>
        </article>
      </main>
    </div>
  )
}
