/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
import typography from '@tailwindcss/typography'

module.exports = {
  theme: {
    extend: {},
  },
  plugins: [typography, daisyui],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './.vitepress/**/*.js',
      './.vitepress/**/*.vue',
      './.vitepress/**/*.ts',
      './**/*.md',
    ],
    options: {
      safelist: ['html', 'body'],
    },
  },
}

