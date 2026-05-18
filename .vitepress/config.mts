import { defineConfig } from 'vitepress'
import { generateRssFeed } from './generateRss'

const hostname = 'https://krlx.fr'
const siteTitle = 'Alix Ducros'
const siteDescription =
  "I am Alix Ducros, aka krlx. Founder of Kronikle and lead developer at Hormur. Find here a few notes and links to my proudest accomplishments."

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'fr-FR',
  title: siteTitle,
  description: siteDescription,
  sitemap: {
    hostname
  },
  cleanUrls: true,
  srcExclude: ['claude.md', 'CLAUDE.md', 'README.md', 'readme.md'],
  buildEnd: generateRssFeed,
  head: [
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'RSS Feed', href: '/feed.xml' }],
    ['link', { rel: 'alternate', type: 'application/atom+xml', title: 'Atom Feed', href: '/feed.atom' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'author', content: siteTitle }],
    ['meta', { name: 'theme-color', content: '#1a1a1a' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'og:site_name', content: siteTitle }],
    ['meta', { property: 'og:locale', content: 'fr_FR' }]
  ],
  transformPageData(pageData) {
    // URL canonique (cleanUrls : on retire index.md et l'extension .md)
    const slug = pageData.relativePath
      .replace(/(^|\/)index\.md$/, '$1')
      .replace(/\.md$/, '')
    const canonical = `${hostname}/${slug}`

    const isArticle = pageData.frontmatter.layout === 'article'
    const isHome = pageData.frontmatter.home === true

    const title = pageData.frontmatter.title
      ? `${pageData.frontmatter.title} | ${siteTitle}`
      : siteTitle
    const description = pageData.frontmatter.description || siteDescription
    const image = pageData.frontmatter.hero
      ? `${hostname}${pageData.frontmatter.hero}`
      : `${hostname}/profil.jpg`

    pageData.frontmatter.head ??= []

    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonical }],
      ['meta', { name: 'description', content: description }],
      ['meta', { property: 'og:type', content: isArticle ? 'article' : 'website' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: canonical }],
      ['meta', { property: 'og:image', content: image }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:image', content: image }]
    )

    if (isArticle && pageData.frontmatter.date) {
      pageData.frontmatter.head.push([
        'meta',
        { property: 'article:published_time', content: String(pageData.frontmatter.date) }
      ])
    }

    // Données structurées schema.org
    if (isHome) {
      pageData.frontmatter.head.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Alix Ducros',
          alternateName: 'krlx',
          url: hostname,
          image: `${hostname}/profil.jpg`,
          jobTitle: 'Lead Frontend Engineer',
          description: siteDescription,
          sameAs: [
            'https://github.com/Karalix',
            'https://linkedin.com/in/alixducros',
            'https://bagarrosphere.fr/@krlx',
            'https://hal.archives-ouvertes.fr/search/index/q/*/authIdHal_s/alix-ducros'
          ]
        })
      ])
    } else if (isArticle) {
      pageData.frontmatter.head.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: pageData.frontmatter.title,
          datePublished: pageData.frontmatter.date,
          url: canonical,
          image,
          inLanguage: 'fr-FR',
          author: {
            '@type': 'Person',
            name: 'Alix Ducros',
            url: hostname
          }
        })
      ])
    }
  }
})
