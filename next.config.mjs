/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["leaflet"],
  // 移除 output: "export" - 改为服务器端渲染以支持middleware和动态功能
  // distDir: "out", // 使用默认的.next目录
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
