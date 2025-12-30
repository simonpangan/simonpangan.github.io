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
  transformHead({assets}) {
     return [preloadFonts(assets)]
  }
})

function preloadFonts(assets) {
  const quicksandFile = assets.find(file => /Quicksand-Variable\.[\w-]+\.ttf/.test(file))

  return [
    'link',
    {
      rel: 'preload',
      href: quicksandFile,
      as: 'font',
      type: 'font/ttf',
      crossorigin: ''
    }
  ];
}
