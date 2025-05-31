const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@mycompany/ui'],
  experimental: {
    // Enable experimental features for better tree shaking
    optimizePackageImports: ['@mycompany/ui'],
  },
  // Enable source maps for better debugging
  productionBrowserSourceMaps: true,
  // Optimize chunks
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Bundle react and react-dom together
          react: {
            name: 'react',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            priority: 20,
          },
          // Bundle our UI package separately
          ui: {
            name: 'ui',
            chunks: 'all',
            test: /[\\/]packages[\\/]ui[\\/]/,
            priority: 10,
          },
          // Common chunks
          common: {
            name: 'common',
            chunks: 'all',
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      }
    }
    return config
  },
}

module.exports = withBundleAnalyzer(nextConfig)