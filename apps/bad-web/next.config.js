/** @type {import('next').NextConfig} */
const nextConfig = {
  // BAD: No optimization settings
  // BAD: No bundle analyzer
  // BAD: No webpack optimizations
  experimental: {
    // BAD: Disable optimizations
    optimizeCss: false,
    optimizePackageImports: [],
  },
  // BAD: No transpilation optimizations for monorepo packages
  transpilePackages: ['@mycompany/bad-ui'],
};

module.exports = nextConfig; 