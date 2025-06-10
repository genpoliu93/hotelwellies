"use client";

import { useLanguage } from "@/lib/i18n/context";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Users,
  CreditCard,
  ShieldCheck,
  Package,
  Coffee,
  UtensilsCrossed,
  Home,
} from "lucide-react";
import { format } from "date-fns";
import { ja, enUS, zhCN } from "date-fns/locale";

interface PriceSummaryProps {
  checkInDate: Date | undefined;
  checkOutDate: Date | undefined;
  roomPrice: number; // 选中套餐的总价
  roomId: string | null;
  adults: number;
  children: number;
  selectedPackageCode?: string; // 新增：选中的套餐代码
}

export function PriceSummary({
  checkInDate,
  checkOutDate,
  roomPrice,
  roomId,
  adults,
  children,
  selectedPackageCode = "ROOM_ONLY",
}: PriceSummaryProps) {
  const { t, locale } = useLanguage();

  // 计算住宿天数
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const totalGuests = adults + children;

  // 格式化价格
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(
      locale === "en" ? "en-US" : locale === "ja" ? "ja-JP" : "zh-CN",
      {
        style: "currency",
        currency: "JPY",
        maximumFractionDigits: 0,
      }
    ).format(price);
  };

  // 获取套餐信息
  const getPackageInfo = () => {
    switch (selectedPackageCode) {
      case "ROOM_ONLY":
        return {
          name: t("booking.packages.roomOnly"),
          description: t("booking.packages.roomOnlyDesc"),
          icon: <Home className="h-4 w-4" />,
          basePrice: roomPrice,
          extraPrice: 0,
          features: [
            t("booking.packages.roomOnlyFeature1"),
            t("booking.packages.roomOnlyFeature2"),
          ],
        };
      case "BREAKFAST":
        return {
          name: t("booking.packages.withBreakfast"),
          description: t("booking.packages.withBreakfastDesc"),
          icon: <Coffee className="h-4 w-4" />,
          basePrice: roomPrice * 0.85, // 假设套餐加价15%
          extraPrice: roomPrice * 0.15,
          features: [
            t("booking.packages.breakfastFeature1"),
            t("booking.packages.breakfastFeature2"),
            t("booking.packages.breakfastFeature3"),
          ],
        };
      case "DINNER":
        return {
          name: t("booking.packages.withDinner"),
          description: t("booking.packages.withDinnerDesc"),
          icon: <UtensilsCrossed className="h-4 w-4" />,
          basePrice: roomPrice * 0.75, // 假设套餐加价25%
          extraPrice: roomPrice * 0.25,
          features: [
            t("booking.packages.dinnerFeature1"),
            t("booking.packages.dinnerFeature2"),
            t("booking.packages.dinnerFeature3"),
          ],
        };
      case "BREAKFAST_DINNER":
        return {
          name: t("booking.packages.breakfastDinner"),
          description: t("booking.packages.breakfastDinnerDesc"),
          icon: <UtensilsCrossed className="h-4 w-4" />,
          basePrice: roomPrice * 0.65, // 假设套餐加价35%
          extraPrice: roomPrice * 0.35,
          features: [
            t("booking.packages.fullBoardFeature1"),
            t("booking.packages.fullBoardFeature2"),
            t("booking.packages.fullBoardFeature3"),
            t("booking.packages.fullBoardFeature4"),
          ],
        };
      default:
        return {
          name: t("booking.packages.roomOnly"),
          description: t("booking.packages.roomOnlyDesc"),
          icon: <Home className="h-4 w-4" />,
          basePrice: roomPrice,
          extraPrice: 0,
          features: [t("booking.packages.roomOnlyFeature1")],
        };
    }
  };

  // 计算每晚单价
  const calculatePricePerNight = () => {
    if (nights <= 0) return 0;
    return Math.round(roomPrice / nights);
  };

  // 计算税费（假设10%）
  const calculateTax = (price: number) => {
    return price * 0.1;
  };

  // 计算总价（包含税费）
  const calculateTotal = (price: number) => {
    return price + calculateTax(price);
  };

  // 获取房间名称
  const getRoomName = () => {
    switch (roomId) {
      case "standard":
        return t("rooms.standard");
      case "deluxe":
        return t("rooms.deluxe");
      case "family":
        return t("rooms.family");
      default:
        return roomId || "";
    }
  };

  // 根据当前语言获取date-fns locale
  const getDateLocale = () => {
    switch (locale) {
      case "ja":
        return ja;
      case "zh":
        return zhCN;
      case "en":
      default:
        return enUS;
    }
  };

  // 格式化日期
  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    const dateLocale = getDateLocale();

    // 根据语言使用不同的格式
    if (locale === "ja") {
      return format(date, "yyyy年M月d日", { locale: dateLocale });
    } else if (locale === "zh") {
      return format(date, "yyyy年M月d日", { locale: dateLocale });
    } else {
      return format(date, "PPP", { locale: dateLocale });
    }
  };

  const packageInfo = getPackageInfo();
  const roomSubtotal = roomPrice;
  const tax = calculateTax(roomSubtotal);
  const total = calculateTotal(roomSubtotal);
  const pricePerNight = calculatePricePerNight();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">
          {t("booking.priceSummary")}
        </h3>
      </div>

      {nights > 0 && roomId ? (
        <div className="p-6">
          <div className="space-y-6">
            {/* 日期信息 */}
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="bg-primary/10 rounded-full p-2">
                <CalendarDays className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  {t("booking.checkIn")} - {t("booking.checkOut")}
                </p>
                <p className="font-medium text-gray-800">
                  {formatDate(checkInDate)} - {formatDate(checkOutDate)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {nights}{" "}
                  {nights === 1 ? t("booking.night") : t("booking.nights")}
                </p>
              </div>
            </div>

            {/* 客人信息 */}
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="bg-primary/10 rounded-full p-2">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{t("booking.guests")}</p>
                <p className="font-medium text-gray-800">
                  {adults} {t("booking.adults")}, {children}{" "}
                  {t("booking.children")}
                </p>
              </div>
            </div>

            {/* 套餐信息 */}
            <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
              <div className="bg-primary/10 rounded-full p-2">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {packageInfo.icon}
                  <p className="font-medium text-gray-800">
                    {packageInfo.name}
                  </p>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  {packageInfo.description}
                </p>
                <div className="space-y-1">
                  {packageInfo.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <p className="text-xs text-gray-500">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 房间和价格明细 */}
            <div className="pb-4 border-b border-gray-100">
              <div className="flex justify-between mb-2">
                <p className="text-gray-700">{getRoomName()}</p>
                <p className="text-sm text-gray-600">
                  {formatPrice(pricePerNight)} x {nights} {t("booking.nights")}
                </p>
              </div>

              <div className="space-y-2 mt-4">
                {/* 基础房费 */}
                <div className="flex justify-between">
                  <p className="text-gray-600">{t("booking.baseRoomRate")}</p>
                  <p className="text-gray-800">
                    {formatPrice(packageInfo.basePrice)}
                  </p>
                </div>

                {/* 套餐加价（如果有） */}
                {packageInfo.extraPrice > 0 && (
                  <div className="flex justify-between">
                    <p className="text-gray-600">
                      {t("booking.packageSupplement")}
                    </p>
                    <p className="text-gray-800">
                      {formatPrice(packageInfo.extraPrice)}
                    </p>
                  </div>
                )}

                {/* 小计 */}
                <div className="flex justify-between pt-2 border-t border-gray-100">
                  <p className="text-gray-600">{t("booking.roomSubtotal")}</p>
                  <p className="text-gray-800">{formatPrice(roomSubtotal)}</p>
                </div>

                {/* 税费 */}
                <div className="flex justify-between">
                  <p className="text-gray-600">{t("booking.taxesAndFees")}</p>
                  <p className="text-gray-800">{formatPrice(tax)}</p>
                </div>
              </div>
            </div>

            {/* 总价 */}
            <div className="flex justify-between pt-2 font-bold">
              <p className="text-xl text-gray-900">{t("booking.totalPrice")}</p>
              <p className="text-xl text-primary">{formatPrice(total)}</p>
            </div>

            {/* 安全提示 */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {t("booking.secureBooking")}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {t("booking.priceDisclaimer")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 text-gray-600 text-sm">
          {t("booking.selectRoomAndDates")}
        </div>
      )}

      {/* 支付方式 */}
      <div className="bg-gray-50 p-6 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <CreditCard className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium text-gray-800">
              {t("booking.acceptedPaymentMethods")}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Visa, Mastercard, American Express, JCB
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
