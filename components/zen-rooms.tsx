"use client";

import { useLanguage } from "@/lib/i18n/context";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowRight, Bed, Users, Wifi, Coffee } from "lucide-react";

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
      id="rooms"
      className="rooms-section-modern"
    >
      <div className="rooms-container">
        {/* 使用CSS Grid创建现代布局 */}
        <div className="rooms-grid">
          {/* 标题区域 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="rooms-header"
          >
            <div className="rooms-header-content">
              <span className="rooms-label">
                <Bed className="h-4 w-4" />
                {t("rooms.subtitle")}
              </span>
              <h2 className="rooms-title">
                {t("rooms.title")}
              </h2>
              <p className="rooms-description">
                {t("rooms.description")}
              </p>
            </div>
          </motion.div>

          {/* CTA按钮区域 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="rooms-cta"
          >
            <Button
              className="rooms-cta-button"
              size="lg"
              asChild
            >
              <Link href={`/${locale}/rooms`}>
                {t("common.viewAllRooms")}{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* 房间卡片区域 */}
          <div className="rooms-cards-container">
            {rooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="room-card"
                onMouseEnter={() => setHoveredRoom(room.id)}
                onMouseLeave={() => setHoveredRoom(null)}
              >
                <div className="room-card-image">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover"
                  />

                  {/* 简化的覆盖层 */}
                  <div className="room-card-overlay"></div>

                  {/* 房间图标 */}
                  <div className={`room-card-icon ${room.iconBg}`}>
                    {room.icon}
                  </div>

                  {/* 房间标签 */}
                  <div className="room-card-label">
                    <span className="room-card-name">
                      {room.japaneseLabel}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 装饰元素 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="rooms-decoration"
          >
            <div className="decoration-line decoration-line-left"></div>
            <div className="decoration-elements">
              <Image
                src="/images/ink-branch.svg"
                alt="Decoration"
                width={24}
                height={24}
                className="decoration-element decoration-branch-left"
              />
              <Image
                src="/images/ink-splash.svg"
                alt="Decoration"
                width={32}
                height={32}
                className="decoration-element decoration-splash"
              />
              <Image
                src="/images/ink-branch.svg"
                alt="Decoration"
                width={24}
                height={24}
                className="decoration-element decoration-branch-right"
              />
            </div>
            <div className="decoration-line decoration-line-right"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
