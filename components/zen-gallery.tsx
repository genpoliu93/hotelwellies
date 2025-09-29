"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  X,
  Camera,
  Eye,
  Grid3x3,
  Grid2x2,
  LayoutGrid,
  Filter,
  ChevronDown,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// 图片分类类型
type ImageCategory =
  | "all"
  | "exterior"
  | "rooms"
  | "dining"
  | "nature"
  | "facilities";

// 网格大小类型
type GridSize = "compact" | "standard" | "large";

// 图片数据接口
interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: ImageCategory;
  aspectRatio: string;
  gradientFrom: string;
  gradientTo: string;
}

export function ZenGallery() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<ImageCategory>("all");
  const [gridSize, setGridSize] = useState<GridSize>("standard");
  const [visibleCount, setVisibleCount] = useState(12);
  const [showFilters, setShowFilters] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  // 所有图片数据 - 基于实际的gallery文件
  const allImages: GalleryImage[] = [
    {
      id: 1,
      src: "/images/gallary/1701749382682_.pic.jpg",
      alt: "酒店外观景观",
      category: "exterior",
      aspectRatio: "aspect-[4/3]",
      gradientFrom: "from-blue-500/70",
      gradientTo: "to-indigo-600/70",
    },
    {
      id: 2,
      src: "/images/gallary/1711749382683_.pic.jpg",
      alt: "酒店大堂",
      category: "facilities",
      aspectRatio: "aspect-[3/4]",
      gradientFrom: "from-green-500/70",
      gradientTo: "to-teal-600/70",
    },
    {
      id: 3,
      src: "/images/gallary/1721749382684_.pic.jpg",
      alt: "豪华客房",
      category: "rooms",
      aspectRatio: "aspect-[1/1]",
      gradientFrom: "from-purple-500/70",
      gradientTo: "to-violet-600/70",
    },
    {
      id: 4,
      src: "/images/gallary/1731749382685_.pic.jpg",
      alt: "餐厅美食",
      category: "dining",
      aspectRatio: "aspect-[4/3]",
      gradientFrom: "from-amber-500/70",
      gradientTo: "to-orange-600/70",
    },
    {
      id: 5,
      src: "/images/gallary/1741749382686_.pic.jpg",
      alt: "自然风光",
      category: "nature",
      aspectRatio: "aspect-[3/4]",
      gradientFrom: "from-emerald-500/70",
      gradientTo: "to-green-600/70",
    },
    {
      id: 6,
      src: "/images/gallary/1751749382687_.pic.jpg",
      alt: "酒店建筑",
      category: "exterior",
      aspectRatio: "aspect-[1/1]",
      gradientFrom: "from-rose-500/70",
      gradientTo: "to-pink-600/70",
    },
    {
      id: 7,
      src: "/images/gallary/1761749382688_.pic.jpg",
      alt: "客房内景",
      category: "rooms",
      aspectRatio: "aspect-[4/3]",
      gradientFrom: "from-cyan-500/70",
      gradientTo: "to-blue-600/70",
    },
    {
      id: 8,
      src: "/images/gallary/1771749382689_.pic.jpg",
      alt: "休闲设施",
      category: "facilities",
      aspectRatio: "aspect-[3/4]",
      gradientFrom: "from-indigo-500/70",
      gradientTo: "to-purple-600/70",
    },
    {
      id: 9,
      src: "/images/gallary/1781749382690_.pic.jpg",
      alt: "餐饮服务",
      category: "dining",
      aspectRatio: "aspect-[1/1]",
      gradientFrom: "from-yellow-500/70",
      gradientTo: "to-amber-600/70",
    },
    {
      id: 10,
      src: "/images/gallary/1791749382694_.pic.jpg",
      alt: "周边景色",
      category: "nature",
      aspectRatio: "aspect-[4/3]",
      gradientFrom: "from-teal-500/70",
      gradientTo: "to-cyan-600/70",
    },
    {
      id: 11,
      src: "/images/gallary/1801749382695_.pic.jpg",
      alt: "酒店环境",
      category: "exterior",
      aspectRatio: "aspect-[3/4]",
      gradientFrom: "from-lime-500/70",
      gradientTo: "to-green-600/70",
    },
    {
      id: 12,
      src: "/images/gallary/1811749382696_.pic.jpg",
      alt: "舒适客房",
      category: "rooms",
      aspectRatio: "aspect-[1/1]",
      gradientFrom: "from-orange-500/70",
      gradientTo: "to-red-600/70",
    },
    {
      id: 13,
      src: "/images/gallary/1821749382697_.pic.jpg",
      alt: "公共设施",
      category: "facilities",
      aspectRatio: "aspect-[4/3]",
      gradientFrom: "from-pink-500/70",
      gradientTo: "to-rose-600/70",
    },
    {
      id: 14,
      src: "/images/gallary/1831749382697_.pic.jpg",
      alt: "特色餐饮",
      category: "dining",
      aspectRatio: "aspect-[3/4]",
      gradientFrom: "from-violet-500/70",
      gradientTo: "to-purple-600/70",
    },
    {
      id: 15,
      src: "/images/gallary/1841749382698_.pic.jpg",
      alt: "景观环境",
      category: "nature",
      aspectRatio: "aspect-[1/1]",
      gradientFrom: "from-sky-500/70",
      gradientTo: "to-blue-600/70",
    },
    {
      id: 16,
      src: "/images/gallary/1851749382699_.pic.jpg",
      alt: "酒店外景",
      category: "exterior",
      aspectRatio: "aspect-[4/3]",
      gradientFrom: "from-emerald-500/70",
      gradientTo: "to-teal-600/70",
    },
    {
      id: 17,
      src: "/images/gallary/1861749382701_.pic.jpg",
      alt: "精品客房",
      category: "rooms",
      aspectRatio: "aspect-[3/4]",
      gradientFrom: "from-red-500/70",
      gradientTo: "to-pink-600/70",
    },
    {
      id: 18,
      src: "/images/gallary/1871749382702_.pic.jpg",
      alt: "服务设施",
      category: "facilities",
      aspectRatio: "aspect-[1/1]",
      gradientFrom: "from-blue-500/70",
      gradientTo: "to-indigo-600/70",
    },
    {
      id: 19,
      src: "/images/gallary/1881749382703_.pic.jpg",
      alt: "美食体验",
      category: "dining",
      aspectRatio: "aspect-[4/3]",
      gradientFrom: "from-amber-500/70",
      gradientTo: "to-yellow-600/70",
    },
    {
      id: 20,
      src: "/images/gallary/1891749382704_.pic.jpg",
      alt: "自然美景",
      category: "nature",
      aspectRatio: "aspect-[3/4]",
      gradientFrom: "from-green-500/70",
      gradientTo: "to-emerald-600/70",
    },
    {
      id: 21,
      src: "/images/gallary/1901749382705_.pic.jpg",
      alt: "建筑特色",
      category: "exterior",
      aspectRatio: "aspect-[1/1]",
      gradientFrom: "from-purple-500/70",
      gradientTo: "to-violet-600/70",
    },
    {
      id: 22,
      src: "/images/gallary/1911749382706_.pic.jpg",
      alt: "豪华套房",
      category: "rooms",
      aspectRatio: "aspect-[4/3]",
      gradientFrom: "from-cyan-500/70",
      gradientTo: "to-blue-600/70",
    },
    {
      id: 23,
      src: "/images/gallary/1921749382707_.pic.jpg",
      alt: "休闲空间",
      category: "facilities",
      aspectRatio: "aspect-[3/4]",
      gradientFrom: "from-indigo-500/70",
      gradientTo: "to-purple-600/70",
    },
    {
      id: 24,
      src: "/images/gallary/1931749382709_.pic.jpg",
      alt: "餐厅环境",
      category: "dining",
      aspectRatio: "aspect-[1/1]",
      gradientFrom: "from-orange-500/70",
      gradientTo: "to-red-600/70",
    },
    {
      id: 25,
      src: "/images/gallary/1941749382710_.pic.jpg",
      alt: "园林景观",
      category: "nature",
      aspectRatio: "aspect-[4/3]",
      gradientFrom: "from-teal-500/70",
      gradientTo: "to-cyan-600/70",
    },
    {
      id: 26,
      src: "/images/gallary/1951749382711_.pic.jpg",
      alt: "酒店外观",
      category: "exterior",
      aspectRatio: "aspect-[3/4]",
      gradientFrom: "from-lime-500/70",
      gradientTo: "to-green-600/70",
    },
    {
      id: 27,
      src: "/images/gallary/1961749382712_.pic.jpg",
      alt: "客房装饰",
      category: "rooms",
      aspectRatio: "aspect-[1/1]",
      gradientFrom: "from-pink-500/70",
      gradientTo: "to-rose-600/70",
    },
    {
      id: 28,
      src: "/images/gallary/1971749382713_.pic.jpg",
      alt: "公共区域",
      category: "facilities",
      aspectRatio: "aspect-[4/3]",
      gradientFrom: "from-violet-500/70",
      gradientTo: "to-purple-600/70",
    },
    {
      id: 29,
      src: "/images/gallary/1981749382714_.pic.jpg",
      alt: "特色美食",
      category: "dining",
      aspectRatio: "aspect-[3/4]",
      gradientFrom: "from-sky-500/70",
      gradientTo: "to-blue-600/70",
    },
    // 注意：跳过了超大的HD文件以优化性能
  ];

  // 分类选项
  const categories = [
    { id: "all", label: t("gallery.categoryAll"), icon: LayoutGrid },
    { id: "exterior", label: t("gallery.categoryExterior"), icon: Camera },
    { id: "rooms", label: t("gallery.categoryRooms"), icon: Grid3x3 },
    { id: "dining", label: t("gallery.categoryDining"), icon: Search },
    { id: "nature", label: t("gallery.categoryNature"), icon: Eye },
    { id: "facilities", label: t("gallery.categoryFacilities"), icon: Grid2x2 },
  ];

  // 网格大小配置 - 智能瀑布流配置
  const gridConfigs = {
    compact: {
      columns: 5,
      gap: "0.75rem",
      size: t("gallery.compact"),
      itemWidth: "240px",
    },
    standard: {
      columns: 4,
      gap: "1rem",
      size: t("gallery.standard"),
      itemWidth: "300px",
    },
    large: {
      columns: 3,
      gap: "1.5rem",
      size: t("gallery.large"),
      itemWidth: "400px",
    },
  };

  // 筛选图片
  const filteredImages = useMemo(() => {
    return selectedCategory === "all"
      ? allImages
      : allImages.filter((img) => img.category === selectedCategory);
  }, [selectedCategory]);

  // 当前显示的图片
  const visibleImages = filteredImages.slice(0, visibleCount);
  const hasMoreImages = visibleCount < filteredImages.length;

  // 智能瀑布流布局算法
  const arrangeImagesInColumns = (images: GalleryImage[]) => {
    const config = gridConfigs[gridSize];
    const numColumns = Math.min(config.columns, images.length);

    // 创建列数组，每列存储分配给它的图片
    const columns: GalleryImage[][] = Array.from(
      { length: numColumns },
      () => []
    );
    const columnHeights: number[] = new Array(numColumns).fill(0);

    images.forEach((image) => {
      // 找到高度最小的列
      const shortestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights)
      );

      // 将图片分配给最短的列
      columns[shortestColumnIndex].push(image);

      // 估算图片高度（基于宽高比）
      let estimatedHeight = 300; // 基础高度
      if (image.aspectRatio === "aspect-[3/4]") estimatedHeight = 400;
      else if (image.aspectRatio === "aspect-[4/3]") estimatedHeight = 225;
      else if (image.aspectRatio === "aspect-[1/1]") estimatedHeight = 300;

      // 更新列高度
      columnHeights[shortestColumnIndex] += estimatedHeight + 16; // 加上间隙
    });

    return columns;
  };

  // 响应式列数调整
  const getResponsiveColumns = () => {
    if (typeof window === "undefined") return gridConfigs[gridSize].columns;

    const width = window.innerWidth;
    const baseColumns = gridConfigs[gridSize].columns;

    if (width < 640) return Math.min(baseColumns, 2);
    if (width < 768) return Math.min(baseColumns, 3);
    if (width < 1024) return Math.min(baseColumns, baseColumns);
    return baseColumns;
  };

  // 组织图片到列中
  const imageColumns = useMemo(() => {
    return arrangeImagesInColumns(visibleImages);
  }, [visibleImages, gridSize]);

  // 加载更多图片
  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 12, filteredImages.length));
  };

  // 分类切换
  const handleCategoryChange = (category: ImageCategory) => {
    setSelectedCategory(category);
    setVisibleCount(12); // 重置显示数量
    setShowFilters(false);
  };

  // 响应式重新布局
  useEffect(() => {
    const handleResize = () => {
      // 触发重新渲染以调整列数
      if (gridRef.current) {
        gridRef.current.style.display = "none";
        gridRef.current.offsetHeight; // 强制重排
        gridRef.current.style.display = "";
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="gallery"
      className="py-8 sm:py-12 lg:py-16 bg-stone-50 relative overflow-hidden"
    >
      {/* 日式线条装饰背景 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 主要流动线条 */}
        <div className="absolute top-0 left-0 w-full h-full">
          {/* 水平流线 */}
          <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent opacity-60"></div>
          <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent opacity-40"></div>

          {/* 垂直流线 */}
          <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-stone-200 to-transparent opacity-50"></div>
          <div className="absolute right-1/3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-stone-200 to-transparent opacity-30"></div>

          {/* 对角线条 */}
          <div className="absolute top-0 left-0 w-64 h-px bg-gradient-to-r from-stone-200 to-transparent opacity-30 transform rotate-45 origin-left"></div>
          <div className="absolute bottom-0 right-0 w-48 h-px bg-gradient-to-l from-stone-200 to-transparent opacity-30 transform -rotate-45 origin-right"></div>
        </div>

        {/* 禅意圆形装饰 */}
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full border border-stone-200 opacity-20"></div>
        <div className="absolute top-24 right-24 w-24 h-24 rounded-full border border-stone-300 opacity-15"></div>
        <div className="absolute bottom-20 left-16 w-40 h-40 rounded-full border border-stone-200 opacity-10"></div>
      </div>

      <div className="container relative px-6 sm:px-8 md:px-10 lg:px-12">
        {/* 日式标题区域 */}
        <div className="text-center mb-12 sm:mb-14 lg:mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-8"
          >
            {/* 顶部装饰线条 */}
            <div className="flex items-center justify-center gap-8 mb-6">
              <motion.div
                className="h-px bg-gradient-to-r from-transparent to-stone-300"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <div className="w-2 h-2 bg-stone-400 rounded-full opacity-60"></div>
              <motion.div
                className="h-px bg-gradient-to-l from-transparent to-stone-300"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>

            <div className="relative">
              <h3 className="text-sm uppercase tracking-[0.4em] text-stone-600 font-light mb-6 flex items-center justify-center gap-3">
                <Camera className="h-4 w-4" />
                {t("gallery.subtitle")}
              </h3>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-stone-800 tracking-wider mb-8 leading-tight">
                {t("gallery.title")}
              </h2>

              <p className="text-stone-600 font-light max-w-2xl mx-auto leading-loose text-base sm:text-lg">
                {t("gallery.description")}
              </p>
            </div>

            {/* 底部装饰线条 */}
            <motion.div
              className="mt-8 flex justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
            </motion.div>
          </motion.div>
        </div>

        {/* 日式控制栏 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10 lg:mb-12 bg-white/70 backdrop-blur-sm rounded-sm border border-stone-200 relative overflow-hidden"
        >
          {/* 控制栏装饰线条 */}
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent opacity-60"></div>
          <div className="absolute bottom-0 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent opacity-40"></div>

          {/* 控制栏内容 */}
          <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
            {/* 第一行：分类筛选 */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <span className="text-sm text-stone-700 font-light tracking-wide flex-shrink-0">
                {t("gallery.filter")}:
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {categories.map((cat) => (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() =>
                      handleCategoryChange(cat.id as ImageCategory)
                    }
                    className={`text-xs h-8 px-3 font-light tracking-wide transition-all duration-300 rounded-sm ${
                      selectedCategory === cat.id
                        ? "bg-stone-800 text-white hover:bg-stone-700"
                        : "text-stone-600 hover:text-stone-800 hover:bg-stone-100"
                    }`}
                  >
                    <cat.icon className="h-3 w-3 mr-1.5" />
                    {cat.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* 第二行：网格布局和统计信息 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-stone-200/50">
              <div className="flex items-center gap-4">
                <span className="text-sm text-stone-700 font-light tracking-wide flex-shrink-0">
                  {t("gallery.layout")}:
                </span>
                <div className="flex items-center gap-1">
                  {Object.entries(gridConfigs).map(([key, config]) => (
                    <Button
                      key={key}
                      variant={gridSize === key ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setGridSize(key as GridSize)}
                      className={`text-xs h-8 px-3 font-light transition-all duration-300 rounded-sm ${
                        gridSize === key
                          ? "bg-stone-700 text-white hover:bg-stone-600"
                          : "text-stone-600 hover:text-stone-800 hover:bg-stone-50"
                      }`}
                    >
                      {config.size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* 统计信息 */}
              <div className="text-sm text-stone-500 font-light tracking-wide">
                {t("gallery.showing")} {visibleImages.length} /{" "}
                {filteredImages.length} {t("gallery.images")}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 智能瀑布流布局 */}
        <div
          ref={gridRef}
          className="flex justify-center w-full px-2 sm:px-4 lg:px-0"
          style={{ gap: gridConfigs[gridSize].gap }}
        >
          {imageColumns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className="flex flex-col min-w-0"
              style={{
                gap: gridConfigs[gridSize].gap,
                width: `calc((100% - ${gridConfigs[gridSize].gap} * ${
                  imageColumns.length - 1
                }) / ${imageColumns.length})`,
              }}
            >
              {column.map((image, index) => {
                const globalIndex = visibleImages.findIndex(
                  (img) => img.id === image.id
                );
                return (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.7,
                      delay: (globalIndex % 12) * 0.05,
                    }}
                    viewport={{ once: true, margin: "-100px" }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className={`${image.aspectRatio} relative group cursor-pointer overflow-hidden rounded-sm border border-stone-200 hover:border-stone-400 transition-all duration-500 hover:shadow-lg`}
                    onClick={() => setSelectedImage(image.id)}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      sizes={`(max-width: 640px) 50vw, (max-width: 768px) 33vw, ${gridConfigs[gridSize].itemWidth}`}
                    />

                    {/* 日式覆盖层 */}
                    <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/50 transition-all duration-500 flex items-center justify-center">
                      <div className="text-center text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                        <div className="w-8 h-8 mx-auto mb-3 rounded-full border border-white/60 flex items-center justify-center">
                          <Eye className="h-4 w-4" />
                        </div>
                        <div className="font-light tracking-wider text-xs px-3">
                          {image.alt}
                        </div>
                      </div>
                    </div>

                    {/* 简约边框效果 */}
                    <div className="absolute top-0 left-0 w-8 h-px bg-white opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                    <div className="absolute top-0 left-0 w-px h-8 bg-white opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-px bg-white opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                    <div className="absolute bottom-0 right-0 w-px h-8 bg-white opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>

        {/* 加载更多按钮 */}
        {hasMoreImages && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10 sm:mt-12"
          >
            <Button
              onClick={loadMore}
              variant="ghost"
              size="lg"
              className="bg-white/70 hover:bg-stone-100 backdrop-blur-sm border border-stone-200 hover:border-stone-300 text-stone-700 hover:text-stone-800 font-light tracking-wide transition-all duration-300"
            >
              {t("gallery.loadMore")} ({filteredImages.length - visibleCount}{" "}
              {t("gallery.remaining")})
            </Button>
          </motion.div>
        )}

        {/* 日式结尾装饰 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-20 lg:mt-24 text-center"
        >
          <div className="flex items-center justify-center gap-6">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-stone-300"></div>
            <div className="w-1 h-1 bg-stone-400 rounded-full"></div>
            <div className="w-2 h-2 bg-stone-300 rounded-full"></div>
            <div className="w-1 h-1 bg-stone-400 rounded-full"></div>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-stone-300"></div>
          </div>

          {/* 禅意符号 */}
          <div className="mt-8 opacity-20">
            <div className="w-12 h-12 mx-auto border border-stone-400 rounded-full relative">
              <div className="absolute top-1/2 left-1/2 w-6 h-6 border-b border-l border-stone-400 rounded-bl-full transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-1/2 w-6 h-6 border-t border-r border-stone-400 rounded-tr-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>
        </motion.div>
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
                src={
                  allImages.find((img) => img.id === selectedImage)?.src || ""
                }
                alt={
                  allImages.find((img) => img.id === selectedImage)?.alt || ""
                }
                fill
                className="object-contain rounded-lg"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 backdrop-blur-sm font-light rounded-b-lg">
                <div className="text-lg mb-1">
                  {allImages.find((img) => img.id === selectedImage)?.alt}
                </div>
                <div className="text-white/80 text-sm">
                  {
                    categories.find(
                      (cat) =>
                        cat.id ===
                        allImages.find((img) => img.id === selectedImage)
                          ?.category
                    )?.label
                  }
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
