export const projects = [
  {
    id: 1,
    title: "Vibrant",
    detailsUrl: "vibrant",
    description:
      "A CLI tool that catches AI-generated code issues before they reach production.",
    longDescription:
      "AI coding assistants are great - until their output slips into production. Vibrant scans your code and catches the patterns that come from AI: hardcoded secrets, empty catch blocks, console.log leftovers, and those sketchy shortcuts that looked fine but will haunt you later.\n\nWith 15+ static analysis rules and AI-powered analysis using OpenAI, Claude, Gemini, or Ollama, it catches what simple rules miss. Just run npx vibrant . no install needed.",
    image: "/projects/vibrant.webp",
    href: "https://vibrantcli.vercel.app",
    repository: "https://github.com/francogalfre/vibrant",
    tags: ["TypeScript", "Node.js", "AI", "AI SDK", "CLI"],
  },
  {
    id: 2,
    title: "Patitas",
    detailsUrl: "patitas",
    description:
      "A platform that helps shelter pets find loving homes through a modern interface.",
    longDescription:
      "Thousands of pets need homes, but the adoption process is often stuck in the past. Patitas makes it simple: shelters and fosters can post pets, and anyone can browse, filter, and connect directly.\n\nBuilt with Next.js and PostgreSQL, it's fast and mobile-friendly. The goal is simple - get more pets into more homes.",
    image: "/projects/patitas.webp",
    href: "https://www.patitas.site/",
    repository: "https://github.com/francogalfre/patitas",
    tags: ["Next.js", "Node.js", "Tailwind", "Typescript", "PostgreSQL"],
  },
  {
    id: 3,
    title: "Freelanceo",
    detailsUrl: "freelanceo",
    description:
      "A dashboard that helps freelancers manage clients, projects, and invoices in one place.",
    longDescription:
      "Freelancing is hard enough without juggling spreadsheets, invoices, and client emails in a dozen different apps. Freelanceo brings everything into one clean dashboard - track projects, manage clients, send invoices, and watch your earnings grow through charts.\n\nBuilt with Next.js and PostgreSQL, it's fast and reliable. Designed for developers, designers, and consultants who want to spend less time on admin and more time building.",
    image: "/projects/freelanceo.webp",
    image2: "/projects/freelanceo2.webp",
    href: "https://www.freelanceo.site",
    repository: "https://github.com/francogalfre/freelanceo",
    tags: ["Next.js", "Node.js", "Tailwind", "Typescript", "PostgreSQL"],
  },
  {
    id: 4,
    title: "Astrotips",
    detailsUrl: "astrotips",
    description:
      "A curated collection of tips and tricks to master Astro, the web framework for content-driven sites.",
    longDescription:
      "Astro is incredible - but learning it from scratch can feel overwhelming. Astrotips gathers real-world tips, best practices, and interactive examples from the community to help you go from zero to Astro pro.\n\nNo fluff, no filler. Just practical advice you can copy-paste into your projects. Built with Astro itself to practice what it preaches.",
    image: "/projects/astrotips.webp",
    image2: "/projects/astrotips2.webp",
    href: "https://astrotips.vercel.app/",
    repository: "https://github.com/francogalfre/astrotips",
    tags: ["Astro", "Tailwind", "Typescript"],
  },
  {
    id: 5,
    title: "Promptsmith",
    detailsUrl: "promptsmith",
    description:
      "A type-safe prompt builder for the Vercel AI SDK. Build AI features with confidence.",
    longDescription:
      "Building AI-powered features shouldn't feel like a guessing game. Promptsmith gives you type-safe prompts that work seamlessly with the Vercel AI SDK - autocomplete, type checking, and confidence when crafting your AI interactions.\n\nBuilt with Next.js and Motion for a smooth UI. Switch between presets, test responses in real-time, and export ready-to-use code.",
    image: "/projects/promptsmith.webp",
    href: "https://promptsmith.galfrevn.com/",
    repository: "https://github.com/galfrevn/promptsmith",
    tags: ["Next.js", "Tailwind", "Typescript", "Motion"],
  },
];
