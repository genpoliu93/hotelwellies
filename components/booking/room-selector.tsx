"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Info,
  Wifi,
  Coffee,
  Tv,
  Wind,
  Bath,
  Wine,
  Briefcase,
  UtensilsCrossed,
  Baby,
  Loader2,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { motion } from "framer-motion";
import { useApi } from "@/hooks/use-api";
import { fetchAvailableRooms, type Room } from "@/lib/api";

interface RoomSelectorProps {
  checkInDate: Date | undefined;
  checkOutDate: Date | undefined;
  adults: number;
  children: number;
  onRoomSelect: (roomId: string, price: number) => void;
  selectedRoomId: string | null;
}

export function RoomSelector({
  checkInDate,
  checkOutDate,
  adults,
  children,
  onRoomSelect,
  selectedRoomId,
}: RoomSelectorProps) {
  const { t, locale } = useLanguage();
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  // 计算住宿天数
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const totalGuests = adults + children;

  // 使用API获取房间数据
  const { data, isLoading, error } = useApi(() => {
    if (!checkInDate || !checkOutDate) return null;
    return fetchAvailableRooms(checkInDate, checkOutDate, adults);
  }, [checkInDate, checkOutDate, adults]);

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

  // 计算每晚单价（API返回的是总价，需要除以住宿天数和人数得到单价）
  const calculatePricePerNight = (totalPrice: number) => {
    if (nights <= 0 || totalGuests <= 0) return 0;
    return Math.round(totalPrice / nights / totalGuests);
  };

  // 检查房间是否可用（基于客人数量）
  const isRoomAvailable = (room: Room) => {
    return adults <= room.maxOccupancy && children <= (room.maxChildren || 0);
  };

  // 切换房间详情展开状态
  const toggleRoomDetails = (roomId: string) => {
    setExpandedRoomId(expandedRoomId === roomId ? null : roomId);
  };

  // 获取房间设施图标
  const getAmenityIcon = (name: string) => {
    const icons: Record<string, JSX.Element> = {
      wifi: <Wifi className="h-4 w-4" />,
      breakfast: <Coffee className="h-4 w-4" />,
      ac: <Wind className="h-4 w-4" />,
      tv: <Tv className="h-4 w-4" />,
      bathroom: <Bath className="h-4 w-4" />,
      minibar: <Wine className="h-4 w-4" />,
      workspace: <Briefcase className="h-4 w-4" />,
      kitchenette: <UtensilsCrossed className="h-4 w-4" />,
      childrenFacilities: <Baby className="h-4 w-4" />,
    };

    return icons[name] || <Info className="h-4 w-4" />;
  };

  // 将API返回的设施转换为UI显示格式
  const mapAmenities = (amenities: string[]) => {
    return amenities.map((amenity) => ({
      icon: getAmenityIcon(amenity.toLowerCase()),
      label: t(`booking.amenities.${amenity.toLowerCase()}`) || amenity,
    }));
  };

  // 获取可用房间列表
  const availableRooms = data ? data.rooms : [];

  // 过滤出真正可用的房间（基于客人数量）
  const filteredAvailableRooms = availableRooms.filter(isRoomAvailable);

  // 处理图片加载错误
  const handleImageError = (roomCode: string) => {
    setImageErrors((prev) => new Set(prev).add(roomCode));
  };

  // 获取图片源，如果加载失败则使用默认图片
  const getImageSrc = (room: Room) => {
    if (imageErrors.has(room.roomCode) || !room.images[0]) {
      return "/placeholder.svg";
    }
    return room.images[0];
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">
        {t("booking.availableRooms")}
      </h3>

      {nights > 0 ? (
        <div className="space-y-6">
          {isLoading && (
            <div className="flex items-center justify-center p-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-gray-600">
                {t("booking.loadingRooms")}
              </span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg">
              <p>{t("booking.errorLoadingRooms")}</p>
              <p className="text-sm mt-1">{error.message}</p>
            </div>
          )}

          {filteredAvailableRooms.length > 0 ? (
            filteredAvailableRooms.map((room: Room, index: number) => (
              <motion.div
                key={room.roomCode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div
                  className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border ${
                    selectedRoomId === room.roomType
                      ? "border-primary ring-1 ring-primary"
                      : "border-gray-100"
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    <div className="relative h-60 md:h-full">
                      <Image
                        src={getImageSrc(room)}
                        alt={room.roomName}
                        fill
                        className="object-cover"
                        onError={() => handleImageError(room.roomCode)}
                      />
                      {room.availableCount < 3 && (
                        <Badge className="absolute top-3 right-3 bg-orange-500 text-white font-medium px-3 py-1">
                          {t("rooms.almostSoldOut")}
                        </Badge>
                      )}
                    </div>

                    <div className="p-6 md:col-span-2">
                      <div className="flex flex-col md:flex-row justify-between gap-6">
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-gray-800">
                            {room.roomName}
                          </h4>
                          <p className="text-gray-600 mt-2">{room.roomType}</p>

                          <div className="flex items-center gap-2 mt-4">
                            <Badge
                              variant="outline"
                              className="text-xs border-gray-200 text-gray-700 font-normal px-2"
                            >
                              {t("booking.maxCapacity")}: {room.maxOccupancy}{" "}
                              {t("booking.adults")}, {room.maxChildren}{" "}
                              {t("booking.children")}
                            </Badge>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-xs text-primary hover:text-primary/80 hover:bg-primary/5"
                              onClick={() => toggleRoomDetails(room.roomType)}
                            >
                              {expandedRoomId === room.roomType
                                ? t("booking.hideDetails")
                                : t("booking.showDetails")}
                            </Button>
                          </div>

                          {expandedRoomId === room.roomType && (
                            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                              {mapAmenities(room.amenities).map(
                                (amenity, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2 text-gray-700"
                                  >
                                    <span className="text-primary">
                                      {amenity.icon}
                                    </span>
                                    <span className="text-sm">
                                      {amenity.label}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col items-end justify-between">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">
                              {formatPrice(calculatePricePerNight(room.price))}
                              <span className="text-sm font-normal text-gray-500 ml-1">
                                / {t("rooms.perNight")}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              {t("booking.totalForStay")}:{" "}
                              {formatPrice(room.price)}
                            </div>
                          </div>

                          <div className="mt-6">
                            <Button
                              onClick={() =>
                                onRoomSelect(room.roomType, room.price)
                              }
                              variant={
                                selectedRoomId === room.roomType
                                  ? "default"
                                  : "outline"
                              }
                              className={`px-6 ${
                                selectedRoomId === room.roomType
                                  ? "bg-primary hover:bg-primary/90 text-white gap-2"
                                  : "border-gray-200 hover:bg-gray-50 text-gray-800"
                              }`}
                              size="lg"
                            >
                              {selectedRoomId === room.roomType && (
                                <Check className="h-4 w-4" />
                              )}
                              {selectedRoomId === room.roomType
                                ? t("booking.selected")
                                : t("booking.selectRoom")}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : !isLoading && !error ? (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 text-gray-600">
                <Info className="h-5 w-5 text-yellow-500" />
                <p>{t("booking.noRoomsAvailable")}</p>
              </div>
            </div>
          ) : null}
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
  );
}
