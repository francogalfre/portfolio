export const projects = [
    {
        id: 9,
        title: "ShippersLab",
        detailsUrl: "shipperslab",
        description:
            "A software agency I co-founded, building custom products for small businesses and shipping something new every day.",
        longDescription:
            "ShippersLab is a software studio based in Santa Fe, Argentina. A small team of engineers and designers building custom management systems, integrations, AI WhatsApp bots, and websites for small businesses and shops, with scope and price agreed in writing before we start.\n\nI'm a co-founder, so I work directly with clients: understanding what they need, scoping it, and building the projects myself. I also designed and built the agency's landing page, which introduces our services, showcases our work, and highlights upcoming events.\n\nOne of our own products is EventOps, a platform for sound, lighting, and event companies that replaces spreadsheets: each event is loaded once, and the calendar, budget, payments, and expenses all come from it. We're building and shipping every day.",
        image: "/projects/shipperslab.webp",
        href: "https://www.shipperslab.tech",
        tags: ["Next.js", "TypeScript", "Tailwind", "Bun"],
    },
    {
        id: 1,
        title: "Tulocal",
        detailsUrl: "tulocal",
        description:
            "Snap three photos and get an online store, with an AI agent that haggles with buyers for you.",
        longDescription:
            "Selling something shouldn't take an afternoon. Whether you run a small business or just want to get rid of an old bike, you still need decent photos, a description, a price that makes sense, and then you answer \"is this still available?\" twenty times on WhatsApp.\n\nTulocal turns a handful of phone photos into an online store ready to share. The AI identifies the product, enhances the photos, writes the title and description, and suggests a price backed by real market comparables. Every store gets its own URL and an AI agent with its own personality that answers questions and negotiates with buyers, without ever going below the secret minimum price the seller sets. It's not a marketplace: no central catalog, no commission. Sellers bring their own buyers, and Tulocal does the heavy lifting of listing and replying.\n\nWe built it for the Remo Litoral hackathon as a Bun monorepo, with Next.js, Drizzle ORM on Neon Postgres, and Tailwind. The key piece was the negotiating agent: flexible enough to close a deal, but strict enough to never reveal or break the seller's floor price.",
        image: "/projects/tulocal.webp",
        href: "https://tulocal.site",
        blogPost: "/blog/my-first-hackathon",
        tags: [
            "Next.js",
            "TypeScript",
            "Drizzle ORM",
            "Neon",
            "Tailwind",
            "Bun",
        ],
    },
    {
        id: 2,
        title: "Echo",
        detailsUrl: "echo",
        description:
            "Feedback infrastructure for products: collect, triage, and understand customer insights with AI.",
        longDescription:
            "Every product needs to hear from its users, but feedback gets lost in emails, support tickets, and DMs. Echo gives it a home. Drop a widget on your site or post to the API directly, and feedback lands in one place instead of scattered across tools.\n\nThe model is simple. Organizations own projects, projects collect feedback, and everything in the dashboard is scoped to the project you're working in. Triage happens on a shared list or a kanban-style board, and AI-assisted digests summarize patterns across incoming feedback so you see themes instead of reading every entry one by one. Invite teammates, manage API keys, and track usage against your plan, all from the same dashboard.\n\nBuilt as a Turborepo monorepo on Bun, with Next.js for the dashboard, Hono as the API transport layer, and tRPC for end-to-end typed procedures between them. Drizzle ORM and PostgreSQL handle persistence, and Better-Auth handles authentication. The interesting part was making the collection path work for both the widget and the API, feeding the same typed pipeline as the dashboard, so triage and digests work the same no matter how the feedback comes in.",
        image: "/projects/echo.webp",
        href: "https://echo.builders",
        repository: "https://github.com/francogalfre/echo",
        tags: [
            "Next.js",
            "Hono",
            "tRPC",
            "Drizzle ORM",
            "PostgreSQL",
            "TypeScript",
            "Better-Auth",
            "Bun",
            "Turborepo",
            "AI SDK"
        ],
    },
    {
        id: 3,
        title: "Lens",
        detailsUrl: "lens",
        description:
            "A multi-agent AI system that analyzes and validates any idea from every angle.",
        longDescription:
            "Most ideas fail not because they were bad, but because nobody challenged them early enough. I built Lens to fix that: a way to pressure-test any idea before spending weeks building it.\n\nThe core is a LangGraph pipeline where six specialized agents collaborate. A Parser structures the raw input, then three agents run in parallel: the Critic looks for weaknesses, the Researcher maps the competitive landscape, and the Opportunity agent finds angles others might miss. A Feasibility agent evaluates execution realism, and a Synthesis agent pulls everything into a final verdict.\n\nThe real engineering challenge was not the individual LLM calls, but designing for partial failures, managing parallel execution, and making each agent's output feed cleanly into the next.",
        image: "/projects/lens.webp",
        href: "https://lenss.site",
        repository: "https://github.com/francogalfre/lens",
        tags: [
            "LangChain",
            "LangGraph",
            "Langfuse",
            "TypeScript",
            "OpenRouter",
            "Next.js",
        ],
    },
    {
        id: 4,
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
        id: 5,
        title: "Patitas",
        detailsUrl: "patitas",
        description:
            "A pet adoption site where shelters can list animals and anyone can find their next pet.",
        longDescription:
            "Pet adoption in Argentina mostly happens through WhatsApp groups and Facebook posts. Shelters share photos, people ask questions in comment threads, and finding an animal depends on seeing the right post at the right time.\n\nPatitas is that place. Shelters and fosters can list animals with photos and details. Anyone looking to adopt can browse by species, size, age, or location and reach out directly.\n\nThe main challenge was making it fast on mobile, where most people browse. That shaped decisions about image handling, filter UX, and keeping the shelter onboarding short enough that people actually complete it.",
        image: "/projects/patitas.webp",
        href: "https://adoptapatitas.vercel.app/",
        repository: "https://github.com/francogalfre/patitas",
        tags: ["Next.js", "Node.js", "Tailwind", "Typescript", "PostgreSQL"],
    },
    {
        id: 6,
        title: "Freelanceo",
        detailsUrl: "freelanceo",
        description:
            "An all-in-one dashboard for freelancers to manage clients, projects, and invoices.",
        longDescription:
            "Every freelancer I talked to had the same fragmented setup: one tool for invoices, a spreadsheet for clients, another for time tracking, and a folder of emails as a CRM. None of it talked to each other.\n\nFreelanceo collapses all of that into one dashboard. Manage contacts, track projects, send invoices, and see earnings through charts, without switching between five different tools.\n\nThe hardest part was deciding what not to add. It needed to be simple enough to set up in a minute, but complete enough for a real client business. This project pushed me to design more complex relational data models than I'd worked with before: clients, projects, invoices, and payment tracking all feeding into earnings calculations.",
        image: "/projects/freelanceo.webp",
        image2: "/projects/freelanceo2.webp",
        href: "https://freelanceo-dashboard.vercel.app",
        repository: "https://github.com/francogalfre/freelanceo",
        tags: ["Next.js", "Node.js", "Tailwind", "Typescript", "PostgreSQL"],
    },
    {
        id: 7,
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
        id: 8,
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
