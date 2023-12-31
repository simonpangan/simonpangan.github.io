import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from "url";
import tsconfigPaths from 'vite-tsconfig-paths'

// import { head } from "@shared/config";  
// i don't know why its not working its working on css but not on ts?
import { head } from "../../Shared/config"; 

export default defineConfig({
  title: "Simon Pangan",
  description: "Simon Pangan: Your Next Full Stack Developer. " + 
    "As a fresh graduate adept in PHP, JavaScript, TypeScript, Laravel, Vue.js, SQL, and MySQL, " + 
    "I invite you to witness top-notch coding and design skills in action, " + 
    "bringing innovative web development projects to life.",
  themeConfig: {
    // siteTitle: "Simon.",
    siteTitle: false,
    logo: '../assets/img/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About Me', link: '/about' },
      { text: 'Projects', link: '/projects/' },
      { 
        text: 'Blogs', 
        target: '_blank',
        link: 'https://simonpangan-blogs.netlify.app/' 
      },
    ],
    sidebar: {
      '/projects/': [
        {
          text: 'Work Projects',
          items: [
            { text: 'Pocketbook Agency', link: '/projects/pocketbook-agency' },
          ]
        },
        {
          text: 'Personal Projects',
          items: [
            { text: 'Bandersnatch', link: '/projects/bandersnatch' },
            { text: 'CharitAble', link: '/projects/charitable' },
            { text: 'My Portfolio v1', link: 'https://simonpangan.github.io/portfolio/'},
            { text: 'Nimbus Weather Application', link: '/projects/nimbus-weather' },
            { text: 'Inflow', link: '/projects/inflow' },
            { text: 'Ligtas.PH', link: '/projects/ligtas-ph' }
          ]
        }
      ],
    },
    socialLinks: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/simonpangan/' },
      { icon: 'github', link: 'https://github.com/simonpangan' },
      {
        icon: {
          svg: `<svg role="img" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="20">
          <path d="M874.666667 375.189333V746.666667a64 64 0 0 1-64 64H213.333333a64 64 0 0 1-64-64V375.189333l266.090667 225.6a149.333333 149.333333 0 0 0 193.152 0L874.666667 375.189333zM810.666667 213.333333a64.789333 64.789333 0 0 1 22.826666 4.181334 63.616 63.616 0 0 1 26.794667 19.413333 64.32 64.32 0 0 1 9.344 15.466667c2.773333 6.570667 4.48 13.696 4.906667 21.184L874.666667 277.333333v21.333334L553.536 572.586667a64 64 0 0 1-79.893333 2.538666l-3.178667-2.56L149.333333 298.666667v-21.333334a63.786667 63.786667 0 0 1 35.136-57.130666A63.872 63.872 0 0 1 213.333333 213.333333h597.333334z" ></path>
          </svg>`,
        },
        link: "mailto:simonjoseph.pangan@gmail.com",
      },
    ],
    footer: {
      // message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present | Simon Pangan'
    },
  },
  transformHead({ assets }) {
    /*
      const assets = [
        '/assets/nimbus-weather.4351143d.jpg',
        '/assets/ligtas-ph.c7ccbb1d.png',
        '/assets/quicksand.c1e54885.ttf',
        '/assets/quicksand-var.06927fae.ttf'
      ];
    */
    const fontRegex = /\/assets\/quicksand-var\.\w+\.ttf/;

    const matchingUrls = assets.filter(url => fontRegex.test(url));
    
    //matchingUrls will always return array
    const fontFile = matchingUrls.length > 0 ? matchingUrls[0] : '';
    
    if (fontFile) {
      return [
        [
          'link',
          {
            rel: 'preload',
            href: fontFile,
            as: 'font',
            type: 'font/ttf',
            crossorigin: ''
          }
        ]
      ]
    }
  },
  head: [
    [
      'meta', { 
        name: 'keywords', 
        content: "JAVASCRIPT, TYPESCRIPT, PHP, SQL, LARAVEL, VUE.JS, " + 
          "MYSQL, SIMON PANGAN, FULL STACK DEVELOPER, FULL STACK, DEVELOPER"
      }
    ],
    ...head
  ],
  ignoreDeadLinks: true,
  vite: {
    resolve: {
      alias: {
        '@shared': fileURLToPath(new URL('./../../Shared', import.meta.url))
      },
    },
    // plugins: [tsconfigPaths()],
    server: {
      fs: {
        allow: ['..'],
      },
    },
  }
})
