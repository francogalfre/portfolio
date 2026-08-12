export interface PageSEO {
  title: string;
  description: string;
  keywords: string;
  image?: string;
}

export const SITE_URL = "https://francogalfre.vercel.app";
export const SITE_NAME = "Franco Galfré";

export const blogSeoData: PageSEO = {
  title: "Blog — Franco Galfré",
  description:
    "Notes and essays about software engineering, AI agents and building things on the web",
  keywords:
    "blog, software engineering, ai agents, typescript, astro, francogalfre",
};

export const seoData: PageSEO = {
  title: "Franco Galfré",
  description:
    "Full-stack developer building digital products and learning everyday",
  keywords:
    "fullstack, frontend, backend, dev, developer, coding, designer, typescript, nextjs, francogalfre",
};
