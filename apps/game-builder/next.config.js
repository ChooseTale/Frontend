/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: true,
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://choosetale-game.vercel.app"
      : "",
  async rewrites() {
    const rewrites = [
      {
        source: "/game",
        destination: "/",
      },
      {
        source: "/game/:path*",
        destination: "/:path*",
      },
    ];
    return rewrites;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
      },
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_IMAGE_DOMAIN,
      },
      {
        protocol: "https",
        hostname: "image.dongascience.com",
      },
    ],
  },
};

module.exports = nextConfig;
