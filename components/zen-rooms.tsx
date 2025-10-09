"use client";

import { useLanguage } from "@/lib/i18n/context";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Bed, Users, Sparkles } from "lucide-react";

type RoomInfo = {
  id: number;
  nameKey: string;
  descriptionKey: string;
  priceKey: string;
  images: string[];
  featuresKeys: string[];
  japaneseLabel: string;
  gradientFrom: string;
  gradientTo: string;
  iconBg: string;
  icon: JSX.Element;
};

// 房型图片数据
const roomImagesData = {
  deluxeDouble: [
    "/images/newroompic/Deluxe Double Room/HXS_0526.jpg",
    "/images/newroompic/Deluxe Double Room/HXS_0527.jpg",
    "/images/newroompic/Deluxe Double Room/HXS_0530.jpg",
    "/images/newroompic/Deluxe Double Room/HXS_0531.jpg",
    "/images/newroompic/Deluxe Double Room/HXS_0533.jpg",
    "/images/newroompic/Deluxe Double Room/HXS_0535.jpg",
    "/images/newroompic/Deluxe Double Room/HXS_0536.jpg",
    "/images/newroompic/Deluxe Double Room/HXS_0538.jpg",
    "/images/newroompic/Deluxe Double Room/HXS_0539.jpg",
  ],
  superiorDouble: [
    "/images/newroompic/Superior Double Room/HXS_0561.jpg",
    "/images/newroompic/Superior Double Room/HXS_0563.jpg",
    "/images/newroompic/Superior Double Room/HXS_0565.jpg",
    "/images/newroompic/Superior Double Room/HXS_0569.jpg",
    "/images/newroompic/Superior Double Room/HXS_0590.jpg",
    "/images/newroompic/Superior Double Room/HXS_0693.jpg",
    "/images/newroompic/Superior Double Room/HXS_0694.jpg",
    "/images/newroompic/Superior Double Room/HXS_0695.jpg",
    "/images/newroompic/Superior Double Room/HXS_0699.jpg",
    "/images/newroompic/Superior Double Room/HXS_0714.jpg",
  ],
  familyRoom2F: [
    "/images/newroompic/Family Room 2F/HXS_0629.jpg",
    "/images/newroompic/Family Room 2F/HXS_0631.jpg",
    "/images/newroompic/Family Room 2F/HXS_0633.jpg",
    "/images/newroompic/Family Room 2F/HXS_0634.jpg",
    "/images/newroompic/Family Room 2F/HXS_0636.jpg",
    "/images/newroompic/Family Room 2F/HXS_0637.jpg",
    "/images/newroompic/Family Room 2F/HXS_0639.jpg",
    "/images/newroompic/Family Room 2F/HXS_0640.jpg",
    "/images/newroompic/Family Room 2F/HXS_0654.jpg",
  ],
};

