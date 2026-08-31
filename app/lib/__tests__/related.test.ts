import { describe, it, expect } from 'vitest';
import { rankRelated } from '../related';

interface Item {
  id: string;
  tags: string[];
}

describe('rankRelated', () => {
  const candidates: Item[] = [
    { id: 'a', tags: ['x', 'y', 'z'] },
    { id: 'b', tags: ['x'] },
    { id: 'c', tags: ['q'] },
    { id: 'd', tags: ['y', 'w'] },
  ];

  it('ranks candidates by shared tag overlap, descending', () => {
    const result = rankRelated(['x', 'y'], candidates);
    // a(2) ranks first; b(1) and d(1) tie and keep their original order (stable sort).
    expect(result.map((i) => i.id)).toEqual(['a', 'b', 'd']);
  });

  it('excludes candidates with zero overlap', () => {
    const result = rankRelated(['q'], candidates);
    expect(result.map((i) => i.id)).toEqual(['c']);
  });

  it('returns empty when no candidate overlaps', () => {
    const result = rankRelated(['nope'], candidates);
    expect(result).toEqual([]);
  });

  it('limits results to size', () => {
    const result = rankRelated(['x', 'y'], candidates, 2);
    expect(result).toHaveLength(2);
  });

  it('applies a bonus to the score', () => {
    const result = rankRelated(['x'], candidates, 3, (c) => (c.id === 'c' ? 5 : 0));
    // c gets score 5 (bonus), b gets score 1, a gets score 1
    expect(result[0].id).toBe('c');
  });

  it('handles empty candidate list', () => {
    expect(rankRelated(['x'], [])).toEqual([]);
  });

  it('handles empty current tags', () => {
    expect(rankRelated([], candidates)).toEqual([]);
  });
});
