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
      image: "/images/singleroom.jpg",
      features: [t("rooms.feature1"), t("rooms.feature2"), t("rooms.feature3")],
      japaneseLabel: "シングルベッドルーム",
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
      image: "/images/standard-room.jpg",
      features: [t("rooms.feature1"), t("rooms.feature2"), t("rooms.feature4")],
      japaneseLabel: "ダブルベッドルーム",
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
      className="py-4 bg-gradient-to-br from-stone-50 via-slate-50 to-stone-100 relative overflow-hidden"
    >
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 opacity-5">
        <div className="zen-bg-decoration absolute top-20 left-16 w-36 h-36 rounded-full bg-stone-400"></div>
        <div className="zen-bg-decoration absolute bottom-20 right-16 w-28 h-28 rounded-full bg-slate-500"></div>
        <div className="zen-bg-decoration absolute top-2/3 left-1/3 w-20 h-20 rounded-full bg-stone-300"></div>
      </div>

      <div className="container relative">
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
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-stone-400"></div>
              <h3 className="text-sm uppercase tracking-[0.25em] text-stone-600 font-light flex items-center gap-2">
                <Bed className="h-4 w-4" />
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
              className="bg-gradient-to-r from-stone-700 to-stone-800 hover:from-stone-800 hover:to-stone-900 text-white font-light shadow-lg hover:shadow-xl transition-all duration-300"
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
              className="zen-feature-card group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredRoom(room.id)}
              onMouseLeave={() => setHoveredRoom(null)}
            >
              {/* 房间图片 */}
              <div className="relative h-[350px] overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* 渐变覆盖层 */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${room.gradientFrom} ${room.gradientTo} opacity-0 group-hover:opacity-90 transition-opacity duration-500`}
                ></div>

                {/* 微妙的纹理覆盖层 */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>

                {/* 房间图标 */}
                <div
                  className={`absolute top-6 left-6 ${room.iconBg} backdrop-blur-sm p-3 rounded-full border border-white/20 transition-all duration-300 group-hover:scale-110 opacity-0 group-hover:opacity-100`}
                >
                  {room.icon}
                </div>

                {/* 日语标签 */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-sm transition-all duration-300 group-hover:bg-white/95 group-hover:scale-105">
                  <div className="text-lg font-light text-stone-800">
                    {room.japaneseLabel}
                  </div>
                </div>

                {/* 价格标签 */}
                {/*    <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-sm text-sm font-light opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                  {room.price}
                </div>
 */}
                {/* 边框光效 */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-lg transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 装饰线条和墨迹元素 */}
        <div className="mt-16 flex justify-center items-center space-x-8">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-stone-400 to-transparent"></div>

          {/* 使用SVG墨迹装饰 */}
          <div className="relative flex items-center space-x-4">
            <Image
              src="/images/ink-branch.svg"
              alt="Ink branch decoration"
              width={30}
              height={30}
              className="opacity-30 transform rotate-12"
            />
            <Image
              src="/images/ink-splash.svg"
              alt="Ink splash decoration"
              width={40}
              height={40}
              className="opacity-20"
            />
            <Image
              src="/images/ink-branch.svg"
              alt="Ink branch decoration"
              width={30}
              height={30}
              className="opacity-30 transform -rotate-12 scale-x-[-1]"
            />
          </div>

          <div className="h-px w-24 bg-gradient-to-r from-transparent via-stone-400 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
