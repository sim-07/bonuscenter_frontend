module.exports = {
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    localeDetection: false,
  },
  fallbackLng: 'it',
  ns: ['common'],
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};