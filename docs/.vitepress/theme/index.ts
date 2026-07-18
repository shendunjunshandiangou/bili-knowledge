import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import BiliPlayer from './components/BiliPlayer.vue';
import BackLink from './components/BackLink.vue';
import HomeHero from './components/HomeHero.vue';
import Layout from './Layout.vue';
import './tokens.css';
import './custom.css';

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('BiliPlayer', BiliPlayer);
    app.component('BackLink', BackLink);
    app.component('HomeHero', HomeHero);
  },
} as Theme;
