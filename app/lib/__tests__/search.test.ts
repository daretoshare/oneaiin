import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../articles', () => ({
  getAllArticles: vi.fn(),
}));

vi.mock('../knowledge-base', () => ({
  getAllKBItems: vi.fn(),
}));

import { getAllArticles } from '../articles';
import { getAllKBItems } from '../knowledge-base';
import { getSearchIndex } from '../search';

beforeEach(() => {
  (getAllArticles as unknown as ReturnType<typeof vi.fn>).mockReset();
  (getAllKBItems as unknown as ReturnType<typeof vi.fn>).mockReset();
});

describe('getSearchIndex', () => {
  it('builds article entries', () => {
    (getAllArticles as unknown as ReturnType<typeof vi.fn>).mockReturnValue([
      {
        slug: 'article-a',
        title: 'Article A',
        excerpt: 'Excerpt',
        tags: ['governance'],
        domain: 'BFSI',
      },
    ]);
    (getAllKBItems as unknown as ReturnType<typeof vi.fn>).mockReturnValue([]);

    const index = getSearchIndex();
    expect(index).toHaveLength(1);
    expect(index[0]).toMatchObject({
      type: 'article',
      title: 'Article A',
      url: '/articles/article-a',
      domain: 'BFSI',
    });
  });

  it('builds KB entries', () => {
    (getAllArticles as unknown as ReturnType<typeof vi.fn>).mockReturnValue([]);
    (getAllKBItems as unknown as ReturnType<typeof vi.fn>).mockReturnValue([
      {
        slug: 'item-b',
        title: 'Item B',
        excerpt: 'Excerpt',
        tags: ['mrm'],
        category: 'regulatory-frameworks',
      },
    ]);

    const index = getSearchIndex();
    expect(index).toHaveLength(1);
    expect(index[0]).toMatchObject({
      type: 'kb',
      title: 'Item B',
      url: '/knowledge-base/item/item-b',
      category: 'regulatory-frameworks',
    });
  });

  it('combines articles and KB items', () => {
    (getAllArticles as unknown as ReturnType<typeof vi.fn>).mockReturnValue([
      { slug: 'a', title: 'A', excerpt: '', tags: [], domain: 'BFSI' },
    ]);
    (getAllKBItems as unknown as ReturnType<typeof vi.fn>).mockReturnValue([
      { slug: 'b', title: 'B', excerpt: '', tags: [], category: 'tools-platforms' },
    ]);

    expect(getSearchIndex()).toHaveLength(2);
  });
});
