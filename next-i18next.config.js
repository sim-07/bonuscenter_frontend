module.exports = {
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    localeDetection: false,
  },
  fallbackLng: 'it',
  ns: ['common', 'dashboard', 'hero', 'home', 'login', 'profile', 'user_page', 'about'],
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};