import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://eduardocnalencar.com',
  output: 'static',
  build: { format: 'directory' }
});
