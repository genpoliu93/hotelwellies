"use client";

import { useLanguage } from "@/lib/i18n/context";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { LocationMap } from "@/components/location-map";

export function ZenContact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 bg-stone-100">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* 文字信息部分 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-10"
          >
            {/* 标题区域 */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-stone-400"></div>
                <h3 className="text-sm uppercase tracking-[0.25em] text-stone-500 font-light">
                  {t("contact.subtitle")}
                </h3>
              </div>

              <h2 className="text-4xl font-light text-stone-800 tracking-wide">
                {t("contact.title")}
              </h2>

              <p className="text-stone-600 font-light max-w-xl">
                {t("contact.description")}
              </p>
            </div>

            {/* 联系信息卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 地址 */}
              <div className="p-6 bg-white rounded-sm shadow-sm border-t border-stone-200">
                <div className="flex gap-4 items-start">
                  <div className="p-2 bg-stone-50 rounded-sm">
                    <MapPin className="h-5 w-5 text-stone-700" />
                  </div>
                  <div>
                    <h4 className="text-stone-800 font-medium mb-2">
                      {t("contact.title")}
                    </h4>
                    <p className="text-stone-600 text-sm font-light">
                      {t("contact.address")}
                    </p>
                  </div>
                </div>
              </div>

              {/* 电话 */}
              <div className="p-6 bg-white rounded-sm shadow-sm border-t border-stone-200">
                <div className="flex gap-4 items-start">
                  <div className="p-2 bg-stone-50 rounded-sm">
                    <Phone className="h-5 w-5 text-stone-700" />
                  </div>
                  <div>
                    <h4 className="text-stone-800 font-medium mb-2">
                      {t("contact.phoneTitle")}
                    </h4>
                    <p className="text-stone-600 text-sm font-light">
                      {t("contact.phone")}
                    </p>
                  </div>
                </div>
              </div>

              {/* 邮箱 */}
              <div className="p-6 bg-white rounded-sm shadow-sm border-t border-stone-200">
                <div className="flex gap-4 items-start">
                  <div className="p-2 bg-stone-50 rounded-sm">
                    <Mail className="h-5 w-5 text-stone-700" />
                  </div>
                  <div>
                    <h4 className="text-stone-800 font-medium mb-2">
                      {t("contact.emailTitle")}
                    </h4>
                    <p className="text-stone-600 text-sm font-light">
                      {t("contact.email")}
                    </p>
                  </div>
                </div>
              </div>

              {/* 营业时间 */}
              <div className="p-6 bg-white rounded-sm shadow-sm border-t border-stone-200">
                <div className="flex gap-4 items-start">
                  <div className="p-2 bg-stone-50 rounded-sm">
                    <Clock className="h-5 w-5 text-stone-700" />
                  </div>
                  <div>
                    <h4 className="text-stone-800 font-medium mb-2">
                      {t("contact.hoursTitle")}
                    </h4>
                    <p className="text-stone-600 text-sm font-light">
                      {t("contact.hours")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 直接联系按钮 */}
            <div className="pt-4">
              <Button
                className="bg-stone-800 hover:bg-stone-700 text-white font-light"
                size="lg"
              >
                {t("contact.getInTouch")}
              </Button>
            </div>

            {/* 日式装饰线条 */}
            <div className="h-px w-16 bg-stone-300/50"></div>
          </motion.div>

          {/* 地图部分 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative h-[500px] bg-white p-2 shadow-sm rounded-sm"
          >
            {/* 地图组件 */}
            <LocationMap />

            {/* 装饰边框 */}
            <div className="absolute -inset-1 border border-stone-200 rounded-sm z-[-1]"></div>

            {/* 日式装饰元素 */}
            <div className="absolute -bottom-8 -left-8 w-20 h-20 rotate-12 opacity-10">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M20,50 L80,50 M50,20 L50,80"
                  stroke="#000"
                  strokeWidth="1"
                />
                <path
                  d="M35,35 L65,65 M35,65 L65,35"
                  stroke="#000"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
