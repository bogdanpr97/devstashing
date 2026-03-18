# Current Feature

Dashboard UI Phase 1 — Initial layout, ShadCN setup, dashboard route, top bar, and placeholders.

## Status

Completed

## Goals

- ShadCN UI initialization and components
- ShadCN component installation
- Dashboard route at /dashboard
- Main dashboard layout and any global styles
- Dark mode by default
- Top bar with search and new item button (display only)
- Placeholder for sidebar and main area (h2 with "Sidebar" and "Main")

## Notes

Phase 1 of 3 for the dashboard UI layout. Reference screenshot at @context/screenshots/dashboard-ui-main.png.

## History

<!-- Keep this updated. Earliest to latest -->

- **2026-03-18** — Initial Next.js project setup. Removed default boilerplate (placeholder SVGs, default page, globals.css). Added CLAUDE.md and context files. Pushed to GitHub.
- **2026-03-18** — Dashboard Phase 1: Initialized ShadCN UI (v4, Tailwind v4 compatible). Installed Button and Input components. Added `/dashboard` route with top bar (search, New Collection, New Item buttons), sidebar placeholder, and main area placeholder. Set dark mode as default via `<html class="dark">`. Added type color CSS variables to globals.css.