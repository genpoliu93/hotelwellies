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
  Home,
  Eye,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// 新房型数据配置
const newRoomData = {
  deluxeDouble: {
    nameKey: "rooms.new.deluxeDouble",
    descriptionKey: "rooms.new.deluxeDoubleDescription",
    japaneseLabel: "デラックス　ダブルルーム",
    gradientFrom: "from-purple-500/80",
    gradientTo: "to-pink-600/80",
    iconBg: "bg-purple-500/20",
    icon: <Sparkles className="h-6 w-6 text-white" />,
    images: [
      "/images/newroompic/Deluxe Double Room/HXS_0526.jpg",
      "/images/newroompic/Deluxe Double Room/HXS_0527.jpg",
      "/images/newroompic/Deluxe Double Room/HXS_0530.jpg",
      "/images/newroompic/Deluxe Double Room/HXS_0531.jpg",
      "/images/newroompic/Deluxe Double Room/HXS_0533.jpg",
      "/images/newroompic/Deluxe Double Room/HXS_0535.jpg",
      "/images/newroompic/Deluxe Double Room/HXS_0536.jpg",
      "/images/newroompic/Deluxe Double Room/HXS_0538.jpg",
      "/images/newroompic/Deluxe Double Room/HXS_0539.jpg",
    ],
  },
  superiorDouble: {
    nameKey: "rooms.new.superiorDouble",
    descriptionKey: "rooms.new.superiorDoubleDescription",
    japaneseLabel: "スーペリア　ダブルルーム",
    gradientFrom: "from-blue-500/80",
    gradientTo: "to-indigo-600/80",
    iconBg: "bg-blue-500/20",
    icon: <Bed className="h-6 w-6 text-white" />,
    images: [
      "/images/newroompic/Superior Double Room/HXS_0561.jpg",
      "/images/newroompic/Superior Double Room/HXS_0563.jpg",
      "/images/newroompic/Superior Double Room/HXS_0565.jpg",
      "/images/newroompic/Superior Double Room/HXS_0569.jpg",
      "/images/newroompic/Superior Double Room/HXS_0590.jpg",
      "/images/newroompic/Superior Double Room/HXS_0693.jpg",
      "/images/newroompic/Superior Double Room/HXS_0694.jpg",
      "/images/newroompic/Superior Double Room/HXS_0695.jpg",
      "/images/newroompic/Superior Double Room/HXS_0699.jpg",
      "/images/newroompic/Superior Double Room/HXS_0714.jpg",
    ],
  },
  economyDouble: {
    nameKey: "rooms.new.economyDouble",
    descriptionKey: "rooms.new.economyDoubleDescription",
    japaneseLabel: "エコノミー　ダブルルーム",
    gradientFrom: "from-green-500/80",
    gradientTo: "to-teal-600/80",
    iconBg: "bg-green-500/20",
    icon: <Home className="h-6 w-6 text-white" />,
    images: [
      "/images/newroompic/Economy Double Room/HXS_0591.jpg",
      "/images/newroompic/Economy Double Room/HXS_0592.jpg",
      "/images/newroompic/Economy Double Room/HXS_0593.jpg",
      "/images/newroompic/Economy Double Room/HXS_0595.jpg",
      "/images/newroompic/Economy Double Room/HXS_0608.jpg",
    ],
  },
  economyTwin: {
    nameKey: "rooms.new.economyTwin",
    descriptionKey: "rooms.new.economyTwinDescription",
    japaneseLabel: "エコノミー　ツインルーム",
    gradientFrom: "from-cyan-500/80",
    gradientTo: "to-blue-600/80",
    iconBg: "bg-cyan-500/20",
    icon: <Bed className="h-6 w-6 text-white" />,
    images: [
      "/images/newroompic/Economy Twin Room/HXS_0507.jpg",
      "/images/newroompic/Economy Twin Room/HXS_0511.jpg",
      "/images/newroompic/Economy Twin Room/HXS_0513.jpg",
      "/images/newroompic/Economy Twin Room/HXS_0514.jpg",
      "/images/newroompic/Economy Twin Room/HXS_0614.jpg",
      "/images/newroompic/Economy Twin Room/HXS_0657.jpg",
      "/images/newroompic/Economy Twin Room/HXS_0659.jpg",
      "/images/newroompic/Economy Twin Room/HXS_0672.jpg",
      "/images/newroompic/Economy Twin Room/HXS_0674.jpg",
      "/images/newroompic/Economy Twin Room/HXS_0680.jpg",
    ],
  },
  superiorTwin: {
    nameKey: "rooms.new.superiorTwin",
    descriptionKey: "rooms.new.superiorTwinDescription",
    japaneseLabel: "スーペリア　ツインルーム",
    gradientFrom: "from-amber-500/80",
    gradientTo: "to-orange-600/80",
    iconBg: "bg-amber-500/20",
    icon: <Bed className="h-6 w-6 text-white" />,
    images: [
      "/images/newroompic/Superior  Twin Room/HXS_0493.jpg",
      "/images/newroompic/Superior  Twin Room/HXS_0494.jpg",
    ],
  },
  deluxeTriple: {
    nameKey: "rooms.new.deluxeTriple",
    descriptionKey: "rooms.new.deluxeTripleDescription",
    japaneseLabel: "デラックス　トリプルルーム",
    gradientFrom: "from-violet-500/80",
    gradientTo: "to-purple-600/80",
    iconBg: "bg-violet-500/20",
    icon: <Users className="h-6 w-6 text-white" />,
    images: [
      "/images/newroompic/Deluxe Triple Room/HXS_0420.jpg",
      "/images/newroompic/Deluxe Triple Room/HXS_0423.jpg",
      "/images/newroompic/Deluxe Triple Room/HXS_0424.jpg",
      "/images/newroompic/Deluxe Triple Room/HXS_0425.jpg",
      "/images/newroompic/Deluxe Triple Room/HXS_0428.jpg",
      "/images/newroompic/Deluxe Triple Room/HXS_0431.jpg",
      "/images/newroompic/Deluxe Triple Room/HXS_0432.jpg",
      "/images/newroompic/Deluxe Triple Room/HXS_0433.jpg",
    ],
  },
  tripleRoom1F: {
    nameKey: "rooms.new.tripleRoom1F",
    descriptionKey: "rooms.new.tripleRoom1FDescription",
    japaneseLabel: "トリプルルーム（1階）",
    gradientFrom: "from-rose-500/80",
    gradientTo: "to-pink-600/80",
    iconBg: "bg-rose-500/20",
    icon: <Users className="h-6 w-6 text-white" />,
    images: [
      "/images/newroompic/Triple Room 1F/HXS_0429.jpg",
      "/images/newroompic/Triple Room 1F/HXS_0764.jpg",
      "/images/newroompic/Triple Room 1F/HXS_0765.jpg",
      "/images/newroompic/Triple Room 1F/HXS_0777.jpg",
      "/images/newroompic/Triple Room 1F/HXS_0779.jpg",
      "/images/newroompic/Triple Room 1F/HXS_0781.jpg",
    ],
  },
  familyRoom1F: {
    nameKey: "rooms.new.familyRoom1F",
    descriptionKey: "rooms.new.familyRoom1FDescription",
    japaneseLabel: "ファミリールーム（1階）",
    gradientFrom: "from-emerald-500/80",
    gradientTo: "to-green-600/80",
    iconBg: "bg-emerald-500/20",
    icon: <Users className="h-6 w-6 text-white" />,
    images: [
      "/images/newroompic/Family Room 1F/HXS_0465.jpg",
      "/images/newroompic/Family Room 1F/HXS_0466.jpg",
      "/images/newroompic/Family Room 1F/HXS_0467.jpg",
      "/images/newroompic/Family Room 1F/HXS_0469.jpg",
      "/images/newroompic/Family Room 1F/HXS_0470.jpg",
      "/images/newroompic/Family Room 1F/HXS_0472.jpg",
    ],
  },
  familyRoom2F: {
    nameKey: "rooms.new.familyRoom2F",
    descriptionKey: "rooms.new.familyRoom2FDescription",
    japaneseLabel: "ファミリールーム（2階）",
    gradientFrom: "from-teal-500/80",
    gradientTo: "to-cyan-600/80",
    iconBg: "bg-teal-500/20",
    icon: <Users className="h-6 w-6 text-white" />,
    images: [
      "/images/newroompic/Family Room 2F/HXS_0629.jpg",
      "/images/newroompic/Family Room 2F/HXS_0631.jpg",
      "/images/newroompic/Family Room 2F/HXS_0633.jpg",
      "/images/newroompic/Family Room 2F/HXS_0634.jpg",
      "/images/newroompic/Family Room 2F/HXS_0636.jpg",
      "/images/newroompic/Family Room 2F/HXS_0637.jpg",
      "/images/newroompic/Family Room 2F/HXS_0639.jpg",
      "/images/newroompic/Family Room 2F/HXS_0640.jpg",
      "/images/newroompic/Family Room 2F/HXS_0654.jpg",
    ],
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
          delay: Math.min(delay, 0.5),
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

        {/* 悬停覆盖层 */}
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
    categories: (keyof typeof newRoomData)[];
    selectedCategory: keyof typeof newRoomData;
    onCategoryChange: (category: keyof typeof newRoomData) => void;
  }) => {
    const { t } = useLanguage();

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-center mb-12"
      >
        <div className="inline-flex flex-wrap gap-3 bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-stone-200 max-w-5xl">
          {categories.map((category) => {
            const room = newRoomData[category];
            const isSelected = selectedCategory === category;

            return (
              <Button
                key={category}
                variant={isSelected ? "default" : "ghost"}
                size="sm"
                onClick={() => onCategoryChange(category)}
                className={`
                relative rounded-xl px-4 py-2 text-xs tracking-wide
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
    useState<keyof typeof newRoomData>("deluxeDouble");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentRoom = useMemo(
    () => newRoomData[selectedCategory],
    [selectedCategory]
  );
  const categories = useMemo(
    () => Object.keys(newRoomData) as (keyof typeof newRoomData)[],
    []
  );

  // 优化的分类切换
  const handleCategoryChange = useCallback(
    async (category: keyof typeof newRoomData) => {
      if (category === selectedCategory) return;

      setIsLoading(true);
      setSelectedCategory(category);

      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    },
    [selectedCategory]
  );

  // 图片预览导航
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

  // 键盘导航
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

        {/* 图片网格 */}
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
                delay={index * 0.03}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* 图片预览模态框 */}
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

            {/* 图片容器 */}
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
