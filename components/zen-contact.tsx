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
    <section id="contact" className="py-24 bg-stone-100">
      <div className="container">
        {/* 顶部统一标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-stone-400"></div>
            <h3 className="text-sm uppercase tracking-[0.25em] text-stone-500 font-light">
              {t("contact.subtitle")}
            </h3>
            <div className="h-px w-16 bg-stone-400"></div>
          </div>

          <h2 className="text-5xl font-light text-stone-800 tracking-wide mb-4">
            {t("contact.title")}
          </h2>

          <p className="text-stone-600 font-light max-w-2xl mx-auto text-lg">
            {t("contact.description")}
          </p>
        </motion.div>

        {/* 三栏等高内容区域 */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* 联系信息栏 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white rounded-lg shadow-sm p-8 h-full flex flex-col"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-light text-stone-800 mb-2">
                連絡先情報
              </h3>
              <div className="h-px w-12 bg-stone-300"></div>
            </div>

            <div className="space-y-6 flex-1">
              {/* 地址 */}
              <div className="flex gap-4 items-start p-4 bg-stone-50 rounded-md">
                <div className="p-2 bg-white rounded-md shadow-sm">
                  <MapPin className="h-5 w-5 text-stone-700" />
                </div>
                <div className="flex-1">
                  <h4 className="text-stone-800 font-medium mb-1">住所</h4>
                  <p className="text-stone-600 text-sm font-light leading-relaxed">
                    {t("contact.address")}
                  </p>
                </div>
              </div>

              {/* 电话 */}
              <div className="flex gap-4 items-start p-4 bg-stone-50 rounded-md">
                <div className="p-2 bg-white rounded-md shadow-sm">
                  <Phone className="h-5 w-5 text-stone-700" />
                </div>
                <div className="flex-1">
                  <h4 className="text-stone-800 font-medium mb-1">
                    {t("contact.phoneTitle")}
                  </h4>
                  <p className="text-stone-600 text-sm font-light">
                    {t("contact.phone")}
                  </p>
                </div>
              </div>

              {/* 邮箱 */}
              <div className="flex gap-4 items-start p-4 bg-stone-50 rounded-md">
                <div className="p-2 bg-white rounded-md shadow-sm">
                  <Mail className="h-5 w-5 text-stone-700" />
                </div>
                <div className="flex-1">
                  <h4 className="text-stone-800 font-medium mb-1">
                    {t("contact.emailTitle")}
                  </h4>
                  <p className="text-stone-600 text-sm font-light">
                    {t("contact.email")}
                  </p>
                </div>
              </div>

              {/* 营业时间 */}
              <div className="flex gap-4 items-start p-4 bg-stone-50 rounded-md">
                <div className="p-2 bg-white rounded-md shadow-sm">
                  <Clock className="h-5 w-5 text-stone-700" />
                </div>
                <div className="flex-1">
                  <h4 className="text-stone-800 font-medium mb-1">
                    {t("contact.hoursTitle")}
                  </h4>
                  <p className="text-stone-600 text-sm font-light">
                    {t("contact.hours")}
                  </p>
                </div>
              </div>
            </div>

            {/* 联系按钮 */}
            <div className="pt-6 mt-auto">
              <Button
                className="bg-stone-800 hover:bg-stone-700 text-white font-light w-full"
                size="lg"
                onClick={handleContactClick}
              >
                {t("contact.getInTouch")}
              </Button>
            </div>
          </motion.div>

          {/* 附近景点栏 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white rounded-lg shadow-sm p-8 h-full flex flex-col"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-light text-stone-800 mb-2">
                {t("contact.nearbySpots")}
              </h3>
              <div className="h-px w-12 bg-stone-300"></div>
            </div>

            <div className="space-y-4 flex-1">
              {nearbySpots.map((spot, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-4 bg-stone-50 rounded-md hover:bg-stone-100 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-xl">{spot.icon}</span>
                      <div className="flex-1">
                        <h4 className="text-stone-800 font-medium text-sm mb-1">
                          {spot.name}
                        </h4>
                        <div className="flex items-center gap-4 text-xs text-stone-500">
                          <span>
                            {t("contact.distance")}: {spot.distance}
                          </span>
                          <span>
                            {t("contact.walkingTime")}: {spot.walkingTime}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Navigation className="h-4 w-4 text-stone-400 group-hover:text-stone-600 transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 装饰底部 */}
            <div className="pt-6 mt-auto">
              <div className="text-center">
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-stone-300 to-transparent mx-auto"></div>
                <p className="text-xs text-stone-500 mt-3">
                  {t("contact.nearbySubtitle")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* 地图栏 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white rounded-lg shadow-sm p-8 h-full flex flex-col"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-light text-stone-800 mb-2">
                {t("contact.access.title")}
              </h3>
              <div className="h-px w-12 bg-stone-300"></div>
            </div>

            {/* 交通信息 */}
            <div className="space-y-4 mb-6">
              {/* 自驾车 */}
              <div className="flex gap-3 items-start p-3 bg-stone-50 rounded-md">
                <div className="p-2 bg-white rounded-md shadow-sm">
                  <Car className="h-4 w-4 text-stone-700" />
                </div>
                <div className="flex-1">
                  <h4 className="text-stone-800 font-medium text-sm mb-1">
                    {t("contact.access.byCarTitle")}
                  </h4>
                  <p className="text-stone-600 text-xs font-light leading-relaxed">
                    {t("contact.access.byCarDesc")}
                  </p>
                </div>
              </div>

              {/* 电车 */}
              <div className="flex gap-3 items-start p-3 bg-stone-50 rounded-md">
                <div className="p-2 bg-white rounded-md shadow-sm">
                  <Train className="h-4 w-4 text-stone-700" />
                </div>
                <div className="flex-1">
                  <h4 className="text-stone-800 font-medium text-sm mb-1">
                    {t("contact.access.byTrainTitle")}
                  </h4>
                  <p className="text-stone-600 text-xs font-light leading-relaxed mb-1">
                    {t("contact.access.byTrainDesc")}
                  </p>
                  <p className="text-stone-500 text-xs font-light italic">
                    {t("contact.access.byTrainNote")}
                  </p>
                </div>
              </div>

              {/* 步行 */}
              <div className="flex gap-3 items-start p-3 bg-stone-50 rounded-md">
                <div className="p-2 bg-white rounded-md shadow-sm">
                  <MapPinIcon className="h-4 w-4 text-stone-700" />
                </div>
                <div className="flex-1">
                  <h4 className="text-stone-800 font-medium text-sm mb-1">
                    {t("contact.access.byWalkTitle")}
                  </h4>
                  <p className="text-stone-600 text-xs font-light leading-relaxed">
                    {t("contact.access.byWalkDesc")}
                  </p>
                </div>
              </div>
            </div>

            {/* 地图 */}
            <div className="flex-1 relative bg-stone-50 rounded-md overflow-hidden min-h-[200px]">
              <LocationMap />
            </div>

            {/* 地图说明 */}
            <div className="pt-4 mt-auto">
              <div className="text-center">
                <p className="text-xs text-stone-500 mb-2">
                  {t("gallery.locationInfo")}
                </p>
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-stone-300 to-transparent mx-auto"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
