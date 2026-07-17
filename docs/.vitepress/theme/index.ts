import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import BiliPlayer from './components/BiliPlayer.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('BiliPlayer', BiliPlayer);
  },
} as Theme;
