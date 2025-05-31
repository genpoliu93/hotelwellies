/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["leaflet"],
  output: "export", // 启用静态导出以支持Azure Static Web Apps
  trailingSlash: true, // 保持尾随斜杠
  images: {
    unoptimized: true, // 禁用图片优化以确保图片正常显示
    domains: ["unpkg.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // 减少文件监视范围，排除不需要监视的目录
    config.watchOptions = {
      ignored: ["**/.git/**", "**/node_modules/**", "**/out/**", "**/.next/**"],
    };
    return config;
  },
};

export default nextConfig;
