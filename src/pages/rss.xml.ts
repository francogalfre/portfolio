import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

import { SITE_NAME, SITE_URL } from "@/data/seo-content";

export const GET: APIRoute = async (context) => {
	const posts = await getCollection("blog", ({ data }) => !data.draft);

	return rss({
		title: `${SITE_NAME} — Blog`,
		description:
			"Notes and essays about software engineering, AI agents and building things on the web",
		site: context.site ?? SITE_URL,
		items: posts
			.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
			.map((post) => ({
				title: post.data.title,
				description: post.data.description,
				pubDate: post.data.pubDate,
				link: `/blog/${post.id}`,
				categories: post.data.tags,
			})),
	});
};
