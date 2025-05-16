/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["leaflet"],
  output: "export", // 生成静态HTML输出，适用于静态网站托管
  distDir: ".next", // 保持输出目录名为.next
  images: {
    unoptimized: true, // Azure Static Web Apps不支持Next.js的图像优化
  },
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
