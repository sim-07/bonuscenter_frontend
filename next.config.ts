import nextI18nextConfig from './next-i18next.config.js';

const nextConfig = {
    devIndicators: false,
    trailingSlash: false,
    reactStrictMode: true,
    i18n: nextI18nextConfig.i18n,
};

export default nextConfig;