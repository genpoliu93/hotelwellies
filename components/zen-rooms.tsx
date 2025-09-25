"use client";

import { useLanguage } from "@/lib/i18n/context";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { ArrowRight, Bed, Users, Wifi, Coffee } from "lucide-react";

export function ZenRooms() {
  const { t, locale } = useLanguage();
  const [hoveredRoom, setHoveredRoom] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // 房间数据
  const rooms = [
    {
      id: 1,
      name: t("rooms.room1Name"),
      description: t("rooms.room1Description"),
      price: t("rooms.room1Price"),
      image: "/images/rooms/deluxe/DSCF4.jpg",
      features: [t("rooms.feature1"), t("rooms.feature2"), t("rooms.feature3")],
      japaneseLabel: "デラックス　ダブルルーム",
      gradientFrom: "from-blue-500/80",
      gradientTo: "to-indigo-600/80",
      iconBg: "bg-blue-500/20",
      icon: <Bed className="h-6 w-6 text-white" />,
    },
    {
      id: 2,
      name: t("rooms.room2Name"),
      description: t("rooms.room2Description"),
      price: t("rooms.room2Price"),
      image: "/images/rooms/double1/DSCF4503.jpg",
      features: [t("rooms.feature1"), t("rooms.feature2"), t("rooms.feature4")],
      japaneseLabel: "スタンダードダブルルーム",
      gradientFrom: "from-emerald-500/80",
      gradientTo: "to-green-600/80",
      iconBg: "bg-emerald-500/20",
      icon: <Users className="h-6 w-6 text-white" />,
    },
    {
      id: 3,
      name: t("rooms.room3Name"),
      description: t("rooms.room3Description"),
      price: t("rooms.room3Price"),
      image: "/images/hotel-room.jpg",
      features: [t("rooms.feature1"), t("rooms.feature4"), t("rooms.feature5")],
      japaneseLabel: "ファミリールーム",
      gradientFrom: "from-amber-500/80",
      gradientTo: "to-orange-600/80",
      iconBg: "bg-amber-500/20",
      icon: <Coffee className="h-6 w-6 text-white" />,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="rooms"
      className="relative -ml-64 lg:-ml-64"
    >
      {/* 容器高度确保有足够滚动空间 */}
      <div style={{ height: `${rooms.length * 100}vh` }}>
        {/* 3张房间图片使用sticky定位实现真正的覆盖效果 */}
        {rooms.map((room, index) => {
          // 为每张图片创建独立的滚动进度
          const roomRef = useRef<HTMLDivElement>(null);
          const { scrollYProgress: roomScrollProgress } = useScroll({
            target: roomRef,
            offset: ["start start", "end start"]
          });

          // 背景图片视差变换
          const backgroundY = useTransform(roomScrollProgress, [0, 1], ["0%", "30%"]);
          const backgroundScale = useTransform(roomScrollProgress, [0, 1], [1, 1.1]);

          return (
            <div
              key={room.id}
              ref={roomRef}
              className="sticky top-0 h-screen overflow-hidden"
              style={{ zIndex: rooms.length - index }} // 确保正确的层级
            >
              {/* 房间背景图片 */}
              <motion.div
                className="absolute inset-0"
                style={{
                  y: backgroundY,
                  scale: backgroundScale,
                }}
              >
                <Image
                  src={room.image}
                  alt={room.japaneseLabel}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </motion.div>

              {/* 房间标签 - 移到右下角避免与side-menu重叠 */}
              <div className="relative z-10 h-full flex items-end justify-end lg:mr-0">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="p-8 md:p-16"
                >
                  <div className="text-right">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-2 leading-tight">
                      {room.japaneseLabel}
                    </h2>
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 底部CTA区域 */}
      <div className="relative h-screen bg-gradient-to-br from-stone-900 to-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl px-8 lg:ml-64"
        >
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t("rooms.title")}
          </h3>
          <p className="text-xl text-white/80 mb-8">
            他にも様々なタイプの客室をご用意しております
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 text-lg"
          >
            <Link href={`/${locale}/rooms`} className="flex items-center gap-2">
              {t("common.viewAllRooms")}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
