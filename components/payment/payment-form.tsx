"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";
import { CreditCard, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { BookingConfirmation } from "./booking-confirmation";

interface PaymentFormProps {
  price: number;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  roomId: string | null;
  adults: number;
  children: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  specialRequests?: string;
}

declare global {
  interface Window {
    Square?: any;
  }
}

export function PaymentForm({
  price,
  checkInDate,
  checkOutDate,
  roomId,
  adults,
  children,
  firstName,
  lastName,
  email,
  phone,
  country,
  specialRequests,
}: PaymentFormProps) {
  const { t, locale } = useLanguage();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [squareInitialized, setSquareInitialized] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [bookingReference, setBookingReference] = useState("");
  const [card, setCard] = useState<any>(null);
  const [paymentId, setPaymentId] = useState<string>("");

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

  // 加载Square JS库
  useEffect(() => {
    const loadSquare = async () => {
      setIsLoading(true);

      try {
        if (!document.getElementById("square-script")) {
          const script = document.createElement("script");
          script.id = "square-script";
          script.src = "https://web.squarecdn.com/v1/square.js";
          script.onload = () => initializeSquare();
          document.body.appendChild(script);
        } else {
          initializeSquare();
        }
      } catch (error) {
        console.error("Failed to load Square Web Payments SDK:", error);
        setIsLoading(false);
      }
    };

    loadSquare();

    return () => {
      // 清理Square卡片实例
      if (card) {
        try {
          card.destroy();
        } catch (error) {
          console.error("Failed to destroy card instance:", error);
        }
      }
    };
  }, []);

  // 初始化Square支付
  const initializeSquare = async () => {
    if (!window.Square) {
      console.error("Square library not loaded");
      setIsLoading(false);
      return;
    }

    try {
      // 这里使用的是Square的测试应用ID和位置ID
      // 在生产环境中需要替换为实际的ID
      const appId = "sq0idp-cw6HsX87fmoRJWJ3X3yi2A"; // 替换为实际ID
      const locationId = "LOCATION_ID"; // 替换为实际ID

      const payments = window.Square.payments(appId, locationId);
      const card = await payments.card();

      await card.attach("#card-container");
      setCard(card);
      setSquareInitialized(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to initialize Square:", error);
      setIsLoading(false);
    }
  };

  // 处理支付提交
  const handlePaymentSubmit = async () => {
    if (!card || isProcessing) return;

    setIsProcessing(true);

    try {
      const result = await card.tokenize();

      if (result.status === "OK") {
        // 这里应该调用后端API处理实际支付
        // 示例中使用模拟成功的方式
        // await processPayment(result.token);

        // 模拟成功支付
        setTimeout(() => {
          // 生成随机预订参考号
          const reference = generateBookingReference();
          setBookingReference(reference);

          // 生成随机支付ID
          const payId = generatePaymentId();
          setPaymentId(payId);

          setPaymentSuccess(true);
          setIsProcessing(false);

          toast({
            title: t("payment.paymentSuccessful"),
            description: t("payment.confirmationSent"),
          });
        }, 2000);
      } else {
        throw new Error("支付卡信息处理失败");
      }
    } catch (error) {
      console.error("Payment failed:", error);
      setIsProcessing(false);

      toast({
        title: t("payment.paymentFailed"),
        description: t("payment.tryAgain"),
        variant: "destructive",
      });
    }
  };

  // 生成预订参考号
  const generateBookingReference = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // 生成支付ID
  const generatePaymentId = () => {
    return `pay_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  };

  if (paymentSuccess) {
    return (
      <BookingConfirmation
        bookingReference={bookingReference}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        roomType={getRoomName()}
        price={price}
        guests={{
          adults,
          children,
        }}
        customer={{
          firstName,
          lastName,
          email,
          phone,
          country,
          specialRequests,
        }}
        payment={{
          method: t("payment.creditCard"),
          status: "COMPLETED",
          id: paymentId,
        }}
      />
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">
          {t("payment.paymentMethod")}
        </h2>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="bg-primary/10 rounded-full p-2">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-gray-800">
                {t("payment.creditCard")}
              </p>
            </div>
          </div>

          <div className="relative min-h-[150px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                <span className="ml-3 text-gray-600">
                  {t("payment.loadingPayment")}
                </span>
              </div>
            ) : (
              <>
                <div id="card-container" className="mb-6"></div>
                {!squareInitialized && (
                  <div className="text-amber-600 text-sm mt-2">
                    {t("payment.squareNotInitialized")}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div className="text-lg font-semibold text-gray-800">
                {t("payment.totalToPay")}
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {formatPrice(price * 1.1)}
              </div>
            </div>

            <Button
              onClick={handlePaymentSubmit}
              disabled={isLoading || isProcessing || !squareInitialized}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium"
            >
              {isProcessing ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                  {t("payment.processing")}
                </>
              ) : (
                t("payment.completeBooking")
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
