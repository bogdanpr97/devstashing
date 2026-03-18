# 🗃️ DevStash — Project Overview

> **One fast, searchable, AI-enhanced hub for all your developer knowledge & resources.**

---

## Table of Contents

- [Problem Statement](#problem-statement)
- [Target Users](#target-users)
- [Features](#features)
- [Data Model (Draft)](#data-model-draft)
- [Tech Stack](#tech-stack)
- [Monetization](#monetization)
- [UI/UX Guidelines](#uiux-guidelines)
- [Architecture Overview](#architecture-overview)
- [Useful Links](#useful-links)

---

## Problem Statement

Developers keep their essentials scattered across too many tools: code snippets in VS Code or Notion, AI prompts buried in chat history, context files lost in project folders, useful links in browser bookmarks, commands in `.txt` files or bash history, and project templates in GitHub gists.

This causes constant context switching, lost knowledge, and inconsistent workflows.

**DevStash** solves this by providing a single, fast, searchable, AI-enhanced hub to store, organize, and retrieve all developer resources.

---

## Target Users

| Persona | Needs |
|---|---|
| **Everyday Developer** | Fast access to snippets, prompts, commands, and links |
| **AI-first Developer** | Storage for prompts, contexts, workflows, and system messages |
| **Content Creator / Educator** | Organization of code blocks, explanations, and course notes |
| **Full-stack Builder** | Collection of patterns, boilerplates, and API examples |

---

## Features

### A. Items & Item Types

Items are the core unit of DevStash. Each item has a **type** that determines its behavior and appearance. Users will eventually be able to create custom types, but the system ships with these built-in types (non-editable):

| Type | Content Model | Color | Icon | Route |
|---|---|---|---|---|
| 🟦 Snippet | `text` | `#3b82f6` (Blue) | `Code` | `/items/snippets` |
| 🟪 Prompt | `text` | `#8b5cf6` (Purple) | `Sparkles` | `/items/prompts` |
| 🟧 Command | `text` | `#f97316` (Orange) | `Terminal` | `/items/commands` |
| 🟨 Note | `text` | `#fde047` (Yellow) | `StickyNote` | `/items/notes` |
| ⬜ File | `file` *(Pro)* | `#6b7280` (Gray) | `File` | `/items/files` |
| 🟩 Link | `url` | `#10b981` (Emerald) | `Link` | `/items/links` |
| 🟫 Image | `file` *(Pro)* | `#ec4899` (Pink) | `Image` | `/items/images` |

Items should be quick to access and create within a **drawer** (slide-over panel).

### B. Collections

Users can create named collections that hold items of **any type**. An item can belong to **multiple collections** (many-to-many relationship). Example collections:

- "React Patterns" → snippets, notes
- "Context Files" → files
- "Interview Prep" → snippets, prompts, notes
- "Python Snippets" → snippets

### C. Search

Powerful full-text search across content, tags, titles, and types. Free tier gets basic search; Pro unlocks advanced filtering.

### D. Authentication

- Email/password sign-in
- GitHub OAuth sign-in
- Powered by **NextAuth v5**

### E. Core Features

- Collection and item **favorites**
- Item **pin to top**
- **Recently used** items tracking
- **Import** code from a file
- **Markdown editor** for text-based types
- **File upload** for file/image types (Pro)
- **Export** data as JSON/ZIP (Pro)
- **Dark mode** by default, light mode optional
- Add/remove items to/from multiple collections
- View which collections an item belongs to

### F. AI Features (Pro Only)

- **AI auto-tag suggestions** — intelligent tag recommendations based on content
- **AI summaries** — generate a summary of any item
- **AI Explain This Code** — plain-English code explanations
- **Prompt optimizer** — improve and refine AI prompts

---

## Data Model (Draft)

> ⚠️ **This is a rough draft.** Field names, types, and relations will be refined during development. This serves as a starting point for discussion and initial migration planning.

### Entity Relationship Diagram

```
┌──────────┐       ┌──────────────┐       ┌──────────────┐
│   User   │──────<│     Item     │>──────│   ItemType   │
└──────────┘  1:N  └──────────────┘  N:1  └──────────────┘
     │                    │                      │
     │                    │ N:N                   │
     │              ┌─────┴──────┐               │
     │              │ItemCollection│              │
     │              └─────┬──────┘               │
     │                    │                      │
     │               ┌────┴─────┐                │
     │──────────────<│Collection │               │
     │          1:N  └──────────┘               │
     │                                           │
     │              ┌──────────┐                 │
     │              │   Tag    │<────────────────┘
     │              └──────────┘
     │                    │
     │              N:N (ItemTag)
     └──────────────────────┘
```

### Prisma Schema (Draft)

> **Note:** This targets [Prisma ORM 7](https://www.prisma.io/blog/announcing-prisma-orm-7-0-0), which uses the new `prisma-client` generator and moves datasource configuration to `prisma.config.ts`. The `url` field is no longer defined in the schema file.
>
> **Important:** Never use `db push` or directly modify the database structure. All changes go through migrations: `prisma migrate dev` in development, `prisma migrate deploy` in production.

```prisma
// schema.prisma

generator client {
  provider = "prisma-client"
  output   = "./generated/prisma"
}

datasource db {
  provider = "postgresql"
}

// ─── USER (extends NextAuth) ─────────────────────────────

model User {
  id                   String    @id @default(cuid())
  name                 String?
  email                String?   @unique
  emailVerified        DateTime?
  image                String?
  isPro                Boolean   @default(false)
  stripeCustomerId     String?   @unique
  stripeSubscriptionId String?   @unique

  accounts   Account[]
  sessions   Session[]
  items      Item[]
  collections Collection[]
  itemTypes  ItemType[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// ─── ITEM ────────────────────────────────────────────────

model Item {
  id          String   @id @default(cuid())
  title       String
  contentType ContentType @default(TEXT)
  content     String?  // text content (null if file)
  fileUrl     String?  // R2 URL (null if text)
  fileName    String?  // original filename (null if text)
  fileSize    Int?     // bytes (null if text)
  url         String?  // for link types
  description String?
  language    String?  // optional — for code snippets
  isFavorite  Boolean  @default(false)
  isPinned    Boolean  @default(false)

  userId     String
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  itemTypeId String
  itemType   ItemType @relation(fields: [itemTypeId], references: [id])

  tags        Tag[]
  collections ItemCollection[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId])
  @@index([itemTypeId])
}

enum ContentType {
  TEXT
  FILE
  URL
}

// ─── ITEM TYPE ───────────────────────────────────────────

model ItemType {
  id       String  @id @default(cuid())
  name     String
  icon     String
  color    String
  isSystem Boolean @default(false)

  userId String? // null for system types
  user   User?   @relation(fields: [userId], references: [id], onDelete: Cascade)

  items Item[]

  @@unique([name, userId])
}

// ─── COLLECTION ──────────────────────────────────────────

model Collection {
  id            String  @id @default(cuid())
  name          String
  description   String?
  isFavorite    Boolean @default(false)
  defaultTypeId String? // for new collections with no items

  userId String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  items ItemCollection[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId])
}

// ─── JOIN TABLE: Item <-> Collection ─────────────────────

model ItemCollection {
  itemId       String
  collectionId String

  item       Item       @relation(fields: [itemId], references: [id], onDelete: Cascade)
  collection Collection @relation(fields: [collectionId], references: [id], onDelete: Cascade)

  addedAt DateTime @default(now())

  @@id([itemId, collectionId])
}

// ─── TAG ─────────────────────────────────────────────────

model Tag {
  id    String @id @default(cuid())
  name  String @unique

  items Item[]
}
```

### Prisma Config (Prisma 7)

```typescript
// prisma.config.ts (project root)
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
```

---

## Tech Stack

### Core Framework

| Layer | Technology | Notes |
|---|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/blog/next-16) / React 19 | Turbopack (stable, default bundler), Cache Components, `proxy.ts` replaces middleware |
| **Language** | TypeScript | Strict mode for full type safety |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) | Developer-focused dark-mode-first design |

### Data Layer

| Layer | Technology | Notes |
|---|---|---|
| **Database** | [Neon](https://neon.tech/) (Serverless PostgreSQL) | Cloud-hosted, auto-scaling |
| **ORM** | [Prisma 7](https://www.prisma.io/blog/announcing-prisma-orm-7-0-0) | New `prisma-client` generator, `prisma.config.ts`, ESM-first |
| **Caching** | Redis *(maybe)* | For hot paths like search and recently used |
| **File Storage** | [Cloudflare R2](https://developers.cloudflare.com/r2/) | S3-compatible, zero egress fees |

### Auth & Payments

| Layer | Technology | Notes |
|---|---|---|
| **Authentication** | [NextAuth v5](https://authjs.dev/) | Email/password + GitHub OAuth |
| **Payments** | [Stripe](https://stripe.com/) | Subscriptions via `stripeCustomerId` / `stripeSubscriptionId` |

### AI & Intelligence

| Layer | Technology | Notes |
|---|---|---|
| **AI Model** | OpenAI `gpt-5-nano` | Lightweight model for auto-tagging, summaries, code explanation, prompt optimization |

### Key Next.js 16 Changes to Keep in Mind

- **Turbopack** is now the default bundler for both `dev` and `build` (no `--turbopack` flag needed)
- **Cache Components** replace PPR — use the `'use cache'` directive for explicit cache control
- **`proxy.ts`** replaces `middleware.ts` — rename the file and export function when ready
- **React 19.2** includes View Transitions, `useEffectEvent`, and Activity API
- **React Compiler** is stable (opt-in via `reactCompiler: true` in `next.config.js`)

---

## Monetization

### Freemium Model

| Feature | Free | Pro ($8/mo · $72/yr) |
|---|---|---|
| Items | 50 total | Unlimited |
| Collections | 3 | Unlimited |
| System types | All except File & Image | All |
| File & Image uploads | ❌ | ✅ |
| Custom types | ❌ | ✅ *(future)* |
| AI auto-tagging | ❌ | ✅ |
| AI code explanation | ❌ | ✅ |
| AI prompt optimizer | ❌ | ✅ |
| Export (JSON/ZIP) | ❌ | ✅ |
| Priority support | ❌ | ✅ |

> **Development note:** During development, all users have access to all features. The Pro gate will be enforced before launch.

---

## UI/UX Guidelines

### Design Principles

- Modern, minimal, **developer-focused**
- **Dark mode** by default, light mode optional
- Clean typography, generous whitespace, subtle borders and shadows
- Syntax highlighting for code blocks
- Design references: [Notion](https://notion.so), [Linear](https://linear.app), [Raycast](https://raycast.com)

### Layout

```
┌─────────────────────────────────────────────────────┐
│  Sidebar (collapsible)  │       Main Content        │
│                         │                           │
│  ┌───────────────────┐  │  ┌─────────────────────┐  │
│  │ 🟦 Snippets       │  │  │  Collection Cards    │  │
│  │ 🟪 Prompts        │  │  │  (color-coded by     │  │
│  │ 🟧 Commands       │  │  │   dominant type)     │  │
│  │ 🟨 Notes          │  │  │                      │  │
│  │ ⬜ Files           │  │  ├─────────────────────┤  │
│  │ 🟫 Images         │  │  │  Item Cards          │  │
│  │ 🟩 Links          │  │  │  (color-coded        │  │
│  ├───────────────────┤  │  │   border by type)    │  │
│  │ Recent Collections │  │  │                      │  │
│  │ ─────────────────  │  │  │  → Click opens       │  │
│  │ React Patterns     │  │  │    quick-access      │  │
│  │ Interview Prep     │  │  │    drawer             │  │
│  │ Python Snippets    │  │  └─────────────────────┘  │
│  └───────────────────┘  │                           │
└─────────────────────────────────────────────────────┘
```

- **Sidebar:** Item types with links, latest collections
- **Main content:** Grid of color-coded collection cards (background color matches dominant type); item cards below with type-colored borders
- **Item detail:** Opens in a quick-access drawer (slide-over panel)
- **Responsive:** Desktop-first; sidebar becomes a drawer on mobile

### Type Color Reference

```css
/* Use these as CSS custom properties */
--color-snippet:  #3b82f6;  /* Blue    */
--color-prompt:   #8b5cf6;  /* Purple  */
--color-command:  #f97316;  /* Orange  */
--color-note:     #fde047;  /* Yellow  */
--color-file:     #6b7280;  /* Gray    */
--color-image:    #ec4899;  /* Pink    */
--color-link:     #10b981;  /* Emerald */
```

### Micro-interactions

- Smooth transitions on navigation and state changes
- Hover states on cards (subtle lift/glow)
- Toast notifications for actions (save, delete, copy)
- Loading skeletons during data fetches

---

## Architecture Overview

```
                          ┌──────────────────┐
                          │   Client (React)  │
                          │   Next.js 16 App  │
                          └────────┬─────────┘
                                   │
                          ┌────────▼─────────┐
                          │  Next.js Server   │
                          │  (API Routes +    │
                          │   Server Actions) │
                          └──┬─────┬──────┬──┘
                             │     │      │
              ┌──────────────┘     │      └──────────────┐
              ▼                    ▼                      ▼
     ┌────────────────┐   ┌──────────────┐     ┌─────────────────┐
     │  Neon Postgres  │   │ Cloudflare R2 │     │  OpenAI API     │
     │  (via Prisma 7) │   │ (File Storage)│     │  (gpt-5-nano)   │
     └────────────────┘   └──────────────┘     └─────────────────┘
              │
     ┌────────┴────────┐
     │   NextAuth v5    │
     │  (Auth Sessions) │
     └─────────────────┘
              │
     ┌────────┴────────┐
     │     Stripe       │
     │  (Subscriptions) │
     └─────────────────┘
```

---

## Useful Links

| Resource | URL |
|---|---|
| Next.js 16 Docs | https://nextjs.org/docs |
| Next.js 16 Release Blog | https://nextjs.org/blog/next-16 |
| Prisma 7 Upgrade Guide | https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7 |
| Prisma Schema Reference | https://www.prisma.io/docs/orm/reference/prisma-schema-reference |
| NextAuth v5 Docs | https://authjs.dev |
| Neon Serverless Postgres | https://neon.tech/docs |
| Cloudflare R2 Docs | https://developers.cloudflare.com/r2 |
| Tailwind CSS v4 | https://tailwindcss.com/docs |
| shadcn/ui | https://ui.shadcn.com |
| Stripe Subscriptions | https://docs.stripe.com/billing/subscriptions |
| OpenAI API | https://platform.openai.com/docs |

---

*Last updated: March 2026*