// 随机选择n张图片
function getRandomImages(images: string[], count: number): string[] {
  const shuffled = [...images].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: slideRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // 图片自动轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [room.images.length]);

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
        {/* 图片轮播 */}
        {room.images.map((image, imgIndex) => (
          <motion.div
            key={image}
            initial={{ opacity: 0 }}
            animate={{
              opacity: imgIndex === currentImageIndex ? 1 : 0,
            }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={image}
              alt={room.japaneseLabel}
              fill
              className="object-cover"
              priority={index === 0 && imgIndex === 0}
            />
          </motion.div>
        ))}
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
              {room.nameKey}
            </p>
            <h2 className="mt-3 text-5xl font-semibold text-white drop-shadow-2xl">
              {room.japaneseLabel}
            </h2>
          </div>
        </motion.div>
      </div>

      {/* 图片指示器 */}
      <div className="absolute bottom-8 right-16 z-10 flex gap-2">
        {room.images.map((_, imgIndex) => (
          <button
            key={imgIndex}
            onClick={() => setCurrentImageIndex(imgIndex)}
            className={`h-2 rounded-full transition-all ${
              imgIndex === currentImageIndex
                ? "w-8 bg-white"
                : "w-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`View image ${imgIndex + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function MobileRoomCard({ room }: { room: RoomInfo }) {
  const { t, locale } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 图片自动轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [room.images.length]);

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur">
      <div className="relative aspect-[4/3]">
        {/* 图片轮播 */}
        {room.images.map((image, imgIndex) => (
          <motion.div
            key={image}
            initial={{ opacity: 0 }}
            animate={{
              opacity: imgIndex === currentImageIndex ? 1 : 0,
            }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={image}
              alt={room.japaneseLabel}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/70" />
        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">
            {t(room.nameKey)}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            {room.japaneseLabel}
          </h3>
        </div>

        {/* 图片指示器 */}
        <div className="absolute bottom-6 right-6 flex gap-2">
          {room.images.map((_, imgIndex) => (
            <button
              key={imgIndex}
              onClick={() => setCurrentImageIndex(imgIndex)}
              className={`h-1.5 rounded-full transition-all ${
                imgIndex === currentImageIndex
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/40"
              }`}
              aria-label={`View image ${imgIndex + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="space-y-6 bg-stone-950/60 p-6">
        <p className="text-sm leading-relaxed text-white/80">
          {t(room.descriptionKey)}
        </p>
        <ul className="flex flex-wrap gap-3 text-xs text-white/70">
          {room.featuresKeys.map((featureKey) => (
            <li
              key={featureKey}
              className="rounded-full border border-white/20 px-3 py-1"
            >
              {t(featureKey)}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-white">
            {t(room.priceKey)}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            asChild
          >
            <Link href={`/${locale}/rooms`}>{t("common.viewAllRooms")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ZenRooms() {
  const { t, locale } = useLanguage();
  const [rooms, setRooms] = useState<RoomInfo[]>([]);

  // 在客户端初始化时随机选择图片
  useEffect(() => {
    const roomsData: RoomInfo[] = [
      {
        id: 1,
        nameKey: "rooms.new.deluxeDouble",
        descriptionKey: "rooms.new.deluxeDoubleDescription",
        priceKey: "rooms.room1Price",
        images: getRandomImages(roomImagesData.deluxeDouble, 3),
        featuresKeys: ["rooms.feature1", "rooms.feature2", "rooms.feature3"],
        japaneseLabel: "デラックス　ダブルルーム",
        gradientFrom: "from-purple-500/80",
        gradientTo: "to-pink-600/80",
        iconBg: "bg-purple-500/20",
        icon: <Sparkles className="h-6 w-6 text-white" />,
      },
      {
        id: 2,
        nameKey: "rooms.new.superiorDouble",
        descriptionKey: "rooms.new.superiorDoubleDescription",
        priceKey: "rooms.room2Price",
        images: getRandomImages(roomImagesData.superiorDouble, 3),
        featuresKeys: ["rooms.feature1", "rooms.feature2", "rooms.feature4"],
        japaneseLabel: "スーペリア　ダブルルーム",
        gradientFrom: "from-blue-500/80",
        gradientTo: "to-indigo-600/80",
        iconBg: "bg-blue-500/20",
        icon: <Bed className="h-6 w-6 text-white" />,
      },
      {
        id: 3,
        nameKey: "rooms.new.familyRoom2F",
        descriptionKey: "rooms.new.familyRoom2FDescription",
        priceKey: "rooms.room3Price",
        images: getRandomImages(roomImagesData.familyRoom2F, 3),
        featuresKeys: ["rooms.feature1", "rooms.feature4", "rooms.feature5"],
        japaneseLabel: "ファミリールーム（2階）",
        gradientFrom: "from-teal-500/80",
        gradientTo: "to-cyan-600/80",
        iconBg: "bg-teal-500/20",
        icon: <Users className="h-6 w-6 text-white" />,
      },
    ];
    setRooms(roomsData);
  }, []);

  if (rooms.length === 0) {
    return null; // 或者显示加载状态
  }

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
        <div className="space-y-10 px-6 sm:px-8 md:px-10">
          {rooms.map((room) => (
            <MobileRoomCard key={room.id} room={room} />
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
            <Link
              href={`/${locale}/rooms`}
              className="flex items-center justify-center gap-2"
            >
              {t("common.viewAllRooms")}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
