import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  title: "Simon Pangan",
  description: "Simon Pangan portfolio",
  themeConfig: {
    siteTitle: "Simon.",
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About Me', link: '/about' },
      {
        text: 'Contents',
        items: [
          { text: 'Blogs', link: '/blogs' },
          { text: 'Projects', link: '/projects' },  
          { text: 'Articles', link: '/articles' },
        ]
      },
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
    ]
  },
  transformHead({ assets }) {
    const myFontFile = assets.find(file => /\w+\.ttf/)
    if (myFontFile) {
      return [
        [
          'link',
          {
            rel: 'preload',
            href: myFontFile,
            as: 'font',
            type: 'font/ttf',
            crossorigin: ''
          }
        ]
      ]
    }
  },
  // head: [
    // ['link', { rel: 'icon', href: '/assets/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' }],
    // ['li nk', { rel: 'icon', href: '/assets/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' }],
  // ],
  })
