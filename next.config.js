/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://192.168.0.134:8889/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
