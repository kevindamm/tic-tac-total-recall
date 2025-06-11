// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import GithubLink from '../components/github-link.vue'
import ShowHideDetails from '../components/show-hide-details.vue'
import DarkmodeSwitch from '../components/darkmode-switch.vue'

import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DarkmodeSwitch', DarkmodeSwitch)
    app.component('GithubLink', GithubLink)
    app.component('ShowHideDetails', ShowHideDetails)
  }
} satisfies Theme
