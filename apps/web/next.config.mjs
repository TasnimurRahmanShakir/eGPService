/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use standalone mode on Docker/Linux (process.platform !== 'win32') or when explicitly requested
  output: process.env.NEXT_OUTPUT_STANDALONE === 'true' || process.platform !== 'win32' ? 'standalone' : undefined,
  reactStrictMode: true,
  transpilePackages: ['@egp/ui'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
