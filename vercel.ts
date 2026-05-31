import { routes, type VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
  framework: 'astro',
  buildCommand: 'bun run build',
  installCommand: 'bun install',
};
