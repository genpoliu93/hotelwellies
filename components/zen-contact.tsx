"use client";

import { useLanguage } from "@/lib/i18n/context";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  Car,
  Train,
  MapPinIcon,
} from "lucide-react";
import { LocationMap } from "@/components/location-map";

export function ZenContact() {
  const { t } = useLanguage();

  const handleContactClick = () => {
    const subject = encodeURIComponent(t("contact.defaultSubject"));
    const mailtoLink = `mailto:info@hotelwellies.jp?subject=${subject}`;
    window.location.href = mailtoLink;
  };

  // 附近景点数据
  const nearbySpots = [
    {
      name: t("contact.spots.nakakaruizawaStation"),
      distance: "0.6 km",
      walkingTime: "約8分",
      icon: "🚉",
    },
    {
      name: t("contact.spots.lawsonStore"),
      distance: "0.84 km",
      walkingTime: "約10分",
      icon: "🏪",
    },
    {
      name: t("contact.spots.harunireTerrace"),
      distance: "1.3 km",
      walkingTime: "約15分",
      icon: "🌳",
    },
    {
      name: t("contact.spots.stoneChurch"),
      distance: "1.5 km",
      walkingTime: "約17分",
      icon: "⛪",
    },
    {
      name: t("contact.spots.saisonMuseum"),
      distance: "2.3 km",
      walkingTime: "約28分",
      icon: "🎨",
    },
    {
      name: t("contact.spots.kumobaPool"),
      distance: "2.5 km",
      walkingTime: "約28分",
      icon: "🏞️",
    },
  ];

  return (
    <section id="contact" className="py-32 bg-stone-50 relative overflow-hidden">
      {/* 日式流线装饰 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 主要流线 */}
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent opacity-60"></div>
        <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent opacity-40"></div>

        {/* 垂直线条 */}
        <div className="absolute left-1/4 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-stone-200 to-transparent opacity-30"></div>
        <div className="absolute right-1/3 top-1/3 bottom-1/3 w-px bg-gradient-to-b from-transparent via-stone-200 to-transparent opacity-30"></div>
      </div>

      <div className="container relative z-10 px-6 sm:px-8 md:px-10 lg:px-12">
        {/* 日式标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-20"
        >
          {/* 顶部装饰线 */}
          <div className="flex items-center justify-center gap-8 mb-6">
            <motion.div
              className="h-px bg-gradient-to-r from-transparent to-stone-300"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <div className="w-2 h-2 bg-stone-400 rounded-full opacity-60"></div>
            <motion.div
              className="h-px bg-gradient-to-l from-transparent to-stone-300"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>

          <h2 className="text-5xl font-extralight text-stone-800 tracking-wider mb-8 leading-tight">
            {t("contact.title")}
          </h2>

          <p className="text-stone-600 font-light max-w-2xl mx-auto leading-loose text-lg tracking-wide">
            {t("contact.description")}
          </p>

          {/* 底部装饰线 */}
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
          </motion.div>
        </motion.div>

        {/* 三栏等高内容区域 */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* 联系信息栏 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white border border-stone-200 shadow-sm p-8 h-full flex flex-col relative"
          >
            {/* 顶部装饰线 */}
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>

            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px bg-stone-300"></div>
                <div className="w-1 h-1 bg-stone-400 rounded-full"></div>
              </div>
              <h3 className="text-xl font-extralight text-stone-800 tracking-wider">
                連絡先情報
              </h3>
            </div>

            <div className="space-y-8 flex-1">
              {/* 地址 */}
              <div className="group">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="h-4 w-4 text-stone-600" />
                  <h4 className="text-stone-800 font-light text-sm tracking-wide">住所</h4>
                </div>
                <div className="pl-7 border-l border-stone-200 ml-2">
                  <p className="text-stone-600 text-sm font-light leading-relaxed tracking-wide">
                    {t("contact.address")}
                  </p>
                </div>
              </div>

              {/* 电话 */}
              <div className="group">
                <div className="flex items-center gap-3 mb-3">
                  <Phone className="h-4 w-4 text-stone-600" />
                  <h4 className="text-stone-800 font-light text-sm tracking-wide">
                    {t("contact.phoneTitle")}
                  </h4>
                </div>
                <div className="pl-7 border-l border-stone-200 ml-2">
                  <p className="text-stone-600 text-sm font-light tracking-wide">
                    {t("contact.phone")}
                  </p>
                </div>
              </div>

              {/* 邮箱 */}
              <div className="group">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="h-4 w-4 text-stone-600" />
                  <h4 className="text-stone-800 font-light text-sm tracking-wide">
                    {t("contact.emailTitle")}
                  </h4>
                </div>
                <div className="pl-7 border-l border-stone-200 ml-2">
                  <p className="text-stone-600 text-sm font-light tracking-wide">
                    {t("contact.email")}
                  </p>
                </div>
              </div>

              {/* 营业时间 */}
              <div className="group">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="h-4 w-4 text-stone-600" />
                  <h4 className="text-stone-800 font-light text-sm tracking-wide">
                    {t("contact.hoursTitle")}
                  </h4>
                </div>
                <div className="pl-7 border-l border-stone-200 ml-2">
                  <p className="text-stone-600 text-sm font-light tracking-wide">
                    {t("contact.hours")}
                  </p>
                </div>
              </div>
            </div>

            {/* 联系按钮 */}
            <div className="pt-8 mt-auto border-t border-stone-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px bg-stone-300"></div>
                <div className="w-1 h-1 bg-stone-400 rounded-full"></div>
              </div>
              <Button
                className="bg-stone-800 hover:bg-stone-700 text-white font-light w-full tracking-wide"
                size="lg"
                onClick={handleContactClick}
              >
                {t("contact.getInTouch")}
              </Button>
            </div>
          </motion.div>

          {/* 附近景点栏 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white border border-stone-200 shadow-sm p-8 h-full flex flex-col relative"
          >
            {/* 顶部装饰线 */}
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>

            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px bg-stone-300"></div>
                <div className="w-1 h-1 bg-stone-400 rounded-full"></div>
              </div>
              <h3 className="text-xl font-extralight text-stone-800 tracking-wider">
                {t("contact.nearbySpots")}
              </h3>
            </div>

            <div className="space-y-6 flex-1">
              {nearbySpots.map((spot, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="group border-l border-stone-200 pl-6 ml-2 hover:border-stone-400 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-lg opacity-60">{spot.icon}</span>
                      <div className="flex-1">
                        <h4 className="text-stone-800 font-light text-sm mb-2 tracking-wide">
                          {spot.name}
                        </h4>
                        <div className="flex flex-col gap-1 text-xs text-stone-500">
                          <span className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-stone-300 rounded-full"></div>
                            {t("contact.distance")}: {spot.distance}
                          </span>
                          <span className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-stone-300 rounded-full"></div>
                            {t("contact.walkingTime")}: {spot.walkingTime}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Navigation className="h-3 w-3 text-stone-400 group-hover:text-stone-600 transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 底部装饰 */}
            <div className="pt-8 mt-auto border-t border-stone-100">
              <div className="text-center">
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent mx-auto mb-3"></div>
                <p className="text-xs text-stone-500 font-light tracking-wide">
                  {t("contact.nearbySubtitle")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* 地图栏 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white border border-stone-200 shadow-sm p-8 h-full flex flex-col relative"
          >
            {/* 顶部装饰线 */}
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>

            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px bg-stone-300"></div>
                <div className="w-1 h-1 bg-stone-400 rounded-full"></div>
              </div>
              <h3 className="text-xl font-extralight text-stone-800 tracking-wider">
                {t("contact.access.title")}
              </h3>
            </div>

            {/* 交通信息 */}
            <div className="space-y-6 mb-8">
              {/* 自驾车 */}
              <div className="group">
                <div className="flex items-center gap-3 mb-3">
                  <Car className="h-4 w-4 text-stone-600" />
                  <h4 className="text-stone-800 font-light text-sm tracking-wide">
                    {t("contact.access.byCarTitle")}
                  </h4>
                </div>
                <div className="pl-7 border-l border-stone-200 ml-2">
                  <p className="text-stone-600 text-sm font-light leading-relaxed tracking-wide">
                    {t("contact.access.byCarDesc")}
                  </p>
                </div>
              </div>

              {/* 电车 */}
              <div className="group">
                <div className="flex items-center gap-3 mb-3">
                  <Train className="h-4 w-4 text-stone-600" />
                  <h4 className="text-stone-800 font-light text-sm tracking-wide">
                    {t("contact.access.byTrainTitle")}
                  </h4>
                </div>
                <div className="pl-7 border-l border-stone-200 ml-2 space-y-2">
                  <p className="text-stone-600 text-sm font-light leading-relaxed tracking-wide">
                    {t("contact.access.byTrainDesc")}
                  </p>
                  <p className="text-stone-500 text-xs font-light tracking-wide">
                    {t("contact.access.byTrainNote")}
                  </p>
                </div>
              </div>

              {/* 步行 */}
              <div className="group">
                <div className="flex items-center gap-3 mb-3">
                  <MapPinIcon className="h-4 w-4 text-stone-600" />
                  <h4 className="text-stone-800 font-light text-sm tracking-wide">
                    {t("contact.access.byWalkTitle")}
                  </h4>
                </div>
                <div className="pl-7 border-l border-stone-200 ml-2">
                  <p className="text-stone-600 text-sm font-light leading-relaxed tracking-wide">
                    {t("contact.access.byWalkDesc")}
                  </p>
                </div>
              </div>
            </div>

            {/* 地图 */}
            <div className="flex-1 relative border border-stone-200 overflow-hidden min-h-[200px]">
              <LocationMap />
            </div>

            {/* 地图说明 */}
            <div className="pt-6 mt-auto border-t border-stone-100">
              <div className="text-center">
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent mx-auto mb-3"></div>
                <p className="text-xs text-stone-500 font-light tracking-wide">
                  {t("gallery.locationInfo")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
