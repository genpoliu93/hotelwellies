"use client";

import { useLanguage } from "@/lib/i18n/context";
import { motion } from "framer-motion";
import { Coffee, Utensils, Gift } from "lucide-react";
import Image from "next/image";

export function ZenFeatures() {
  const { t } = useLanguage();

  // 酒店服务项目数据
  const features = [
    {
      icon: <Coffee className="h-10 w-10 text-white" />,
      title: t("services.welcomeTeaTitle"),
      description: t("services.welcomeTeaDescription"),
      japaneseSymbol: "茶",
      backgroundImage: "/images/food/welcometea.jpg",
      gradientFrom: "from-amber-500/80",
      gradientTo: "to-orange-600/80",
      iconBg: "bg-amber-500/20",
    },
    {
      icon: <Utensils className="h-10 w-10 text-white" />,
      title: t("services.diningTitle"),
      description: t("services.diningDescription"),
      japaneseSymbol: "食",
      backgroundImage: "/images/food/227477231.jpg",
      gradientFrom: "from-emerald-500/80",
      gradientTo: "to-teal-600/80",
      iconBg: "bg-emerald-500/20",
    },
    {
      icon: <Gift className="h-10 w-10 text-white" />,
      title: t("services.specialSurpriseTitle"),
      description: t("services.specialSurpriseDescription"),
      japaneseSymbol: "祝",
      backgroundImage: "/images/food/celebrity.jpg",
      gradientFrom: "from-rose-500/80",
      gradientTo: "to-pink-600/80",
      iconBg: "bg-rose-500/20",
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
                {t("services.subtitle")}
              </h3>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-stone-400"></div>
            </div>

            <h2 className="text-4xl font-light text-stone-800 tracking-wide">
              {t("services.title")}
            </h2>

            <p className="text-stone-600 font-light max-w-2xl mx-auto">
              {t("services.description")}
            </p>
          </motion.div>
        </div>

        {/* 服务项目 - 完整展示设计 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="zen-feature-card group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
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

              {/* 暗色覆盖层 */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-500"></div>

              {/* 微妙的纹理覆盖层 */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>

              {/* 内容区域 - 自适应高度 */}
              <div className="relative p-6 md:p-8 text-center text-white min-h-[500px] flex flex-col">
                {/* 顶部图标区域 */}
                <div className="flex flex-col items-center mb-6">
                  <div
                    className={`${feature.iconBg} backdrop-blur-sm p-4 rounded-full mb-4 border border-white/20 transition-transform duration-300 group-hover:scale-110`}
                  >
                    {feature.icon}
                  </div>

                  {/* 日语符号 */}
                  <div className="absolute top-4 right-4 text-4xl text-white/20 font-light transition-all duration-500 group-hover:text-white/30">
                    {feature.japaneseSymbol}
                  </div>

                  {/* 标题 */}
                  <h3 className="text-lg font-light mb-4 leading-tight">
                    {feature.title}
                  </h3>
                </div>

                {/* 描述内容 - 完整显示 */}
                <div className="flex-1 flex items-start">
                  <div className="text-white/95 font-light leading-relaxed text-sm whitespace-pre-line">
                    {feature.description}
                  </div>
                </div>

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
