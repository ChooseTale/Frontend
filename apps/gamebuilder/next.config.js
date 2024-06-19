/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://choosetale-gamebuilder.vercel.app"
      : "",
  async rewrites() {
    const devRewrites = [
      {
        source: "/gamebuilder",
        destination: "/",
      },
      {
        source: "/gamebuilder/:path*",
        destination: "/:path*",
      },
    ];
    const prodRewrites = [
      {
        source: "/tale",
        destination: "https://choosetale-tale.vercel.app",
      },
      {
        source: "/tale/:path*",
        destination: "https://choosetale-tale.vercel.app/:path*",
      },
    ];

    return process.env.NODE_ENV === "production" ? prodRewrites : devRewrites;
  },
};

module.exports = nextConfig;
