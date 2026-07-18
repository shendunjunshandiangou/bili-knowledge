import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import { h } from 'vue';
import BiliPlayer from './components/BiliPlayer.vue';
import BackLink from './components/BackLink.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('BiliPlayer', BiliPlayer);
    app.component('BackLink', BackLink);
  },
  // @ts-ignore
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(BackLink),
    });
  },
} as Theme;
