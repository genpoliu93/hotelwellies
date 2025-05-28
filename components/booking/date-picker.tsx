"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ja, enUS, zhCN } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/context";

interface DatePickerProps {
  checkInDate: Date | undefined;
  checkOutDate: Date | undefined;
  onCheckInChange: (date: Date | undefined) => void;
  onCheckOutChange: (date: Date | undefined) => void;
}

export function DatePicker({
  checkInDate,
  checkOutDate,
  onCheckInChange,
  onCheckOutChange,
}: DatePickerProps) {
  const { t, locale } = useLanguage();
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);
  const [checkOutCalendarMonth, setCheckOutCalendarMonth] = useState<
    Date | undefined
  >(undefined);

  // 当チェックイン日期改变时，更新チェックアウト日历的默认显示月份
  useEffect(() => {
    if (checkInDate) {
      setCheckOutCalendarMonth(new Date(checkInDate));
    }
  }, [checkInDate]);

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

  // 格式化日期显示
  const formatDate = (date: Date) => {
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

  // 计算最小退房日期（入住日期后一天）
  const minCheckoutDate = checkInDate ? new Date(checkInDate) : undefined;
  if (minCheckoutDate) {
    minCheckoutDate.setDate(minCheckoutDate.getDate() + 1);
  }

  // 今天的日期（用于禁用过去的日期）
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <label className="block text-sm font-medium mb-2 text-gray-700">
          {t("booking.checkIn")}
        </label>
        <Popover open={isCheckInOpen} onOpenChange={setIsCheckInOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal bg-white border-gray-300 hover:bg-gray-50 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 shadow-sm",
                !checkInDate && "text-gray-500",
                "h-12"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
              {checkInDate ? formatDate(checkInDate) : t("booking.selectDate")}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 border border-gray-200 shadow-lg"
            align="start"
          >
            <Calendar
              mode="single"
              selected={checkInDate}
              onSelect={(date) => {
                onCheckInChange(date);
                setIsCheckInOpen(false);

                // 如果选择了入住日期
                if (date) {
                  // 如果没有退房日期，或者退房日期早于或等于新的入住日期，自动设置为入住日期后3天
                  if (!checkOutDate || checkOutDate <= date) {
                    const defaultCheckOutDate = new Date(date);
                    defaultCheckOutDate.setDate(
                      defaultCheckOutDate.getDate() + 3
                    );
                    onCheckOutChange(defaultCheckOutDate);
                  }
                }
              }}
              disabled={(date) => date < today}
              initialFocus
              className="rounded-md border-0"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium mb-2 text-gray-700">
          {t("booking.checkOut")}
        </label>
        <Popover open={isCheckOutOpen} onOpenChange={setIsCheckOutOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal bg-white border-gray-300 hover:bg-gray-50 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 shadow-sm",
                !checkOutDate && "text-gray-500",
                "h-12"
              )}
              disabled={!checkInDate}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
              {checkOutDate
                ? formatDate(checkOutDate)
                : t("booking.selectDate")}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 border border-gray-200 shadow-lg"
            align="start"
          >
            <Calendar
              mode="single"
              selected={checkOutDate}
              onSelect={(date) => {
                onCheckOutChange(date);
                setIsCheckOutOpen(false);
              }}
              disabled={(date) => {
                // 禁用今天之前的日期
                if (date < today) return true;

                // 禁用チェックイン日期及之前的所有日期
                if (checkInDate && date <= checkInDate) return true;

                return false;
              }}
              defaultMonth={checkOutCalendarMonth}
              initialFocus
              className="rounded-md border-0"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
