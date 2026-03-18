# DevStash

A developer knowledge hub for snippets, commands, prompts, notes, files, images, links and custom types.

## Context Files
Read the following to get the full context of the project:

- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Start production server
```

There is no test runner configured yet.

**Key files:**
- [src/app/layout.tsx](src/app/layout.tsx) — root layout, font setup, global metadata
- [src/app/page.tsx](src/app/page.tsx) — home page
- [src/app/globals.css](src/app/globals.css) — global styles (Tailwind entry point)
- [next.config.ts](next.config.ts) — Next.js config
- [eslint.config.mjs](eslint.config.mjs) — ESLint flat config (ESLint 9)

**IMPORTANT:** Do not add Claude to any commit messages
