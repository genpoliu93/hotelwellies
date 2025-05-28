"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useLanguage } from "@/lib/i18n/context";
import { translations } from "@/lib/i18n/translations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import * as Navigation from "next/navigation";

interface GuestInfoFormProps {
  onSubmit: (data: GuestFormData) => void;
  isSubmitting: boolean;
  checkInDate?: Date;
  checkOutDate?: Date;
  roomId?: string | null;
  roomPrice?: number;
  adults?: number;
  children?: number;
}

export interface GuestFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  specialRequests: string;
  arrivalTime: string;
  agreeToTerms: boolean;
}

export function GuestInfoForm({
  onSubmit,
  isSubmitting,
  checkInDate,
  checkOutDate,
  roomId,
  roomPrice,
  adults,
  children,
}: GuestInfoFormProps) {
  const { t, locale } = useLanguage();
  const router = (Navigation as any).useRouter();
  const [formData, setFormData] = useState<GuestFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    specialRequests: "",
    arrivalTime: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof GuestFormData, string>>
  >({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors[name as keyof GuestFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors[name as keyof GuestFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeToTerms: checked }));

    // Clear error when field is edited
    if (errors.agreeToTerms) {
      setErrors((prev) => ({ ...prev, agreeToTerms: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof GuestFormData, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t("booking.errors.required");
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t("booking.errors.required");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("booking.errors.required");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("booking.errors.invalidEmail");
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t("booking.errors.required");
    }

    if (!formData.country) {
      newErrors.country = t("booking.errors.required");
    }

    if (!formData.arrivalTime) {
      newErrors.arrivalTime = t("booking.errors.required");
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = t("booking.errors.agreeToTerms");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // 表单验证通过，调用提交回调
      onSubmit(formData);

      // 跳转到支付页面
      if (checkInDate && checkOutDate && roomId && roomPrice !== undefined) {
        // 将预订信息作为URL参数传递
        const params = new URLSearchParams({
          checkInDate: checkInDate.toISOString(),
          checkOutDate: checkOutDate.toISOString(),
          roomId: roomId,
          price: roomPrice.toString(),
          adults: adults?.toString() || "1",
          children: children?.toString() || "0",
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          arrivalTime: formData.arrivalTime,
        });

        // 如果有特殊要求，也添加到参数中
        if (formData.specialRequests.trim()) {
          params.append("specialRequests", formData.specialRequests);
        }

        router.push(`/${locale}/payment?${params.toString()}`);
      }
    }
  };

  // 获取国际化的国家列表
  const getCountries = () => {
    const countryKeys = [
      "jp",
      "cn",
      "us",
      "gb",
      "au",
      "ca",
      "fr",
      "de",
      "it",
      "kr",
      "sg",
      "th",
    ];

    // 直接从translations对象中获取当前语言的countries
    const currentTranslations = translations[locale];
    const countries = (currentTranslations as any)?.countries;

    if (!countries) {
      // 如果countries不存在，返回默认的英文名称
      return countryKeys
        .map((key) => ({
          value: key,
          label: key.toUpperCase(),
        }))
        .sort((a, b) => a.label.localeCompare(b.label, locale));
    }

    return countryKeys
      .map((key) => ({
        value: key,
        label: countries[key] || key.toUpperCase(),
      }))
      .sort((a, b) => a.label.localeCompare(b.label, locale));
  };

  const countries = getCountries();

  const arrivalTimes = [
    { value: "12-14", label: "12:00 - 14:00" },
    { value: "14-16", label: "14:00 - 16:00" },
    { value: "16-18", label: "16:00 - 18:00" },
    { value: "18-20", label: "18:00 - 20:00" },
    { value: "20-22", label: "20:00 - 22:00" },
    { value: "after-22", label: t("booking.after22") },
  ];

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100"
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-primary rounded-full"></div>
          {t("booking.guestInformation")}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-700 block"
            >
              {t("booking.firstName")} <span className="text-red-500">*</span>
            </label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`h-12 bg-gray-50 border-gray-300 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${
                errors.firstName ? "border-red-500 bg-red-50" : ""
              }`}
              placeholder="请输入名字"
            />
            {errors.firstName && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.firstName}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700 block"
            >
              {t("booking.lastName")} <span className="text-red-500">*</span>
            </label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`h-12 bg-gray-50 border-gray-300 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${
                errors.lastName ? "border-red-500 bg-red-50" : ""
              }`}
              placeholder="请输入姓氏"
            />
            {errors.lastName && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 block"
            >
              {t("booking.email")} <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`h-12 bg-gray-50 border-gray-300 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${
                errors.email ? "border-red-500 bg-red-50" : ""
              }`}
              placeholder="example@email.com"
            />
            {errors.email && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700 block"
            >
              {t("booking.phone")} <span className="text-red-500">*</span>
            </label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`h-12 bg-gray-50 border-gray-300 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${
                errors.phone ? "border-red-500 bg-red-50" : ""
              }`}
              placeholder="+81 90-1234-5678"
            />
            {errors.phone && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-2">
            <label
              htmlFor="country"
              className="text-sm font-medium text-gray-700 block"
            >
              {t("booking.country")} <span className="text-red-500">*</span>
            </label>
            <Select
              value={formData.country}
              onValueChange={(value) => handleSelectChange("country", value)}
            >
              <SelectTrigger
                className={`h-12 bg-gray-50 border-gray-300 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${
                  errors.country ? "border-red-500 bg-red-50" : ""
                }`}
              >
                <SelectValue placeholder={t("booking.selectCountry")} />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg">
                {countries.map((country) => (
                  <SelectItem
                    key={country.value}
                    value={country.value}
                    className="hover:bg-gray-50 focus:bg-primary/10"
                  >
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.country}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="arrivalTime"
              className="text-sm font-medium text-gray-700 block"
            >
              {t("booking.estimatedArrival")}{" "}
              <span className="text-red-500">*</span>
            </label>
            <Select
              value={formData.arrivalTime}
              onValueChange={(value) =>
                handleSelectChange("arrivalTime", value)
              }
            >
              <SelectTrigger
                className={`h-12 bg-gray-50 border-gray-300 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${
                  errors.arrivalTime ? "border-red-500 bg-red-50" : ""
                }`}
              >
                <SelectValue placeholder={t("booking.selectTime")} />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg">
                {arrivalTimes.map((time) => (
                  <SelectItem
                    key={time.value}
                    value={time.value}
                    className="hover:bg-gray-50 focus:bg-primary/10"
                  >
                    {time.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.arrivalTime && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.arrivalTime}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <label
            htmlFor="specialRequests"
            className="text-sm font-medium text-gray-700 block"
          >
            {t("booking.specialRequests")}
            <span className="text-xs text-gray-500 ml-1">(可选)</span>
          </label>
          <Textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            placeholder={t("booking.specialRequestsPlaceholder")}
            rows={4}
            className="bg-gray-50 border-gray-300 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
          />
        </div>

        <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <div className="space-y-4">
            {/* 条款详细内容 */}
            <div className="text-sm text-gray-700 space-y-4">
              <div className="bg-white/60 p-4 rounded-lg border border-blue-100">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  {t("booking.termsAndConditions")}
                </h4>
                <ul className="space-y-2 text-xs text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t("booking.terms.cancellation")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t("booking.terms.checkInOut")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t("booking.terms.payment")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t("booking.terms.damages")}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/60 p-4 rounded-lg border border-blue-100">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  {t("booking.privacyPolicy")}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {t("booking.privacy.description")}
                </p>
              </div>
            </div>

            {/* Checkbox */}
            <div className="bg-white p-4 rounded-lg border border-blue-200 shadow-sm">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleCheckboxChange(e.target.checked)}
                  className={`h-5 w-5 text-primary border-2 border-gray-300 rounded focus:ring-primary focus:ring-2 flex-shrink-0 mt-0.5 transition-all duration-200 ${
                    errors.agreeToTerms ? "border-red-500" : ""
                  }`}
                />
                <div className="space-y-1 flex-1">
                  <label
                    htmlFor="agreeToTerms"
                    className="text-sm font-medium leading-relaxed cursor-pointer text-gray-700 block"
                  >
                    {t("booking.agreeToTerms")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  {errors.agreeToTerms && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.agreeToTerms}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? t("booking.processing")
          : t("booking.continueToPayment")}
      </Button>
    </motion.form>
  );
}
