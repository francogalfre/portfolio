import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
    loader: glob({ base: "./src/data/blog", pattern: "**/*.{md,mdx}" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        tags: z.array(z.string()).default([]),
        cover: z.string(),
        coverAlt: z.string().default(""),
        coverCredit: z.string(),
        draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
