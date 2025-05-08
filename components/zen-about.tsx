"use client";

import { useLanguage } from "@/lib/i18n/context";
import { motion } from "framer-motion";
import Image from "next/image";

export function ZenAbout() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 overflow-hidden bg-stone-50">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 文字内容区域 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            {/* 装饰性水平线和标题 */}
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-stone-400"></div>
              <h2 className="text-sm uppercase tracking-[0.25em] text-stone-500 font-light">
                {t("about.subtitle")}
              </h2>
            </div>

            {/* 主标题 */}
            <h2 className="text-4xl font-light text-stone-800 tracking-wide">
              {t("about.title")}
            </h2>

            {/* 内容分段 */}
            <p className="text-stone-600 font-light leading-relaxed">
              {t("about.paragraph1")}
            </p>
            <p className="text-stone-600 font-light leading-relaxed">
              {t("about.paragraph2")}
            </p>

            {/* 签名式样式 */}
            <div className="pt-6">
              <div className="text-xl font-light text-stone-700 italic">
                Hotel Wellies
              </div>
              <div className="text-sm text-stone-500">Karuizawa, Japan</div>
            </div>
          </motion.div>

          {/* 图片区域 - 使用网格形式的两张图片 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="grid grid-cols-12 gap-6">
              {/* 主图片 */}
              <div className="col-span-8 relative h-[500px]">
                <Image
                  src="/images/hotel-terrace.webp"
                  alt="Hotel Wellies terrace"
                  className="object-cover rounded-sm"
                  fill
                />
                {/* 图片装饰边框 */}
                <div className="absolute -inset-1 border border-stone-200 rounded-sm z-[-1]"></div>
              </div>

              {/* 次要图片 */}
              <div className="col-span-4 relative self-end h-[300px]">
                <Image
                  src="/images/garden-detail.webp"
                  alt="Hotel Wellies garden detail"
                  className="object-cover rounded-sm"
                  fill
                />
                {/* 图片装饰边框 */}
                <div className="absolute -inset-1 border border-stone-200 rounded-sm z-[-1]"></div>
              </div>

              {/* 装饰线条 */}
              <div className="col-span-12 mt-4 h-px w-full bg-stone-300/50"></div>
            </div>

            {/* 日式装饰元素 */}
            <div className="absolute -top-8 -right-8 w-20 h-20 rotate-12 opacity-10 z-10">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M50,0 a50,50 0 1,0 0,100 a50,50 0 1,0 0,-100"
                  fill="none"
                  stroke="#000"
                  strokeWidth="1"
                />
                <path
                  d="M30,30 L70,70 M30,70 L70,30"
                  stroke="#000"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
