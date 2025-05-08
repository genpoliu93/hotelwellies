"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/i18n/context"
import { motion } from "framer-motion"

export function Rooms() {
  const { t } = useLanguage()

  const roomCards = [
    {
      image: "/images/standard-room.webp",
      alt: t("rooms.standard"),
      title: t("rooms.standard"),
      description: t("rooms.standardDesc"),
      popular: true,
      price: "¥688",
      features: ["• 1张大床或2张单人床", "• 25平方米", "• 免费WiFi", "• 空调", "• 私人浴室"],
    },
    {
      image: "/images/deluxe-room.webp",
      alt: t("rooms.deluxe"),
      title: t("rooms.deluxe"),
      description: t("rooms.deluxeDesc"),
      popular: false,
      price: "¥1288",
      features: ["• 1张特大床", "• 45平方米", "• 免费WiFi", "• 空调", "• 独立客厅"],
    },
    {
      image: "/images/family-room.png",
      alt: t("rooms.family"),
      title: t("rooms.family"),
      description: t("rooms.familyDesc"),
      popular: false,
      price: "¥1488",
      features: ["• 1张大床和2张单人床", "• 50平方米", "• 免费WiFi", "• 空调", "• 儿童设施"],
    },
  ]

  return (
    <section id="rooms" className="py-16 overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight">{t("rooms.title")}</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{t("rooms.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roomCards.map((room, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card className="overflow-hidden h-full">
                <div className="relative h-48">
                  <Image src={room.image || "/placeholder.svg"} alt={room.alt} fill className="object-cover" />
                  {room.popular && <Badge className="absolute top-2 right-2">{t("rooms.popular")}</Badge>}
                </div>
                <CardHeader>
                  <CardTitle>{room.title}</CardTitle>
                  <CardDescription>{room.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {room.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                  <div className="mt-4 text-xl font-bold">
                    {room.price}{" "}
                    <span className="text-sm font-normal text-muted-foreground">{t("rooms.perNight")}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">{t("rooms.viewDetails")}</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mt-10"
        >
          <Button variant="outline" size="lg">
            {t("common.viewAllRooms")}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
