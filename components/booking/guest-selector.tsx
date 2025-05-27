"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Users } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

interface GuestSelectorProps {
  adults: number;
  children: number;
  onAdultsChange: (count: number) => void;
  onChildrenChange: (count: number) => void;
}

export function GuestSelector({
  adults,
  children,
  onAdultsChange,
  onChildrenChange,
}: GuestSelectorProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const incrementAdults = () => {
    if (adults < 4) onAdultsChange(adults + 1);
  };

  const decrementAdults = () => {
    if (adults > 1) onAdultsChange(adults - 1);
  };

  const incrementChildren = () => {
    if (children < 4) onChildrenChange(children + 1);
  };

  const decrementChildren = () => {
    if (children > 0) onChildrenChange(children - 1);
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-gray-700">
        {t("booking.guests")}
      </label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal bg-white border-gray-300 hover:bg-gray-50 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 shadow-sm h-12"
          >
            <Users className="mr-2 h-4 w-4 text-primary" />
            {adults} {t("booking.adults")}, {children} {t("booking.children")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4 bg-white border border-gray-200 shadow-lg rounded-lg">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">
                  {t("booking.adults")}
                </p>
                <p className="text-sm text-gray-500">
                  {t("booking.age13Plus")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementAdults}
                  disabled={adults <= 1}
                  className="h-8 w-8 rounded-full border-gray-300 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                >
                  <span>-</span>
                </Button>
                <span className="w-8 text-center font-medium">{adults}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementAdults}
                  disabled={adults >= 4}
                  className="h-8 w-8 rounded-full border-gray-300 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                >
                  <span>+</span>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">
                  {t("booking.children")}
                </p>
                <p className="text-sm text-gray-500">{t("booking.age0To12")}</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementChildren}
                  disabled={children <= 0}
                  className="h-8 w-8 rounded-full border-gray-300 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                >
                  <span>-</span>
                </Button>
                <span className="w-8 text-center font-medium">{children}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementChildren}
                  disabled={children >= 4}
                  className="h-8 w-8 rounded-full border-gray-300 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                >
                  <span>+</span>
                </Button>
              </div>
            </div>
            <Button
              className="w-full mt-2 bg-primary hover:bg-primary/90 text-white"
              onClick={() => setIsOpen(false)}
            >
              {t("booking.apply")}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
