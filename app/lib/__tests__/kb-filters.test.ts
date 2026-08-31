import { describe, it, expect } from 'vitest';
import type { KnowledgeBaseMeta } from '../knowledge-base';
import {
  applyKBFilters,
  getKBItemYear,
  getKBItemJurisdiction,
  getAvailableFilterOptions,
  hasActiveKBFilters,
} from '../kb-filters';

function item(overrides: Partial<KnowledgeBaseMeta> = {}): KnowledgeBaseMeta {
  return {
    slug: 'x',
    title: 'X',
    excerpt: '',
    date: '2026-01-01',
    author: 'Author',
    category: 'regulatory-frameworks',
    readTime: '5 min read',
    tags: [],
    ...overrides,
  };
}

const items: KnowledgeBaseMeta[] = [
  item({
    slug: 'sr-11-7',
    category: 'regulatory-frameworks',
    template: 'regulation',
    regulation: {
      jurisdiction: 'United States',
      issuer: 'Fed',
      year: 2011,
      status: 'Active',
      applies_to: [],
    },
  }),
  item({
    slug: 'three-lines',
    category: 'ai-governance-models',
    template: 'framework',
    framework: { scope: 'Enterprise', maturity: 'Established', implementation_effort: 'High' },
  }),
  item({
    slug: 'langchain',
    category: 'tools-platforms',
    template: 'tool-evaluation',
    tool: { vendor: 'LangChain', pricing: '', deployment: '' },
  }),
  item({
    slug: 'bank-case',
    category: 'industry-case-studies',
    template: 'case-study',
    case_study: { industry: 'Banking', company_size: 'Large', geography: 'US', year: 2025 },
  }),
];

describe('getKBItemYear', () => {
  it('reads the regulation year', () => {
    expect(getKBItemYear(items[0])).toBe(2011);
  });

  it('reads the case-study year', () => {
    expect(getKBItemYear(items[3])).toBe(2025);
  });

  it('returns null when no year is present', () => {
    expect(getKBItemYear(items[1])).toBeNull();
  });
});

describe('getKBItemJurisdiction', () => {
  it('reads the regulation jurisdiction', () => {
    expect(getKBItemJurisdiction(items[0])).toBe('United States');
  });

  it('returns null when absent', () => {
    expect(getKBItemJurisdiction(items[1])).toBeNull();
  });
});

describe('getAvailableFilterOptions', () => {
  it('derives templates, years, and jurisdictions from the items', () => {
    const options = getAvailableFilterOptions(items);
    expect(options.templates).toEqual(['case-study', 'framework', 'regulation', 'tool-evaluation']);
    expect(options.years).toEqual([2025, 2011]);
    expect(options.jurisdictions).toEqual(['United States']);
  });
});

describe('applyKBFilters', () => {
  it('returns all items when no filters are set', () => {
    expect(applyKBFilters(items, {})).toEqual(items);
  });

  it('filters by category', () => {
    expect(applyKBFilters(items, { category: 'tools-platforms' })).toEqual([items[2]]);
  });

  it('filters by template', () => {
    expect(applyKBFilters(items, { template: 'regulation' })).toEqual([items[0]]);
  });

  it('filters by year', () => {
    expect(applyKBFilters(items, { year: '2025' })).toEqual([items[3]]);
  });

  it('filters by jurisdiction', () => {
    expect(applyKBFilters(items, { jurisdiction: 'United States' })).toEqual([items[0]]);
  });

  it('combines filters with AND logic', () => {
    expect(applyKBFilters(items, { category: 'regulatory-frameworks', year: '2011' })).toEqual([
      items[0],
    ]);
  });

  it('returns empty when filters match nothing', () => {
    expect(applyKBFilters(items, { template: 'framework', year: '2011' })).toEqual([]);
  });

  it('excludes items without a year when a year filter is active', () => {
    expect(applyKBFilters(items, { year: '2011' })).toEqual([items[0]]);
  });

  it('ignores an empty-string year filter', () => {
    expect(applyKBFilters(items, { year: '' })).toEqual(items);
  });
});

describe('hasActiveKBFilters', () => {
  it('is false with no filters', () => {
    expect(hasActiveKBFilters({})).toBe(false);
  });

  it('is true with any filter set', () => {
    expect(hasActiveKBFilters({ category: 'tools-platforms' })).toBe(true);
    expect(hasActiveKBFilters({ year: '2025' })).toBe(true);
  });
});
