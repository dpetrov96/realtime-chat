/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    APP_URL: process.env.APP_URL || "http://localhost:3000",
    WS_URL: process.env.WS_URL || "ws://localhost:3001",
  },
  images: {
    domains: ["lh3.googleusercontent.com", "vercel.com"],
  },
};

module.exports = nextConfig;
