import { createContentLoader } from 'vitepress'

interface Note {
  title: string
  url: string
  date: {
    time: number
    string: string
  }
}

declare const data: Note[]
export { data }

export default createContentLoader('notes/*.md', {
  excerpt: true,
  transform(raw): Note[] {
    return raw
      .map(({ url, frontmatter }) => ({
        title: frontmatter.title,
        url,
        date: formatDate(frontmatter.date)
      }))
      .filter(n => n.title && n.date)
      .sort((a, b) => b.date.time - a.date.time)
  }
})

function formatDate(raw: string): Note['date'] {
  const date = new Date(raw)
  return {
    time: date.getTime(),
    string: date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
}