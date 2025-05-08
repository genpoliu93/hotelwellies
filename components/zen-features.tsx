"use client";

import { useLanguage } from "@/lib/i18n/context";
import { motion } from "framer-motion";
import { Coffee, Leaf, Wind } from "lucide-react";

export function ZenFeatures() {
  const { t } = useLanguage();

  // 特色项目数据
  const features = [
    {
      icon: <Wind className="h-10 w-10 text-stone-700" />,
      title: t("features.feature1Title"),
      description: t("features.feature1Description"),
      japaneseSymbol: "風",
    },
    {
      icon: <Leaf className="h-10 w-10 text-stone-700" />,
      title: t("features.feature2Title"),
      description: t("features.feature2Description"),
      japaneseSymbol: "木",
    },
    {
      icon: <Coffee className="h-10 w-10 text-stone-700" />,
      title: t("features.feature3Title"),
      description: t("features.feature3Description"),
      japaneseSymbol: "茶",
    },
  ];

  return (
    <section id="features" className="py-24 bg-stone-100">
      <div className="container">
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
              <div className="h-px w-8 bg-stone-400"></div>
              <h3 className="text-sm uppercase tracking-[0.25em] text-stone-500 font-light">
                {t("features.subtitle")}
              </h3>
              <div className="h-px w-8 bg-stone-400"></div>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative rounded-sm bg-white shadow-sm border-t border-stone-200 p-8 flex flex-col items-center text-center"
            >
              {/* 特色图标 */}
              <div className="bg-stone-50 p-4 rounded-sm mb-6">
                {feature.icon}
              </div>

              {/* 日语符号 - 半透明水印样式 */}
              <div className="absolute -right-3 -top-3 text-7xl text-stone-100">
                {feature.japaneseSymbol}
              </div>

              {/* 文字内容 */}
              <h3 className="text-xl font-light text-stone-800 mb-4">
                {feature.title}
              </h3>

              <p className="text-stone-600 font-light">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* 装饰线条 */}
        <div className="h-px w-full max-w-xs mx-auto bg-stone-300/50 mt-16"></div>
      </div>
    </section>
  );
}
