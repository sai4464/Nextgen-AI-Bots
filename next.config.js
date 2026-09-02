/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // react-three-fiber v8's render loop does not survive StrictMode's
  // double-mount in dev; leaving it on makes every 3D canvas render blank.
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
