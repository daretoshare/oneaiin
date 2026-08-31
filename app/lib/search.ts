import { getAllArticles } from './articles';
import { getAllKBItems } from './knowledge-base';

export type SearchResultType = 'article' | 'kb';

export interface SearchResult {
  title: string;
  excerpt: string;
  url: string;
  type: SearchResultType;
  tags: string[];
  domain?: string;
  category?: string;
}

/** Build a lightweight client-side search index at build time (server-only, uses fs). */
export function getSearchIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  const articles = getAllArticles();
  for (const a of articles) {
    results.push({
      title: a.title,
      excerpt: a.excerpt,
      url: `/articles/${a.slug}`,
      type: 'article',
      tags: a.tags,
      domain: a.domain,
    });
  }

  const kbItems = getAllKBItems();
  for (const item of kbItems) {
    results.push({
      title: item.title,
      excerpt: item.excerpt,
      url: `/knowledge-base/item/${item.slug}`,
      type: 'kb',
      tags: item.tags,
      category: item.category,
    });
  }

  return results;
}
