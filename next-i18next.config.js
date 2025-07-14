const path = require('path');

module.exports = {
    i18n: {
        locales: ['it', 'en'],
        defaultLocale: 'it',
    },
    localePath: path.resolve('./public/locales'),
    reloadOnPrerender: process.env.NODE_ENV === 'development',
}