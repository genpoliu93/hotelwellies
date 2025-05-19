/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["leaflet"],
  output: "export", // 生成静态HTML输出，适用于静态网站托管
  distDir: "out", // 更改为标准输出目录名
  trailingSlash: true, // 添加尾随斜杠，更好地支持静态托管
  images: {
    unoptimized: true, // Azure Static Web Apps不支持Next.js的图像优化
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
