"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/lib/i18n/context";
import { Z_INDEX } from "@/lib/z-index";

const SCROLL_OFFSET = 96;

type NavItem =
  | { id: string; label: string; type: "section" }
  | { id: string; label: string; type: "route"; href: string };

export function SideMenu() {
  const { t, locale } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const navItems: NavItem[] = useMemo(
    () => [
      { id: "hero", label: t("common.home"), type: "section" },
      {
        id: "about",
        label: t("about.subtitle") || t("about.title"),
        type: "section",
      },
      { id: "features", label: t("features.title"), type: "section" },
      { id: "rooms", label: t("rooms.title"), type: "section" },
      { id: "testimonials", label: t("testimonials.title"), type: "section" },
      { id: "gallery", label: t("gallery.title"), type: "section" },
      { id: "contact", label: t("common.contact"), type: "section" },
      {
        id: "news",
        label: t("common.news"),
        type: "route",
        href: `/${locale}/news`,
      },
    ],
    [t, locale]
  );

  const getBasePathname = () => {
    const parts = pathname.split("/");
    return parts.length > 2 ? `/${parts.slice(2).join("/")}` : "";
  };

  const isHomePage = () => getBasePathname() === "" || getBasePathname() === "/";

  const scrollToSection = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(id);
    if (!element) return;

    const { top } = element.getBoundingClientRect();
    const offset = top + window.pageYOffset - SCROLL_OFFSET;

    window.scrollTo({ top: offset, behavior: "smooth" });
  };

  const navigateToSection = (id: string) => {
    setIsMobileMenuOpen(false);

    if (isHomePage()) {
      scrollToSection(id);
      return;
    }

    setIsNavigating(true);
    sessionStorage.setItem("scrollTarget", id);
    router.push(`/${locale}`);
  };

  const navigateToRoute = (href: string) => {
    setIsMobileMenuOpen(false);
    router.push(href);
  };

  useEffect(() => {
    if (isHomePage() && !isNavigating) {
      const scrollTarget = sessionStorage.getItem("scrollTarget");
      if (scrollTarget) {
        setTimeout(() => {
          scrollToSection(scrollTarget);
          sessionStorage.removeItem("scrollTarget");
        }, 120);
      }
    }

    setIsNavigating(false);
  }, [pathname, isNavigating]);

  const headline = t("hero.title");
  const subHeadline = t("hero.subtitle");
  const phone = t("contact.phone");
  const rawLanguageLabel = t("common.languages");
  const languageLabel =
    rawLanguageLabel === "common.languages" ? "Languages" : rawLanguageLabel;
  const rawSinceText = t("common.since");
  const sinceText =
    rawSinceText === "common.since" ? "Since 2013" : rawSinceText;

  return (
    <>

      {/* 完全透明的导航菜单 - 类似 nasu-yobou */}
      <aside
        className="fixed inset-y-0 left-0 w-80 flex-col justify-between px-10 py-16 text-white transition-all duration-500 hidden lg:flex"
        style={{
          zIndex: Z_INDEX.NAVIGATION,
          background: "rgba(0, 0, 0, 0)"
        }}
      >
        <div className="space-y-12">
          <Link href={`/${locale}`} className="group flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <Image
                src="/logo.png"
                alt="Hotel Wellies Logo"
                width={64}
                height={64}
                className="h-16 w-16 rounded-full bg-white/90 object-contain p-1 shadow-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.45em] text-white/60">
                  Karuizawa
                </p>
                <p className="text-2xl font-light tracking-[0.25em] text-white">
                  Hotel Wellies
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/80">
              {subHeadline}
            </p>
          </Link>

          <nav className="space-y-5">
            {navItems.map((item) => {
              if (item.type === "section") {
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigateToSection(item.id)}
                    className="group flex w-full items-center gap-3 text-left text-xs uppercase tracking-[0.5em] text-white/70 transition hover:text-white"
                  >
                    <span className="h-px w-10 bg-white/30 transition-all group-hover:w-16 group-hover:bg-white" />
                    <span className="flex-1">{item.label}</span>
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateToRoute(item.href)}
                  className="group flex w-full items-center gap-3 text-left text-xs uppercase tracking-[0.5em] text-white/70 transition hover:text-white"
                >
                  <span className="h-px w-10 bg-white/30 transition-all group-hover:w-16 group-hover:bg-white" />
                  <span className="flex-1">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="space-y-6">
          <div className="space-y-3 text-xs uppercase tracking-[0.4em] text-white/60">
            <span className="block">{sinceText}</span>
            <span className="block font-medium text-white">{headline}</span>
          </div>
          <div className="space-y-3 text-sm text-white/80">
            <p className="flex items-center gap-3 text-white">
              <Phone className="h-4 w-4" />
              <span>{phone}</span>
            </p>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <span className="text-xs uppercase tracking-[0.4em] text-white/60">
                {languageLabel}
              </span>
            </div>
          </div>
          <Button
            size="lg"
            className="w-full rounded-lg border border-white/20 bg-white/10 py-3 text-xs uppercase tracking-[0.5em] text-white transition hover:bg-white/20 backdrop-blur-sm"
            onClick={() => navigateToSection("contact")}
          >
            {t("common.bookNow")}
          </Button>
        </div>
      </aside>

      <div
        className="fixed left-4 right-4 top-4 flex items-center justify-between rounded-full border border-stone-200 bg-white/90 px-5 py-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70 lg:hidden"
        style={{ zIndex: Z_INDEX.NAVIGATION }}
      >
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Hotel Wellies Logo"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full bg-white object-contain p-1"
          />
          <div className="flex flex-col leading-tight text-stone-700">
            <span className="text-sm uppercase tracking-[0.35em]">Hotel Wellies</span>
            <span className="text-[0.65rem] uppercase tracking-[0.45em] text-stone-400">
              Karuizawa
            </span>
          </div>
        </Link>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-stone-700"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 flex flex-col bg-stone-50/95 px-6 py-24 text-stone-800 backdrop-blur-lg lg:hidden"
          style={{ zIndex: Z_INDEX.MODAL }}
          role="dialog"
          aria-modal="true"
        >
          <nav className="space-y-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  item.type === "section"
                    ? navigateToSection(item.id)
                    : navigateToRoute(item.href)
                }
                className="w-full border-b border-stone-200 pb-4 text-left text-sm uppercase tracking-[0.45em] text-stone-600 transition hover:text-stone-900"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto space-y-6 pt-12">
            <div className="flex items-center justify-between">
              <LanguageSwitcher />
              <span className="text-xs uppercase tracking-[0.4em] text-stone-500">
                {languageLabel}
              </span>
            </div>
            <p className="flex items-center gap-3 text-sm text-stone-600">
              <Phone className="h-4 w-4" />
              <span>{phone}</span>
            </p>
            <Button
              size="lg"
              className="w-full rounded-none bg-stone-900 py-3 text-xs uppercase tracking-[0.5em] text-white transition hover:bg-stone-700"
              onClick={() => navigateToSection("contact")}
            >
              {t("common.bookNow")}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
