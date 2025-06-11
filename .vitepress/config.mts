import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: " ",
  titleTemplate: "a solitaire game with a mixture of elements",
  description: "TIC-TAC-TOTAL RECALL",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' },
      { text: 'Play', link: '/play' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },

  vite: {
    resolve: {
      alias: [
        { // Replaces VPFlyout of extra content with inline
          find: /^.*\/VPNavBar\.vue$/,
          replacement: fileURLToPath(
            new URL('./components/site-navbar.vue', import.meta.url))
        }
      ]
    }
  }
})
