const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true, // keeps original quality for local assets
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};