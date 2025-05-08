"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function ZenHero() {
  const { t, locale } = useLanguage();
  const [scrollY, setScrollY] = useState(0);

  // 处理滚动效果
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative overflow-hidden" id="hero">
      {/* 主要视觉区域 */}
      <div className="relative h-screen w-full flex items-center">
        {/* 背景图片 - 使用模糊和降低对比度的处理方式 */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hotel-exterior.webp"
            alt="Hotel Wellies in Karuizawa"
            fill
            priority
            className="object-cover brightness-[0.9] filter saturate-[0.85]"
            style={{
              transform: `translateY(${scrollY * 0.15}px)`,
            }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* 日式纸张纹理半透明叠加 - 已删除，因为缺少图片 */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay z-10"
          style={{
            backgroundColor: "rgba(245, 245, 240, 0.05)",
            backgroundImage:
              "linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* 垂直书法装饰 */}
        <div className="absolute top-1/4 right-12 z-20 hidden lg:block">
          <div className="writing-vertical text-white text-7xl font-light opacity-80 tracking-[0.2em]">
            <div className="whitespace-nowrap">軽井沢の隠れ家</div>
          </div>
        </div>

        {/* 中央内容区域 */}
        <div className="container relative z-20">
          <div className="max-w-xl space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="h-px w-24 bg-white/70"
            />

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-5xl font-light tracking-wide text-white"
            >
              {t("hero.title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-lg text-white/90 font-light max-w-md"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="pt-4"
            >
              <Button
                size="lg"
                className="gap-2 bg-stone-800/80 hover:bg-stone-800 backdrop-blur-sm border border-white/20"
                asChild
              >
                <Link href={`/${locale}/booking`}>
                  <CalendarIcon className="h-4 w-4" />
                  {t("common.bookNow")}
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 底部信息卡片 */}
      <div className="container mx-auto -mt-32 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white bg-opacity-95 backdrop-blur-sm rounded-sm p-6 shadow-sm border-t border-stone-200"
          >
            <div className="text-stone-800 text-2xl font-extralight mb-4">
              自然
            </div>
            <p className="text-stone-600 font-light">
              {t("hero.convenientLocationDesc")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white bg-opacity-95 backdrop-blur-sm rounded-sm p-6 shadow-sm border-t border-stone-200"
          >
            <div className="text-stone-800 text-2xl font-extralight mb-4">
              調和
            </div>
            <p className="text-stone-600 font-light">
              {t("hero.comfortableRoomsDesc")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white bg-opacity-95 backdrop-blur-sm rounded-sm p-6 shadow-sm border-t border-stone-200"
          >
            <div className="text-stone-800 text-2xl font-extralight mb-4">
              寧静
            </div>
            <p className="text-stone-600 font-light">
              {t("hero.attentiveServiceDesc")}
            </p>
          </motion.div>
        </div>
      </div>

      {/* 装饰线条 */}
      <div className="container mx-auto mt-12 mb-24">
        <div className="h-px w-full bg-stone-300/50" />
      </div>
    </section>
  );
}
