"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Info, Wifi, Coffee, Tv, Wind, Bath, Wine, Briefcase, UtensilsCrossed, Baby } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion } from "framer-motion"

interface RoomSelectorProps {
  checkInDate: Date | undefined
  checkOutDate: Date | undefined
  adults: number
  children: number
  onRoomSelect: (roomId: string, price: number) => void
  selectedRoomId: string | null
}

export function RoomSelector({
  checkInDate,
  checkOutDate,
  adults,
  children,
  onRoomSelect,
  selectedRoomId,
}: RoomSelectorProps) {
  const { t, locale } = useLanguage()
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null)

  // 计算住宿天数
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0
    const diffTime = checkOutDate.getTime() - checkInDate.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const nights = calculateNights()

  // 房间数据
  const rooms = [
    {
      id: "standard",
      image: "/images/standard-room.webp",
      title: t("rooms.standard"),
      description: t("rooms.standardDesc"),
      price: 688,
      capacity: { adults: 2, children: 1 },
      amenities: [
        { icon: <Wifi className="h-4 w-4" />, label: t("booking.amenities.wifi") },
        { icon: <Coffee className="h-4 w-4" />, label: t("booking.amenities.breakfast") },
        { icon: <Wind className="h-4 w-4" />, label: t("booking.amenities.ac") },
        { icon: <Tv className="h-4 w-4" />, label: t("booking.amenities.tv") },
        { icon: <Bath className="h-4 w-4" />, label: t("booking.amenities.bathroom") },
      ],
      popular: true,
    },
    {
      id: "deluxe",
      image: "/images/deluxe-room.webp",
      title: t("rooms.deluxe"),
      description: t("rooms.deluxeDesc"),
      price: 1288,
      capacity: { adults: 2, children: 2 },
      amenities: [
        { icon: <Wifi className="h-4 w-4" />, label: t("booking.amenities.wifi") },
        { icon: <Coffee className="h-4 w-4" />, label: t("booking.amenities.breakfast") },
        { icon: <Wind className="h-4 w-4" />, label: t("booking.amenities.ac") },
        { icon: <Tv className="h-4 w-4" />, label: t("booking.amenities.tv") },
        { icon: <Bath className="h-4 w-4" />, label: t("booking.amenities.bathroom") },
        { icon: <Wine className="h-4 w-4" />, label: t("booking.amenities.minibar") },
        { icon: <Briefcase className="h-4 w-4" />, label: t("booking.amenities.workspace") },
      ],
      popular: false,
    },
    {
      id: "family",
      image: "/images/family-room.png",
      title: t("rooms.family"),
      description: t("rooms.familyDesc"),
      price: 1488,
      capacity: { adults: 4, children: 2 },
      amenities: [
        { icon: <Wifi className="h-4 w-4" />, label: t("booking.amenities.wifi") },
        { icon: <Coffee className="h-4 w-4" />, label: t("booking.amenities.breakfast") },
        { icon: <Wind className="h-4 w-4" />, label: t("booking.amenities.ac") },
        { icon: <Tv className="h-4 w-4" />, label: t("booking.amenities.tv") },
        { icon: <Bath className="h-4 w-4" />, label: t("booking.amenities.bathroom") },
        { icon: <Wine className="h-4 w-4" />, label: t("booking.amenities.minibar") },
        { icon: <UtensilsCrossed className="h-4 w-4" />, label: t("booking.amenities.kitchenette") },
        { icon: <Baby className="h-4 w-4" />, label: t("booking.amenities.childrenFacilities") },
      ],
      popular: false,
    },
  ]

  // 格式化价格
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale === "en" ? "en-US" : locale === "ja" ? "ja-JP" : "zh-CN", {
      style: "currency",
      currency: "JPY",
      maximumFractionDigits: 0,
    }).format(price)
  }

  // 检查房间是否可用（基于客人数量）
  const isRoomAvailable = (room: (typeof rooms)[0]) => {
    return adults <= room.capacity.adults && children <= room.capacity.children
  }

  // 切换房间详情展开状态
  const toggleRoomDetails = (roomId: string) => {
    setExpandedRoomId(expandedRoomId === roomId ? null : roomId)
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">{t("booking.availableRooms")}</h3>

      {nights > 0 ? (
        <div className="space-y-6">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div
                className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border ${
                  selectedRoomId === room.id ? "border-primary ring-1 ring-primary" : "border-gray-100"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                  <div className="relative h-60 md:h-full">
                    <Image src={room.image || "/placeholder.svg"} alt={room.title} fill className="object-cover" />
                    {room.popular && (
                      <Badge className="absolute top-3 right-3 bg-primary text-white font-medium px-3 py-1">
                        {t("rooms.popular")}
                      </Badge>
                    )}
                  </div>

                  <div className="p-6 md:col-span-2">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-gray-800">{room.title}</h4>
                        <p className="text-gray-600 mt-2">{room.description}</p>

                        <div className="flex items-center gap-2 mt-4">
                          <Badge variant="outline" className="text-xs border-gray-200 text-gray-700 font-normal px-2">
                            {t("booking.maxCapacity")}: {room.capacity.adults} {t("booking.adults")},{" "}
                            {room.capacity.children} {t("booking.children")}
                          </Badge>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-xs text-primary hover:text-primary/80 hover:bg-primary/5"
                            onClick={() => toggleRoomDetails(room.id)}
                          >
                            {expandedRoomId === room.id ? t("booking.hideDetails") : t("booking.showDetails")}
                          </Button>
                        </div>

                        {expandedRoomId === room.id && (
                          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                            {room.amenities.map((amenity, index) => (
                              <div key={index} className="flex items-center gap-2 text-gray-700">
                                <span className="text-primary">{amenity.icon}</span>
                                <span className="text-sm">{amenity.label}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">
                            {formatPrice(room.price)}
                            <span className="text-sm font-normal text-gray-500 ml-1">/ {t("rooms.perNight")}</span>
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {t("booking.totalForStay")}: {formatPrice(room.price * nights)}
                          </div>
                        </div>

                        <div className="mt-6">
                          {isRoomAvailable(room) ? (
                            <Button
                              onClick={() => onRoomSelect(room.id, room.price)}
                              variant={selectedRoomId === room.id ? "default" : "outline"}
                              className={`px-6 ${
                                selectedRoomId === room.id
                                  ? "bg-primary hover:bg-primary/90 text-white gap-2"
                                  : "border-gray-200 hover:bg-gray-50 text-gray-800"
                              }`}
                              size="lg"
                            >
                              {selectedRoomId === room.id && <Check className="h-4 w-4" />}
                              {selectedRoomId === room.id ? t("booking.selected") : t("booking.selectRoom")}
                            </Button>
                          ) : (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div>
                                    <Button
                                      variant="outline"
                                      disabled
                                      className="cursor-not-allowed opacity-60 border-gray-200"
                                      size="lg"
                                    >
                                      {t("booking.notAvailable")}
                                    </Button>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent className="bg-gray-800 text-white">
                                  <p>{t("booking.exceedsCapacity")}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 text-gray-600">
            <Info className="h-5 w-5 text-primary" />
            <p>{t("booking.selectDatesToSeeRooms")}</p>
          </div>
        </div>
      )}
    </div>
  )
}
