"use client";

import { useState, useCallback, useMemo, memo } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  X,
  Camera,
  Bed,
  Users,
  Coffee,
  Eye,
  ArrowLeft,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// 房间数据配置
const roomData = {
  deluxe: {
    nameKey: "rooms.room1Name",
    descriptionKey: "rooms.room1Description",
    japaneseLabel: "デラックス　ダブルルーム",
    gradientFrom: "from-blue-500/80",
    gradientTo: "to-indigo-600/80",
    iconBg: "bg-blue-500/20",
    icon: <Bed className="h-6 w-6 text-white" />,
    images: Array.from({ length: 10 }, (_, i) => {
      const numbers = [
        4509, 4510, 4511, 4512, 4513, 4515, 4516, 4517, 4519, 4521,
      ];
      return `/images/rooms/deluxe/DSCF${numbers[i]}.jpg`;
    }),
  },
  double: {
    nameKey: "rooms.room2Name",
    descriptionKey: "rooms.room2Description",
    japaneseLabel: "スタンダードダブルルーム",
    gradientFrom: "from-emerald-500/80",
    gradientTo: "to-green-600/80",
    iconBg: "bg-emerald-500/20",
    icon: <Users className="h-6 w-6 text-white" />,
    images: Array.from({ length: 12 }, (_, i) => {
      const numbers = [
        4600, 4603, 4605, 4606, 4611, 4613, 4619, 4621, 4622, 4626, 4627, 4629,
      ];
      return `/images/rooms/double/DSCF${numbers[i]}.jpg`;
    }),
  },
  threebed: {
    nameKey: "rooms.room3Name",
    descriptionKey: "rooms.room3Description",
    japaneseLabel: "ファミリールーム",
    gradientFrom: "from-amber-500/80",
    gradientTo: "to-orange-600/80",
    iconBg: "bg-amber-500/20",
    icon: <Coffee className="h-6 w-6 text-white" />,
    images: Array.from({ length: 27 }, (_, i) => {
      const numbers = [
        4759, 4766, 4769, 4770, 4773, 4776, 4778, 4779, 4781, 4782, 4783, 4784,
        4786, 4787, 4788, 4791, 4793, 4799, 4800, 4806, 4808, 4811, 4817, 4818,
        4819, 4838, 4840,
      ];
      return `/images/rooms/threebed/DSCF${numbers[i]}.jpg`;
    }),
  },
};

