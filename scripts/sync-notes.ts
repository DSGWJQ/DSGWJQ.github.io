import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

type Post = {
  slug: string
  title: string
  date: string
  tags: string[]
  summary?: string
  cover?: string
  readingTime: number
  contentHtml: string
}

function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

function isDraft(data: Record<string, unknown>) {
  return Boolean(data.draft)
}

function ensureArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String)
  }
  if (typeof value === 'string') {
    return value.split(',').map((v) => v.trim()).filter(Boolean)
  }
  return []
}

function main() {
  const notesDir = path.join(process.cwd(), 'notes')
  const outFile = path.join(process.cwd(), 'data', 'posts.json')

  if (!fs.existsSync(notesDir)) {
    throw new Error(`notes folder not found at ${notesDir}`)
  }

  const files = fs.readdirSync(notesDir).filter((f) => f.endsWith('.md'))
  if (!files.length) {
    throw new Error('no markdown files found in notes/')
  }

  const posts: Post[] = files.map((file) => {
    const fullPath = path.join(notesDir, file)
    const raw = fs.readFileSync(fullPath, 'utf-8')
    const { data, content } = matter(raw)

    if (isDraft(data)) {
      return null
    }

    const slug = String(data.slug || path.parse(file).name)
    const title = String(data.title || slug)
    const parsedDate = data.date ? new Date(data.date as string) : null
    const date = parsedDate && !Number.isNaN(parsedDate.getTime()) ? parsedDate.toISOString() : ''
    const tags = ensureArray(data.tags)
    const summary = data.summary ? String(data.summary) : undefined
    const cover = data.cover ? String(data.cover) : undefined
    const contentHtml = marked.parse(content)
    const post: Post = {
      slug,
      title,
      date,
      tags,
      summary,
      cover,
      readingTime: readingTime(content),
      contentHtml,
    }
    return post
  }).filter(Boolean) as Post[]

  // sort by date desc if possible
  posts.sort((a, b) => (a.date > b.date ? -1 : 1))

  fs.mkdirSync(path.dirname(outFile), { recursive: true })
  fs.writeFileSync(outFile, JSON.stringify(posts, null, 2))
  console.log(`Synced ${posts.length} posts to data/posts.json`)
}

main()
