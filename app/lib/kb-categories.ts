export type KBCategory =
  'regulatory-frameworks' | 'ai-governance-models' | 'tools-platforms' | 'industry-case-studies';

export interface KBCategoryMeta {
  title: string;
  description: string;
  colorVar: string;
}

export const CATEGORIES: Record<KBCategory, KBCategoryMeta> = {
  'regulatory-frameworks': {
    title: 'Regulatory Frameworks',
    description: 'Regulatory guidance and compliance frameworks',
    colorVar: 'kb-regulatory',
  },
  'ai-governance-models': {
    title: 'AI Governance Models',
    description: 'Enterprise AI governance frameworks and best practices',
    colorVar: 'kb-governance',
  },
  'tools-platforms': {
    title: 'Tools & Platforms',
    description: 'Evaluation of AI governance tools and platforms',
    colorVar: 'kb-tools',
  },
  'industry-case-studies': {
    title: 'Industry Case Studies',
    description: 'Real-world AI governance implementations',
    colorVar: 'kb-cases',
  },
};

export function getAllCategories(): KBCategory[] {
  return Object.keys(CATEGORIES) as KBCategory[];
}

export function getCategoryMetadata(category: KBCategory): KBCategoryMeta {
  return CATEGORIES[category];
}

export function getCategoryColor(category: KBCategory): string {
  return `var(--${CATEGORIES[category].colorVar})`;
}
