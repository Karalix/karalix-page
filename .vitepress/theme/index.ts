// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'
import EpubReader from './components/EpubReader.vue'
import type { Theme } from 'vitepress'
import './style.css'

export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.component('EpubReader', EpubReader)
  }
} satisfies Theme
