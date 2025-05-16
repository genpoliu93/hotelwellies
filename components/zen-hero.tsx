"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// 定义卡片属性类型
type InfoCardProps = {
  titleKey: string; // Will be direct Japanese text
  descKey: string; // Will be translation key
  // Removed initialDelay as animation is now parent-controlled for scroll effect
};

// 卡片子组件 (修改为竖向文字布局)
const InfoCard = ({ titleKey, descKey }: InfoCardProps) => {
  const { t } = useLanguage();

  return (
    <div // This div is what gets animated by the parent motion.div
      className="bg-black/50 backdrop-blur-md rounded-lg p-3 md:p-4 border border-white/20 shadow-lg w-28 h-64 md:w-32 md:h-72 flex flex-col items-center justify-center"
    >
      <motion.div // Inner content fade-in
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }} // Quick fade for content after card appears
        className="h-full flex flex-col justify-around items-center text-center"
      >
        <h3 className="text-white text-lg md:text-xl font-light writing-vertical">
          {titleKey}
        </h3>
        <hr className="w-1/2 border-white/30 my-2" />
        <p
          className="text-white/80 font-extralight text-xs md:text-sm leading-snug writing-vertical"
          style={{ maxHeight: "120px", overflowY: "auto" }}
        >
          {t(descKey)}
        </p>
      </motion.div>
    </div>
  );
};

export function ZenHero() {
  const { t, locale } = useLanguage();
  const { scrollY } = useScroll();

  const backgroundScale = useTransform(scrollY, [0, 800], [1, 1.15]);
  const backgroundBrightness = useTransform(scrollY, [0, 400], [0.85, 0.7]);

  // Helper for card animation properties
  const cardAnimationProps = (delay: number) => ({
    initial: { opacity: 0, x: 60 }, // Start off-screen to the right and transparent
    whileInView: { opacity: 1, x: 0 }, // Animate to fully visible and original position
    viewport: { once: true, amount: 0.4 }, // Trigger animation when 40% of the card is visible
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section
      className="relative h-screen overflow-hidden flex flex-col"
      id="hero"
    >
      {/* 背景图片 - 占据整个区域 */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          scale: backgroundScale,
          filter: useTransform(
            backgroundBrightness,
            (v) => `brightness(${v}) saturate(0.9)`
          ),
        }}
      >
        <Image
          src="/images/hotel-exterior.webp"
          alt="Hotel Wellies in Karuizawa"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent" />
      </motion.div>

      {/* 主要内容容器 - 占据剩余空间，并让内容垂直居中, 分为左右两栏 */}
      <div className="relative z-10 flex-grow flex items-stretch justify-between container px-6 md:px-10 py-10 md:py-16">
        {/* 左侧竖排标题/副标题 */}
        <motion.div
          // Removed absolute positioning and parallax style
          className="flex flex-col items-start justify-center max-w-[50vw] md:max-w-none" // Added justify-center
        >
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "6rem" }}
            transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
            className="w-px bg-white/70 mb-8 overflow-hidden"
          />
          <div
            className="writing-vertical text-white space-y-8 text-right"
            style={{ textOrientation: "mixed", whiteSpace: "normal" }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.6,
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-4xl md:text-5xl font-extralight tracking-widest leading-tight"
              style={{ maxHeight: "60vh" }}
            >
              {t("hero.title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.8,
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-base md:text-lg text-white/80 font-light max-w-[45ch]"
              style={{ maxHeight: "40vh" }}
            >
              {t("hero.subtitle")}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10"
          >
            <Button
              variant="outline"
              size="lg"
              className="gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-light rounded-full px-6"
              asChild
            >
              <Link href={`/${locale}/booking`}>
                <CalendarIcon className="h-4 w-4" />
                {t("common.bookNow")}
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* 右侧区域: 竖排信息卡片 */}
        <motion.div className="flex flex-row space-x-4 md:space-x-5 items-end justify-center relative z-20">
          <motion.div {...cardAnimationProps(0.7)}>
            <InfoCard
              titleKey="自然" // Direct Japanese text
              descKey="hero.convenientLocationDesc"
            />
          </motion.div>
          <motion.div {...cardAnimationProps(0.85)} className="mb-6 md:mb-8">
            {" "}
            {/* Middle card higher */}
            <InfoCard
              titleKey="調和" // Direct Japanese text
              descKey="hero.comfortableRoomsDesc"
            />
          </motion.div>
          <motion.div {...cardAnimationProps(1.0)}>
            <InfoCard
              titleKey="寧静" // Direct Japanese text
              descKey="hero.attentiveServiceDesc"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* 底部水平信息卡片 - 此区域已移除并整合到右侧 */}
    </section>
  );
}
