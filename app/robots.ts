import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aicalculator.pro';
  
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
