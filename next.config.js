/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: "https://eed-six.vercel.app",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig
