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

// 定义卡片属性类型
type InfoCardProps = {
  titleKey: string; // 翻译键
  descKey: string; // 翻译键
};

// 卡片子组件 (修改为竖向文字布局)
const InfoCard = ({ titleKey, descKey }: InfoCardProps) => {
  const { t } = useLanguage();

  return (
    <div
      className="bg-black/50 backdrop-blur-md rounded-lg p-2 md:p-4 border border-white/20 shadow-lg w-20 h-48 md:w-32 md:h-72 flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="h-full flex flex-col justify-around items-center text-center"
      >
        <h3 className="text-white text-sm md:text-xl font-light writing-vertical">
          {t(titleKey)}
        </h3>
        <hr className="w-1/2 border-white/30 my-1 md:my-2" />
        <p
          className="text-white/80 font-extralight text-xs md:text-sm leading-snug writing-vertical"
          style={{ maxHeight: "80px", overflowY: "auto" }}
        >
          {t(descKey)}
        </p>
      </motion.div>
    </div>
  );
};

export function ZenHero() {
  const { t, locale } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 获取滚动进度用于"由近到远"效果
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
    layoutEffect: false
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
      className="relative h-screen"
      id="hero"
    >
      {/* 固定背景图片 - 长焦镜头由近到远效果 */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{
          height: '100vh',
          width: '100vw',
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

      {/* 前景元素层 - 固定在banner上 */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        {/* 右上角预约按钮 - 仿 nasu-yobou */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute top-6 right-6 pointer-events-auto"
        >
          <Button
            variant="outline"
            className="bg-white/90 hover:bg-white text-stone-700 border-0 rounded-full px-4 py-2 text-sm font-medium tracking-wide shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md"
            asChild
          >
            <Link href={`/${locale}/booking`}>
              <div className="flex flex-col items-center text-center">
                <span className="text-xs">{t("common.bookNow")}</span>
                <span className="text-xs opacity-60">Reserve</span>
              </div>
            </Link>
          </Button>
        </motion.div>

        {/* 左上角标题 - 仿 nasu-yobou 极小字体 */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute top-4 left-4 text-white text-xs font-medium tracking-wider leading-tight"
          style={{
            fontSize: '10px',
            letterSpacing: '1.3px',
            fontFamily: '"Shippori Mincho", serif',
            lineHeight: '16px'
          }}
        >
          <div className="space-y-1">
            <div>{t("hero.title").split(' ')[0]}</div>
            <div>{t("hero.title").split(' ').slice(1).join(' ')}</div>
            <div className="text-white/80 mt-2">Hotel Wellies【公式】</div>
          </div>
        </motion.h1>
      </div>

      {/* 占位空间 - 确保页面有滚动高度 */}
      <div className="h-screen"></div>
    </section>
  );
}