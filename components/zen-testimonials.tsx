"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Image from "next/image";

export function ZenTestimonials() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1: 左, 1: 右
  const containerRef = useRef<HTMLDivElement>(null);

  // 客户评价数据
  const testimonials = [
    {
      id: 1,
      image: "/images/lobby.jpg", // 使用场景图片而不是头像
      name: t("testimonials.person1Name"),
      location: t("testimonials.person1Location"),
      quote: t("testimonials.quote1"),
      gradientFrom: "from-blue-500/80",
      gradientTo: "to-indigo-600/80",
      rating: 5,
    },
    {
      id: 2,
      image: "/images/lounge.jpg",
      name: t("testimonials.person2Name"),
      location: t("testimonials.person2Location"),
      quote: t("testimonials.quote2"),
      gradientFrom: "from-emerald-500/80",
      gradientTo: "to-green-600/80",
      rating: 5,
    },
    {
      id: 3,
      image: "/images/entrance.jpg",
      name: t("testimonials.person3Name"),
      location: t("testimonials.person3Location"),
      quote: t("testimonials.quote3"),
      gradientFrom: "from-amber-500/80",
      gradientTo: "to-orange-600/80",
      rating: 5,
    },
  ];

  // 自动切换评价
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 10000); // 更长的间隔时间，给用户更多阅读时间

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setDirection(1);
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setActiveIndex(
      (current) => (current - 1 + testimonials.length) % testimonials.length
    );
  };

  // 滑动手势支持
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startX: number;
    let isDragging = false;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const diff = startX - currentX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextTestimonial();
        } else {
          prevTestimonial();
        }
        isDragging = false;
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove);
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // 变体动画配置
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section
      id="testimonials"
      className="py-8 sm:py-12 lg:py-16 overflow-hidden bg-stone-50 relative"
    >
      {/* 日式流线装饰 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 顶部流线 */}
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent opacity-60"></div>
        <div className="absolute top-1/3 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent opacity-40"></div>

        {/* 底部流线 */}
        <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent opacity-60"></div>

        {/* 垂直线条 */}
        <div className="absolute left-1/4 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-stone-200 to-transparent opacity-30"></div>
        <div className="absolute right-1/4 top-1/3 bottom-1/3 w-px bg-gradient-to-b from-transparent via-stone-200 to-transparent opacity-30"></div>
      </div>

      <div className="container relative z-10">
        {/* 标题区域 */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center"
          >
            {/* 简约标题装饰 */}
            <div className="flex items-center justify-center gap-6 mb-8">
              <motion.div
                className="h-px bg-gradient-to-r from-transparent to-stone-300"
                initial={{ width: 0 }}
                whileInView={{ width: 60 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <div className="w-1 h-1 bg-stone-400 rounded-full"></div>
              <motion.div
                className="h-px bg-gradient-to-l from-transparent to-stone-300"
                initial={{ width: 0 }}
                whileInView={{ width: 60 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-stone-800 tracking-wider mb-6 leading-tight">
              {t("testimonials.title")}
            </h2>

            <p className="text-stone-600 font-light max-w-xl mx-auto text-base sm:text-lg leading-relaxed tracking-wide">
              {t("testimonials.subtitle")}
            </p>

            {/* 底部装饰线 */}
            <motion.div
              className="mt-8 flex justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
            </motion.div>
          </motion.div>
        </div>

        {/* 评价展示区 */}
        <div
          ref={containerRef}
          className="max-w-6xl mx-auto relative px-6 sm:px-8 md:px-10 lg:px-0"
        >
          <div className="overflow-hidden">
            <div className="relative min-h-[400px] md:min-h-[500px]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 },
                  }}
                  className="absolute w-full"
                >
                  <div className="relative bg-white border border-stone-200 shadow-sm overflow-hidden">
                    {/* 顶部装饰线 */}
                    <div className="h-px bg-gradient-to-r from-stone-200 via-stone-300 to-stone-200"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                      {/* 图片部分 */}
                      <div className="relative h-64 md:h-80 overflow-hidden group">
                        <Image
                          src={testimonials[activeIndex].image}
                          alt={testimonials[activeIndex].name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* 简洁覆盖层 */}
                        <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/5 transition-colors duration-500"></div>

                        {/* 边框线条 */}
                        <div className="absolute inset-0 border-r border-stone-200"></div>
                      </div>

                      {/* 文字部分 */}
                      <div className="p-6 sm:p-8 md:p-12 space-y-6 md:space-y-8 relative">
                        {/* 顶部装饰线 */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-px bg-stone-300"></div>
                          <div className="w-1 h-1 bg-stone-400 rounded-full"></div>
                        </div>

                        {/* 星级评分 */}
                        <div className="flex items-center gap-1 mb-6">
                          {[...Array(testimonials[activeIndex].rating)].map(
                            (_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-stone-400 text-stone-400"
                              />
                            )
                          )}
                        </div>

                        {/* 评价内容 */}
                        <div className="space-y-6">
                          <p className="text-lg font-light text-stone-700 leading-relaxed tracking-wide">
                            "{testimonials[activeIndex].quote}"
                          </p>
                        </div>

                        {/* 客户信息 */}
                        <div className="pt-8 border-t border-stone-100">
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-px bg-stone-300"></div>
                            <div>
                              <div className="text-sm font-medium text-stone-800 tracking-wide">
                                {testimonials[activeIndex].name}
                              </div>
                              <div className="text-xs text-stone-500 tracking-wider uppercase mt-1">
                                {testimonials[activeIndex].location}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* 简洁导航区域 */}
          <div className="mt-12 sm:mt-16">
            {/* 导航布局 */}
            <div className="flex items-center justify-between gap-4">
              {/* 左箭头 */}
              <button
                onClick={prevTestimonial}
                className="flex-shrink-0 p-2.5 sm:p-2 border border-stone-200 hover:border-stone-300 active:border-stone-400 transition-colors duration-300 bg-white touch-manipulation rounded-sm"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4 text-stone-600" />
              </button>

              {/* 中间指示器区域 */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 flex-1">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > activeIndex ? 1 : -1);
                      setActiveIndex(idx);
                    }}
                    className="group p-2"
                    aria-label={`Go to testimonial ${idx + 1}`}
                  >
                    {/* 统一的圆点设计 */}
                    <div
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeIndex === idx
                          ? "bg-stone-600 scale-110"
                          : "bg-stone-300 group-hover:bg-stone-400 group-active:scale-95"
                      }`}
                    ></div>
                  </button>
                ))}
              </div>

              {/* 右箭头 */}
              <button
                onClick={nextTestimonial}
                className="flex-shrink-0 p-2.5 sm:p-2 border border-stone-200 hover:border-stone-300 active:border-stone-400 transition-colors duration-300 bg-white touch-manipulation rounded-sm"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4 text-stone-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
