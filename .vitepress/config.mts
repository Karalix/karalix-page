import { defineConfig } from 'vitepress'
import { generateRssFeed } from './generateRss'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Alix Ducros",
  description: "I am Alix Ducros, aka krlx. Founder of Kronikle and lead developer at Hormur. Find here a few notes and links to my proudest accomplishments.",
  sitemap: {
    hostname: 'https://krlx.fr'
  },
  cleanUrls: true,
  buildEnd: generateRssFeed,
  head: [
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'RSS Feed', href: '/feed.xml' }],
    ['link', { rel: 'alternate', type: 'application/atom+xml', title: 'Atom Feed', href: '/feed.atom' }]
  ]
})
