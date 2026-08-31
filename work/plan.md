# one.ai.in — Site Improvement Plan

**Created**: 2026-08-31
**Status**: In Progress — Sprint 0 active
**Last Updated**: 2026-08-31

---

## Executive Summary

one.ai.in is a Next.js 15 knowledge platform for enterprise AI governance. The foundation is solid — clean design system, well-structured content architecture, minimal dependencies. However, the site is thin on content, has no SEO fundamentals, no testing, and no engagement features. This plan prioritizes improvements that move the site from "portfolio" to "platform."

---

## Progress Log

| Date | Item | Status |
|------|------|--------|
| 2026-08-31 | INFRA-2 — ESLint + Prettier (SCRUM-22) | ✅ Done, branch `feat/eslint-prettier` pushed |
| 2026-08-31 | Tier 1.1 — Client-side search Fuse.js (SCRUM-16) | ▶️ In Progress |

---

## Current State

| Layer | Status | Notes |
|-------|--------|-------|
| Stack | Next.js 15 + React 19 + Tailwind 3 | Clean, modern, well-chosen |
| Content | 2 articles (1 placeholder), 4 KB items | Needs 10x volume |
| Design | Polished dark/light theme, distinctive typography | Ready to extend |
| SEO | No sitemap, no robots.txt, no structured data | Critical gap |
| Analytics | None | Flying blind |
| Testing | None | Low risk today, high risk as features grow |
| CI/CD | Vercel auto-deploy on push to main | Works well |
| Git workflow | dev → Vercel preview → merge to main | Documented in dailyworkflow.md |
| Management | CLAUDE.md exists, no AGENTS.md, no PR templates | Partial |
| Linting/Formatting | ESLint (Next.js config) + Prettier configured; `lint`/`format` scripts | **Done (SCRUM-22)** |

---

## Tier 1: Quick Wins (1-2 days each)

### 1.1 — Client-Side Search
**Goal**: Users can find articles and KB items instantly.
**Approach**: Add Fuse.js for fuzzy client-side search across titles, excerpts, and tags. Add a search modal triggered by `/` keyboard shortcut or a search icon in nav.
**Files affected**: New `app/components/SearchModal.tsx`, update `Navigation.tsx`, add `fuse.js` dependency.
**Jira epic**: SCRUM-11 (Content & Search)

### 1.2 — Tag-Based Filtering
**Goal**: Tags in frontmatter become clickable, filterable UI elements.
**Approach**: On articles listing page and KB listing page, add clickable tag pills that filter the list. URL-encoded filter state (e.g., `/articles?tags=SR+11-7`).
**Files affected**: `app/articles/page.tsx`, `app/knowledge-base/page.tsx`, possibly new `app/components/TagFilter.tsx`.
**Jira epic**: SCRUM-11 (Content & Search)

### 1.3 — Related Articles Section
**Goal**: Cross-link content to increase session depth.
**Approach**: At the bottom of each article/KB page, show 2-3 related items matched by shared tags and domain. Render as compact cards.
**Files affected**: `app/articles/[slug]/page.tsx`, `app/knowledge-base/item/[slug]/page.tsx`, new utility function in `app/lib/articles.ts` and `app/lib/knowledge-base.ts`.
**Jira epic**: SCRUM-11 (Content & Search)

### 1.4 — JSON-LD Structured Data
**Goal**: Google rich results for articles (author, datePublished, headline).
**Approach**: Add `<script type="application/ld+json">` to article pages and homepage. Article schema + Organization schema.
**Files affected**: `app/articles/[slug]/page.tsx`, `app/layout.tsx`.
**Jira epic**: SCRUM-10 (SEO & Discovery)

### 1.5 — Sitemap + robots.txt
**Goal**: Search engines can discover and index all pages.
**Approach**: Use Next.js App Router built-in `sitemap.ts` and `robots.ts` in the `app/` directory. Generate from `getAllArticles()` and `getAllKBItems()`.
**Files affected**: New `app/sitemap.ts`, new `app/robots.ts`.
**Jira epic**: SCRUM-10 (SEO & Discovery)

### 1.6 — Favicon + OG Image
**Goal**: Visual identity in browser tabs and social shares.
**Approach**: Create SVG favicon. Create a default OG image (1200x630) with the one.ai.in branding. Add to `app/layout.tsx` metadata and `public/`.
**Files affected**: New `public/favicon.svg`, new `public/og-default.png`, update `app/layout.tsx`.
**Jira epic**: SCRUM-10 (SEO & Discovery)

