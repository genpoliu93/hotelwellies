"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/lib/i18n/context";
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
        });

        router.push(`/${locale}/payment?${params.toString()}`);
      }
    }
  };

  const countries = [
    { value: "jp", label: "Japan" },
    { value: "cn", label: "China" },
    { value: "us", label: "United States" },
    { value: "gb", label: "United Kingdom" },
    { value: "au", label: "Australia" },
    { value: "ca", label: "Canada" },
    { value: "fr", label: "France" },
    { value: "de", label: "Germany" },
    { value: "it", label: "Italy" },
    { value: "kr", label: "South Korea" },
    { value: "sg", label: "Singapore" },
    { value: "th", label: "Thailand" },
  ];

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
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          {t("booking.guestInformation")}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-700"
            >
              {t("booking.firstName")} <span className="text-red-500">*</span>
            </label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`h-12 border-gray-200 focus:border-primary focus:ring-primary ${
                errors.firstName ? "border-red-500" : ""
              }`}
            />
            {errors.firstName && (
              <p className="text-xs text-red-500">{errors.firstName}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700"
            >
              {t("booking.lastName")} <span className="text-red-500">*</span>
            </label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`h-12 border-gray-200 focus:border-primary focus:ring-primary ${
                errors.lastName ? "border-red-500" : ""
              }`}
            />
            {errors.lastName && (
              <p className="text-xs text-red-500">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              {t("booking.email")} <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`h-12 border-gray-200 focus:border-primary focus:ring-primary ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700"
            >
              {t("booking.phone")} <span className="text-red-500">*</span>
            </label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`h-12 border-gray-200 focus:border-primary focus:ring-primary ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-2">
            <label
              htmlFor="country"
              className="text-sm font-medium text-gray-700"
            >
              {t("booking.country")} <span className="text-red-500">*</span>
            </label>
            <Select
              value={formData.country}
              onValueChange={(value) => handleSelectChange("country", value)}
            >
              <SelectTrigger
                className={`h-12 border-gray-200 ${
                  errors.country ? "border-red-500" : ""
                }`}
              >
                <SelectValue placeholder={t("booking.selectCountry")} />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="text-xs text-red-500">{errors.country}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="arrivalTime"
              className="text-sm font-medium text-gray-700"
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
                className={`h-12 border-gray-200 ${
                  errors.arrivalTime ? "border-red-500" : ""
                }`}
              >
                <SelectValue placeholder={t("booking.selectTime")} />
              </SelectTrigger>
              <SelectContent>
                {arrivalTimes.map((time) => (
                  <SelectItem key={time.value} value={time.value}>
                    {time.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.arrivalTime && (
              <p className="text-xs text-red-500">{errors.arrivalTime}</p>
            )}
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <label
            htmlFor="specialRequests"
            className="text-sm font-medium text-gray-700"
          >
            {t("booking.specialRequests")}
          </label>
          <Textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            placeholder={t("booking.specialRequestsPlaceholder")}
            rows={4}
            className="border-gray-200 focus:border-primary focus:ring-primary"
          />
        </div>

        <div className="flex items-start space-x-3 mt-6">
          <Checkbox
            id="agreeToTerms"
            checked={formData.agreeToTerms}
            onCheckedChange={handleCheckboxChange}
            className={errors.agreeToTerms ? "border-red-500" : ""}
          />
          <div className="space-y-1">
            <label
              htmlFor="agreeToTerms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
            >
              {t("booking.agreeToTerms")}{" "}
              <span className="text-red-500">*</span>
            </label>
            {errors.agreeToTerms && (
              <p className="text-xs text-red-500">{errors.agreeToTerms}</p>
            )}
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
