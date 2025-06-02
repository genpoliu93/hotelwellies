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
  RotateCcw,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { motion } from "framer-motion";
import { useApi } from "@/hooks/use-api";
import { fetchAvailableRooms, type Room, type Package } from "@/lib/api";
import { PackageSelector } from "./package-selector";
import { toast } from "@/hooks/use-toast";

interface RoomSelectorProps {
  checkInDate: Date | undefined;
  checkOutDate: Date | undefined;
  adults: number;
  children: number;
  onRoomAndPackageSelect: (
    roomId: string,
    packageCode: string,
    price: number
  ) => void;
  selectedRoomId: string | null;
  selectedPackageCode: string;
}

export function RoomSelector({
  checkInDate,
  checkOutDate,
  adults,
  children,
  onRoomAndPackageSelect,
  selectedRoomId,
  selectedPackageCode,
}: RoomSelectorProps) {
  const { t, locale } = useLanguage();
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [roomPackageSelections, setRoomPackageSelections] = useState<
    Record<string, string>
  >({});

  // 计算住宿天数
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const totalGuests = adults + children;

  // 使用API获取房间数据
  const { data, isLoading, error, refetch } = useApi(() => {
    if (!checkInDate || !checkOutDate) return null;
    return fetchAvailableRooms(checkInDate, checkOutDate, adults, children);
  }, [checkInDate, checkOutDate, adults, children]);

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

  // 获取房间当前选中的套餐 - 直接使用后台数据
  const getRoomSelectedPackage = (room: Room) => {
    const selectedPackageCode =
      roomPackageSelections[room.roomType] || "ROOM_ONLY";
    return (
      room.packages.find((pkg) => pkg.packageCode === selectedPackageCode) ||
      room.packages[0]
    );
  };

  // 处理套餐选择
  const handlePackageSelect = (
    roomType: string,
    packageCode: string,
    totalPrice: number
  ) => {
    setRoomPackageSelections((prev) => ({
      ...prev,
      [roomType]: packageCode,
    }));
  };

  // 处理房间选择
  const handleRoomSelect = (room: Room) => {
    const selectedPackage = getRoomSelectedPackage(room);
    onRoomAndPackageSelect(
      room.roomType,
      selectedPackage.packageCode,
      selectedPackage.totalPrice
    );
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

  // 处理刷新房间数据
  const handleRefresh = () => {
    refetch();
    toast({
      title: t("booking.refreshSuccess"),
      description: t("booking.refreshSuccessDesc"),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          {t("booking.availableRooms")}
        </h3>

        {/* 刷新按钮 - 只在有日期时显示 */}
        {checkInDate && checkOutDate && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
            title={t("booking.refreshRoomsTooltip")}
            className="flex items-center gap-2 text-xs hover:bg-primary/5 hover:border-primary/20 transition-colors"
          >
            <RotateCcw
              className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`}
            />
            {isLoading ? t("booking.refreshing") : t("booking.refreshRooms")}
          </Button>
        )}
      </div>

      {nights > 0 ? (
        <div className="space-y-4">
          {isLoading && (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="ml-2 text-gray-600 text-sm">
                {t("booking.loadingRooms")}
              </span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg">
              <p className="text-sm">{t("booking.errorLoadingRooms")}</p>
              <p className="text-xs mt-1">{error.message}</p>
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
                  className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border ${
                    selectedRoomId === room.roomType
                      ? "border-primary shadow-primary/10"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {/* 房间图片区域 - 缩小高度 */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={getImageSrc(room)}
                      alt={room.roomName}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      onError={() => handleImageError(room.roomCode)}
                    />

                    {/* 房间状态标签 */}
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-black/70 text-white border-0 backdrop-blur-sm text-xs px-2 py-1">
                        {room.availableCount} {t("booking.available")}
                      </Badge>
                    </div>

                    {/* 选中状态指示器 */}
                    {selectedRoomId === room.roomType && (
                      <div className="absolute top-3 right-3">
                        <div className="bg-primary text-white rounded-full p-1.5 shadow-lg">
                          <Check className="h-4 w-4" />
                        </div>
                      </div>
                    )}

                    {/* 渐变遮罩 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>

                  {/* 房间信息区域 - 缩小padding */}
                  <div className="p-4">
                    {/* 房间标题和基本信息 */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">
                            {room.roomName}
                          </h3>
                          <p className="text-sm text-gray-600 truncate">
                            {room.roomType}
                          </p>
                        </div>

                        {(() => {
                          const selectedPackage = getRoomSelectedPackage(room);
                          return (
                            <div className="text-right ml-3">
                              <div className="text-xl font-bold text-primary">
                                {formatPrice(
                                  selectedPackage.averageNightlyPrice
                                )}
                              </div>
                              <div className="text-xs text-gray-500">
                                / {t("booking.night")}
                              </div>
                            </div>
                          );
                        })()}
                      </div>

                      {/* 房间容量信息 - 更紧凑 */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <div className="flex items-center gap-1.5 bg-gray-50 rounded-full px-2.5 py-1">
                          <svg
                            className="h-3.5 w-3.5 text-gray-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-xs text-gray-700">
                            {room.maxOccupancy} {t("booking.adults")}
                          </span>
                        </div>

                        {room.maxChildren > 0 && (
                          <div className="flex items-center gap-1.5 bg-gray-50 rounded-full px-2.5 py-1">
                            <svg
                              className="h-3.5 w-3.5 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM18 10a2 2 0 11-4 0 2 2 0 014 0zM10 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                            <span className="text-xs text-gray-700">
                              {room.maxChildren} {t("booking.children")}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center gap-1.5 bg-gray-50 rounded-full px-2.5 py-1">
                          <svg
                            className="h-3.5 w-3.5 text-gray-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3z" />
                          </svg>
                          <span className="text-xs text-gray-700">
                            {room.size} {room.sizeUnit}
                          </span>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs text-primary hover:text-primary/80 hover:bg-primary/10 rounded-full px-2"
                          onClick={() => toggleRoomDetails(room.roomType)}
                        >
                          {expandedRoomId === room.roomType
                            ? t("booking.hideDetails")
                            : t("booking.showDetails")}
                        </Button>
                      </div>

                      {/* 房间设施 - 可展开，更紧凑 */}
                      {expandedRoomId === room.roomType && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mb-4 p-3 bg-gray-50 rounded-lg"
                        >
                          <h5 className="font-medium text-gray-800 mb-2 text-sm">
                            {t("booking.amenities")}
                          </h5>
                          <div className="grid grid-cols-2 gap-2">
                            {mapAmenities(room.amenities).map(
                              (amenity, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-1.5"
                                >
                                  <span className="text-primary">
                                    {amenity.icon}
                                  </span>
                                  <span className="text-xs text-gray-700">
                                    {amenity.label}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* 套餐选择区域 */}
                    <div className="mb-4">
                      <PackageSelector
                        packages={room.packages}
                        selectedPackageCode={
                          roomPackageSelections[room.roomType] || "ROOM_ONLY"
                        }
                        onPackageSelect={(packageCode, totalPrice) =>
                          handlePackageSelect(
                            room.roomType,
                            packageCode,
                            totalPrice
                          )
                        }
                        nights={nights}
                        adults={adults}
                        children={children}
                      />
                    </div>

                    {/* 价格汇总和选择按钮 - 更紧凑 */}
                    <div className="border-t pt-4">
                      {(() => {
                        const selectedPackage = getRoomSelectedPackage(room);
                        return (
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-xs text-gray-600 mb-1">
                                {nights}{" "}
                                {nights === 1
                                  ? t("booking.night")
                                  : t("booking.nights")}{" "}
                                × {adults} {t("booking.adults")}
                                {children > 0 &&
                                  `, ${children} ${t("booking.children")}`}
                              </div>
                              <div className="text-lg font-bold text-gray-900">
                                {t("booking.totalForStay")}:{" "}
                                {formatPrice(selectedPackage.totalPrice)}
                              </div>
                            </div>

                            <Button
                              onClick={() => handleRoomSelect(room)}
                              size="default"
                              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                                selectedRoomId === room.roomType
                                  ? "bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/20"
                                  : "bg-white border border-primary text-primary hover:bg-primary hover:text-white"
                              }`}
                            >
                              {selectedRoomId === room.roomType ? (
                                <div className="flex items-center gap-1.5">
                                  <Check className="h-4 w-4" />
                                  {t("booking.selected")}
                                </div>
                              ) : (
                                t("booking.selectRoom")
                              )}
                            </Button>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : !isLoading && !error ? (
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 text-gray-600">
                <Info className="h-4 w-4 text-yellow-500" />
                <p className="text-sm">{t("booking.noRoomsAvailable")}</p>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-gray-600">
            <Info className="h-4 w-4 text-primary" />
            <p className="text-sm">{t("booking.selectDatesToSeeRooms")}</p>
          </div>
        </div>
      )}
    </div>
  );
}
