import type { MetadataRoute } from 'next';
import { getAllArticles } from './lib/articles';
import { getAllKBItems } from './lib/knowledge-base';
import { getAllCategories } from './lib/kb-categories';
import { SITE_URL } from './lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/articles`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/knowledge-base`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  const articles: MetadataRoute.Sitemap = getAllArticles().map((a) => ({
    url: `${SITE_URL}/articles/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const categories: MetadataRoute.Sitemap = getAllCategories().map((c) => ({
    url: `${SITE_URL}/knowledge-base/category/${c}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  const kbItems: MetadataRoute.Sitemap = getAllKBItems().map((k) => ({
    url: `${SITE_URL}/knowledge-base/item/${k.slug}`,
    lastModified: new Date(k.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...articles, ...categories, ...kbItems];
}
