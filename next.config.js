const withContentlayer = require('next-contentlayer').withContentlayer;

const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  register: false,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  workboxOptions: {
    skipWaiting: false,
  },
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
};

module.exports = withPWA(withContentlayer(nextConfig));
