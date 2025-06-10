"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";
import { CreditCard, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { BookingConfirmation } from "./booking-confirmation";
import { processPayment } from "@/lib/api";
import {
  buildBookingInfo,
  buildCustomerInfo,
  buildPaymentRequest,
  validatePaymentData,
  generateBookingReference,
} from "@/lib/utils/payment";

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
  arrivalTime: string;
  specialRequests?: string;
  selectedPackageCode?: string;
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
  arrivalTime,
  specialRequests,
  selectedPackageCode = "ROOM_ONLY",
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

  // 使用ref来防止重复初始化
  const isInitializing = useRef(false);
  const hasInitialized = useRef(false);

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
    // 如果已经初始化过，直接返回
    if (hasInitialized.current) {
      return;
    }

    const loadSquare = async () => {
      setIsLoading(true);

      try {
        // 检查脚本是否存在
        let script = document.getElementById(
          "square-script"
        ) as HTMLScriptElement;
        const isNewScript = !script;

        if (!script) {
          // 创建新脚本
          script = document.createElement("script");
          script.id = "square-script";
          script.src = "https://web.squarecdn.com/v1/square.js";
          script.crossOrigin = "anonymous";
          document.body.appendChild(script);
        }

        // 等待脚本加载完成
        await new Promise<void>((resolve, reject) => {
          if (window.Square) {
            resolve();
            return;
          }

          if (isNewScript) {
            // 如果是新创建的脚本，监听加载事件
            script.onload = () => resolve();
            script.onerror = () =>
              reject(new Error("Failed to load Square SDK"));
          } else {
            // 如果脚本已存在，轮询检查Square对象
            const checkSquare = () => {
              if (window.Square) {
                resolve();
              } else {
                setTimeout(checkSquare, 100);
              }
            };
            checkSquare();
          }

          // 超时处理
          setTimeout(() => reject(new Error("Square SDK load timeout")), 10000);
        });

        // 初始化Square
        await initializeSquare();
      } catch (error) {
        console.error("Failed to load Square Web Payments SDK:", error);
        setIsLoading(false);
        toast({
          title: t("payment.loadingError"),
          description: t("payment.squareLoadError"),
          variant: "destructive",
        });
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
      // 重置状态
      isInitializing.current = false;
      hasInitialized.current = false;
    };
  }, []);

  // 初始化Square支付
  const initializeSquare = async () => {
    // 使用ref进行更强的防护
    if (isInitializing.current || hasInitialized.current) {
      console.log("Square initialization already in progress or completed");
      return;
    }

    if (!window.Square) {
      console.error("Square library not loaded");
      setIsLoading(false);
      return;
    }

    isInitializing.current = true;

    // 等待DOM元素渲染的函数
    const waitForElement = (selector: string, timeout = 5000) => {
      return new Promise<HTMLElement>((resolve, reject) => {
        const element = document.querySelector(selector) as HTMLElement;
        if (element) {
          resolve(element);
          return;
        }

        const observer = new MutationObserver(() => {
          const element = document.querySelector(selector) as HTMLElement;
          if (element) {
            observer.disconnect();
            resolve(element);
          }
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });

        setTimeout(() => {
          observer.disconnect();
          reject(
            new Error(`Element ${selector} not found within ${timeout}ms`)
          );
        }, timeout);
      });
    };

    try {
      console.log("Starting Square initialization...");

      // 先设置loading为false，让DOM元素渲染
      setIsLoading(false);

      // 等待card-container元素出现
      const cardContainer = await waitForElement("#card-container");

      // 清空容器内容
      cardContainer.innerHTML = "";

      // 从环境变量获取Square配置
      const appId =
        process.env.NEXT_PUBLIC_SQUARE_APP_ID ||
        "sq0idp-vHpcsRYlmu4NS9oIvzPh1A";
      const locationId =
        process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID || "L30PM4WEJ0WAK";

      const payments = window.Square.payments(appId, locationId);
      const newCard = await payments.card();

      await newCard.attach("#card-container");

      setCard(newCard);
      setSquareInitialized(true);
      hasInitialized.current = true;

      console.log("Square initialized successfully");
    } catch (error) {
      console.error("Failed to initialize Square:", error);
      setIsLoading(false);
      toast({
        title: t("payment.loadingError"),
        description: t("payment.squareLoadError"),
        variant: "destructive",
      });
    } finally {
      isInitializing.current = false;
    }
  };

  // 处理支付提交
  const handlePaymentSubmit = async () => {
    if (!card || isProcessing) return;

    setIsProcessing(true);

    try {
      // 1. 验证支付数据
      const validation = validatePaymentData(
        checkInDate,
        checkOutDate,
        firstName,
        lastName,
        email,
        phone,
        specialRequests
      );

      if (!validation.isValid) {
        throw new Error(validation.errors.join(", "));
      }

      // 2. 获取支付令牌
      const result = await card.tokenize();

      if (result.status !== "OK") {
        throw new Error("支付卡信息处理失败");
      }

      // 3. 构建支付请求数据
      const totalPrice = price * 1.1; // 包含税费
      const bookingInfo = buildBookingInfo(
        roomId,
        checkInDate,
        checkOutDate,
        adults,
        children,
        totalPrice,
        selectedPackageCode
      );

      const customerInfo = buildCustomerInfo(
        firstName,
        lastName,
        email,
        phone,
        country,
        specialRequests
      );

      const paymentRequest = buildPaymentRequest(
        result.token,
        totalPrice,
        bookingInfo,
        customerInfo,
        getDomain()
      );

      // 4. 调用后端支付API
      const paymentResponse = await processPayment(paymentRequest);

      if (paymentResponse.success) {
        // 支付成功
        const reference = generateBookingReference();
        setBookingReference(reference);
        setPaymentId(paymentResponse.paymentId || "");
        setPaymentSuccess(true);

        toast({
          title: t("payment.paymentSuccessful"),
          description: t("payment.confirmationSent"),
        });
      } else {
        throw new Error(paymentResponse.message || "支付处理失败");
      }
    } catch (error) {
      console.error("Payment failed:", error);

      let errorTitle = t("payment.paymentFailed");
      let errorMessage = t("payment.tryAgain");

      if (error instanceof Error) {
        const message = error.message.toLowerCase();

        if (message.includes("validation") || message.includes("验证")) {
          errorTitle = t("payment.validationError");
          errorMessage = error.message;
        } else if (message.includes("network") || message.includes("fetch")) {
          errorTitle = t("payment.networkError");
          errorMessage = t("payment.networkError");
        } else if (message.includes("server") || message.includes("500")) {
          errorTitle = t("payment.serverError");
          errorMessage = t("payment.serverError");
        } else {
          errorMessage = error.message;
        }
      }

      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // 获取域名配置（可以从环境变量或配置中获取）
  const getDomain = () => {
    return process.env.NEXT_PUBLIC_PAYMENT_DOMAIN || "hotelwellies.jp";
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
                {!squareInitialized && !isLoading && (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full"></div>
                    <span className="ml-3 text-amber-600 text-sm">
                      {t("payment.squareNotInitialized")}
                    </span>
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
