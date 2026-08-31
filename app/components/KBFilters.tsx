'use client';

import type { KBFilters as KBFiltersState, KBOptions } from '@/app/lib/kb-filters';
import type { KBCategory } from '@/app/lib/kb-categories';
import { useKBFilters } from './useKBFilters';

interface KBFiltersProps {
  categories: KBCategory[];
  options: KBOptions;
}

const LABELS: Record<keyof KBFiltersState, string> = {
  category: 'Category',
  template: 'Type',
  year: 'Year',
  jurisdiction: 'Jurisdiction',
};

export default function KBFilters({ categories, options }: KBFiltersProps) {
  const { filters, setFilter, clearFilters } = useKBFilters();

  const hasActive = Boolean(
    filters.category || filters.template || filters.year || filters.jurisdiction
  );

  const renderOption = (key: keyof KBFiltersState, candidates: string[]) => {
    const value = filters[key] ?? '';
    return (
      <label className="flex flex-col gap-1.5">
        <span
          className="text-[11px] font-mono uppercase tracking-wider"
          style={{ color: 'var(--text-muted)' }}
        >
          {LABELS[key]}
        </span>
        <select
          value={value}
          onChange={(e) => setFilter(key, e.target.value)}
          className="text-sm px-3 py-2 border rounded-md bg-transparent cursor-pointer"
          style={{
            color: 'var(--text-primary)',
            borderColor: 'var(--border)',
          }}
        >
          <option value="">All</option>
          {candidates.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
    );
  };

  return (
    <div
      className="flex flex-wrap items-end gap-4 p-4 rounded-lg border"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-raised)' }}
    >
      {renderOption('category', categories)}
      {renderOption('template', options.templates)}
      {renderOption(
        'year',
        options.years.map((y) => String(y))
      )}
      {renderOption('jurisdiction', options.jurisdictions)}
      {hasActive && (
        <button
          type="button"
          onClick={clearFilters}
          className="text-xs font-mono uppercase tracking-wider transition-colors"
          style={{ color: 'var(--accent)' }}
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
