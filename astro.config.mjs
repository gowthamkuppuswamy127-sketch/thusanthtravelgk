// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Set SITE_URL (e.g. https://www.example.com) when deploying so canonical
// and social-share URLs are absolute.
export default defineConfig({
  site: process.env.SITE_URL || undefined,
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
});
