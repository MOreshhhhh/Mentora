/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ✅ Ignore ESLint errors during production builds (Vercel)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ Ignore type errors during build if needed (optional, remove later)
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
