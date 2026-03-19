# CLAUDE.md

## Project

one.ai.in — a knowledge platform for enterprise AI governance. Next.js 15 + React 19 + Tailwind CSS 3. Deployed on Vercel via GitHub auto-deploy.

## Commands

```bash
npm run dev          # Start dev server at localhost:3000
npm run build        # Production build (what Vercel runs)
npm run start        # Serve production build locally
```

## Architecture

```
app/
  layout.tsx                  # Root layout — ThemeProvider, Nav, Footer
  page.tsx                    # Homepage
  globals.css                 # All styles + CSS variables for dark/light themes
  about/page.tsx              # About page
  articles/page.tsx           # Article listing
  articles/[slug]/page.tsx    # Dynamic article page (async params)
  knowledge-base/page.tsx     # Knowledge base (coming soon)
  components/
    Navigation.tsx            # Client component — scroll-aware nav + theme toggle
    Footer.tsx                # Server component
    ThemeProvider.tsx          # Client component — dark/light theme context
  lib/
    articles.ts               # Article utilities: getAllArticles(), getArticle(), markdownToHtml()
content/
  articles/                   # Markdown articles with YAML frontmatter
```

## Key Patterns

- **Dark/light theme**: CSS variables in `globals.css` (`:root` = light, `.dark` = dark). Theme toggled via `ThemeProvider.tsx` which adds/removes `dark` class on `<html>`. Always use `var(--variable-name)` for colors, never hardcoded hex.
- **Styling**: Inline `style={{ color: 'var(--text-primary)' }}` for theme-aware colors. Tailwind for layout, spacing, typography classes. Component styles defined in `globals.css` under `@layer components`.
- **Articles**: Markdown files in `content/articles/` with gray-matter frontmatter. Built-in `markdownToHtml()` parser in `lib/articles.ts` — no external remark/rehype/mdx deps.
- **Dynamic routes**: `[slug]/page.tsx` uses `params: Promise<{ slug: string }>` pattern (Next.js 15 requirement). Always `await props.params`.
- **Static generation**: Articles use `generateStaticParams()` from `getAllSlugs()`.

## CSS Variable Reference

```
--bg, --bg-raised, --bg-sunken     # Background layers
--border, --border-hover            # Borders
--text-primary, --text-secondary, --text-muted  # Text hierarchy
--accent, --accent-muted, --accent-border       # Primary accent (blue)
--signal, --signal-muted                        # Secondary accent (green)
--divider                                       # Section dividers
```

## Component Classes

```
.card          # Raised container with border + hover
.tag           # Monospace pill label
.btn-primary   # Filled action button
.btn-outline   # Ghost action button
.section-label # Uppercase monospace category label
.divider       # 1px horizontal rule
.prose-article # Article body typography (h2, h3, p, ul, blockquote, code)
```

## Fonts

- `font-display` → Instrument Serif (headlines)
- `font-heading` → Outfit (section heads, nav, buttons)
- `font-body` → Newsreader (article text, descriptions)
- `font-mono` → IBM Plex Mono (tags, labels, code)

## Article Frontmatter Schema

```yaml
---
title: "Article Title"
excerpt: "One-two sentence summary."
date: "YYYY-MM-DD"
author: "Dipanjan Deb" | "Jayashree Mishra Deb"
domain: "BFSI" | "Healthcare"
readTime: "N min read"
tags: ["Tag1", "Tag2"]
---
```

`domain` controls accent color: BFSI = `--accent` (blue), Healthcare = `--signal` (green).

## Rules

- Zero vulnerable dependencies. Do NOT add remark, rehype, next-mdx-remote, or any markdown processing library. Use the built-in `markdownToHtml()` in `lib/articles.ts`.
- No personal relationship references between the two authors. Keep all language strictly professional.
- All new pages must include the disclaimer in Footer: personal views, non-commercial, educational.
- Vercel free tier — no serverless functions, no edge runtime, no ISR revalidation. Static generation only.
- When adding a new page, add its route to the `links` array in `Navigation.tsx`.