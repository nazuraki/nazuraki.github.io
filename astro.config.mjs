import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://nazuraki.github.io',
  integrations: [tailwind()],
  output: 'static',
});
