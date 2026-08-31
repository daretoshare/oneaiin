import type { KnowledgeBaseMeta } from './knowledge-base';

export interface KBFilters {
  category?: string;
  template?: string;
  year?: string;
  jurisdiction?: string;
}

export function getKBItemYear(item: KnowledgeBaseMeta): number | null {
  return item.regulation?.year ?? item.case_study?.year ?? null;
}

export function getKBItemJurisdiction(item: KnowledgeBaseMeta): string | null {
  return item.regulation?.jurisdiction ?? null;
}

export interface KBOptions {
  templates: string[];
  years: number[];
  jurisdictions: string[];
}

export function getAvailableFilterOptions(items: KnowledgeBaseMeta[]): KBOptions {
  const templates = Array.from(
    new Set(items.map((i) => i.template ?? '').filter((t) => t !== ''))
  ).sort();

  const years = Array.from(
    new Set(items.map(getKBItemYear).filter((y): y is number => y !== null))
  ).sort((a, b) => b - a);

  const jurisdictions = Array.from(
    new Set(items.map(getKBItemJurisdiction).filter((j): j is string => Boolean(j)))
  ).sort();

  return { templates, years, jurisdictions };
}

export function applyKBFilters(
  items: KnowledgeBaseMeta[],
  filters: KBFilters
): KnowledgeBaseMeta[] {
  return items.filter((item) => {
    if (filters.category && item.category !== filters.category) return false;
    if (filters.template && item.template !== filters.template) return false;
    if (filters.year !== undefined && filters.year !== '') {
      const year = getKBItemYear(item);
      if (year === null || String(year) !== filters.year) return false;
    }
    if (filters.jurisdiction && getKBItemJurisdiction(item) !== filters.jurisdiction) return false;
    return true;
  });
}

export function hasActiveKBFilters(filters: KBFilters): boolean {
  return Boolean(filters.category || filters.template || filters.year || filters.jurisdiction);
}
