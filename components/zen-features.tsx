"use client";

import { useLanguage } from "@/lib/i18n/context";
import { motion } from "framer-motion";
import { Coffee, Utensils, Gift, Bike } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export function ZenFeatures() {
  const { t, locale } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<
    "forward" | "backward"
  >("forward");
  const [isPaused, setIsPaused] = useState(false);

  // 酒店服务项目数据 - 三语标签
  const features = [
    {
      icon: <Coffee className="h-10 w-10 text-white" />,
      title: t("services.welcomeTeaTitle"),
      description: t("services.welcomeTeaDescription"),
      labels: {
        zh: "欢迎茶",
        en: "Welcome Tea",
        ja: "ウェルカムティー",
      },
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
      labels: {
        zh: "餐饮服务",
        en: "Dining Service",
        ja: "お食事",
      },
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
      labels: {
        zh: "特别惊喜",
        en: "Special Surprise",
        ja: "サプライズ",
      },
      japaneseSymbol: "祝",
      backgroundImage: "/images/food/celebrity.jpg",
      gradientFrom: "from-rose-500/80",
      gradientTo: "to-pink-600/80",
      iconBg: "bg-rose-500/20",
    },
    {
      icon: <Bike className="h-10 w-10 text-white" />,
      title: t("services.bicycleTitle"),
      description: t("services.bicycleDescription"),
      labels: {
        zh: "自行车租赁",
        en: "Bicycle Rental",
        ja: "貸自転車",
      },
      japaneseSymbol: "輪",
      backgroundImage: "/images/walking-paths.webp",
      gradientFrom: "from-blue-500/80",
      gradientTo: "to-indigo-600/80",
      iconBg: "bg-blue-500/20",
    },
  ];

  // 自动轮播功能 - 支持hover暂停
  useEffect(() => {
    if (isPaused) return; // 如果暂停，不启动定时器

    const timer = setInterval(() => {
      setAnimationDirection("forward");
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [features.length, isPaused]);

  // 手动切换到指定slide - 带方向检测
  const goToSlide = (index: number) => {
    const currentIndex = currentSlide;

    // 判断动画方向
    if (
      index > currentIndex ||
      (currentIndex === features.length - 1 && index === 0)
    ) {
      setAnimationDirection("forward");
    } else {
      setAnimationDirection("backward");
    }

    setCurrentSlide(index);
  };

  return (
    <section
      id="features"
      className="py-8 sm:py-12 lg:py-16 bg-white relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/service-bg.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "511px",
        backgroundPosition: "left center",
      }}
    >
      <div className="container relative px-6 sm:px-8 md:px-10 lg:px-12">
        {/* 标题区域 - 匹配nasu-yobou.jp样式 */}
        <div className="text-center mb-16 lg:mb-0 lg:text-left max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            {/* 主标题 */}
            <div className="space-y-2">
              <h2 className="text-4xl lg:text-5xl font-light text-stone-800 tracking-wide">
                {t("services.title")}
                <span className="block text-lg text-stone-600 font-light mt-2 tracking-[0.2em]">
                  {t("services.subtitle")}
                </span>
              </h2>
            </div>

            {/* 描述内容 */}
            <div className="max-w-md lg:max-w-none">
              <p className="text-stone-600 font-light leading-relaxed text-base">
                {t("services.description")}
              </p>
            </div>
          </motion.div>
        </div>

        {/* 主要内容区域 - 匹配nasu-yobou.jp的flex布局 */}
        <div className="lg:flex lg:flex-row-reverse lg:items-start lg:pb-24">
          {/* 轮播图片区域 - 70%宽度 */}
          <div className="lg:w-[70%] mb-12 lg:mb-0">
            <div className="relative w-full max-w-[716px] mx-auto lg:mx-0">
              {/* Swiper容器 - 精确匹配尺寸 */}
              <div
                className="relative overflow-hidden w-full"
                style={{ height: "571px" }}
              >
                {/* 图片slides - 从左到右擦除切换动画，支持hover暂停 */}
                <div
                  className="relative w-full"
                  style={{ height: "537px" }}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  {/* 基础背景图片 - 根据动画方向显示前一张或后一张 */}
                  <div className="absolute inset-0">
                    <Image
                      src={
                        animationDirection === "forward"
                          ? features[
                              (currentSlide - 1 + features.length) %
                                features.length
                            ].backgroundImage
                          : features[(currentSlide + 1) % features.length]
                              .backgroundImage
                      }
                      alt={
                        animationDirection === "forward"
                          ? features[
                              (currentSlide - 1 + features.length) %
                                features.length
                            ].title
                          : features[(currentSlide + 1) % features.length].title
                      }
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* 覆盖图片 - 支持双向擦除动画 */}
                  <motion.div
                    key={`slide-${currentSlide}-${animationDirection}`}
                    className="absolute inset-0 z-10"
                    initial={{
                      clipPath:
                        animationDirection === "forward"
                          ? "inset(0 100% 0 0)" // 前进：从右边隐藏
                          : "inset(0 0 0 100%)", // 后退：从左边隐藏
                    }}
                    animate={{
                      clipPath: "inset(0 0 0 0)", // 都是完全显示
                    }}
                    transition={{
                      duration: 2.0,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <Image
                      src={features[currentSlide].backgroundImage}
                      alt={features[currentSlide].title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>

                  {/* 内容浮动层 - 当前活跃slide显示 */}
                  <motion.div
                    className="absolute bottom-0 right-0 left-0 z-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <div className="bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 lg:p-8">
                      <div className="max-w-2xl ml-auto">
                        <div className="text-white space-y-4">
                          {/* 服务标题 */}
                          <h3 className="text-xl font-light mb-3">
                            {features[currentSlide].title}
                          </h3>

                          {/* 详细描述 */}
                          <div className="font-light text-sm leading-relaxed whitespace-pre-line">
                            {features[currentSlide].description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* 分页器 - 匹配nasu-yobou.jp样式 */}
                <div className="relative h-[34px] flex justify-center items-center">
                  <div className="flex gap-3">
                    {features.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentSlide
                            ? "bg-stone-800 scale-125"
                            : "bg-stone-400 hover:bg-stone-600"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 左侧标签区域 - 30%宽度，使用Grid Template Areas */}
          <div className="lg:w-[30%] lg:pr-12">
            <div className="sidebar-grid-container">
              {/* 导航区域 */}
              <div className="sidebar-nav-area">
                <div className="vertical-nav-container">
                  <div
                    className="vertical-nav-grid"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    {features.map((feature, index) => {
                      const isActive = index === currentSlide;
                      const isNext =
                        index === (currentSlide + 1) % features.length;

                      // 根据当前语言显示对应标签
                      const getDisplayLabel = () => {
                        switch (locale) {
                          case "zh":
                            return feature.labels.zh;
                          case "en":
                            return feature.labels.en;
                          case "ja":
                            return feature.labels.ja;
                          default:
                            return feature.labels.en;
                        }
                      };

                      const slideClasses = `
                        nav-item
                        ${isActive ? "nav-item-active" : ""}
                        ${isNext ? "nav-item-next" : ""}
                      `.trim();

                      return (
                        <motion.button
                          key={index}
                          className={slideClasses}
                          onClick={() => goToSlide(index)}
                          role="tab"
                          aria-selected={isActive}
                          aria-label={`${getDisplayLabel()} - ${index + 1} of ${
                            features.length
                          }`}
                          transition={{ duration: 0.3 }}
                        >
                          <span className="nav-item-text">
                            {getDisplayLabel()}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 控制按钮区域 */}
              <div className="sidebar-controls-area">
                <div className="ta_pcview hidden lg:block">
                  <div
                    className="swiper-nav flex gap-2 justify-center"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    <button
                      className="swiper-button-prev over-prev"
                      onClick={() =>
                        goToSlide(
                          (currentSlide - 1 + features.length) % features.length
                        )
                      }
                      tabIndex={0}
                      role="button"
                      aria-label="Previous slide"
                    >
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                      >
                        <path
                          d="M25 30L15 20L25 10"
                          stroke="#666"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button
                      className="swiper-button-next over-next"
                      onClick={() =>
                        goToSlide((currentSlide + 1) % features.length)
                      }
                      tabIndex={0}
                      role="button"
                      aria-label="Next slide"
                    >
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                      >
                        <path
                          d="M15 10L25 20L15 30"
                          stroke="#666"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* 描述文字区域 */}
              <div className="sidebar-description-area">
                <p className="text-stone-700 text-sm text-center">
                  滞在中いつでもお楽しみいただけます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
