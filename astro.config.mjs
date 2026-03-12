// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

import react from '@astrojs/react';

export default defineConfig({
  vite: {
    plugins: [
      tailwindcss({
        css: {
          tailwindDirectives: true
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src')
      }
    }
  },

  integrations: [react()]
});