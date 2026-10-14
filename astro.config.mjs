// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Replace with the staging URL once it is assigned; used for canonical and Open Graph URLs.
  site: process.env.SITE_URL ?? 'https://staging.fsdethiopia-prototype.example',
  output: 'static',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'auto' },
  vite: { plugins: [tailwindcss()] },
});
