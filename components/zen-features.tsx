"use client";

import { useLanguage } from "@/lib/i18n/context";
import { motion } from "framer-motion";
import { Coffee, Utensils, Gift, Bike } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export function ZenFeatures() {
  const { t, locale } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  // 酒店服务项目数据 - 三语标签
  const features = [
    {
      icon: <Coffee className="h-10 w-10 text-white" />,
      title: t("services.welcomeTeaTitle"),
      description: t("services.welcomeTeaDescription"),
      labels: {
        zh: "欢迎茶",
        en: "Welcome Tea",
        ja: "ウェルカムティー"
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
        ja: "お食事"
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
        ja: "サプライズ"
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
        ja: "貸自転車"
      },
      japaneseSymbol: "輪",
      backgroundImage: "/images/walking-paths.webp",
      gradientFrom: "from-blue-500/80",
      gradientTo: "to-indigo-600/80",
      iconBg: "bg-blue-500/20",
    },
  ];

  // 自动轮播功能 - 匹配nasu-yobou.jp的4秒间隔
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [features.length]);

  // 手动切换到指定slide
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section
      id="features"
      className="bg-white relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/service-bg.png')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: '511px',
        backgroundPosition: 'left center'
      }}
    >
      <div className="container relative lg:ml-80">
        {/* 标题区域 - 匹配nasu-yobou.jp样式 */}
        <div className="text-center mb-16 lg:mb-0 lg:text-left max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6 py-24"
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

            {/* 副标题 */}
            <div className="max-w-md lg:max-w-none">
              <p className="text-stone-600 font-light leading-relaxed text-base">
                お客様の滞在をより思い出深く<br className="hidden lg:block" />
                快適にするために、<br className="hidden lg:block" />
                － 丁寧に企画されたサービス －
              </p>
            </div>

            {/* 描述内容 */}
            <div className="w-fit ml-auto">
              <p className="text-stone-700 font-light leading-relaxed text-sm max-w-lg">
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
              <div className="relative overflow-hidden w-full" style={{ height: '571px' }}>
                {/* 图片slides */}
                <div className="relative w-full" style={{ height: '537px' }}>
                  {features.map((feature, index) => {
                    const isActive = index === currentSlide;
                    const translateX = isActive ? 0 : index > currentSlide ? 100 : -100;

                    return (
                      <motion.div
                        key={index}
                        className="absolute inset-0 overflow-hidden"
                        initial={false}
                        animate={{
                          x: `${translateX}%`,
                          opacity: isActive ? 1 : 0,
                        }}
                        transition={{
                          duration: 2.0, // 匹配nasu-yobou.jp的2秒切换
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                      >
                        {/* 视差效果层 - 模拟data-swiper-parallax-x="90%" */}
                        <motion.div
                          className="w-full h-full"
                          animate={{
                            x: isActive ? 0 : `${90 * (translateX > 0 ? 1 : -1)}%`,
                          }}
                          transition={{
                            duration: 2.0,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                        >
                          <Image
                            src={feature.backgroundImage}
                            alt={feature.title}
                            fill
                            className="object-cover"
                          />
                        </motion.div>

                        {/* 内容浮动层 - 只在当前活跃slide显示 */}
                        {isActive && (
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
                                    {feature.title}
                                  </h3>

                                  {/* 详细描述 */}
                                  <div className="font-light text-sm leading-relaxed whitespace-pre-line">
                                    {feature.description}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
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
                            ? 'bg-stone-800 scale-125'
                            : 'bg-stone-400 hover:bg-stone-600'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 左侧标签区域 - 30%宽度 */}
          <div className="lg:w-[30%] lg:pr-12">
            <div className="room-slider__thumb">
              {/* Thumb Swiper - 完全复制nasu-yobou.jp */}
              <div className="swiper thumb-swiper swiper-initialized swiper-vertical swiper-free-mode swiper-watch-progress swiper-backface-hidden swiper-thumbs">
                <div
                  className="swiper-wrapper"
                  style={{
                    transform: 'translate3d(0px, 0px, 0px)',
                    transitionDuration: '0ms',
                    transitionDelay: '0ms'
                  }}
                  aria-live="polite"
                >
                  {features.map((feature, index) => {
                    const isActive = index === currentSlide;
                    const isNext = index === (currentSlide + 1) % features.length;

                    // 根据当前语言显示对应标签
                    const getDisplayLabel = () => {
                      switch (locale) {
                        case 'zh':
                          return feature.labels.zh;
                        case 'en':
                          return feature.labels.en;
                        case 'ja':
                          return feature.labels.ja;
                        default:
                          return feature.labels.en;
                      }
                    };

                    const slideClasses = `
                      swiper-slide swiper-slide-visible swiper-slide-fully-visible
                      ${isActive ? 'swiper-slide-active swiper-slide-thumb-active' : ''}
                      ${isNext ? 'swiper-slide-next' : ''}
                    `.trim();

                    return (
                      <motion.div
                        key={index}
                        className={slideClasses}
                        onClick={() => goToSlide(index)}
                        style={{
                          height: '58.4286px',
                          marginBottom: '20px'
                        }}
                        role="group"
                        aria-label={`${index + 1} / ${features.length}`}
                        transition={{ duration: 0.3 }}
                      >
                        <p>
                          {getDisplayLabel()}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
                <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
              </div>

              {/* 导航按钮 - 仅PC显示 */}
              <div className="ta_pcview hidden lg:block">
                <div className="swiper-nav flex gap-2 mt-4">
                  <button
                    className="swiper-button-prev over-prev"
                    onClick={() => goToSlide((currentSlide - 1 + features.length) % features.length)}
                    tabIndex={0}
                    role="button"
                    aria-label="Previous slide"
                  >
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <path d="M25 30L15 20L25 10" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    className="swiper-button-next over-next"
                    onClick={() => goToSlide((currentSlide + 1) % features.length)}
                    tabIndex={0}
                    role="button"
                    aria-label="Next slide"
                  >
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <path d="M15 10L25 20L15 30" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* 底部描述 */}
              <p className="text-stone-700 text-sm mt-6">
                滞在中いつでもお楽しみいただけます。
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}