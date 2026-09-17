import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://eduardocna.github.io',
  base: process.env.BASE_PATH ?? '/eduardo-alencar-site',
  output: 'static',
  build: { format: 'directory' }
});
