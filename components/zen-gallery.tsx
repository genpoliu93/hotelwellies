"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Camera, Eye } from "lucide-react";

export function ZenGallery() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // 图库数据
  const images = [
    {
      id: 1,
      src: "/images/hotel-exterior.webp",
      alt: t("gallery.image1Alt"),
      category: t("gallery.categoryRooms"),
      aspectRatio: "aspect-[4/3]",
      gradientFrom: "from-blue-500/70",
      gradientTo: "to-indigo-600/70",
    },
    {
      id: 2,
      src: "/images/hotel-terrace.webp",
      alt: t("gallery.image2Alt"),
      category: t("gallery.categoryExterior"),
      aspectRatio: "aspect-[3/4]",
      gradientFrom: "from-green-500/70",
      gradientTo: "to-teal-600/70",
    },
    /*  {
      id: 3,
      src: "/images/afternoon-tea.webp",
      alt: t("gallery.image3Alt"),
      category: t("gallery.categoryDining"),
      aspectRatio: "aspect-[1/1]",
      gradientFrom: "from-amber-500/70",
      gradientTo: "to-orange-600/70",
    }, */
    {
      id: 3,
      src: "/images/walking-paths.webp",
      alt: t("gallery.image4Alt"),
      category: t("gallery.categoryNature"),
      aspectRatio: "aspect-[4/3]",
      gradientFrom: "from-emerald-500/70",
      gradientTo: "to-green-600/70",
    },
    {
      id: 4,
      src: "/images/deluxe-room.webp",
      alt: t("gallery.image5Alt"),
      category: t("gallery.categoryRooms"),
      aspectRatio: "aspect-[1/1]",
      gradientFrom: "from-purple-500/70",
      gradientTo: "to-violet-600/70",
    },
    /*    {
      id: 5,
      src: "/images/british-food.webp",
      alt: t("gallery.image6Alt"),
      category: t("gallery.categoryDining"),
      aspectRatio: "aspect-[3/4]",
      gradientFrom: "from-rose-500/70",
      gradientTo: "to-pink-600/70",
    }, */
  ];

  return (
    <section
      id="gallery"
      className="py-24 bg-gradient-to-br from-slate-50 via-stone-50 to-gray-100 relative overflow-hidden"
    >
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 opacity-5">
        <div className="zen-bg-decoration absolute top-32 right-20 w-40 h-40 rounded-full bg-slate-400"></div>
        <div className="zen-bg-decoration absolute bottom-32 left-20 w-28 h-28 rounded-full bg-stone-500"></div>
        <div className="zen-bg-decoration absolute top-1/3 left-1/2 w-20 h-20 rounded-full bg-gray-400"></div>
      </div>

      <div className="container relative">
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <div className="flex justify-center items-center gap-4">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-stone-400"></div>
              <h3 className="text-sm uppercase tracking-[0.25em] text-stone-600 font-light flex items-center gap-2">
                <Camera className="h-4 w-4" />
                {t("gallery.subtitle")}
              </h3>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-stone-400"></div>
            </div>

            <h2 className="text-4xl font-light text-stone-800 tracking-wide">
              {t("gallery.title")}
            </h2>

            <p className="text-stone-600 font-light max-w-2xl mx-auto">
              {t("gallery.description")}
            </p>
          </motion.div>
        </div>

        {/* 图片网格 - 瀑布流布局 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -8 }}
              className={`zen-feature-card ${image.aspectRatio} relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-500`}
              onClick={() => setSelectedImage(image.id)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* 简洁的暗色覆盖层 */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <Eye className="h-8 w-8 mx-auto mb-2 transition-opacity duration-300 delay-100" />
                  <div className="font-light tracking-wide text-lg transition-opacity duration-300 delay-200">
                    {image.category}
                  </div>
                </div>
              </div>

              {/* 微妙的纹理覆盖层 */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>

              {/* 边框光效 */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-lg transition-all duration-500"></div>

              {/* 底部装饰线 */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-white/50 group-hover:w-16 transition-all duration-500"></div>
            </motion.div>
          ))}
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
            <div className="w-24 h-24 opacity-10">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#000"
                  strokeWidth="1"
                />
                <path
                  d="M50,10 L50,90 M10,50 L90,50"
                  stroke="#000"
                  strokeWidth="1"
                />
              </svg>
            </div>
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

      {/* 全屏弹出窗 */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-8 right-8 text-white/80 hover:text-white transition-colors duration-300 p-2 rounded-full hover:bg-white/10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-8 w-8" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-[80vh] w-full h-full"
              onClick={(e: any) => e.stopPropagation()}
            >
              <Image
                src={images.find((img) => img.id === selectedImage)?.src || ""}
                alt={images.find((img) => img.id === selectedImage)?.alt || ""}
                fill
                className="object-contain rounded-lg"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 backdrop-blur-sm font-light rounded-b-lg">
                <div className="text-lg mb-1">
                  {images.find((img) => img.id === selectedImage)?.category}
                </div>
                <div className="text-white/80">
                  {images.find((img) => img.id === selectedImage)?.alt}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
