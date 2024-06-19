/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://choosetale-tale.vercel.app"
      : "",
  async rewrites() {
    const devRewrites = [
      {
        source: "/tale",
        destination: "/",
      },
      {
        source: "/tale/:path*",
        destination: "/:path*",
      },
    ];
    const prodRewrites = [
      {
        source: "/gamebuilder",
        destination: "https://choosetale-gamebuilder.vercel.app",
      },
      {
        source: "/gamebuilder/:path*",
        destination: "https://choosetale-gamebuilder.vercel.app/:path*",
      },
    ];

    return process.env.NODE_ENV === "production" ? prodRewrites : devRewrites;
  },
};

module.exports = nextConfig;
