'use client';

import { useSyncExternalStore } from 'react';

const TAGS_EVENT = 'oneai:tags-change';

let cachedRaw = '';
let cachedTags: string[] = [];

function readTags(): string[] {
  if (typeof window === 'undefined') return [];
  const raw = window.location.search;
  if (raw === cachedRaw) return cachedTags;
  const params = new URLSearchParams(raw);
  const t = params.get('tags');
  cachedTags = t
    ? t
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
  cachedRaw = raw;
  return cachedTags;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener('popstate', callback);
  window.addEventListener(TAGS_EVENT, callback);
  return () => {
    window.removeEventListener('popstate', callback);
    window.removeEventListener(TAGS_EVENT, callback);
  };
}

export interface TagsFilter {
  tags: string[];
  toggleTag: (tag: string) => void;
  clear: () => void;
}

/** Read/mutate the `?tags=` URL param, with the URL as the single source of truth. */
export function useTagsParam(): TagsFilter {
  const tags = useSyncExternalStore(subscribe, readTags, () => []);

  const updateUrl = (next: string[]) => {
    const url = new URL(window.location.href);
    if (next.length > 0) {
      url.searchParams.set('tags', next.join(','));
    } else {
      url.searchParams.delete('tags');
    }
    window.history.replaceState(null, '', url.toString());
    window.dispatchEvent(new Event(TAGS_EVENT));
  };

  const toggleTag = (tag: string) => {
    updateUrl(tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag]);
  };

  const clear = () => updateUrl([]);

  return { tags, toggleTag, clear };
}
