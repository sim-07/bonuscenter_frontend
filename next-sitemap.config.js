module.exports = {
    siteUrl: 'https://bonuscenter.it',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    changefreq: 'daily',
    priority: 1.0,
    i18n: {
      locales: ['it', 'en'],
      defaultLocale: 'it',
    },
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
          disallow: [
            '/profile', 
            '/dashboard', 
            '/it/profile', 
            '/it/dashboard', 
            '/en/profile', 
            '/en/dashboard'
          ],
        },
      ],
    },
  };