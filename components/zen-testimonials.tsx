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
      className="py-1 overflow-hidden bg-gradient-to-br from-stone-50 via-slate-50 to-stone-100 relative"
    >
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 opacity-5">
        <div className="zen-bg-decoration absolute top-24 left-20 w-32 h-32 rounded-full bg-stone-400"></div>
        <div className="zen-bg-decoration absolute bottom-24 right-20 w-40 h-40 rounded-full bg-slate-500"></div>
        <div className="zen-bg-decoration absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-stone-300"></div>
      </div>

      {/* 日式水墨装饰 - 左侧 */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-10 h-64 w-64">
        <Image
          src="/images/ink-splash.svg"
          alt="Ink splash decoration"
          width={256}
          height={256}
          className="w-full h-full"
        />
      </div>

      {/* 日式水墨装饰 - 右侧 */}
      <div className="absolute right-0 bottom-0 opacity-10 h-96 w-96 rotate-180">
        <Image
          src="/images/ink-branch.svg"
          alt="Ink branch decoration"
          width={384}
          height={384}
          className="w-full h-full"
        />
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
            <div className="flex justify-center items-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-stone-400"></div>
              <div className="text-sm uppercase tracking-[0.25em] text-stone-600 font-light flex items-center gap-2">
                <Quote className="h-4 w-4" />
                {t("testimonials.subtitle")}
              </div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-stone-400"></div>
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
                  <div className="zen-feature-card group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
                      {/* 图片部分 */}
                      <div className="relative h-64 md:h-96 overflow-hidden">
                        <Image
                          src={testimonials[activeIndex].image}
                          alt={testimonials[activeIndex].name}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />

                        {/* 渐变覆盖层 */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${testimonials[activeIndex].gradientFrom} ${testimonials[activeIndex].gradientTo} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                        ></div>

                        {/* 微妙的纹理覆盖层 */}
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>

                        {/* 边框 */}
                        <div className="absolute inset-0 border border-stone-200/50"></div>
                      </div>

                      {/* 文字部分 */}
                      <div className="space-y-6 p-6 md:p-8 bg-white relative">
                        {/* 装饰性引号 */}
                        <div className="absolute -top-2 -left-2 text-6xl text-stone-100 font-light opacity-50">
                          "
                        </div>

                        {/* 星级评分 */}
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(testimonials[activeIndex].rating)].map(
                            (_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-amber-400 text-amber-400"
                              />
                            )
                          )}
                        </div>

                        {/* 日式引号装饰 */}
                        <div className="mb-4">
                          <Quote className="h-8 w-8 text-stone-300" />
                        </div>

                        <p className="text-lg md:text-xl font-light text-stone-700 leading-relaxed italic">
                          {testimonials[activeIndex].quote}
                        </p>

                        <div className="pt-6 flex items-center">
                          <div className="h-px w-8 bg-gradient-to-r from-stone-300 to-transparent mr-4"></div>
                          <div>
                            <div className="text-base font-medium text-stone-800">
                              {testimonials[activeIndex].name}
                            </div>
                            <div className="text-xs text-stone-500 tracking-wider uppercase">
                              {testimonials[activeIndex].location}
                            </div>
                          </div>
                        </div>

                        {/* 底部装饰线 */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-px bg-gradient-to-r from-stone-300 to-stone-400 group-hover:w-20 transition-all duration-500"></div>
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
              className="p-3 border border-stone-200 hover:bg-gradient-to-r hover:from-stone-50 hover:to-stone-100 transition-all duration-300 rounded-lg shadow-sm hover:shadow-md"
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
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeIndex === idx
                      ? "bg-gradient-to-r from-stone-500 to-stone-600 scale-125"
                      : "bg-stone-300 hover:bg-stone-400"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                ></button>
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 border border-stone-200 hover:bg-gradient-to-r hover:from-stone-50 hover:to-stone-100 transition-all duration-300 rounded-lg shadow-sm hover:shadow-md"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-stone-600" />
            </button>
          </div>

          {/* 装饰线条和墨迹元素 */}
          <div className="mt-16 flex justify-center items-center space-x-8">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-stone-400 to-transparent"></div>

            {/* 使用SVG墨迹装饰 */}
            <div className="relative flex items-center space-x-4">
              <Image
                src="/images/ink-branch.svg"
                alt="Ink branch decoration"
                width={30}
                height={30}
                className="opacity-30 transform rotate-12"
              />
              <Image
                src="/images/ink-splash.svg"
                alt="Ink splash decoration"
                width={40}
                height={40}
                className="opacity-20"
              />
              <Image
                src="/images/ink-branch.svg"
                alt="Ink branch decoration"
                width={30}
                height={30}
                className="opacity-30 transform -rotate-12 scale-x-[-1]"
              />
            </div>

            <div className="h-px w-24 bg-gradient-to-r from-transparent via-stone-400 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
