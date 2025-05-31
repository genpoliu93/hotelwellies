"use client";

import { useState } from "react";
import { DatePicker } from "./date-picker";
import { GuestSelector } from "./guest-selector";
import { RoomSelector } from "./room-selector";
import { GuestInfoForm, type GuestFormData } from "./guest-info-form";
import { PriceSummary } from "./price-summary";
import { HelpCard } from "./help-card";
import { useLanguage } from "@/lib/i18n/context";
import { toast } from "@/hooks/use-toast";
import { Steps, Step } from "./steps";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

export function BookingForm() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [selectedPackageCode, setSelectedPackageCode] =
    useState<string>("ROOM_ONLY");
  const [roomPrice, setRoomPrice] = useState(0); // 选中套餐的总价
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 计算住宿天数
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();

  // 处理房间和套餐选择
  const handleRoomAndPackageSelect = (
    roomId: string,
    packageCode: string,
    price: number
  ) => {
    setSelectedRoomId(roomId);
    setSelectedPackageCode(packageCode);
    setRoomPrice(price);

    if (currentStep === 1) {
      setCurrentStep(2);
      // 滚动到表单顶部
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleGuestInfoSubmit = (data: GuestFormData) => {
    setIsSubmitting(true);

    // 模拟API调用
    setTimeout(() => {
      setIsSubmitting(false);

      // 显示成功消息
      toast({
        title: t("booking.bookingSuccessful"),
        description: t("booking.bookingConfirmationSent"),
      });

      // 重置表单（在实际应用中，可能会重定向到确认页面）
      setCurrentStep(1);
      setCheckInDate(undefined);
      setCheckOutDate(undefined);
      setAdults(2);
      setChildren(0);
      setSelectedRoomId(null);
      setSelectedPackageCode("ROOM_ONLY");
      setRoomPrice(0);
    }, 2000);
  };

  return (
    <div className="py-16 bg-[#f8f9fa]">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <Steps currentStep={currentStep}>
              <Step number={1} title={t("booking.selectRoom")} />
              <Step number={2} title={t("booking.guestDetails")} />
            </Steps>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {currentStep === 1 ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-8"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-primary rounded-full"></div>
                      {t("booking.searchRooms")}
                    </h3>
                    <div className="space-y-6">
                      <div className="p-6 bg-gray-50/50 rounded-lg border border-gray-200">
                        <DatePicker
                          checkInDate={checkInDate}
                          checkOutDate={checkOutDate}
                          onCheckInChange={setCheckInDate}
                          onCheckOutChange={setCheckOutDate}
                        />

                        {/* 显示选择的天数和晚数 */}
                        {checkInDate && checkOutDate && nights > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className="bg-primary/10 rounded-full p-2">
                                <CalendarDays className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-800">
                                  {nights + 1} 天 {nights}{" "}
                                  {nights === 1
                                    ? t("booking.night")
                                    : t("booking.nights")}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {checkInDate.toLocaleDateString()} -{" "}
                                  {checkOutDate.toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                      <div className="p-6 bg-gray-50/50 rounded-lg border border-gray-200">
                        <GuestSelector
                          adults={adults}
                          children={children}
                          onAdultsChange={setAdults}
                          onChildrenChange={setChildren}
                        />
                      </div>
                    </div>
                  </motion.div>

                  <RoomSelector
                    checkInDate={checkInDate}
                    checkOutDate={checkOutDate}
                    adults={adults}
                    children={children}
                    onRoomAndPackageSelect={handleRoomAndPackageSelect}
                    selectedRoomId={selectedRoomId}
                    selectedPackageCode={selectedPackageCode}
                  />
                </>
              ) : (
                <GuestInfoForm
                  onSubmit={handleGuestInfoSubmit}
                  isSubmitting={isSubmitting}
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  roomId={selectedRoomId}
                  roomPrice={roomPrice}
                  adults={adults}
                  children={children}
                  selectedPackageCode={selectedPackageCode}
                />
              )}
            </div>

            <div className="space-y-6">
              <PriceSummary
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
                roomPrice={roomPrice}
                roomId={selectedRoomId}
                adults={adults}
                children={children}
                selectedPackageCode={selectedPackageCode}
              />

              <HelpCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
