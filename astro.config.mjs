import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://eduardocnalencar.com',
  base: '/eduardo-alencar-site',
  output: 'static',
  build: { format: 'directory' }
});
