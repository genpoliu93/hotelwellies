"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

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
    },
    {
      id: 2,
      src: "/images/hotel-terrace.webp",
      alt: t("gallery.image2Alt"),
      category: t("gallery.categoryExterior"),
      aspectRatio: "aspect-[3/4]",
    },
    {
      id: 3,
      src: "/images/afternoon-tea.webp",
      alt: t("gallery.image3Alt"),
      category: t("gallery.categoryDining"),
      aspectRatio: "aspect-[1/1]",
    },
    {
      id: 4,
      src: "/images/walking-paths.webp",
      alt: t("gallery.image4Alt"),
      category: t("gallery.categoryNature"),
      aspectRatio: "aspect-[4/3]",
    },
    {
      id: 5,
      src: "/images/deluxe-room.webp",
      alt: t("gallery.image5Alt"),
      category: t("gallery.categoryRooms"),
      aspectRatio: "aspect-[1/1]",
    },
    {
      id: 6,
      src: "/images/british-food.webp",
      alt: t("gallery.image6Alt"),
      category: t("gallery.categoryDining"),
      aspectRatio: "aspect-[3/4]",
    },
  ];

  return (
    <section id="gallery" className="py-24 bg-stone-50">
      <div className="container">
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
              <div className="h-px w-8 bg-stone-400"></div>
              <h3 className="text-sm uppercase tracking-[0.25em] text-stone-500 font-light">
                {t("gallery.subtitle")}
              </h3>
              <div className="h-px w-8 bg-stone-400"></div>
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
              whileHover={{ y: -5 }}
              className={`${image.aspectRatio} relative group cursor-pointer overflow-hidden`}
              onClick={() => setSelectedImage(image.id)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />

              {/* 悬停叠加层 */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-light tracking-wide">
                  {image.category}
                </div>
              </div>

              {/* 细线框 */}
              <div className="absolute inset-0 border border-stone-200/0 group-hover:border-stone-200/30 transition-all duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* 日式装饰元素 */}
        <div className="flex justify-center mt-12">
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
              className="absolute top-8 right-8 text-white/80 hover:text-white"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-8 w-8" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-[80vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images.find((img) => img.id === selectedImage)?.src || ""}
                alt={images.find((img) => img.id === selectedImage)?.alt || ""}
                fill
                className="object-contain"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 backdrop-blur-sm font-light">
                {images.find((img) => img.id === selectedImage)?.alt}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
