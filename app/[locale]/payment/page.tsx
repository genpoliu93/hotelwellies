"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/context";
import { PaymentSummary } from "@/components/payment/payment-summary";
import { CustomerInfo } from "@/components/payment/customer-info";
import { PaymentForm } from "@/components/payment/payment-form";
import { TermsConditions } from "@/components/payment/terms-conditions";

// 创建一个客户端组件来处理URL参数
function PaymentContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<{
    checkInDate: Date | null;
    checkOutDate: Date | null;
    roomId: string | null;
    price: number;
    adults: number;
    children: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    specialRequests?: string;
  }>({
    checkInDate: null,
    checkOutDate: null,
    roomId: null,
    price: 0,
    adults: 1,
    children: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
  });

  useEffect(() => {
    // 从URL参数中获取数据
    if (searchParams) {
      const checkInParam = searchParams.get("checkInDate");
      const checkOutParam = searchParams.get("checkOutDate");

      setPaymentData({
        checkInDate: checkInParam ? new Date(checkInParam) : null,
        checkOutDate: checkOutParam ? new Date(checkOutParam) : null,
        roomId: searchParams.get("roomId"),
        price: Number(searchParams.get("price") || 0),
        adults: Number(searchParams.get("adults") || 1),
        children: Number(searchParams.get("children") || 0),
        firstName: searchParams.get("firstName") || "",
        lastName: searchParams.get("lastName") || "",
        email: searchParams.get("email") || "",
        phone: searchParams.get("phone") || "",
        country: searchParams.get("country") || "jp", // 默认日本
        specialRequests: searchParams.get("specialRequests") || undefined,
      });

      setIsLoading(false);
    }
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>{t("payment.loading")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 预订摘要 */}
      <PaymentSummary
        checkInDate={paymentData.checkInDate}
        checkOutDate={paymentData.checkOutDate}
        roomId={paymentData.roomId}
        price={paymentData.price}
        adults={paymentData.adults}
        children={paymentData.children}
      />

      {/* 客人信息 */}
      <CustomerInfo
        firstName={paymentData.firstName}
        lastName={paymentData.lastName}
        email={paymentData.email}
        phone={paymentData.phone}
      />

      {/* 支付表单 */}
      <PaymentForm
        price={paymentData.price}
        checkInDate={paymentData.checkInDate}
        checkOutDate={paymentData.checkOutDate}
        roomId={paymentData.roomId}
        adults={paymentData.adults}
        children={paymentData.children}
        firstName={paymentData.firstName}
        lastName={paymentData.lastName}
        email={paymentData.email}
        phone={paymentData.phone}
        country={paymentData.country}
        specialRequests={paymentData.specialRequests}
      />

      {/* 条款和条件 */}
      <TermsConditions />
    </div>
  );
}

// 使用Suspense包裹客户端组件
export default function PaymentPage() {
  const { t } = useLanguage();

  return (
    <div className="py-16 bg-[#f8f9fa]">
      <div className="container">
        {/* 页面标题 */}
        <div className="relative h-60 rounded-xl overflow-hidden mb-10">
          <Image
            src="/images/payment-banner.jpg"
            alt={t("payment.title")}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white">
              {t("payment.title")}
            </h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Suspense
            fallback={
              <div className="text-center py-10">
                <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p>{t("payment.loading")}</p>
              </div>
            }
          >
            <PaymentContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
