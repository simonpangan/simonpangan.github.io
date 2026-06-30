import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Simon Pangan",
  description: "Personal website of Simon Pangan, a full-stack developer specializing in Laravel, Vue.js, and modern web development.",
  themeConfig: {
    siteTitle: false,
    nav: [
      { text: 'Home', link: '/' },
    ],

    socialLinks: [
      {
        icon: 'linktree',
        link: 'https://linktr.ee/simonpangan',
        target: '_blank',
        ariaLabel: 'Linktree Link'
      },
      {
        icon: 'linkedin',
        link: 'https://linkedin.com/in/simonpangan',
        target: '_blank',
        ariaLabel: 'LinkedIn Link'
      }
    ],

    footer: {
      copyright: 'Copyright © 2023 - Present | <a href="https://github.com/simonpangan">Simon Pangan</a>'
    }
  },
  cleanUrls: true,
  transformHead({assets}) {
     return [preloadFonts(assets)]
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPHero\.vue$/,
          replacement: fileURLToPath(
              new URL('./theme/components/CustomVPHomeHero.vue', import.meta.url)
          )
        }
      ]
    }
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
