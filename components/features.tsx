"use client"

import { useLanguage } from "@/lib/i18n/context"
import { Coffee, Flower2, Music, Car, PartyPopper, Wine, Bike } from "lucide-react"
import { motion } from "framer-motion"
import { ParallaxSection } from "./parallax-section"

export function Features() {
  const { t } = useLanguage()

  const services = [
    {
      icon: <Coffee className="h-6 w-6 text-primary" />,
      title: t("features.dining.title"),
      description: t("features.dining.desc"),
    },
    {
      icon: <Flower2 className="h-6 w-6 text-primary" />,
      title: t("features.garden.title"),
      description: t("features.garden.desc"),
    },
    {
      icon: <Music className="h-6 w-6 text-primary" />,
      title: t("features.music.title"),
      description: t("features.music.desc"),
    },
    {
      icon: <Car className="h-6 w-6 text-primary" />,
      title: t("features.transport.title"),
      description: t("features.transport.desc"),
    },
    {
      icon: <PartyPopper className="h-6 w-6 text-primary" />,
      title: t("features.celebration.title"),
      description: t("features.celebration.desc"),
    },
    {
      icon: <Wine className="h-6 w-6 text-primary" />,
      title: t("features.lounge.title"),
      description: t("features.lounge.desc"),
    },
    {
      icon: <Bike className="h-6 w-6 text-primary" />,
      title: t("features.bicycle.title"),
      description: t("features.bicycle.desc"),
    },
  ]

  return (
    <section id="features" className="py-12 bg-[#f8f7f4] overflow-hidden">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto text-center mb-10"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-3">{t("features.title")}</h2>
          <div className="w-16 h-0.5 bg-primary mx-auto mb-3"></div>
          <p className="text-muted-foreground">{t("features.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ParallaxSection key={index} direction={index % 2 === 0 ? "up" : "down"} speed={0.2} offset={30}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-md shadow-sm hover:shadow transition-shadow duration-200 p-5 h-full"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            </ParallaxSection>
          ))}
        </div>
      </div>
    </section>
  )
}
