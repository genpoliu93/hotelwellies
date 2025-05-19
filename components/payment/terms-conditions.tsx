"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Calendar, Clock, AlertTriangle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function TermsConditions() {
  const { t } = useLanguage();
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">
          {t("payment.termsAndConditions")}
        </h2>
      </div>

      <div className="p-6">
        <Accordion type="single" collapsible className="mb-6">
          <AccordionItem value="cancellation">
            <AccordionTrigger className="flex items-center gap-3 text-gray-800 hover:text-primary">
              <Calendar className="h-5 w-5 flex-shrink-0 text-primary" />
              <span>{t("payment.cancellationPolicy")}</span>
            </AccordionTrigger>
            <AccordionContent className="pl-8 text-gray-600">
              <ul className="space-y-2 mt-2">
                <li className="flex items-start gap-2">
                  <div className="bg-green-100 text-green-600 rounded-full p-1 mt-0.5 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>{t("payment.freeCancellation7Days")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-amber-100 text-amber-600 rounded-full p-1 mt-0.5 flex-shrink-0">
                    <AlertTriangle size={14} />
                  </div>
                  <span>{t("payment.partialRefund3Days")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-red-100 text-red-600 rounded-full p-1 mt-0.5 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </div>
                  <span>{t("payment.noRefund24Hours")}</span>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="checkin">
            <AccordionTrigger className="flex items-center gap-3 text-gray-800 hover:text-primary">
              <Clock className="h-5 w-5 flex-shrink-0 text-primary" />
              <span>{t("payment.checkInOut")}</span>
            </AccordionTrigger>
            <AccordionContent className="pl-8 text-gray-600">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium text-gray-700 mb-1">
                    {t("payment.checkIn")}
                  </p>
                  <p>15:00 - 21:00</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium text-gray-700 mb-1">
                    {t("payment.checkOut")}
                  </p>
                  <p>{t("payment.before")} 11:00</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="privacy">
            <AccordionTrigger className="flex items-center gap-3 text-gray-800 hover:text-primary">
              <Shield className="h-5 w-5 flex-shrink-0 text-primary" />
              <span>{t("payment.privacyPolicy")}</span>
            </AccordionTrigger>
            <AccordionContent className="pl-8 text-gray-600">
              <p className="mt-2">{t("payment.privacyDescription")}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="termsCheck"
            checked={accepted}
            onCheckedChange={(checked) => setAccepted(checked === true)}
            className="mt-1"
          />
          <div>
            <label
              htmlFor="termsCheck"
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              {t("payment.agreeToTerms")}{" "}
              <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-500 mt-1">
              {t("payment.readAndAgree")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
