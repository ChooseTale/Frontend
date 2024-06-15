/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  async rewrites() {
    return [
      {
        source: "/story",
        destination: "https://choosetale-storybuilder.vercel.app",
      },
      {
        source: "/story/:path*",
        destination: "https://choosetale-storybuilder.vercel.app/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
