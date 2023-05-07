/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://8.134.141.213:8889/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
