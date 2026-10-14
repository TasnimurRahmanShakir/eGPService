/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  transpilePackages: ['@egp/ui'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
