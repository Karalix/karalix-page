/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
import typography from '@tailwindcss/typography'

export default {
  content: [
    './.vitepress/**/*.{html,js,ts,vue}',
    './notes/*.md',
    './cours/*.md',
    './*.md',
  ],
  theme: {
    extend: {},
  },
  plugins: [typography, daisyui],
}

