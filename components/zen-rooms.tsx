"use client";

import { useLanguage } from "@/lib/i18n/context";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { ArrowRight, Bed, Users, Coffee } from "lucide-react";

type RoomInfo = {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  features: string[];
  japaneseLabel: string;
  gradientFrom: string;
  gradientTo: string;
  iconBg: string;
  icon: JSX.Element;
};

function DesktopRoomSlide({
  room,
  index,
  total,
}: {
  room: RoomInfo;
  index: number;
  total: number;
}) {
  const slideRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: slideRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div
      ref={slideRef}
      className="sticky top-0 hidden h-screen overflow-hidden lg:block"
      style={{ zIndex: total - index }}
    >
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

      <div className="relative z-10 flex h-full items-end justify-end">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="p-16"
        >
          <div className="text-right">
            <p className="text-sm font-light uppercase tracking-[0.35em] text-white/60">
              {room.name}
            </p>
            <h2 className="mt-3 text-5xl font-semibold text-white drop-shadow-2xl">
              {room.japaneseLabel}
            </h2>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function ZenRooms() {
  const { t, locale } = useLanguage();

  // 房间数据
  const rooms: RoomInfo[] = [
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
    <section id="rooms" className="relative lg:-ml-64">
      {/* 桌面端：全屏覆盖滚动效果 */}
      <div className="hidden lg:block">
        <div className="relative" style={{ height: `${rooms.length * 100}vh` }}>
          {rooms.map((room, index) => (
            <DesktopRoomSlide
              key={room.id}
              room={room}
              index={index}
              total={rooms.length}
            />
          ))}
        </div>
      </div>

      {/* 移动端：卡片式房型展示 */}
      <div className="lg:hidden bg-gradient-to-b from-stone-950 via-stone-900 to-stone-800 py-16">
        <div className="space-y-10 px-4 sm:px-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={room.image}
                  alt={room.japaneseLabel}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={room.id === 1}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/70" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/60">
                    {room.name}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">
                    {room.japaneseLabel}
                  </h3>
                </div>
              </div>
              <div className="space-y-6 bg-stone-950/60 p-6">
                <p className="text-sm leading-relaxed text-white/80">
                  {room.description}
                </p>
                <ul className="flex flex-wrap gap-3 text-xs text-white/70">
                  {room.features.map((feature) => (
                    <li
                      key={feature}
                      className="rounded-full border border-white/20 px-3 py-1"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-white">
                    {room.price}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                    asChild
                  >
                    <Link href={`/${locale}/rooms`}>
                      {t("common.viewAllRooms")}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部CTA区域 */}
      <div className="relative flex items-center justify-center bg-gradient-to-br from-stone-900 to-black py-16 lg:h-screen lg:py-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl px-6 text-center text-white sm:px-8 lg:px-12 lg:ml-64"
        >
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6">
            {t("rooms.title")}
          </h3>
          <p className="text-base sm:text-lg text-white/80 mb-8 leading-relaxed">
            他にも様々なタイプの客室をご用意しております
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 text-base sm:text-lg"
          >
            <Link href={`/${locale}/rooms`} className="flex items-center justify-center gap-2">
              {t("common.viewAllRooms")}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
