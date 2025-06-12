/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  // This ensures compatibility with Netlify
  trailingSlash: true,
}

module.exports = nextConfig
