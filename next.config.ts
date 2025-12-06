import type { NextConfig } from "next";
const { i18n } = require('./next-i18next.config')

const nextConfig: NextConfig = {

    devIndicators: false,

    i18n,
};

export default nextConfig;
