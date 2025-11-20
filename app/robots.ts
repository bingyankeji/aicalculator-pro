import { MetadataRoute } from 'next';
import { getUrl } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getUrl('/');
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/api/og$',
          '/api/og?',
        ],
        disallow: [
          '/api/',
          '/_next/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
