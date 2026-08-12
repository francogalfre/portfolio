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
            alias: [
                { find: "@/lib/utils", replacement: path.resolve("./src/utils/cn.ts") },
                { find: "@", replacement: path.resolve("./src") },
            ],
        },
        optimizeDeps: {
            exclude: ["streamdown", "@streamdown/code", "@streamdown/cjk"],
            include: ["style-to-js", "debug", "extend"],
        },
        ssr: {
            noExternal: ["detect-libc"],
        },
    },

    integrations: [react()],
});
