"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { openBookingSystem } from "@/lib/booking-utils";
import { Z_INDEX } from "@/lib/z-index";

export function FloatingBookingButton() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 获取 hero section 的高度
      const heroSection = document.getElementById("hero");
      if (!heroSection) return;

      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      const scrollPosition = window.scrollY;

      // 当滚动超过 hero 区域的 80% 时显示按钮
      setIsVisible(scrollPosition > heroBottom * 0.8);
    };

    // 初始检查
    handleScroll();

    // 监听滚动事件
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-4 right-4 z-50 lg:right-8"
          style={{ zIndex: Z_INDEX.MODAL }}
        >
          <Button
            size="lg"
            onClick={() => openBookingSystem("floating-button")}
            className="group relative bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-white font-medium tracking-wide shadow-2xl hover:shadow-3xl transition-all duration-300 border-0 overflow-hidden rounded-full px-6 py-3 lg:px-8 lg:py-4"
          >
            {/* 金色光泽效果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

            {/* 按钮内容 */}
            <span className="relative z-10 flex items-center gap-2">
              <Calendar className="h-4 w-4 lg:h-5 lg:w-5" />
              <span className="hidden sm:inline text-sm lg:text-base">
                {t("common.bookNow")}
              </span>
              <span className="sm:hidden text-sm">{t("common.bookNow")}</span>
            </span>

            {/* 脉动效果 */}
            <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-amber-400" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
