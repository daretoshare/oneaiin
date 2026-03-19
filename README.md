# one.ai.in — Enterprise AI. Understood.

A knowledge platform for AI governance, model risk management, and responsible AI adoption.

## Quick Start

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Deploy to Vercel

1. Push to GitHub
2. Import at vercel.com
3. Deploy — zero config needed
4. Add domain: Settings → Domains → `one.ai.in`
   - A record: `76.76.21.21`
   - CNAME `www`: `cname.vercel-dns.com`

## Writing Articles

Create `.md` files in `content/articles/` with this frontmatter:

```yaml
---
title: "Your Title"
excerpt: "One sentence summary."
date: "2026-05-01"
author: "Dipanjan Deb"
domain: "BFSI"
readTime: "8 min read"
tags: ["AI Governance", "Model Risk"]
---

Your article content in Markdown...
```

Commit and push — auto-deploys in ~30 seconds.

## Theme

Toggle dark/light via the sun/moon icon in the nav. Default: dark. Persists via localStorage and respects system preference.

## Project Structure

```
app/
  layout.tsx            Root layout
  page.tsx              Homepage
  globals.css           Styles + theme vars
  about/page.tsx        About page
  articles/page.tsx     Article listing
  articles/[slug]/      Dynamic article pages
  knowledge-base/       Knowledge base
  components/           Nav, Footer, ThemeProvider
  lib/articles.ts       Markdown utilities
content/articles/       Your .md articles
```

## Dependencies

Minimal and clean — only `next`, `react`, `react-dom`, `gray-matter`. No vulnerable packages. Markdown rendering is handled by a built-in parser (no remark/rehype/mdx dependencies).

## Compliance

Non-commercial educational platform. Personal views only. No employer IP used.