// 优化的图片组件
const OptimizedImageCard = memo(
  ({
    imageSrc,
    index,
    roomName,
    onClick,
    delay = 0,
  }: {
    imageSrc: string;
    index: number;
    roomName: string;
    onClick: () => void;
    delay?: number;
  }) => {
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    const handleImageLoad = useCallback(() => {
      setImageLoading(false);
    }, []);

    const handleImageError = useCallback(() => {
      setImageError(true);
      setImageLoading(false);
    }, []);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          delay: Math.min(delay, 0.5), // 限制最大延迟
          ease: "easeOut",
        }}
        className="group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer will-change-transform"
        onClick={onClick}
      >
        {/* 加载骨架屏 */}
        {imageLoading && (
          <div className="absolute inset-0 bg-stone-200 animate-pulse flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-stone-400 animate-spin" />
          </div>
        )}

        <Image
          src={imageError ? "/placeholder.svg" : imageSrc}
          alt={`${roomName} - Photo ${index + 1}`}
          fill
          className={`object-cover transition-all duration-500 group-hover:scale-105 ${
            imageLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          quality={75}
        />

        {/* 悬停覆盖层 - 简化动画 */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300">
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full">
              <Eye className="h-5 w-5 text-stone-800" />
            </div>
          </div>
        </div>

        {/* 图片序号 */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-light">
          {index + 1}
        </div>
      </motion.div>
    );
  }
);

OptimizedImageCard.displayName = "OptimizedImageCard";

// 分类选择器组件
const CategorySelector = memo(
  ({
    categories,
    selectedCategory,
    onCategoryChange,
  }: {
    categories: (keyof typeof roomData)[];
    selectedCategory: keyof typeof roomData;
    onCategoryChange: (category: keyof typeof roomData) => void;
  }) => {
    const { t } = useLanguage();

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-center mb-12"
      >
        <div className="inline-flex bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg border border-stone-200">
          {categories.map((category) => {
            const room = roomData[category];
            const isSelected = selectedCategory === category;

            return (
              <Button
                key={category}
                variant={isSelected ? "default" : "ghost"}
                size="lg"
                onClick={() => onCategoryChange(category)}
                className={`
                relative rounded-full px-6 py-3 mx-1 font-light text-sm tracking-wide
                transition-all duration-300 will-change-transform
                ${
                  isSelected
                    ? `bg-gradient-to-r ${room.gradientFrom} ${room.gradientTo} text-white shadow-lg`
                    : "text-stone-600 hover:text-stone-800 hover:bg-stone-50"
                }
              `}
              >
                <span className="flex items-center gap-2">
                  {room.icon}
                  {t(room.nameKey)}
                </span>
              </Button>
            );
          })}
        </div>
      </motion.div>
    );
  }
);

CategorySelector.displayName = "CategorySelector";

export function RoomGallery() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] =
    useState<keyof typeof roomData>("deluxe");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentRoom = useMemo(
    () => roomData[selectedCategory],
    [selectedCategory]
  );
  const categories = useMemo(
    () => Object.keys(roomData) as (keyof typeof roomData)[],
    []
  );

  // 优化的分类切换
  const handleCategoryChange = useCallback(
    async (category: keyof typeof roomData) => {
      if (category === selectedCategory) return;

      setIsLoading(true);
      setSelectedCategory(category);

      // 模拟加载延迟以提供更好的用户反馈
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    },
    [selectedCategory]
  );

  // 图片预览导航 - 优化
  const navigateImage = useCallback(
    (direction: "prev" | "next") => {
      if (selectedImage === null) return;

      const currentImages = currentRoom.images;
      if (direction === "prev") {
        setSelectedImage(
          selectedImage > 0 ? selectedImage - 1 : currentImages.length - 1
        );
      } else {
        setSelectedImage(
          selectedImage < currentImages.length - 1 ? selectedImage + 1 : 0
        );
      }
    },
    [selectedImage, currentRoom.images]
  );

  // 键盘导航 - 优化
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (selectedImage === null) return;

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          navigateImage("prev");
          break;
        case "ArrowRight":
          event.preventDefault();
          navigateImage("next");
          break;
        case "Escape":
          event.preventDefault();
          setSelectedImage(null);
          break;
      }
    },
    [selectedImage, navigateImage]
  );

  return (
    <section className="py-16 relative">
      {/* 简化的背景装饰 */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-32 left-20 w-24 h-24 rounded-full bg-stone-300"></div>
        <div className="absolute bottom-32 right-20 w-16 h-16 rounded-full bg-slate-400"></div>
      </div>

      <div className="container relative">
        {/* 分类选择器 */}
        <CategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* 当前房间信息 */}
        <motion.div
          key={`${selectedCategory}-info`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-6"
        >
          <div className="space-y-4">
            <h2 className="text-4xl font-light text-stone-800 tracking-wide">
              {t(currentRoom.nameKey)}
            </h2>
            <div className="inline-block bg-white/90 backdrop-blur-sm px-6 py-3 rounded-lg shadow-sm border border-stone-200">
              <span className="text-lg font-light text-stone-700">
                {currentRoom.japaneseLabel}
              </span>
            </div>
            <p className="text-stone-600 font-light max-w-2xl mx-auto text-lg leading-relaxed">
              {t(currentRoom.descriptionKey)}
            </p>
          </div>

          {/* 图片统计 */}
          <div className="flex justify-center">
            <Badge
              variant="secondary"
              className="bg-stone-100 text-stone-700 px-4 py-2 text-sm font-light"
            >
              <Camera className="h-4 w-4 mr-2" />
              {currentRoom.images.length} {t("gallery.photos")}
            </Badge>
          </div>
        </motion.div>

        {/* 加载状态 */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 text-stone-500 animate-spin" />
          </div>
        )}

        {/* 图片网格 - 优化渲染 */}
        {!isLoading && (
          <motion.div
            key={`${selectedCategory}-gallery`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {currentRoom.images.map((imageSrc, index) => (
              <OptimizedImageCard
                key={`${selectedCategory}-${index}`}
                imageSrc={imageSrc}
                index={index}
                roomName={t(currentRoom.nameKey)}
                onClick={() => setSelectedImage(index)}
                delay={index * 0.03} // 减少延迟间隔
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* 图片预览模态框 - 简化动画 */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* 关闭按钮 */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-6 right-6 text-white hover:bg-white/20 z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* 导航按钮 */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("prev");
              }}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("next");
              }}
            >
              <ArrowRight className="h-6 w-6" />
            </Button>

            {/* 图片容器 - 优化加载 */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl max-h-[80vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={currentRoom.images[selectedImage]}
                alt={`${t(currentRoom.nameKey)} - Photo ${selectedImage + 1}`}
                width={1200}
                height={800}
                className="w-full h-auto object-contain rounded-lg shadow-2xl"
                priority
                quality={90}
              />

              {/* 图片信息 */}
              <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                <div className="text-sm font-light">
                  {selectedImage + 1} / {currentRoom.images.length}
                </div>
                <div className="text-xs text-white/80 mt-1">
                  {t(currentRoom.nameKey)}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
