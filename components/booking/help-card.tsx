"use client";

import { useLanguage } from "@/lib/i18n/context";
import { Phone, Mail, MessageCircleQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HelpCard() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">
          {t("booking.needHelp")}
        </h3>
      </div>

      <div className="p-6">
        <p className="text-gray-600 mb-6">
          {t("booking.contactUsForAssistance")}
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 rounded-full p-2">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t("contact.phone")}</p>
              <a
                href="tel:+81-265-82-1111"
                className="font-medium text-gray-800 hover:text-primary"
              >
                +81-265-82-1111
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-primary/10 rounded-full p-2">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t("contact.email")}</p>
              <a
                href="mailto:info@hotelwellies.jp"
                className="font-medium text-gray-800 hover:text-primary"
              >
                info@hotelwellies.jp
              </a>
            </div>
          </div>
        </div>
        {/* 
        <Button
          variant="outline"
          className="w-full mt-6 border-gray-200 text-gray-800 hover:bg-gray-50 hover:text-primary"
        >
          <MessageCircleQuestion className="h-4 w-4 mr-2" />
          {t("booking.faq")}
        </Button> */}
      </div>
    </motion.div>
  );
}
