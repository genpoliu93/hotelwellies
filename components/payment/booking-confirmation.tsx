"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Printer,
  CreditCard,
  BookmarkCheck,
  CalendarDays,
  User,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Image from "next/image";

interface BookingConfirmationProps {
  bookingReference: string;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  roomType: string;
  price: number;
  guests: {
    adults: number;
    children: number;
  };
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    specialRequests?: string;
  };
  payment: {
    method: string;
    status: string;
    id?: string;
  };
}

export function BookingConfirmation({
  bookingReference,
  checkInDate,
  checkOutDate,
  roomType,
  price,
  guests,
  customer,
  payment,
}: BookingConfirmationProps) {
  const { t, locale } = useLanguage();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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

  // 格式化日期
  const formatDate = (date: Date | null) => {
    if (!date) return "";

    if (locale === "ja") {
      return `${date.getFullYear()}年${
        date.getMonth() + 1
      }月${date.getDate()}日`;
    } else if (locale === "zh") {
      return `${date.getFullYear()}年${
        date.getMonth() + 1
      }月${date.getDate()}日`;
    } else {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  };

  // 获取当前日期和时间
  const getCurrentDateTime = () => {
    const now = new Date();

    if (locale === "ja") {
      return `${now.getFullYear()}年${
        now.getMonth() + 1
      }月${now.getDate()}日 ${now.getHours()}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`;
    } else if (locale === "zh") {
      return `${now.getFullYear()}年${
        now.getMonth() + 1
      }月${now.getDate()}日 ${now.getHours()}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`;
    } else {
      return now.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    }
  };

  // 计算住宿天数
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // 处理打印功能
  const handlePrint = () => {
    window.print();
  };

  // 处理返回首页
  const handleBackToHome = () => {
    router.push(`/${locale}`);
  };

  return (
    <div className="py-16 bg-[#f8f9fa]">
      <div className="container">
        {/* 页面标题 */}
        <div className="relative h-60 rounded-xl overflow-hidden mb-10">
          <Image
            src="/images/payment-banner.jpg"
            alt={t("payment.confirmationTitle")}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white">
              {t("payment.confirmationTitle")}
            </h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="text-center py-10">
              <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>{t("payment.loading")}</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* 预订完成消息 */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
                  <CheckCircle className="h-10 w-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {t("payment.bookingCompleted")}
                </h2>
                <p className="text-gray-600">
                  {t("payment.confirmationEmailSent")}
                </p>
              </div>

              {/* 预订号和日期 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className="mb-4 md:mb-0">
                      <h5 className="text-sm text-gray-500 mb-1">
                        {t("payment.bookingReference")}
                      </h5>
                      <div className="flex items-center">
                        <BookmarkCheck className="h-5 w-5 text-primary mr-2" />
                        <span className="text-xl font-bold text-gray-800">
                          {bookingReference}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm text-gray-500 mb-1">
                        {t("payment.bookingDate")}
                      </h5>
                      <div className="text-gray-700">
                        {getCurrentDateTime()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 预订详情 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {t("payment.stayInformation")}
                  </h3>
                </div>
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-6 md:mb-0">
                      <h4 className="text-lg font-medium text-gray-800 mb-4">
                        {roomType}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="flex items-center mb-1">
                            <CalendarDays className="h-4 w-4 text-primary mr-2" />
                            <span className="text-sm text-gray-500">
                              {t("booking.checkIn")}
                            </span>
                          </div>
                          <div className="text-gray-700">
                            {formatDate(checkInDate)}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center mb-1">
                            <CalendarDays className="h-4 w-4 text-primary mr-2" />
                            <span className="text-sm text-gray-500">
                              {t("booking.checkOut")}
                            </span>
                          </div>
                          <div className="text-gray-700">
                            {formatDate(checkOutDate)}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-700">
                            <span className="text-gray-500 mr-2">
                              {t("booking.guests")}:
                            </span>
                            {guests.adults} {t("booking.adults")},{" "}
                            {guests.children} {t("booking.children")}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-700">
                            <span className="text-gray-500 mr-2">
                              {t("payment.stayDuration")}:
                            </span>
                            {calculateNights()}{" "}
                            {calculateNights() === 1
                              ? t("booking.night")
                              : t("booking.nights")}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {formatPrice(price)}
                      </div>
                      <p className="text-sm text-gray-500">
                        {t("booking.priceDisclaimer")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 客户信息 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {t("payment.customerInformation")}
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center mb-3">
                        <User className="h-5 w-5 text-primary mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">
                            {t("booking.name")}
                          </p>
                          <p className="font-medium">
                            {customer.firstName} {customer.lastName}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-primary mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">
                            {t("booking.email")}
                          </p>
                          <p className="font-medium">{customer.email}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center mb-3">
                        <Phone className="h-5 w-5 text-primary mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">
                            {t("booking.phone")}
                          </p>
                          <p className="font-medium">{customer.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-primary mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">
                            {t("booking.country")}
                          </p>
                          <p className="font-medium">{customer.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {customer.specialRequests && (
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <h4 className="text-md font-medium text-gray-700 mb-2">
                        {t("booking.specialRequests")}
                      </h4>
                      <p className="text-gray-600 italic">
                        {customer.specialRequests}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* 支付信息 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {t("payment.paymentInformation")}
                  </h3>
                </div>
                <div className="p-6">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="bg-primary/10 rounded-full p-3 mr-4">
                        <CreditCard className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-800">
                          {payment.method}
                        </h4>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-gray-500 mr-2">
                            {t("payment.status")}:
                          </span>
                          <span
                            className={`text-sm font-medium ${
                              payment.status === "COMPLETED" ||
                              payment.status === "APPROVED"
                                ? "text-green-600"
                                : payment.status === "PENDING"
                                ? "text-amber-600"
                                : "text-red-600"
                            }`}
                          >
                            {payment.status === "COMPLETED" ||
                            payment.status === "APPROVED"
                              ? t("payment.statusCompleted")
                              : payment.status === "PENDING"
                              ? t("payment.statusPending")
                              : t("payment.statusFailed")}
                          </span>
                        </div>
                      </div>
                    </div>

                    {payment.id && (
                      <div className="mb-4 md:mb-0 md:mx-4">
                        <p className="text-sm text-gray-500 mb-1">
                          {t("payment.paymentId")}
                        </p>
                        <p className="font-medium text-gray-700">
                          {payment.id}
                        </p>
                      </div>
                    )}

                    <div className="text-center md:text-right">
                      <p className="text-sm text-gray-500 mb-1">
                        {t("payment.totalAmount")}
                      </p>
                      <div className="text-2xl font-bold text-gray-900">
                        {formatPrice(price)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 按钮 */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <Button
                  onClick={handleBackToHome}
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2"
                >
                  {t("payment.backToHome")}
                </Button>
                <Button
                  onClick={handlePrint}
                  variant="outline"
                  className="w-full sm:w-auto border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  {t("payment.printConfirmation")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
