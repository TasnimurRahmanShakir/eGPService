/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@egp/ui'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
