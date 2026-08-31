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

vi.mock('gray-matter', () => ({
  default: (raw: string) => {
    const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    const data: Record<string, unknown> = {};
    if (match) {
      for (const line of match[1].split('\n')) {
        const i = line.indexOf(':');
        if (i === -1) continue;
        const key = line.slice(0, i).trim();
        let val: string | string[] | number = line.slice(i + 1).trim();
        if (val.startsWith('[')) {
          val = (val.match(/'([^']+)'/g) || []).map((s) => s.replace(/^'|'$/g, '')).filter(Boolean);
        } else if (!Number.isNaN(Number(val))) {
          val = Number(val);
        } else {
          val = val.replace(/^['"]|['"]$/g, '');
        }
        data[key] = val as string & string[] & number;
      }
    }
    const content = match ? match[2] : raw;
    return { data, content };
  },
}));

import fs from 'fs';
import {
  getAllKBItems,
  getKBItem,
  getAllKBSlugs,
  getKBItemsByCategory,
  getRelatedKBItems,
} from '../knowledge-base';

const DIRS: Record<string, string[]> = {
  'regulatory-frameworks': ['sr-11-7.md'],
  'ai-governance-models': ['three-lines.md'],
  'industry-case-studies': ['bank-llm.md'],
};

const FILES: Record<string, string> = {
  'sr-11-7.md': `---
title: "SR 11-7"
excerpt: "Model risk guidance."
date: "2026-03-01"
author: "Dipanjan Deb"
category: "regulatory-frameworks"
readTime: "6 min read"
tags: ['mrm', 'governance']
template: regulation
---
SR body.`,
  'three-lines.md': `---
title: "Three Lines of Defense"
excerpt: "Governance model."
date: "2026-02-15"
author: "Jayashree Mishra Deb"
category: "ai-governance-models"
readTime: "5 min read"
tags: ['governance', 'roles']
template: framework
---
Three lines body.`,
  'bank-llm.md': `---
title: "Bank LLM"
excerpt: "Use case."
date: "2026-01-10"
author: "Dipanjan Deb"
category: "industry-case-studies"
readTime: "4 min read"
tags: ['mrm', 'genai']
template: case-study
---
Bank body.`,
};

beforeEach(() => {
  const m = fs as unknown as {
    existsSync: ReturnType<typeof vi.fn>;
    readdirSync: ReturnType<typeof vi.fn>;
    readFileSync: ReturnType<typeof vi.fn>;
  };
  m.existsSync.mockReset().mockImplementation((p: string) => {
    for (const [dir] of Object.entries(DIRS)) if (p.endsWith(`/knowledge-base/${dir}`)) return true;
    for (const name of Object.keys(FILES)) if (p.endsWith(`/${name}`)) return true;
    return p.endsWith('knowledge-base');
  });
  m.readdirSync.mockReset().mockImplementation((p: string) => {
    for (const [dir, files] of Object.entries(DIRS)) {
      if (p.endsWith(`/knowledge-base/${dir}`)) return [...files];
    }
    return [];
  });
  m.readFileSync.mockReset().mockImplementation((p: string) => {
    for (const [name, content] of Object.entries(FILES)) if (p.endsWith(`/${name}`)) return content;
    return '';
  });
});

describe('getAllKBItems', () => {
  it('aggregates items across categories, sorted by date desc', () => {
    const items = getAllKBItems();
    expect(items).toHaveLength(3);
    expect(items[0].slug).toBe('sr-11-7');
    expect(items[0].category).toBe('regulatory-frameworks');
    expect(items[0].template).toBe('regulation');
    expect(items[1].slug).toBe('three-lines');
  });

  it('returns empty when the KB directory is missing', () => {
    (fs.existsSync as unknown as ReturnType<typeof vi.fn>).mockReturnValue(false);
    expect(getAllKBItems()).toEqual([]);
  });
});

describe('getKBItem', () => {
  it('returns an item with content for an existing slug', () => {
    const item = getKBItem('sr-11-7');
    expect(item).not.toBeNull();
    expect(item?.title).toBe('SR 11-7');
    expect(item?.content).toContain('SR body');
    expect(item?.template).toBe('regulation');
  });

  it('returns null when the slug exists in no category', () => {
    expect(getKBItem('does-not-exist')).toBeNull();
  });

  it('returns null when the KB directory is missing', () => {
    (fs.existsSync as unknown as ReturnType<typeof vi.fn>).mockReturnValue(false);
    expect(getKBItem('sr-11-7')).toBeNull();
  });
});

describe('getAllKBSlugs', () => {
  it('returns all slugs across categories', () => {
    const slugs = getAllKBSlugs();
    expect(slugs.sort()).toEqual(['sr-11-7', 'three-lines', 'bank-llm'].sort());
  });

  it('returns empty when the KB directory is missing', () => {
    (fs.existsSync as unknown as ReturnType<typeof vi.fn>).mockReturnValue(false);
    expect(getAllKBSlugs()).toEqual([]);
  });
});

describe('getKBItemsByCategory', () => {
  it('filters items to the given category', () => {
    const items = getKBItemsByCategory('regulatory-frameworks');
    expect(items).toHaveLength(1);
    expect(items[0].slug).toBe('sr-11-7');
  });
});

describe('getRelatedKBItems', () => {
  it('excludes the current item and ranks by tags', () => {
    const current = {
      slug: 'sr-11-7',
      tags: ['mrm', 'governance'],
      category: 'regulatory-frameworks',
    } as ReturnType<typeof getAllKBItems>[number];

    const related = getRelatedKBItems(current, 3);
    const ids = related.map((i) => i.slug);
    expect(ids).not.toContain('sr-11-7');
    expect(ids).toContain('bank-llm'); // shares 'mrm'
    expect(ids).toContain('three-lines'); // shares 'governance'
  });
});
