"use client"

import { useLanguage } from "@/lib/i18n/context"
import { ParallaxSection } from "./parallax-section"
import { motion } from "framer-motion"

export function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-16 overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight">{t("about.title")}</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6 text-muted-foreground">
          <ParallaxSection direction="right" speed={0.3} offset={50}>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {t("about.description")}
            </motion.p>
          </ParallaxSection>

          <ParallaxSection direction="left" speed={0.3} offset={50}>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {t("about.tourismInfo")}
            </motion.p>
          </ParallaxSection>

          <ParallaxSection direction="right" speed={0.3} offset={50}>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {t("about.diningInfo")}
            </motion.p>
          </ParallaxSection>

          <ParallaxSection direction="left" speed={0.3} offset={50}>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {t("about.locationInfo")}
            </motion.p>
          </ParallaxSection>

          <ParallaxSection direction="right" speed={0.3} offset={50}>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {t("about.smokingPolicy")}
            </motion.p>
          </ParallaxSection>

          <ParallaxSection direction="left" speed={0.3} offset={50}>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {t("about.artworkInfo")}
            </motion.p>
          </ParallaxSection>
        </div>
      </div>
    </section>
  )
}
