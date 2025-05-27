"use client";

import { useLanguage } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { Z_INDEX } from "@/lib/z-index";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
  ];

  const handleLanguageChange = (newLocale: "en" | "ja" | "zh") => {
    // 防止重复切换到相同语言
    if (newLocale === locale) return;

    setLocale(newLocale);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full hover:bg-stone-100 transition-colors duration-200"
        >
          <Globe className="h-4 w-4" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        style={{ zIndex: Z_INDEX.DROPDOWN }}
        className="min-w-[140px]"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() =>
              handleLanguageChange(language.code as "en" | "ja" | "zh")
            }
            className={`language-switcher-item cursor-pointer ${
              locale === language.code
                ? "bg-muted text-muted-foreground"
                : "hover:bg-stone-50"
            }`}
            disabled={locale === language.code}
          >
            <span className="mr-2">{language.flag}</span>
            {language.name}
            {locale === language.code && (
              <span className="ml-auto text-xs text-muted-foreground">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
