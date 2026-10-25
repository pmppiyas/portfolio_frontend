import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.pmppiyas.dev';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/projects', '/blogs', '/tools', '/assistant'],
        disallow: [
          '/admin',
          '/admin/*',
          '/login',
          '/auth',
          '/auth/*',
          '/api/*',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
