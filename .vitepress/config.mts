import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Alix Ducros",
  description: "I am Alix Ducros, aka krlx. Founder of Kronikle and lead developer at Hormur. Find here a few notes and links to my proudest accomplishments.",
  sitemap: {
    hostname: 'https://krlx.fr'
  },
  cleanUrls: true,
})
