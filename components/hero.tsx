"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { motion } from "framer-motion"
import { ParallaxImage } from "./parallax-image"
import Link from "next/link"

export function Hero() {
  const { t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const slides = [
    {
      image: "/images/hotel-exterior.webp",
      alt: "Hotel Wellies Exterior in Karuizawa",
      title: t("hero.title"),
      subtitle: t("hero.subtitle"),
    },
    {
      image: "/images/hotel-terrace.webp",
      alt: "Hotel Wellies Terrace with Garden View",
      title: t("hero.terraceTitle"),
      subtitle: t("hero.terraceSubtitle"),
    },
  ]

  const nextSlide = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))

    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 1000)
  }, [isTransitioning, slides.length])

  const prevSlide = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))

    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 1000)
  }, [isTransitioning, slides.length])

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return // 如果暂停则不自动切换

    const interval = setInterval(() => {
      nextSlide()
    }, 6000) // Change slide every 6 seconds

    return () => clearInterval(interval)
  }, [nextSlide, isPaused])

  return (
    <section className="relative" id="hero">
      {/* Main hero section with animated banners */}
      <div
        className="relative h-[85vh] w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* 使用视差图片组件替换普通图片 */}
            <ParallaxImage
              src={slide.image || "/placeholder.svg"}
              alt={slide.alt}
              className="w-full h-full"
              speed={0.15}
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-center">
              <div className="container">
                <div
                  className={`max-w-xl space-y-6 transition-all duration-1000 ease-in-out ${
                    currentSlide === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="inline-block bg-primary/90 px-4 py-1 rounded-sm"
                  >
                    <span className="text-sm font-medium text-white uppercase tracking-wider">Karuizawa, Japan</span>
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl text-white drop-shadow-md"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-xl text-white/90 max-w-md drop-shadow-md"
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 pt-4"
                  >
                    <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90" asChild>
                      <Link href="/booking">
                        <CalendarIcon className="h-4 w-4" />
                        {t("common.bookNow")}
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
                    >
                      {t("common.learnMore")}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 z-20 transition-all duration-300"
          aria-label="Previous slide"
          disabled={isTransitioning}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 z-20 transition-all duration-300"
          aria-label="Next slide"
          disabled={isTransitioning}
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true)
                  setCurrentSlide(index)
                  setTimeout(() => setIsTransitioning(false), 1000)
                }
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-primary scale-110" : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              disabled={isTransitioning}
            />
          ))}
        </div>
      </div>

      {/* Feature cards section */}
      <div className="container mx-auto -mt-24 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-background rounded-lg shadow-lg p-6 border-l-4 border-primary"
          >
            <h3 className="text-lg font-semibold mb-2">{t("hero.convenientLocation")}</h3>
            <p className="text-muted-foreground">{t("hero.convenientLocationDesc")}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-background rounded-lg shadow-lg p-6 border-l-4 border-primary"
          >
            <h3 className="text-lg font-semibold mb-2">{t("hero.comfortableRooms")}</h3>
            <p className="text-muted-foreground">{t("hero.comfortableRoomsDesc")}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-background rounded-lg shadow-lg p-6 border-l-4 border-primary"
          >
            <h3 className="text-lg font-semibold mb-2">{t("hero.attentiveService")}</h3>
            <p className="text-muted-foreground">{t("hero.attentiveServiceDesc")}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