---

## Tier 2: Engagement Drivers (3-5 days each)

### 2.1 — Interactive KB Filters
**Goal**: Filter knowledge base by category, template type, year, jurisdiction.
**Approach**: Add filter sidebar or top-bar on KB listing page. URL state management for shareable filtered views.
**Files affected**: `app/knowledge-base/page.tsx`, possibly new `app/components/KBFilters.tsx`.
**Jira epic**: SCRUM-11 (Content & Search)

### 2.2 — Glossary Page
**Goal**: Enterprise AI governance has dense jargon — provide a reference.
**Approach**: New KB category `glossary`. Each term is a KB item with definition, context, and cross-references. Render as A-Z grouped listing.
**Files affected**: Update `app/lib/knowledge-base.ts` (add `glossary` category), new content files, new `app/knowledge-base/glossary/page.tsx`.
**Jira epic**: SCRUM-11 (Content & Search)

### 2.3 — Newsletter Archive
**Goal**: Past newsletter issues become indexed content.
**Approach**: Add a new content type `content/newsletters/` with frontmatter (issue number, date, subject). Display as a listing page at `/newsletters`. Each issue renders as an article.
**Files affected**: New `app/lib/newsletters.ts`, new `app/newsletters/page.tsx`, new `app/newsletters/[slug]/page.tsx`, update nav links.
**Jira epic**: SCRUM-11 (Content & Search)

### 2.4 — Per-Author RSS Feeds
**Goal**: Readers who follow one author can subscribe to just their content.
**Approach**: Generate RSS XML at build time for each author. Link in footer and author cards.
**Files affected**: New `app/feed/[author]/route.ts` (or static generation), update `Footer.tsx`.
**Jira epic**: SCRUM-12 (Engagement & Community)

### 2.5 — Reading Progress Indicator
**Goal**: Show readers how far they are through long articles.
**Approach**: Thin progress bar at top of article pages, driven by scroll position. Client component.
**Files affected**: New `app/components/ReadingProgress.tsx`, integrate into article and KB item pages.
**Jira epic**: SCRUM-12 (Engagement & Community)

---

## Tier 3: Platform Moves (1-2 weeks each)

### 3.1 — AI Governance Maturity Assessment
**Goal**: Interactive quiz that generates a maturity score. Lead generation via email capture.
**Approach**: 10-15 questions covering governance, validation, monitoring, documentation. Score against a maturity model. Display results with recommendations. Capture email for detailed report delivery.
**Files affected**: New `app/assessment/page.tsx`, new `app/components/AssessmentQuiz.tsx`, new scoring logic, Beehiiv integration for email delivery.
**Jira epic**: SCRUM-13 (Lead Generation)

### 3.2 — Email-Gated Whitepapers
**Goal**: Downloadable PDF deep-dives. Email capture for distribution.
**Approach**: Write whitepapers in markdown. Convert to PDF at build time (or use a service). Gate behind email form. Deliver via Beehiiv or direct download.
**Files affected**: New `content/whitepapers/`, new `app/whitepapers/page.tsx`, PDF generation pipeline.
**Jira epic**: SCRUM-13 (Lead Generation)

### 3.3 — Comment System
**Goal**: Enable discussion on articles.
**Approach**: Option A: Giscus (GitHub Discussions backend — free, no DB). Option B: Gentleman (paid, more features). Start with Giscus.
**Files affected**: New `app/components/Comments.tsx`, integrate into article pages.
**Jira epic**: SCRUM-12 (Engagement & Community)

### 3.4 — Knowledge Base JSON API
**Goal**: Expose KB as a public API for downstream tools.
**Approach**: API routes under `app/api/kb/` that return JSON. Support filtering by category, tags, date range.
**Files affected**: New `app/api/kb/route.ts`, `app/api/kb/[slug]/route.ts`.
**Jira epic**: SCRUM-14 (Infrastructure & Quality)

### 3.5 — Dark Mode Auto-Switch
**Goal**: Theme follows time of day with manual override.
**Approach**: Auto dark 7pm–7am, light 7am–7pm. Respect system preference as fallback. Manual toggle overrides auto.
**Files affected**: `app/components/ThemeProvider.tsx`.
**Jira epic**: SCRUM-12 (Engagement & Community)

