import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Simon Pangan • Laravel & PHP Developer • Manila, Philippines",
  description: "A VitePress Site",
  base: '/',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/simonpangan/' },
      { icon: 'github', link: 'https://github.com/simonpangan' },
    ],

    footer: {
      copyright: 'Copyright © 2025-present <a href="https://github.com/simonpangan">Simon Pangan</a>'
    }
  }
})
