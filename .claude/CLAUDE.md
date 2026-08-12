# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start local dev server at `localhost:4321` |
| `pnpm build` | Build production site to `./dist/` |
| `pnpm preview` | Preview built site locally |
| `pnpm lint` | Run Biome linter on `src/pages` and `src/layout` |
| `pnpm format` | Format code with Biome |

## Project Overview

This is an **Astro portfolio website** built with:
- **Astro 6** - Static site generation with optional React components
- **React 19** - For interactive UI components
- **TypeScript** - Type safety throughout
- **TailwindCSS 4** - Utility-first styling with Vite plugin
- **Biome** - Fast linting and formatting
- **Vercel** - Deployment adapter with Web Analytics

Node requirement: **≥22.12.0**

## Architecture

### Directory Structure

```
src/
├── pages/              # Astro pages & API routes (file-based routing)
│   ├── index.astro     # Home page
│   ├── [slug].astro    # Dynamic routes
│   └── api/            # API endpoints
├── components/
│   ├── sections/       # Page sections (about, experience, projects, stack)
│   ├── ui/             # Reusable UI components (buttons, badges, cards)
│   └── icons/          # Icon components (external-link, email, socials)
├── layouts/            # Layout wrappers (base.astro, centered.astro)
├── data/               # Content data files (TS objects, not DB)
├── utils/              # Helper functions (age-calculation, etc)
├── types/              # TypeScript type definitions
├── styles/             # Global CSS
└── assets/             # Static images, gifs
```

### Key Patterns

**Astro Pages & Components:**
- Use frontmatter (top of file between `---`) for imports, utilities, and server-side logic
- HTML/template code below frontmatter
- Import components and layouts from `@/` alias (resolves to `src/`)

**Interactive Elements:**
- React components with `.tsx` extension
- Use `client:visible` directive to hydrate only when visible (performance optimization)
- Example: `<HoverLinkPreview client:visible>` in About section

**Content Management:**
- Data stored in `src/data/*.ts` files (not a database)
- Export TypeScript objects for type safety
- Import and use in page/component frontmatter

**Styling:**
- Tailwind classes throughout components
- Global styles in `src/styles/global.css`
- Custom animations defined in global CSS (e.g., `animate-fade-in`)

### Page Structure Example

```astro
---
import Layout from "@/layouts/base.astro";
import Section from "@/components/sections/section.astro";
import { getData } from "@/data/data.ts";
---

<Layout seo={{ title: "..." }}>
  <Section data={getData()} />
</Layout>
```

## Development Notes

- **Routing**: File-based. `src/pages/projects/[slug].astro` creates `/projects/:slug`
- **API Routes**: Place `.ts` files in `src/pages/api/` (e.g., `/api/spotify` endpoint exists)
- **Path Alias**: `@/*` → `src/*` (configured in tsconfig.json)
- **Type Safety**: TypeScript strict mode enabled via Astro's strict tsconfig
- **Build Output**: Static HTML generated to `dist/` (no server runtime needed)

## Testing & Verification

- No test framework configured; use `pnpm build` to verify no TypeScript/build errors
- Preview production build with `pnpm preview` before deploying
- Biome catches linting issues; fix with `pnpm format` if needed
