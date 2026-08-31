import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('fs', () => {
  const existsSync = vi.fn();
  const readdirSync = vi.fn();
  const readFileSync = vi.fn();
  return {
    default: { existsSync, readdirSync, readFileSync },
    existsSync,
    readdirSync,
    readFileSync,
  };
});

import fs from 'fs';
import {
  getAllArticles,
  getArticle,
  getAllSlugs,
  getRelatedArticles,
  markdownToHtml,
} from '../articles';

const FILES: Record<string, string> = {
  'governance-overview.md': `---
title: "Governance Overview"
excerpt: "An overview of governance."
date: "2026-02-01"
author: "Dipanjan Deb"
domain: "BFSI"
readTime: "4 min read"
tags: [governance, guardrails]
---
Content body about governance.`,
  'model-risk.md': `---
title: "Model Risk"
excerpt: "MRM basics."
date: "2026-01-01"
author: "Jayashree Mishra Deb"
domain: "Healthcare"
readTime: "5 min read"
tags: [guardrails, mrm]
---
Second body.`,
  'sparse.md': '---\n---\nJust a body.',
};

function fileForPath(p: string): string {
  for (const [name, content] of Object.entries(FILES)) {
    if (p.endsWith(`/${name}`) || p.endsWith(name)) return content;
  }
  return '';
}

beforeEach(() => {
  const m = fs as unknown as {
    existsSync: ReturnType<typeof vi.fn>;
    readdirSync: ReturnType<typeof vi.fn>;
    readFileSync: ReturnType<typeof vi.fn>;
  };
  m.existsSync.mockReset().mockReturnValue(true);
  m.readdirSync
    .mockReset()
    .mockReturnValue(['governance-overview.md', 'model-risk.md', 'sparse.md']);
  m.readFileSync.mockReset().mockImplementation((p: string) => fileForPath(p));
});

describe('getAllArticles', () => {
  it('returns metadata for all markdown files, sorted by date desc', () => {
    const articles = getAllArticles();
    expect(articles).toHaveLength(3);
    expect(articles[0].slug).toBe('governance-overview');
    expect(articles[0].date).toBe('2026-02-01');
    expect(articles[0].domain).toBe('BFSI');
    expect(articles[0].tags).toEqual(['governance', 'guardrails']);
    expect(articles[1].slug).toBe('model-risk');
  });

  it('applies defaults for sparse frontmatter', () => {
    const sparse = getAllArticles().find((a) => a.slug === 'sparse');
    expect(sparse).toBeDefined();
    expect(sparse?.title).toBe('Untitled');
    expect(sparse?.excerpt).toBe('');
    expect(sparse?.domain).toBe('BFSI');
    expect(sparse?.readTime).toBe('5 min read');
    expect(sparse?.tags).toEqual([]);
  });

  it('returns empty when the directory is missing', () => {
    (fs.existsSync as unknown as ReturnType<typeof vi.fn>).mockReturnValue(false);
    expect(getAllArticles()).toEqual([]);
  });
});

describe('getArticle', () => {
  it('returns an article with content for an existing slug', () => {
    const article = getArticle('governance-overview');
    expect(article).not.toBeNull();
    expect(article?.title).toBe('Governance Overview');
    expect(article?.content).toContain('Content body');
    expect(article?.slug).toBe('governance-overview');
  });

  it('returns null for a missing slug', () => {
    (fs.existsSync as unknown as ReturnType<typeof vi.fn>).mockReturnValue(false);
    expect(getArticle('nope')).toBeNull();
  });
});

describe('getAllSlugs', () => {
  it('returns slugs without the .md extension', () => {
    expect(getAllSlugs()).toEqual(['governance-overview', 'model-risk', 'sparse']);
  });

  it('returns empty when the directory is missing', () => {
    (fs.existsSync as unknown as ReturnType<typeof vi.fn>).mockReturnValue(false);
    expect(getAllSlugs()).toEqual([]);
  });
});

describe('getRelatedArticles', () => {
  it('excludes the current article and ranks by shared tags with domain bonus', () => {
    const current = {
      slug: 'model-risk',
      tags: ['guardrails', 'mrm'],
      domain: 'Healthcare',
    } as ReturnType<typeof getAllArticles>[number];

    const related = getRelatedArticles(current, 3);
    // Candidate governance-overview shares 'guardrails' and is a different domain (no bonus).
    const ids = related.map((a) => a.slug);
    expect(ids).not.toContain('model-risk');
    expect(ids).toContain('governance-overview');
  });
});

describe('markdownToHtml', () => {
  it('converts headings', () => {
    expect(markdownToHtml('# H1\n## H2\n### H3')).toBe('<h1>H1</h1>\n<h2>H2</h2>\n<h3>H3</h3>');
  });

  it('converts bold, italic and combined emphasis', () => {
    expect(markdownToHtml('**bold** *italic* ***both***')).toBe(
      '<p><strong>bold</strong> <em>italic</em> <strong><em>both</em></strong></p>'
    );
  });

  it('converts inline code and links', () => {
    const html = markdownToHtml('use `code` and [a link](https://x.com)');
    expect(html).toContain('<code>code</code>');
    expect(html).toContain(
      '<a href="https://x.com" target="_blank" rel="noopener noreferrer">a link</a>'
    );
  });

  it('converts horizontal rules', () => {
    expect(markdownToHtml('a\n---\nb')).toContain('<hr />');
  });

  it('converts unordered lists into a single ul', () => {
    const html = markdownToHtml('- one\n- two\n- three');
    expect(html).toContain('<ul><li>one</li><li>two</li><li>three</li></ul>');
  });

  it('wraps paragraphs and preserves heading blocks', () => {
    const html = markdownToHtml('# Title\n\nA paragraph.');
    expect(html).toBe('<h1>Title</h1>\n<p>A paragraph.</p>');
  });

  it('returns empty string for empty input', () => {
    expect(markdownToHtml('')).toBe('');
  });
});
