import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { markdownToHtml } from './articles';
import {
  type KBCategory,
  CATEGORIES,
  getCategoryMetadata,
  getCategoryColor,
  getAllCategories,
} from './kb-categories';

export type { KBCategory };

const kbDir = path.join(process.cwd(), 'content/knowledge-base');

export interface KnowledgeBaseMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: KBCategory;
  readTime: string;
  tags: string[];
  template?: 'regulation' | 'framework' | 'tool-evaluation' | 'case-study' | 'article';
  regulation?: {
    jurisdiction: string;
    issuer: string;
    year: number;
    status: string;
    applies_to: string[];
  };
  framework?: {
    scope: string;
    maturity: string;
    implementation_effort: string;
  };
  tool?: {
    vendor: string;
    pricing: string;
    deployment: string;
    rating?: number;
  };
  case_study?: {
    industry: string;
    company_size: string;
    geography: string;
    year: number;
  };
}

export interface KnowledgeBaseItem extends KnowledgeBaseMeta {
  content: string;
}

export function getAllKBItems(): KnowledgeBaseMeta[] {
  if (!fs.existsSync(kbDir)) return [];

  const allItems: KnowledgeBaseMeta[] = [];
  const categories = Object.keys(CATEGORIES) as KBCategory[];

  for (const category of categories) {
    const categoryDir = path.join(kbDir, category);
    if (!fs.existsSync(categoryDir)) continue;

    const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith('.md'));

    for (const file of files) {
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(categoryDir, file), 'utf8');
      const { data } = matter(raw);

      allItems.push({
        slug,
        title: data.title || 'Untitled',
        excerpt: data.excerpt || '',
        date: data.date || '',
        author: data.author || '',
        category: data.category || category,
        readTime: data.readTime || '5 min read',
        tags: data.tags || [],
        template: data.template,
        regulation: data.regulation,
        framework: data.framework,
        tool: data.tool,
        case_study: data.case_study,
      });
    }
  }

  return allItems.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getKBItem(slug: string): KnowledgeBaseItem | null {
  if (!fs.existsSync(kbDir)) return null;

  const categories = Object.keys(CATEGORIES) as KBCategory[];

  for (const category of categories) {
    const filePath = path.join(kbDir, category, `${slug}.md`);
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(raw);

      return {
        slug,
        title: data.title || 'Untitled',
        excerpt: data.excerpt || '',
        date: data.date || '',
        author: data.author || '',
        category: data.category || category,
        readTime: data.readTime || '5 min read',
        tags: data.tags || [],
        template: data.template,
        regulation: data.regulation,
        framework: data.framework,
        tool: data.tool,
        case_study: data.case_study,
        content,
      };
    }
  }

  return null;
}

export function getAllKBSlugs(): string[] {
  if (!fs.existsSync(kbDir)) return [];

  const slugs: string[] = [];
  const categories = Object.keys(CATEGORIES) as KBCategory[];

  for (const category of categories) {
    const categoryDir = path.join(kbDir, category);
    if (!fs.existsSync(categoryDir)) continue;

    const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith('.md'));
    slugs.push(...files.map((f) => f.replace(/\.md$/, '')));
  }

  return slugs;
}

export function getKBItemsByCategory(category: KBCategory): KnowledgeBaseMeta[] {
  return getAllKBItems().filter((item) => item.category === category);
}

export { getCategoryMetadata, getCategoryColor, getAllCategories, markdownToHtml };
