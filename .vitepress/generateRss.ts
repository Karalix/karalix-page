import path from 'path'
import { writeFileSync } from 'fs'
import { Feed } from 'feed'
import { createContentLoader, type SiteConfig } from 'vitepress'

const hostname = 'https://krlx.fr'

export async function generateRssFeed(config: SiteConfig) {
  const feed = new Feed({
    title: 'Alix Ducros',
    description: 'Notes de blog de Alix Ducros (krlx)',
    id: hostname,
    link: hostname,
    language: 'fr',
    favicon: `${hostname}/favicon.ico`,
    copyright: `Copyright © ${new Date().getFullYear()} Alix Ducros`,
    feedLinks: {
      rss: `${hostname}/feed.xml`,
      atom: `${hostname}/feed.atom`
    }
  })

  const posts = await createContentLoader('notes/*.md', {
    excerpt: true,
    render: true,
    transform(raw) {
      return raw
        .map(({ url, frontmatter, html, excerpt }) => ({
          title: frontmatter.title,
          url,
          date: frontmatter.date,
          excerpt: excerpt || html,
        }))
        .filter(p => p.title && p.date)
        .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    }
  }).load()

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${hostname}${post.url}`,
      link: `${hostname}${post.url}`,
      description: post.excerpt,
      date: new Date(post.date)
    })
  }

  writeFileSync(path.join(config.outDir, 'feed.xml'), feed.rss2())
  writeFileSync(path.join(config.outDir, 'feed.atom'), feed.atom1())
}
