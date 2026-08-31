import { describe, it, expect } from 'vitest';
import {
  CATEGORIES,
  getAllCategories,
  getCategoryMetadata,
  getCategoryColor,
} from '../kb-categories';

describe('kb-categories', () => {
  it('exposes the four expected categories', () => {
    const cats = getAllCategories();
    expect(cats).toEqual([
      'regulatory-frameworks',
      'ai-governance-models',
      'tools-platforms',
      'industry-case-studies',
    ]);
  });

  it('returns metadata for each category', () => {
    for (const cat of getAllCategories()) {
      const meta = getCategoryMetadata(cat);
      expect(meta.title).toBeTruthy();
      expect(meta.description).toBeTruthy();
      expect(meta.colorVar).toBeTruthy();
    }
  });

  it('returns a CSS variable color for each category', () => {
    expect(getCategoryColor('regulatory-frameworks')).toBe('var(--kb-regulatory)');
    expect(getCategoryColor('tools-platforms')).toBe('var(--kb-tools)');
  });

  it('CATEGORIES keys match the KBCategory union', () => {
    const keys = Object.keys(CATEGORIES);
    expect(keys).toHaveLength(4);
    expect(keys).toEqual(getAllCategories());
  });
});
