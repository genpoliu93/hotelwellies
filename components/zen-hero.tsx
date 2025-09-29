"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/context";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { openBookingSystem } from "@/lib/booking-utils";

// 轮播图片配置
const carouselImages = [
  {
    src: "/images/banner/1631749382675_.pic.jpg",
    alt: "Hotel Wellies Banner 1",
  },
  {
    src: "/images/banner/1641749382677_.pic.jpg",
    alt: "Hotel Wellies Banner 2",
  },
  {
    src: "/images/banner/1651749382678_.pic.jpg",
    alt: "Hotel Wellies Banner 3",
  },
  {
    src: "/images/banner/1661749382679_.pic.jpg",
    alt: "Hotel Wellies Banner 4",
  },
  {
    src: "/images/banner/1671749382679_.pic.jpg",
    alt: "Hotel Wellies Banner 5",
  },
  {
    src: "/images/banner/1691749382681_.pic.jpg",
    alt: "Hotel Wellies Banner 6",
  },
];

export function ZenHero() {
  const { t, locale } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const heroTitle = t("hero.title");
  const heroSubtitle = t("hero.subtitle");
  const highlightKeys = [
    "hero.highlight1",
    "hero.highlight2",
    "hero.highlight3",
  ];
  const heroHighlights = highlightKeys
    .map((key) => ({ key, value: t(key) }))
    .filter(({ key, value }) => value && value !== key)
    .map(({ value }) => value);

  const rawSince = t("common.since");
  const sinceLabel = rawSince === "common.since" ? "Since 2013" : rawSince;

  // 获取滚动进度用于"由近到远"效果
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // 长焦镜头"由近到远"效果组合 - 优化范围，更柔和
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 0.96]); // 减小缩放范围
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.96, 0.8]); // 减小透明度变化
  const imageBlur = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.3, 2]); // 减小模糊变化
  const imageBrightness = useTransform(scrollYProgress, [0, 1], [1.02, 0.85]); // 减小亮度变化
  const imageSaturation = useTransform(scrollYProgress, [0, 1], [1.05, 0.9]); // 减小饱和度变化

  // 自动轮播 - 匹配 nasu-yobou.jp 的 7 秒间隔
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  // 上一张/下一张
  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  };

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[540px] overflow-hidden"
      id="hero"
    >
      {/* 背景图片 - 长焦镜头由近到远效果 - 限制在section内 */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          scale: imageScale,
          opacity: imageOpacity,
          filter: useTransform(
            [imageBlur, imageBrightness, imageSaturation],
            ([blur, brightness, saturation]) =>
              `blur(${blur}px) brightness(${brightness}) saturate(${saturation})`
          ),
        }}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={currentIndex}
            initial={{
              opacity: 0,
              scale: 1.06, // 减小初始缩放
              filter: "blur(1px) contrast(0.95)"
            }}
            animate={{
              opacity: 1,
              scale: 1.02, // 减小最大缩放
              filter: "blur(0px) contrast(1.03)"
            }}
            exit={{
              opacity: 0,
              scale: 0.96, // 减小退场缩放幅度
              filter: "blur(2px) contrast(0.85)"
            }}
            transition={{
              duration: 3.0, // 延长切换时间，让效果更柔和
              ease: [0.25, 0.46, 0.45, 0.94],
              opacity: {
                duration: 2.0, // 延长透明度变化
                ease: "easeInOut"
              },
              scale: {
                duration: 3.5, // 延长缩放时间，更缓慢
                ease: [0.4, 0.0, 0.2, 1]
              },
              filter: {
                duration: 2.5, // 延长模糊效果
                ease: "easeOut"
              }
            }}
            className="absolute inset-0"
          >
            <Image
              src={carouselImages[currentIndex].src}
              alt={carouselImages[currentIndex].alt}
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* 前景元素层 */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between pointer-events-none">
        <div className="flex items-start justify-between px-4 py-4 sm:px-6 md:px-10 lg:pl-72 lg:pr-12 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-1 text-[11px] font-light uppercase tracking-[0.35em] text-white/70"
          >
            <span>{sinceLabel}</span>
            <span className="text-white">Hotel Wellies</span>
            <span className="text-white/60">Karuizawa, Japan</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Button
              variant="outline"
              className="rounded-full border-white/20 bg-white/90 px-4 py-2 text-xs font-medium uppercase tracking-[0.35em] text-stone-700 shadow-sm transition hover:bg-white"
              onClick={() => openBookingSystem("hero")}
            >
              {t("common.bookNow")}
            </Button>
          </motion.div>
        </div>

        <div className="flex flex-1 items-center justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="pointer-events-auto max-w-3xl px-6 text-white sm:px-10 md:px-16 lg:px-24 lg:mr-12 xl:mr-20"
          >
            {heroSubtitle && heroSubtitle !== "hero.subtitle" && (
              <span className="text-xs uppercase tracking-[0.45em] text-white/70">
                {heroSubtitle}
              </span>
            )}
            <h1 className="mt-4 text-3xl font-light leading-tight sm:text-5xl lg:text-6xl">
              {heroTitle}
            </h1>
            {(() => {
              const descriptionRaw = t("hero.description");
              if (!descriptionRaw || descriptionRaw === "hero.description") {
                return null;
              }
              const segments = descriptionRaw.split("\n");
              return (
                <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
                  {segments.map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < segments.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              );
            })()}

            {heroHighlights.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {heroHighlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-white/80"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="bg-white text-stone-800 hover:bg-white/90"
                onClick={() => openBookingSystem("hero-primary")}
              >
                {t("common.bookNow")}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 bg-transparent text-white hover:bg-white/10"
                asChild
              >
                <Link href={`/${locale}/rooms`}>{t("common.viewAllRooms")}</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="pointer-events-auto flex flex-col items-center gap-4 px-4 pb-8 sm:flex-row sm:justify-between sm:px-10 lg:pl-72 lg:pr-12">
          <div className="flex items-center gap-2">
            {carouselImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 w-8 rounded-full transition-all ${
                  currentIndex === index ? "bg-white" : "bg-white/40"
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goToPrevious}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* 占位空间 - 确保页面有滚动高度 */}
      <div className="h-screen" />
    </section>
  );
}
