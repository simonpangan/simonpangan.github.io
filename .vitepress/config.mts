import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Simon Pangan • Laravel & PHP Developer • Manila, Philippines",
  description: "A VitePress Site",
  base: '/',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    siteTitle: false,
    nav: [
      { text: 'Home', link: '/' },
    ],

    socialLinks: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/simonpangan/' },
      { icon: 'github', link: 'https://github.com/simonpangan' },
    ],

    footer: {
      copyright: 'Copyright © 2023 - Present | <a href="https://github.com/simonpangan">Simon Pangan</a>'
    }
  },
  cleanUrls: true,
})
