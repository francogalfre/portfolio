// @ts-check
import { defineConfig } from "astro/config";

import path from "path";

import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "static",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  vite: {
    plugins: [
      tailwindcss({
        css: {
          tailwindDirectives: true,
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    ssr: {
      noExternal: ["detect-libc"],
    },
    customLogger: {
      warn: (msg, options) => {
        if (
          msg.includes("externalized for browser compatibility") ||
          msg.includes("detect-libc") ||
          msg.includes("graceful-fs")
        ) return;
        console.warn(msg);
      },
    },
  },

  integrations: [react()],
});
