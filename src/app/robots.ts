import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/login', '/api/'],
    },
    sitemap: 'https://rapivoire.ci/sitemap.xml',
  };
}
