"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/context"

interface DatePickerProps {
  checkInDate: Date | undefined
  checkOutDate: Date | undefined
  onCheckInChange: (date: Date | undefined) => void
  onCheckOutChange: (date: Date | undefined) => void
}

export function DatePicker({ checkInDate, checkOutDate, onCheckInChange, onCheckOutChange }: DatePickerProps) {
  const { t } = useLanguage()
  const [isCheckInOpen, setIsCheckInOpen] = useState(false)
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false)

  // 计算最小退房日期（入住日期后一天）
  const minCheckoutDate = checkInDate ? new Date(checkInDate) : undefined
  if (minCheckoutDate) {
    minCheckoutDate.setDate(minCheckoutDate.getDate() + 1)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <label className="block text-sm font-medium mb-2 text-gray-700">{t("booking.checkIn")}</label>
        <Popover open={isCheckInOpen} onOpenChange={setIsCheckInOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all",
                !checkInDate && "text-gray-500",
                "h-12",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
              {checkInDate ? format(checkInDate, "PPP") : t("booking.selectDate")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={checkInDate}
              onSelect={(date) => {
                onCheckInChange(date)
                setIsCheckInOpen(false)

                // 如果退房日期早于或等于新的入住日期，重置退房日期
                if (checkOutDate && date && checkOutDate <= date) {
                  onCheckOutChange(undefined)
                }
              }}
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              initialFocus
              className="rounded-md border border-gray-200"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium mb-2 text-gray-700">{t("booking.checkOut")}</label>
        <Popover open={isCheckOutOpen} onOpenChange={setIsCheckOutOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all",
                !checkOutDate && "text-gray-500",
                "h-12",
              )}
              disabled={!checkInDate}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
              {checkOutDate ? format(checkOutDate, "PPP") : t("booking.selectDate")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={checkOutDate}
              onSelect={(date) => {
                onCheckOutChange(date)
                setIsCheckOutOpen(false)
              }}
              disabled={(date) =>
                date < new Date(new Date().setHours(0, 0, 0, 0)) || (minCheckoutDate ? date < minCheckoutDate : false)
              }
              initialFocus
              className="rounded-md border border-gray-200"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
