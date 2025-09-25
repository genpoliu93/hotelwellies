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
      className="about-section-modern"
      ref={sectionRef}
    >
      <div className="about-container">
        {/* 使用CSS Grid创建现代布局 */}
        <div className="about-grid">
          {/* 标题区域 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="about-header"
          >
            <span className="about-label">
              {t("about.subtitle")}
            </span>
            <h1 className="about-title">
              {t("about.title")}
            </h1>
          </motion.div>

          {/* 主图片区域 */}
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="about-hero-image"
          >
            <div className="zoom-out effect">
              <div className="zoom-out__inner">
                <Image
                  src="/images/hotel-terrace.webp"
                  alt="Hotel Wellies terrace"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            </div>
          </motion.div>

          {/* 文本内容区域 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
            className="about-content"
          >
            <div className="about-text">
              <p className="about-paragraph">
                {t("about.paragraph1")}
              </p>
              <p className="about-paragraph">
                {t("about.paragraph2")}
              </p>
            </div>

            {/* 签名区域 */}
            <div className="about-signature">
              <div className="signature-line"></div>
              <div className="signature-text">
                <div className="signature-name">Hotel Wellies</div>
                <div className="signature-location">Karuizawa, Japan</div>
              </div>
            </div>
          </motion.div>

          {/* 装饰图片区域 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="about-accent-image"
          >
            <div className="zoom-out effect">
              <div className="zoom-out__inner">
                <Image
                  src="/images/garden-detail.jpg"
                  alt="Hotel Wellies garden detail"
                  width={300}
                  height={400}
                  className="object-cover w-full h-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
