/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://192.168.0.213:8089/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
