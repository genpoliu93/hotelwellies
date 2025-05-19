"use client";

import { useLanguage } from "@/lib/i18n/context";
import { User, Mail, Phone } from "lucide-react";

interface CustomerInfoProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export function CustomerInfo({
  firstName,
  lastName,
  email,
  phone,
}: CustomerInfoProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">
          {t("payment.customerInformation")}
        </h2>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 rounded-full p-2">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t("booking.name")}</p>
              <p className="font-medium text-gray-800">
                {firstName} {lastName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-primary/10 rounded-full p-2">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t("booking.email")}</p>
              <p className="font-medium text-gray-800">{email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-primary/10 rounded-full p-2">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t("booking.phone")}</p>
              <p className="font-medium text-gray-800">{phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
