/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "lh3.googleusercontent.com",
      "material-ui.com",
      "img.icons8.com",
    ],
  },
  swcMinify: false, // it should be false by default
};

module.exports = nextConfig;
