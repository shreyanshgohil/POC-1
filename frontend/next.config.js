/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: () => {
    return [
      {
        source: '/api/demo',
        destination: 'http://localhost:5000/api/demo',
      },
    ];
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
