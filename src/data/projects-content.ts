export const projects = [
  {
    id: 1,
    title: "Lens",
    detailsUrl: "lens",
    description:
      "A multi-agent AI system that analyzes and validates any idea from every angle.",
    longDescription:
      "Most ideas fail not because they were bad, but because nobody challenged them early enough. I built Lens to fix that: a way to pressure-test any idea before spending weeks building it.\n\nThe core is a LangGraph pipeline where six specialized agents collaborate. A Parser structures the raw input, then three agents run in parallel: the Critic looks for weaknesses, the Researcher maps the competitive landscape, and the Opportunity agent finds angles others might miss. A Feasibility agent evaluates execution realism, and a Synthesis agent pulls everything into a final verdict.\n\nThe real engineering challenge was not the individual LLM calls, but designing for partial failures, managing parallel execution, and making each agent's output feed cleanly into the next.",
    image: "/projects/lens.webp",
    href: "https://lenss.site",
    repository: "https://github.com/francogalfre/lens",
    tags: ["LangChain", "LangGraph", "Langfuse", "TypeScript", "OpenRouter", "Next.js"],
  },
  {
    id: 2,
    title: "Vibrant",
    detailsUrl: "vibrant",
    description:
      "A CLI that catches AI-generated code issues before they reach production.",
    longDescription:
      "AI coding assistants are genuinely useful. They're also responsible for a new category of subtle bugs easy to miss in review: hardcoded API keys, empty catch blocks that swallow errors silently, leftover console.logs, and shortcuts that look fine but fall apart under real conditions.\n\nVibrant runs 15+ static analysis rules tuned to the patterns AI assistants tend to produce. When rules aren't enough, it sends flagged code to an LLM (OpenAI, Claude, Gemini, or Ollama) for deeper contextual analysis. No install required: just `npx vibrant .`.\n\nThe interesting challenge was building a rule engine that's extensible without being complicated, and a CLI experience that feels good in both local terminals and CI pipelines.",
    image: "/projects/vibrant.webp",
    href: "https://vibrantcli.vercel.app",
    repository: "https://github.com/francogalfre/vibrant",
    tags: ["TypeScript", "Node.js", "AI", "AI SDK", "CLI"],
  },
  {
    id: 3,
    title: "Patitas",
    detailsUrl: "patitas",
    description:
      "A pet adoption site where shelters can list animals and anyone can find their next pet.",
    longDescription:
      "Pet adoption in Argentina mostly happens through WhatsApp groups and Facebook posts. Shelters share photos, people ask questions in comment threads, and finding an animal depends on seeing the right post at the right time.\n\nPatitas is that place. Shelters and fosters can list animals with photos and details. Anyone looking to adopt can browse by species, size, age, or location and reach out directly.\n\nThe main challenge was making it fast on mobile, where most people browse. That shaped decisions about image handling, filter UX, and keeping the shelter onboarding short enough that people actually complete it.",
    image: "/projects/patitas.webp",
    href: "https://www.patitas.site/",
    repository: "https://github.com/francogalfre/patitas",
    tags: ["Next.js", "Node.js", "Tailwind", "Typescript", "PostgreSQL"],
  },
  {
    id: 4,
    title: "Freelanceo",
    detailsUrl: "freelanceo",
    description:
      "An all-in-one dashboard for freelancers to manage clients, projects, and invoices.",
    longDescription:
      "Every freelancer I talked to had the same fragmented setup: one tool for invoices, a spreadsheet for clients, another for time tracking, and a folder of emails as a CRM. None of it talked to each other.\n\nFreelanceo collapses all of that into one dashboard. Manage contacts, track projects, send invoices, and see earnings through charts, without switching between five different tools.\n\nThe hardest part was deciding what not to add. It needed to be simple enough to set up in a minute, but complete enough for a real client business. This project pushed me to design more complex relational data models than I'd worked with before: clients, projects, invoices, and payment tracking all feeding into earnings calculations.",
    image: "/projects/freelanceo.webp",
    image2: "/projects/freelanceo2.webp",
    href: "https://www.freelanceo.site",
    repository: "https://github.com/francogalfre/freelanceo",
    tags: ["Next.js", "Node.js", "Tailwind", "Typescript", "PostgreSQL"],
  },
  {
    id: 5,
    title: "Astrotips",
    detailsUrl: "astrotips",
    description:
      "A collection of practical Astro tips and patterns, built with Astro itself.",
    longDescription:
      "Astro has solid documentation, but there's a gap between reading the docs and understanding the patterns that make it shine. Islands architecture, content collections, hybrid rendering: these click much faster with concrete examples than with abstract descriptions.\n\nAstrotips fills that gap. A curated collection of practical tips with real code examples, focused on patterns developers actually reach for. Built with Astro itself, so the site practices what it documents.\n\nThe challenge was content architecture: how to structure a growing set of tips so they stay discoverable as the collection expands and the framework evolves.",
    image: "/projects/astrotips.webp",
    image2: "/projects/astrotips2.webp",
    href: "https://astrotips.vercel.app/",
    repository: "https://github.com/francogalfre/astrotips",
    tags: ["Astro", "Tailwind", "Typescript"],
  },
  {
    id: 6,
    title: "Promptsmith",
    detailsUrl: "promptsmith",
    description:
      "Landing page for a type-safe prompt builder built around the Vercel AI SDK.",
    longDescription:
      "Promptsmith is a concept for a tool that brings type safety to AI prompt templates, giving developers the same autocomplete and validation TypeScript provides everywhere else, applied to prompts for the Vercel AI SDK.\n\nMy contribution was the landing page. The challenge was communicating a technical value proposition without losing people in abstraction: enough depth to earn trust, clear enough for someone new to the idea.\n\nBuilt with Next.js and Motion, it pushed me to think about animation as communication: subtle transitions that guide attention and make the product feel real before someone even tries it.",
    image: "/projects/promptsmith.webp",
    href: "https://promptsmith.galfrevn.com/",
    repository: "https://github.com/galfrevn/promptsmith",
    tags: ["Next.js", "Tailwind", "Typescript", "Motion"],
  },
];
