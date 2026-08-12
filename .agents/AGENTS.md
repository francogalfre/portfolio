# Agent Guidelines for This Project

This is an Astro + React portfolio website using Tailwind CSS for styling and Biome for linting/formatting.

## Project Overview

- **Type**: Personal portfolio website
- **Framework**: Astro 6.x with React 19 integration
- **Styling**: Tailwind CSS 4.x with Typography plugin
- **Linting**: Biome (JSON config at project root)
- **Node**: Requires Node.js 22.12.0+

## Build Commands

```bash
# Development
npm run dev            # Start Astro dev server with hot reload

# Build
npm run build          # Build for production
npm run preview        # Preview production build locally
npm run astro check    # Type-check Astro files

# Linting & Formatting
npm run lint           # Run Biome lint (src/pages, src/layout)
npm run format         # Format with Biome (writes changes)

# Single file operations
npx biome lint src/pages/index.astro
npx biome format --write src/components/sections/about.astro
```

## Project Structure

```
src/
├── assets/             # Static assets (images, fonts, gifs)
├── components/         # Astro/React components
│   ├── icons/         # Icon components (.astro)
│   ├── sections/      # Page section components
│   └── ui/            # Reusable UI components
├── data/              # Content data (TypeScript files)
├── layouts/           # Astro layouts
├── pages/             # Astro pages and routes
├── styles/            # Global CSS
└── utils/             # Utility functions (TypeScript)
```

## Code Style Guidelines

### General
- Use 2 spaces for indentation (Biome default)
- Max line width: 100 characters
- Use Astro `.astro` files for static content; React for interactive components

### Imports
- Use path aliases: `@/` maps to `src/`
- Example: `import CenteredLayout from "@/layouts/centered.astro";`
- Group imports logically: external libraries first, then internal modules

### TypeScript
- Use explicit types for function parameters and return values
- Export types when reused across files
- This project uses Astro's strict tsconfig
- Example type export:
  ```typescript
  export type AgeData = {
    years: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  ```

### Naming Conventions
- Components: PascalCase (e.g., `AboutSection.astro`, `CompanyBadge.astro`)
- Utilities: camelCase (e.g., `age-calculation.ts`)
- Constants: UPPER_SNAKE_CASE for magic numbers (e.g., `const BIRTH_DATE`)
- Content data files: `{name}-content.ts` (e.g., `projects-content.ts`)

### CSS & Tailwind
- Use Tailwind utility classes for styling
- Custom styles in `src/styles/global.css`
- Avoid inline styles except for dynamic values
- Tailwind config is handled via CSS @theme directives (v4)

### Astro Components
- Frontmatter at top of file between `---` fences
- Script tags inline for client-side JS when needed
- Props defined via TypeScript interface in frontmatter
- Example:
  ```astro
  ---
  interface Props {
    title: string;
    description?: string;
  }

  const { title, description = "" } = Astro.props;
  ---
  ```

### React Components
- Use `.tsx` extension for components with JSX
- Use `client:` directives in Astro for interactivity (e.g., `client:load`, `client:visible`)
- Follow React best practices (hooks, memoization where needed)

### Error Handling
- Handle edge cases in utility functions
- Use proper TypeScript types to prevent runtime errors
- Validate data from external sources

## Common Tasks

### Adding a New Page
1. Create `src/pages/pagename.astro`
2. Import a layout (usually `CenteredLayout` or `BaseLayout`)
3. Add page content

### Adding a New Component
1. Choose directory: `components/icons`, `components/sections`, or `components/ui`
2. Create `{ComponentName}.astro` (or `.tsx` for React)
3. Define Props interface if component accepts props

### Modifying Styles
1. Tailwind utility classes: edit the component file
2. Custom CSS: edit `src/styles/global.css`

## Git & Workflow

- Run `npm run lint` and `npm run format` before committing
- Check with `npm run build` to ensure production build works
- Use descriptive commit messages
- No test framework configured yet

## File Patterns to Edit

- Pages: `src/pages/**/*.astro`
- Components: `src/components/**/*.astro` or `.tsx`
- Styles: `src/styles/global.css`
- Data: `src/data/*-content.ts`
- Utils: `src/utils/*.ts`

## Avoid Editing

- Auto-generated files in `.astro/` directory
- Dependencies in `node_modules/`
- Build output in `dist/` (generated on build)