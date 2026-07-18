import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import BiliPlayer from './components/BiliPlayer.vue';
import BackLink from './components/BackLink.vue';
import Layout from './Layout.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('BiliPlayer', BiliPlayer);
    app.component('BackLink', BackLink);
  },
} as Theme;
