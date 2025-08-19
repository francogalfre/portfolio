import NextJS from "../components/icons/code/NextJS.astro";
import Tailwind from "../components/icons/code/Tailwind.astro";
import AstroTech from "../components/icons/code/AstroTech.astro";
import Typescript from "../components/icons/code/Typescript.astro";

const tags = {
  NEXT: {
    name: "Next.js",
    class: "bg-black text-white",
    icon: NextJS,
  },
  TAILWIND: {
    name: "Tailwind CSS",
    class: "bg-[#003159] text-white",
    icon: Tailwind,
  },
  ASTRO: {
    name: "Astro",
    class: "bg-[#003159] text-white",
    icon: AstroTech,
  },
  TYPESCRIPT: {
    name: "Typescript",
    class: "bg-[#003159] text-white",
    icon: Typescript,
  },
};

export const primaryProjects = [
  {
    id: 1,
    title: "Freelanceo",
    description:
      "An intuitive dashboard for freelancers to streamline project, client, and financial management.",
    longDescription:
      "A complete dashboard for freelancers to organize clients, projects, and daily tasks, while visualizing earnings and progress through interactive charts. Designed with a modern stack using Next.js, TypeScript, Tailwind, and PostgreSQL to deliver speed and clarity.",
    image: "/freelanceo.webp",
    image2: "/freelanceo2.webp",
    alt: "Mockup de una captura de la landing page de Freelanceo",
    href: "https://www.freelanceo.site",
    repository: "https://github.com/francogalfre/freelanceo",
    tags: [tags.NEXT, tags.TAILWIND, tags.TYPESCRIPT],
  },
  {
    id: 2,
    title: "Astrotips",
    description:
      "A modern and fast website that provides tips, tricks, and an interactive interface for developers wanting to learn Astro.",
    longDescription:
      "A modern platform that offers tips, best practices, and interactive examples to help developers learn Astro efficiently. Built with Astro, TypeScript, and Tailwind, it focuses on performance, clean design, and a smooth learning experience.",
    image: "/astrotips.webp",
    image2: "/astrotips2.webp",
    alt: "Mockup de uan captura de la landing page de Astrotips.vercel.app",
    href: "https://astrotips.vercel.app/",
    repository: "https://github.com/francogalfre/astrotips",
    tags: [tags.ASTRO, tags.TAILWIND, tags.TYPESCRIPT],
  },
];
