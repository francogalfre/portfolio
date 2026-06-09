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
      {
        name: "sse-dev-passthrough",
        configureServer(server) {
          // Pre-commit SSE headers before Astro's SSR middleware runs.
          // Without this, Vite buffers the response body and injects
          // <script type="module" src="/@vite/client"> into the SSE stream.
          server.middlewares.use((req, res, next) => {
            if (req.url !== "/api/rag" || req.method !== "POST") return next();
            req.socket?.setNoDelay?.(true);
            res.setHeader("Content-Type", "text/event-stream");
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Connection", "keep-alive");
            res.setHeader("X-Accel-Buffering", "no");
            const origWriteHead = res.writeHead.bind(res);
            const origSetHeader = res.setHeader.bind(res);
            res.writeHead = (...args) => res.headersSent ? res : origWriteHead(...args);
            res.setHeader = (...args) => res.headersSent ? res : origSetHeader(...args);
            res.flushHeaders();
            next();
          });
        },
      },
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
