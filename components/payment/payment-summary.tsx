"use client";

import { useLanguage } from "@/lib/i18n/context";
import { CalendarDays, Users } from "lucide-react";
import { format } from "date-fns";
import { ja, enUS, zhCN } from "date-fns/locale";

interface PaymentSummaryProps {
  checkInDate: Date | null;
  checkOutDate: Date | null;
  roomId: string | null;
  price: number;
  adults: number;
  children: number;
}

export function PaymentSummary({
  checkInDate,
  checkOutDate,
  roomId,
  price,
  adults,
  children,
}: PaymentSummaryProps) {
  const { t, locale } = useLanguage();

  // 计算住宿天数
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();

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
  const formatDate = (date: Date | null) => {
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

  // 计算税费（10%）
  const tax = price * 0.1;
  const totalPrice = price + tax;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">
          {t("payment.reservationSummary")}
        </h2>
      </div>

      <div className="p-6">
        <div className="space-y-6">
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

          <div className="pb-4 border-b border-gray-100">
            <h3 className="font-medium text-gray-800 mb-3">{getRoomName()}</h3>

            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-gray-600">{t("booking.roomSubtotal")}</p>
                <p className="text-gray-800">{formatPrice(price)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">{t("booking.taxesAndFees")}</p>
                <p className="text-gray-800">{formatPrice(tax)}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-2 font-bold">
            <p className="text-gray-900">{t("booking.totalPrice")}</p>
            <p className="text-gray-900">{formatPrice(totalPrice)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
