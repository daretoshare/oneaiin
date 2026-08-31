'use client';

import { useSyncExternalStore } from 'react';
import type { KBFilters } from '@/app/lib/kb-filters';

const FILTERS_EVENT = 'oneai:kb-filters-change';

const KEYS: Array<keyof KBFilters> = ['category', 'template', 'year', 'jurisdiction'];

let cachedRaw = '';
let cachedFilters: KBFilters = {};

function readFilters(): KBFilters {
  if (typeof window === 'undefined') return {};
  const raw = window.location.search;
  if (raw === cachedRaw) return cachedFilters;
  const params = new URLSearchParams(raw);
  const next: KBFilters = {};
  for (const key of KEYS) {
    const value = params.get(key);
    if (value) next[key] = value;
  }
  cachedFilters = next;
  cachedRaw = raw;
  return cachedFilters;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener('popstate', callback);
  window.addEventListener(FILTERS_EVENT, callback);
  return () => {
    window.removeEventListener('popstate', callback);
    window.removeEventListener(FILTERS_EVENT, callback);
  };
}

export interface KBFiltersController {
  filters: KBFilters;
  setFilter: (key: keyof KBFilters, value: string) => void;
  clearFilters: () => void;
}

/** Read/mutate KB filter URL params (`category`, `template`, `year`, `jurisdiction`). */
export function useKBFilters(): KBFiltersController {
  const filters = useSyncExternalStore(subscribe, readFilters, () => ({}));

  const updateUrl = (next: KBFilters) => {
    const url = new URL(window.location.href);
    for (const key of KEYS) {
      if (next[key]) {
        url.searchParams.set(key, next[key] as string);
      } else {
        url.searchParams.delete(key);
      }
    }
    window.history.replaceState(null, '', url.toString());
    window.dispatchEvent(new Event(FILTERS_EVENT));
  };

  const setFilter = (key: keyof KBFilters, value: string) => {
    updateUrl({ ...filters, [key]: value || undefined });
  };

  const clearFilters = () => updateUrl({});

  return { filters, setFilter, clearFilters };
}
