"use client";

import { useLanguage } from "@/lib/i18n/context";
import { motion } from "framer-motion";
import { Coffee, Leaf, Wind } from "lucide-react";
import Image from "next/image";

export function ZenFeatures() {
  const { t } = useLanguage();

  // 特色项目数据
  const features = [
    {
      icon: <Wind className="h-10 w-10 text-white" />,
      title: t("features.feature1Title"),
      description: t("features.feature1Description"),
      japaneseSymbol: "風",
      backgroundImage: "/images/garden-detail.webp",
      gradientFrom: "from-blue-500/80",
      gradientTo: "to-cyan-600/80",
      iconBg: "bg-blue-500/20",
    },
    {
      icon: <Leaf className="h-10 w-10 text-white" />,
      title: t("features.feature2Title"),
      description: t("features.feature2Description"),
      japaneseSymbol: "木",
      backgroundImage: "/images/walking-paths.webp",
      gradientFrom: "from-green-500/80",
      gradientTo: "to-emerald-600/80",
      iconBg: "bg-green-500/20",
    },
    {
      icon: <Coffee className="h-10 w-10 text-white" />,
      title: t("features.feature3Title"),
      description: t("features.feature3Description"),
      japaneseSymbol: "茶",
      backgroundImage: "/images/afternoon-tea.webp",
      gradientFrom: "from-amber-500/80",
      gradientTo: "to-orange-600/80",
      iconBg: "bg-amber-500/20",
    },
  ];

  return (
    <section
      id="features"
      className="py-24 bg-gradient-to-br from-stone-50 via-stone-100 to-stone-200 relative overflow-hidden"
    >
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 opacity-5">
        <div className="zen-bg-decoration absolute top-20 left-10 w-32 h-32 rounded-full bg-stone-400"></div>
        <div className="zen-bg-decoration absolute bottom-20 right-10 w-24 h-24 rounded-full bg-stone-500"></div>
        <div className="zen-bg-decoration absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-stone-300"></div>
      </div>

      <div className="container relative">
        {/* 标题区域 */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <div className="flex justify-center items-center gap-4">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-stone-400"></div>
              <h3 className="text-sm uppercase tracking-[0.25em] text-stone-600 font-light">
                {t("features.subtitle")}
              </h3>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-stone-400"></div>
            </div>

            <h2 className="text-4xl font-light text-stone-800 tracking-wide">
              {t("features.title")}
            </h2>

            <p className="text-stone-600 font-light max-w-2xl mx-auto">
              {t("features.description")}
            </p>
          </motion.div>
        </div>

        {/* 特色项目 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="zen-feature-card group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* 背景图片 */}
              <div className="absolute inset-0">
                <Image
                  src={feature.backgroundImage}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* 渐变覆盖层 */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradientFrom} ${feature.gradientTo} transition-opacity duration-500 group-hover:opacity-90`}
              ></div>

              {/* 微妙的纹理覆盖层 */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>

              {/* 内容区域 */}
              <div className="relative p-6 md:p-8 h-72 md:h-80 flex flex-col items-center justify-center text-center text-white">
                {/* 特色图标 */}
                <div
                  className={`${feature.iconBg} backdrop-blur-sm p-4 rounded-full mb-6 border border-white/20 transition-transform duration-300 group-hover:scale-110`}
                >
                  {feature.icon}
                </div>

                {/* 日语符号 - 半透明水印样式 */}
                <div className="absolute -right-1 md:-right-2 -top-1 md:-top-2 text-5xl md:text-6xl text-white/10 font-light transition-all duration-500 group-hover:text-white/20 group-hover:scale-110">
                  {feature.japaneseSymbol}
                </div>

                {/* 文字内容 */}
                <h3 className="text-xl font-light mb-4 transition-transform duration-300 group-hover:scale-105">
                  {feature.title}
                </h3>

                <p className="text-white/90 font-light leading-relaxed transition-opacity duration-300 group-hover:text-white">
                  {feature.description}
                </p>

                {/* 底部装饰线 */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-px bg-white/30 transition-all duration-500 group-hover:w-20 group-hover:bg-white/50"></div>
              </div>

              {/* 悬浮时的边框光效 */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-lg transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>

        {/* 装饰线条和墨迹元素 */}
        <div className="mt-16 flex justify-center items-center space-x-8">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-stone-400 to-transparent"></div>

          {/* 使用SVG墨迹装饰 */}
          <div className="relative flex items-center space-x-4">
            <Image
              src="/images/ink-branch.svg"
              alt="Ink branch decoration"
              width={30}
              height={30}
              className="opacity-30 transform rotate-12"
            />
            <Image
              src="/images/ink-splash.svg"
              alt="Ink splash decoration"
              width={40}
              height={40}
              className="opacity-20"
            />
            <Image
              src="/images/ink-branch.svg"
              alt="Ink branch decoration"
              width={30}
              height={30}
              className="opacity-30 transform -rotate-12 scale-x-[-1]"
            />
          </div>

          <div className="h-px w-24 bg-gradient-to-r from-transparent via-stone-400 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
