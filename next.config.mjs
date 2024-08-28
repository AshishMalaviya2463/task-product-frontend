/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.dummyjson.com"],
  },
  env: {
    API_URI: "http://localhost:3001",
  },
};

export default nextConfig;
