"use client";

import { useLanguage } from "@/lib/i18n/context";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function ZenRooms() {
  const { t, locale } = useLanguage();
  const [hoveredRoom, setHoveredRoom] = useState<number | null>(null);

  // 房间数据
  const rooms = [
    {
      id: 1,
      name: t("rooms.room1Name"),
      description: t("rooms.room1Description"),
      price: t("rooms.room1Price"),
      image: "/images/deluxe-room.webp",
      features: [t("rooms.feature1"), t("rooms.feature2"), t("rooms.feature3")],
      japaneseLabel: "和室",
    },
    {
      id: 2,
      name: t("rooms.room2Name"),
      description: t("rooms.room2Description"),
      price: t("rooms.room2Price"),
      image: "/images/standard-room.webp",
      features: [t("rooms.feature1"), t("rooms.feature2"), t("rooms.feature4")],
      japaneseLabel: "洋室",
    },
    {
      id: 3,
      name: t("rooms.room3Name"),
      description: t("rooms.room3Description"),
      price: t("rooms.room3Price"),
      image: "/images/hotel-room.webp",
      features: [t("rooms.feature1"), t("rooms.feature4"), t("rooms.feature5")],
      japaneseLabel: "特別",
    },
  ];

  return (
    <section id="rooms" className="py-24 bg-stone-50">
      <div className="container">
        {/* 标题区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-stone-400"></div>
              <h3 className="text-sm uppercase tracking-[0.25em] text-stone-500 font-light">
                {t("rooms.subtitle")}
              </h3>
            </div>

            <h2 className="text-4xl font-light text-stone-800 tracking-wide">
              {t("rooms.title")}
            </h2>

            <p className="text-stone-600 font-light max-w-xl">
              {t("rooms.description")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex justify-start md:justify-end"
          >
            <Button
              className="bg-stone-800 hover:bg-stone-700 text-white font-light"
              size="lg"
              asChild
            >
              <Link href={`/${locale}/booking`}>
                {t("common.viewAllRooms")}{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* 房间展示 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group"
              onMouseEnter={() => setHoveredRoom(room.id)}
              onMouseLeave={() => setHoveredRoom(null)}
            >
              {/* 房间图片 */}
              <div className="relative h-[350px] mb-6 overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className={`object-cover transition-transform duration-1000 ease-out ${
                    hoveredRoom === room.id ? "scale-105" : "scale-100"
                  }`}
                />

                {/* 日语标签 */}
                <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-sm px-4 py-2">
                  <div className="text-lg font-light text-stone-800">
                    {room.japaneseLabel}
                  </div>
                </div>

                {/* 细线框 */}
                <div
                  className={`absolute inset-0 border border-white/0 group-hover:border-white/30 transition-all duration-300 pointer-events-none ${
                    hoveredRoom === room.id
                      ? "border-white/30"
                      : "border-white/0"
                  }`}
                ></div>
              </div>

              {/* 房间信息 */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-light text-stone-800">
                    {room.name}
                  </h3>
                  <div className="text-stone-600 font-light">{room.price}</div>
                </div>

                <p className="text-stone-600 font-light">{room.description}</p>

                {/* 房间特色 */}
                <div className="pt-2 space-y-2">
                  {room.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-sm text-stone-600"
                    >
                      <div className="h-1 w-1 bg-stone-400 rounded-full mr-2"></div>
                      <div>{feature}</div>
                    </div>
                  ))}
                </div>

                {/* 预订按钮 */}
                <div className="pt-4">
                  <Button
                    variant="outline"
                    className="border-stone-300 text-stone-700 hover:bg-stone-100 hover:text-stone-900 font-light w-full"
                    asChild
                  >
                    <Link href={`/${locale}/booking?room=${room.id}`}>
                      {t("common.selectRoom")}
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
