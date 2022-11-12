/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: { dirs: ["src"] },
  images: {
    domains: ["via.placeholder.com"],
  },
};

module.exports = nextConfig;

// https://fwywd.com/tech/next-bundle-analyzer
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({});
