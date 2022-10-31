/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  staticPageGenerationTimeout: 1000,
  output: 'standalone',
  // images: {
  //   domains: ['*'],
  //   formats: ['image/avif', 'image/webp'],
  // },
}

module.exports = nextConfig
