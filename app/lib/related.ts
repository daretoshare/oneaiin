/**
 * Rank related candidates by tag overlap with the current item.
 * Optional bonus adds to the score (e.g. same domain/category match).
 * Items with zero overlap (or zero score) are excluded.
 */
export function rankRelated<T extends { tags: string[] }>(
  currentTags: string[],
  candidates: T[],
  size = 3,
  bonus?: (candidate: T) => number
): T[] {
  const current = new Set(currentTags);

  return candidates
    .map((candidate) => {
      const overlap = candidate.tags.filter((tag) => current.has(tag)).length;
      const score = overlap + (bonus ? bonus(candidate) : 0);
      return { candidate, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, size)
    .map((entry) => entry.candidate);
}
