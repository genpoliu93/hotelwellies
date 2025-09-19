"use client";

import { useLanguage } from "@/lib/i18n/context";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

export function ZenAbout() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  // 实现精确的zoom-out淡入效果
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const zoomElements = sectionRef.current.querySelectorAll('.zoom-out');
      zoomElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible && !el.classList.contains('is-fade')) {
          setTimeout(() => {
            el.classList.add('is-fade');
          }, 300);
        }
      });
    };

    // 初始检查
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="about"
      className="concept-section"
      ref={sectionRef}
    >
      <div className="concept-container lg:ml-80">
        {/* 标题区域 - 完全按照nasu-yobou的样式 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="concept-header"
        >
          <p className="concept-label">
            {t("about.subtitle")}
          </p>
          <p className="concept-subtitle">
            {t("about.title")}
          </p>
        </motion.div>

        {/* 主内容区域 - 图片 + 大标题 (横向排列) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="concept-main-content"
        >
          <div className="concept-image-1">
            <div className="zoom-out effect">
              <div className="zoom-out__inner">
                <Image
                  src="/images/hotel-terrace.webp"
                  alt="Hotel Wellies terrace"
                  width={358}
                  height={269}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
          <div className="concept-title">
            <h2 dangerouslySetInnerHTML={{
              __html: t("about.title").replace(/\s+/g, '<br>')
            }} />
          </div>
        </motion.div>

        {/* 文本内容区域 - 文字 + 竖向图片 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
          className="concept-text-content"
        >
          <div className="concept-text">
            <p className="mb-6">{t("about.paragraph1")}</p>
            <p className="mb-8">{t("about.paragraph2")}</p>

            {/* 签名区域 */}
            <div className="concept-signature">
              <div className="signature-name">
                Hotel Wellies
              </div>
              <div className="signature-location">
                Karuizawa, Japan
              </div>
            </div>
          </div>
          <div className="concept-image-2">
            <div className="zoom-out effect">
              <div className="zoom-out__inner">
                <Image
                  src="/images/garden-detail.jpg"
                  alt="Hotel Wellies garden detail"
                  width={272}
                  height={355}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
