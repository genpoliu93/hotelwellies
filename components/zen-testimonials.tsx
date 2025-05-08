"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
      image: "/images/lobby.webp", // 使用场景图片而不是头像
      name: t("testimonials.person1Name"),
      location: t("testimonials.person1Location"),
      quote: t("testimonials.quote1"),
    },
    {
      id: 2,
      image: "/images/lounge.webp",
      name: t("testimonials.person2Name"),
      location: t("testimonials.person2Location"),
      quote: t("testimonials.quote2"),
    },
    {
      id: 3,
      image: "/images/entrance.webp",
      name: t("testimonials.person3Name"),
      location: t("testimonials.person3Location"),
      quote: t("testimonials.quote3"),
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
      className="py-24 overflow-hidden bg-stone-50 relative"
    >
      {/* 日式水墨装饰 - 左侧 */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-10 h-64 w-64">
        <div className="absolute inset-0 bg-[url('/images/ink-splash.svg')] bg-no-repeat bg-contain"></div>
      </div>

      {/* 日式水墨装饰 - 右侧 */}
      <div className="absolute right-0 bottom-0 opacity-10 h-96 w-96 rotate-180">
        <div className="absolute inset-0 bg-[url('/images/ink-branch.svg')] bg-no-repeat bg-contain"></div>
      </div>

      <div className="container relative z-10">
        {/* 标题区域 */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8 text-center"
          >
            {/* 日式标题装饰 */}
            <div className="flex justify-center">
              <div className="h-[1px] w-16 bg-stone-400 self-center"></div>
              <div className="mx-4 text-sm uppercase tracking-[0.25em] text-stone-500 font-light">
                {t("testimonials.subtitle")}
              </div>
              <div className="h-[1px] w-16 bg-stone-400 self-center"></div>
            </div>

            <h2 className="text-3xl md:text-4xl font-extralight text-stone-800 tracking-wide">
              {t("testimonials.title")}
            </h2>
          </motion.div>
        </div>

        {/* 评价展示区 */}
        <div ref={containerRef} className="max-w-6xl mx-auto relative">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* 图片部分 */}
                    <div className="relative h-64 md:h-96 overflow-hidden rounded-sm">
                      <div className="absolute inset-0 border border-stone-200"></div>
                      <Image
                        src={testimonials[activeIndex].image}
                        alt={testimonials[activeIndex].name}
                        fill
                        className="object-cover transition-transform duration-1000 hover:scale-105"
                      />
                    </div>

                    {/* 文字部分 */}
                    <div className="space-y-6 p-4">
                      {/* 日式引号装饰 */}
                      <div className="mb-4">
                        <svg
                          width="40"
                          height="30"
                          viewBox="0 0 40 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="opacity-30"
                        >
                          <path
                            d="M0 30L15 0H23.75L13.75 30H0ZM21.25 30L36.25 0H45L35 30H21.25Z"
                            fill="#78716c"
                          />
                        </svg>
                      </div>

                      <p className="text-lg md:text-xl font-light text-stone-700 leading-relaxed">
                        {testimonials[activeIndex].quote}
                      </p>

                      <div className="pt-6 flex items-center">
                        <div className="h-[1px] w-8 bg-stone-300 mr-4"></div>
                        <div>
                          <div className="text-base font-medium text-stone-800">
                            {testimonials[activeIndex].name}
                          </div>
                          <div className="text-xs text-stone-500 tracking-wider uppercase">
                            {testimonials[activeIndex].location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* 导航按钮 */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevTestimonial}
              className="p-2 border border-stone-200 hover:bg-stone-100 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-stone-600" />
            </button>

            {/* 指示器 */}
            <div className="flex items-center space-x-3">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > activeIndex ? 1 : -1);
                    setActiveIndex(idx);
                  }}
                  className={`w-2 h-2 transition-all duration-300 ${
                    activeIndex === idx
                      ? "bg-stone-500"
                      : "bg-stone-300 hover:bg-stone-400"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                ></button>
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-2 border border-stone-200 hover:bg-stone-100 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-stone-600" />
            </button>
          </div>

          {/* 日式装饰线条 */}
          <div className="flex justify-center mt-12">
            <div className="h-[1px] w-16 bg-stone-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
