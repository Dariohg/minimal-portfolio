import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://dariohg.site/sitemap.xml',
    host: 'https://dariohg.site',
  }
}
