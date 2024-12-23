/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig = {
  experimental: {
    serverActions: {
      // https://github.com/vercel/next.js/issues/58295
      allowedOrigins: ['localhost:3000', 'ideal-waddle-5xwrj5ppjvxhvq7x-3000.app.github.dev'],
    },
  },
  // logging: {
  //   fetches: {
  //     fullUrl: true,
  //   },
  // },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  // openAnalyzer: true // default!
})(nextConfig);
