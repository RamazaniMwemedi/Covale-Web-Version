/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.pexels.com"],
  },
  swcMinify: false, // it should be false by default
};

module.exports = nextConfig;