---

## Infrastructure & Quality

### INFRA-1: Testing
- Add Vitest for unit tests
- Add Playwright for E2E tests (critical flows: article rendering, search, theme toggle)
- Target: 80%+ coverage on `app/lib/` utilities

### INFRA-2: Linting & Formatting ✅ DONE (SC-22 / SCRUM-22)
- ~~Add ESLint (Next.js config)~~ — Done
- ~~Add Prettier~~ — Done
- ~~Add `npm run lint` and `npm run format` scripts~~ — Done (`lint`, `lint:fix`, `format`, `format:check`)
- Consider pre-commit hooks via husky — Pending (optional)

**Shipped 2026-08-31**: flat `eslint.config.mjs` (core-web-vitals + prettier), `.prettierrc`, `.prettierignore`, scripts. Fixed 3 pre-existing lint errors (2× `<a>`→`<Link>`, ThemeProvider refactor to `useSyncExternalStore`). Feature branch `feat/eslint-prettier` pushed for preview.

### INFRA-3: TypeScript Strict Mode
- Enable `"strict": true` in tsconfig.json
- Fix resulting type errors
- Add to CI pipeline

### INFRA-4: Analytics
- Add Vercel Analytics (free tier, zero config) or Plausible (privacy-focused)
- Track: page views, newsletter signups, search usage, assessment completions

### INFRA-5: Error Tracking
- Add Sentry or use Vercel's built-in error tracking
- Capture client-side errors in production

---

## Content Production Roadmap

| Month | Target | Focus |
|-------|--------|-------|
| Sep 2026 | 5 articles, 8 KB items | Fill out BFSI content, add Healthcare content |
| Oct 2026 | 10 articles, 15 KB items | Add glossary terms, first newsletter archive |
| Nov 2026 | 15 articles, 20 KB items | Launch assessment, first whitepaper |
| Dec 2026 | 20 articles, 25 KB items | Year-end review content, governance trends |

---

## Jira Integration

**Jira project**: Created — **`SCRUM`** (TeamOneAI, "SCRUM board"). Board: `https://myoneai.atlassian.net/agile/1`.

**Epic structure** (live on board):
| Epic Key | Name | Description |
|----------|------|-------------|
| SCRUM-10 | SEO & Discovery | Sitemap, structured data, OG tags, robots.txt |
| SCRUM-11 | Content & Search | Search, filtering, related articles, glossary, newsletter archive |
| SCRUM-12 | Engagement & Community | Comments, RSS, reading progress, dark mode auto-switch |
| SCRUM-13 | Lead Generation | Maturity assessment, whitepapers, email capture |
| SCRUM-14 | Infrastructure & Quality | Testing, linting, analytics, error tracking, TypeScript strict |

> **Note**: The planned `ONEAI-*` keys map 1:1 to the live `SCRUM-10…14` epics and `SCRUM-16…22` stories.

**Sprint plan**: Starting active Sprint 0 with foundational + Tier 1 work (SCRUM-22 ✅, SCRUM-16 ▶️). Sprint 1 planned for next batch.

**Branch naming convention**: `feat/SCRUM-<ticket-number>-<short-description>` (e.g. `feat/eslint-prettier`)
**PR convention**: Reference Jira ticket in PR title: `[SCRUM-22] Add ESLint and Prettier setup`

---

## Next Steps

1. ✅ Create Jira project with epics — **Done** (project `SCRUM`, epics SCRUM-10…14, stories SCRUM-16…22 in Sprint 0)
2. ✅ Set up ESLint + Prettier (INFRA-2) as prerequisite for all feature work — **Done (SCRUM-22)**
3. ▶️ Implement Tier 1: **SCRUM-16 — Add client-side search with Fuse.js (plan 1.1)** — In Progress
4. Continue Tier 1 SEO + Search: SCRUM-17 (tag filtering), SCRUM-18 (related articles), SCRUM-19 (JSON-LD), SCRUM-20 (sitemap/robots), SCRUM-21 (favicon/OG)
5. Add Vitest (INFRA-1) before building interactive features
6. Add TypeScript strict mode (INFRA-3), Analytics (INFRA-4), Error tracking (INFRA-5)

---

*This plan is a living document. Update as features ship and priorities shift.*
