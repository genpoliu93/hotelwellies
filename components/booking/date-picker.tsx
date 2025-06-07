"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, ArrowRight, Clock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/context";
import { motion, AnimatePresence } from "framer-motion";
import {
  formatDateDisplay,
  formatDateRange,
  getDateFnsLocale,
  type SupportedLocale,
} from "@/lib/utils/date";

interface DatePickerProps {
  checkInDate: Date | undefined;
  checkOutDate: Date | undefined;
  onCheckInChange: (date: Date | undefined) => void;
  onCheckOutChange: (date: Date | undefined) => void;
}

interface QuickDateOption {
  label: string;
  nights: number;
  icon?: React.ReactNode;
}

export function DatePicker({
  checkInDate,
  checkOutDate,
  onCheckInChange,
  onCheckOutChange,
}: DatePickerProps) {
  const { t, locale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<"checkin" | "checkout">(
    "checkin"
  );
  const [tempCheckIn, setTempCheckIn] = useState<Date | undefined>(checkInDate);
  const [tempCheckOut, setTempCheckOut] = useState<Date | undefined>(
    checkOutDate
  );

  // 今天的日期
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 获取默认可选的起始日期（跳过被禁用的日期）
  const getDefaultStartDate = () => {
    let startDate = new Date(today);
    while (isDateBlocked(startDate) || startDate < today) {
      startDate.setDate(startDate.getDate() + 1);
    }
    return startDate;
  };

  // 禁用6月7日-8日
  const isDateBlocked = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth()返回0-11，需要+1
    const day = date.getDate();

    const blocked = year === 2025 && month === 6 && (day === 7 || day === 8);

    // 临时调试信息
    if (blocked) {
      console.log(`日期被禁用: ${year}-${month}-${day}`);
    }

    return blocked;
  };

  // 获取date-fns locale对象
  const dateLocale = getDateFnsLocale(locale as SupportedLocale);

  // 快捷日期选项（减少选项）
  const quickDateOptions: QuickDateOption[] = [
    { label: t("booking.quickDates.weekend"), nights: 2 },
    { label: t("booking.quickDates.week"), nights: 7 },
  ];

  // 计算住宿天数
  const calculateNights = (
    checkIn: Date | undefined,
    checkOut: Date | undefined
  ) => {
    if (!checkIn || !checkOut) return 0;
    const diffTime = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights(checkInDate, checkOutDate);

  // 格式化日期显示
  const formatDate = (date: Date | undefined, isShort = false) => {
    if (!date) return "";
    return formatDateDisplay(date, locale as SupportedLocale, {
      showRelative: true,
      useShortFormat: isShort,
    });
  };

  // 处理快捷日期选择
  const handleQuickDate = (nights: number) => {
    let startDate = tempCheckIn || getDefaultStartDate();

    // 如果起始日期被禁用，寻找下一个可用日期
    while (isDateBlocked(startDate) || startDate < today) {
      startDate = new Date(startDate);
      startDate.setDate(startDate.getDate() + 1);
    }

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + nights);

    setTempCheckIn(startDate);
    setTempCheckOut(endDate);
    setActiveStep("checkout");
  };

  // 处理入住日期选择
  const handleCheckInSelect = (date: Date | undefined) => {
    setTempCheckIn(date);
    if (date) {
      setActiveStep("checkout");
    }
  };

  // 处理退房日期选择
  const handleCheckOutSelect = (date: Date | undefined) => {
    setTempCheckOut(date);
  };

  // 确认选择
  const handleConfirm = () => {
    onCheckInChange(tempCheckIn);
    onCheckOutChange(tempCheckOut);
    setIsOpen(false);
  };

  // 重置选择
  const handleReset = () => {
    setTempCheckIn(undefined);
    setTempCheckOut(undefined);
    setActiveStep("checkin");
  };

  // 当外部日期变化时同步内部状态
  useEffect(() => {
    setTempCheckIn(checkInDate);
    setTempCheckOut(checkOutDate);
  }, [checkInDate, checkOutDate]);

  // 生成主按钮显示文本
  const getMainButtonText = () => {
    if (checkInDate && checkOutDate) {
      const range = formatDateRange(
        checkInDate,
        checkOutDate,
        locale as SupportedLocale,
        { showRelative: true, separator: " → " }
      );
      return `${range} (${nights} ${
        nights === 1 ? t("booking.night") : t("booking.nights")
      })`;
    }
    return t("booking.selectDates");
  };

  return (
    <div className="w-full">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-between text-left font-normal bg-white border-2 border-gray-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 shadow-sm",
              !checkInDate && "text-gray-500",
              "h-12 px-4"
            )}
          >
            <div className="flex items-center">
              <CalendarIcon className="mr-3 h-4 w-4 text-primary" />
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 mb-0.5">
                  {t("booking.stayDates")}
                </span>
                <span className="text-sm font-medium">
                  {getMainButtonText()}
                </span>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-auto p-0 border border-gray-200 shadow-xl"
          align="start"
          side="bottom"
          sideOffset={8}
        >
          <div className="bg-white rounded-lg overflow-hidden w-auto min-w-[300px]">
            {/* 头部 - 简化 */}
            <div className="p-3 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-800 text-sm">
                  {t("booking.selectDates")}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="text-gray-500 hover:text-gray-700 h-6 px-2 text-xs"
                >
                  {t("booking.reset")}
                </Button>
              </div>

              {/* 步骤指示器 - 简化 */}
              <div className="flex items-center gap-2 mt-2">
                <div
                  className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors",
                    activeStep === "checkin"
                      ? "bg-primary text-white"
                      : tempCheckIn
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  )}
                >
                  <span>1</span>
                  <span>{t("booking.checkIn")}</span>
                </div>
                <ArrowRight className="h-3 w-3 text-gray-400" />
                <div
                  className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors",
                    activeStep === "checkout"
                      ? "bg-primary text-white"
                      : tempCheckOut
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  )}
                >
                  <span>2</span>
                  <span>{t("booking.checkOut")}</span>
                </div>
              </div>
            </div>

            {/* 快捷选择 - 简化 */}
            <div className="p-3 border-b border-gray-100">
              <div className="flex gap-2">
                {quickDateOptions.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickDate(option.nights)}
                    className="flex-1 h-7 text-xs hover:bg-primary/5 hover:border-primary/30"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* 日历区域 - 紧凑 */}
            <div className="p-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                >
                  {activeStep === "checkin" ? (
                    <div>
                      <p className="text-xs font-medium text-gray-700 mb-2">
                        {t("booking.selectCheckIn")}
                      </p>
                      <Calendar
                        mode="range"
                        selected={{
                          from: tempCheckIn,
                          to: tempCheckOut,
                        }}
                        onSelect={(range) => {
                          if (range?.from) {
                            handleCheckInSelect(range.from);
                          }
                        }}
                        disabled={(date) => date < today || isDateBlocked(date)}
                        locale={dateLocale}
                        className="rounded-md border-0 w-full"
                        classNames={{
                          months: "flex flex-col space-y-4 w-full",
                          month: "space-y-4 w-full",
                          caption:
                            "flex justify-center pt-1 relative items-center w-full",
                          caption_label: "text-sm font-medium",
                          nav: "space-x-1 flex items-center",
                          nav_button:
                            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                          nav_button_previous: "absolute left-1",
                          nav_button_next: "absolute right-1",
                          table: "w-full border-collapse",
                          head_row: "flex w-full",
                          head_cell:
                            "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] text-center",
                          row: "flex w-full mt-1",
                          cell: "flex-1 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
                          day: "h-8 w-full p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors",
                          day_selected:
                            "bg-primary text-white hover:bg-primary/90 rounded-md",
                          day_today: "bg-primary/10 text-primary font-semibold",
                          day_outside: "text-muted-foreground opacity-50",
                          day_disabled: "text-muted-foreground opacity-50",
                          day_range_start:
                            "bg-primary text-white hover:bg-primary/90 rounded-l-md rounded-r-none shadow-md",
                          day_range_end:
                            "bg-primary text-white hover:bg-primary/90 rounded-r-md rounded-l-none shadow-md",
                          day_range_middle:
                            "bg-primary/15 text-primary hover:bg-primary/25 rounded-none border-y border-primary/10",
                          day_hidden: "invisible",
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs font-medium text-gray-700 mb-2">
                        {t("booking.selectCheckOut")}
                      </p>
                      <Calendar
                        mode="range"
                        selected={{
                          from: tempCheckIn,
                          to: tempCheckOut,
                        }}
                        onSelect={(range) => {
                          if (range?.to && tempCheckIn) {
                            handleCheckOutSelect(range.to);
                          } else if (range?.from && !tempCheckIn) {
                            handleCheckInSelect(range.from);
                          }
                        }}
                        disabled={(date) => {
                          if (date < today) return true;
                          if (isDateBlocked(date)) return true;
                          if (tempCheckIn && date <= tempCheckIn) return true;
                          return false;
                        }}
                        defaultMonth={tempCheckIn}
                        locale={dateLocale}
                        className="rounded-md border-0 w-full"
                        classNames={{
                          months: "flex flex-col space-y-4 w-full",
                          month: "space-y-4 w-full",
                          caption:
                            "flex justify-center pt-1 relative items-center w-full",
                          caption_label: "text-sm font-medium",
                          nav: "space-x-1 flex items-center",
                          nav_button:
                            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                          nav_button_previous: "absolute left-1",
                          nav_button_next: "absolute right-1",
                          table: "w-full border-collapse",
                          head_row: "flex w-full",
                          head_cell:
                            "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] text-center",
                          row: "flex w-full mt-1",
                          cell: "flex-1 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
                          day: "h-8 w-full p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors",
                          day_selected:
                            "bg-primary text-white hover:bg-primary/90 rounded-md",
                          day_today: "bg-primary/10 text-primary font-semibold",
                          day_outside: "text-muted-foreground opacity-50",
                          day_disabled: "text-muted-foreground opacity-50",
                          day_range_start:
                            "bg-primary text-white hover:bg-primary/90 rounded-l-md rounded-r-none shadow-md",
                          day_range_end:
                            "bg-primary text-white hover:bg-primary/90 rounded-r-md rounded-l-none shadow-md",
                          day_range_middle:
                            "bg-primary/15 text-primary hover:bg-primary/25 rounded-none border-y border-primary/10",
                          day_hidden: "invisible",
                        }}
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* 当前选择预览 - 简化 */}
              {tempCheckIn && tempCheckOut && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 p-2 bg-primary/5 border border-primary/20 rounded-md"
                >
                  <div className="text-center">
                    <p className="text-xs text-primary font-medium">
                      {formatDate(tempCheckIn, true)} →{" "}
                      {formatDate(tempCheckOut, true)}
                    </p>
                    <p className="text-xs text-primary/70 mt-0.5">
                      {calculateNights(tempCheckIn, tempCheckOut)}{" "}
                      {t("booking.nights")}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* 底部操作 - 简化 */}
            <div className="p-3 border-t border-gray-100 bg-gray-50">
              <div className="flex gap-2">
                {activeStep === "checkout" && tempCheckIn && (
                  <Button
                    variant="outline"
                    onClick={() => setActiveStep("checkin")}
                    className="flex-1 h-8 text-xs"
                  >
                    {t("booking.back")}
                  </Button>
                )}
                <Button
                  onClick={handleConfirm}
                  disabled={!tempCheckIn || !tempCheckOut}
                  className="flex-1 h-8 text-xs bg-primary hover:bg-primary/90"
                >
                  {t("booking.confirm")}
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* 选择结果显示 - 简化 */}
      <AnimatePresence>
        {checkInDate && checkOutDate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-md p-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/20 rounded-full p-1">
                    <CalendarIcon className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-800">
                      {formatDate(checkInDate, true)} →{" "}
                      {formatDate(checkOutDate, true)}
                    </p>
                    <p className="text-xs text-gray-600">
                      {nights}{" "}
                      {nights === 1 ? t("booking.night") : t("booking.nights")}{" "}
                      •{nights + 1} {t("booking.days")}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(true)}
                  className="text-primary hover:text-primary/80 hover:bg-primary/10 h-6 px-2 text-xs"
                >
                  {t("booking.change")}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
