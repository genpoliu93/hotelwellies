"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Coffee, UtensilsCrossed, Bed, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { Package } from "@/lib/api";

interface PackageSelectorProps {
  packages: Package[];
  selectedPackageCode: string;
  onPackageSelect: (packageCode: string, totalPrice: number) => void;
  nights: number;
}

export function PackageSelector({
  packages,
  selectedPackageCode,
  onPackageSelect,
  nights,
}: PackageSelectorProps) {
  const { t, locale } = useLanguage();

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

  // 获取套餐图标
  const getPackageIcon = (packageCode: string) => {
    switch (packageCode) {
      case "ROOM_ONLY":
        return <Bed className="h-5 w-5" />;
      case "BREAKFAST":
        return <Coffee className="h-5 w-5" />;
      case "DINNER":
        return <UtensilsCrossed className="h-5 w-5" />;
      case "BREAKFAST_DINNER":
        return (
          <div className="flex items-center gap-1">
            <Coffee className="h-4 w-4" />
            <UtensilsCrossed className="h-4 w-4" />
          </div>
        );
      default:
        return <Bed className="h-5 w-5" />;
    }
  };

  // 获取套餐名称（根据当前语言）
  const getPackageName = (packageCode: string) => {
    switch (packageCode) {
      case "ROOM_ONLY":
        return t("booking.packages.roomOnly");
      case "BREAKFAST":
        return t("booking.packages.breakfast");
      case "DINNER":
        return t("booking.packages.dinner");
      case "BREAKFAST_DINNER":
        return t("booking.packages.breakfastDinner");
      default:
        return packageCode;
    }
  };

  // 获取套餐说明
  const getPackageDescription = (packageCode: string) => {
    switch (packageCode) {
      case "ROOM_ONLY":
        return t("booking.packages.roomOnlyDesc");
      case "BREAKFAST":
        return t("booking.packages.breakfastDesc");
      case "DINNER":
        return t("booking.packages.dinnerDesc");
      case "BREAKFAST_DINNER":
        return t("booking.packages.breakfastDinnerDesc");
      default:
        return "";
    }
  };

  // 检查是否为推荐套餐
  const isRecommended = (packageCode: string) => {
    return packageCode === "BREAKFAST" || packageCode === "BREAKFAST_DINNER";
  };

  // 按照推荐顺序排序套餐
  const sortedPackages = [...packages].sort((a, b) => {
    const order = ["ROOM_ONLY", "BREAKFAST", "DINNER", "BREAKFAST_DINNER"];
    return order.indexOf(a.packageCode) - order.indexOf(b.packageCode);
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-3">
        <h4 className="font-medium text-gray-900 text-sm">
          {t("booking.selectPackage")}
        </h4>
        <Sparkles className="h-3.5 w-3.5 text-primary" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {sortedPackages.map((pkg, index) => (
          <motion.div
            key={pkg.packageCode}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className={`relative border rounded-lg p-3 cursor-pointer transition-all duration-200 ${
                selectedPackageCode === pkg.packageCode
                  ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                  : isRecommended(pkg.packageCode)
                  ? "border-orange-200 bg-orange-50/50 hover:border-orange-300"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => onPackageSelect(pkg.packageCode, pkg.totalPrice)}
            >
              {/* 推荐标签 */}
              {isRecommended(pkg.packageCode) && (
                <div className="absolute -top-1.5 -right-1.5">
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-1.5 py-0.5 shadow-md">
                    <Sparkles className="h-2.5 w-2.5 mr-0.5" />
                    {t("booking.recommended")}
                  </Badge>
                </div>
              )}

              {/* 选中状态指示器 */}
              {selectedPackageCode === pkg.packageCode && (
                <div className="absolute -top-1.5 -left-1.5">
                  <div className="bg-primary text-white rounded-full p-1 shadow-md">
                    <Check className="h-2.5 w-2.5" />
                  </div>
                </div>
              )}

              <div className="space-y-2.5">
                {/* 套餐图标和名称 */}
                <div className="flex items-center gap-2.5">
                  <div
                    className={`p-2 rounded-lg transition-colors ${
                      selectedPackageCode === pkg.packageCode
                        ? "bg-primary text-white"
                        : isRecommended(pkg.packageCode)
                        ? "bg-orange-100 text-orange-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {getPackageIcon(pkg.packageCode)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-gray-900 text-sm truncate">
                      {getPackageName(pkg.packageCode)}
                    </h5>
                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed line-clamp-2">
                      {getPackageDescription(pkg.packageCode)}
                    </p>
                  </div>
                </div>

                {/* 价格信息 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {t("booking.totalForStay")}
                    </span>
                    <span className="font-bold text-base text-gray-900">
                      {formatPrice(pkg.totalPrice)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {t("booking.perNight")}
                    </span>
                    <span className="text-sm text-gray-600">
                      {formatPrice(pkg.averageNightlyPrice)}
                    </span>
                  </div>

                  {/* 为额外费用预留固定空间，确保所有卡片高度一致 */}
                  <div className="h-5 flex items-center justify-between pt-1 border-t border-gray-200">
                    {pkg.adjustmentValue > 0 ? (
                      <>
                        <span className="text-xs text-green-600">
                          {t("booking.extraPerNight")}
                        </span>
                        <span className="text-sm font-medium text-green-600">
                          +{formatPrice(pkg.adjustmentValue)}
                        </span>
                      </>
                    ) : (
                      <div className="w-full"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
