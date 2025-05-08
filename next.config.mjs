/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['leaflet'],
  webpack: (config) => {
    return config
  },
}

export default nextConfig
