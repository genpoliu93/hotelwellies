"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/context";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { LocationMap } from "./location-map";
import { MapPin, Phone, Mail } from "lucide-react";

export function Gallery() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeImage, setActiveImage] = useState<number | null>(null);

  const categories = [
    { id: "all", label: t("gallery.categories.all") },
    { id: "interior", label: t("gallery.categories.interior") },
    { id: "dining", label: t("gallery.categories.dining") },
    { id: "exterior", label: t("gallery.categories.exterior") },
  ];

  const galleryImages = [
    {
      src: "/images/lounge.webp",
      alt: "英国风格的休息室和壁炉",
      category: "interior",
    },
    {
      src: "/images/british-food.webp",
      alt: "英式美食",
      category: "dining",
    },
    {
      src: "/images/afternoon-tea.webp",
      alt: "英式下午茶",
      category: "dining",
    },
    {
      src: "/images/record-shelf.webp",
      alt: "LP唱片收藏和Wellies装饰",
      category: "interior",
    },
    {
      src: "/images/lobby.webp",
      alt: "酒店大堂和英式电话亭",
      category: "interior",
    },
    {
      src: "/images/entrance.webp",
      alt: "酒店入口标志",
      category: "exterior",
    },
    {
      src: "/images/garden-detail.webp",
      alt: "花园细节和音乐",
      category: "exterior",
    },
    {
      src: "/images/walking-paths.webp",
      alt: "酒店周边散步路线",
      category: "exterior",
    },
  ];

  const filteredImages = galleryImages.filter(
    (image) => activeCategory === "all" || image.category === activeCategory
  );

  const closeModal = () => {
    setActiveImage(null);
    document.body.style.overflow = "auto";
  };

  const openModal = (index: number) => {
    setActiveImage(index);
    document.body.style.overflow = "hidden";
  };

  const navigateImage = (direction: number) => {
    if (activeImage === null) return;

    const newIndex =
      (activeImage + direction + filteredImages.length) % filteredImages.length;
    setActiveImage(newIndex);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImage === null) return;

      if (e.key === "ArrowLeft") navigateImage(-1);
      if (e.key === "ArrowRight") navigateImage(1);
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImage]);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            {t("gallery.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("gallery.subtitle")}
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activeCategory === category.id
                  ? "bg-primary text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Gallery grid - using CSS grid with auto-fill for no gaps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-500"
              onClick={() => openModal(index)}
            >
              <div className="relative aspect-square">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-white font-medium text-lg">{image.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Location info with interactive map */}
        <div className="mt-20 bg-white rounded-2xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-6">
                {t("gallery.locationTitle")}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">
                      {t("contact.address")}
                    </h4>
                    <p className="text-muted-foreground">
                      〒389-0111 Nagano, Kitasaku District, Karuizawa, Nagakura,
                      2350-160
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">{t("contact.phone")}</h4>
                    <p className="text-muted-foreground">
                      <a
                        href="tel:+81-267-46-1670"
                        className="hover:text-primary transition-colors"
                      >
                        +81-267-46-1670
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">{t("contact.email")}</h4>
                    <p className="text-muted-foreground">
                      <a
                        href="mailto:info@hotelwellies.jp"
                        className="hover:text-primary transition-colors"
                      >
                        info@hotelwellies.jp
                      </a>
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground pt-4">
                  {t("about.locationInfo")}
                </p>
              </div>
            </div>

            <div className="h-[400px] md:h-auto">
              <LocationMap />
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen image modal */}
      <AnimatePresence>
        {activeImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-6xl w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors"
                onClick={closeModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage(-1);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage(1);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>

              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={filteredImages[activeImage].src || "/placeholder.svg"}
                  alt={filteredImages[activeImage].alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 text-center">
                <p className="text-lg font-medium">
                  {filteredImages[activeImage].alt}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
