/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: 'https',
        hostname: 'https://s3.ir-thr-at1.arvanstorage.ir/',
        // port: '',
        // pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
