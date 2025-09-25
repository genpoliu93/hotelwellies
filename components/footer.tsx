"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-br from-stone-900 to-slate-900 py-16 text-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/*  <div className="space-y-4">
            <h3 className="text-lg font-semibold">Hotel Wellies</h3>
            <p className="text-sm text-muted-foreground">
              {t("footer.description")}
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
 */}
          <div className="space-y-6">
            <h3 className="text-xl font-light text-white tracking-wide">{t("footer.quickLinks")}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-white/70 hover:text-white transition-colors duration-300 font-light tracking-wide"
                >
                  {t("common.home")}
                </Link>
              </li>
              <li>
                <Link
                  href="#rooms"
                  className="text-white/70 hover:text-white transition-colors duration-300 font-light tracking-wide"
                >
                  {t("common.rooms")}
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="text-white/70 hover:text-white transition-colors duration-300 font-light tracking-wide"
                >
                  {t("common.features")}
                </Link>
              </li>
              <li>
                <Link
                  href="#gallery"
                  className="text-white/70 hover:text-white transition-colors duration-300 font-light tracking-wide"
                >
                  {t("common.gallery")}
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-white/70 hover:text-white transition-colors duration-300 font-light tracking-wide"
                >
                  {t("common.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("footer.policies")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-white/70 hover:text-white transition-colors duration-300 font-light tracking-wide"
                >
                  {t("footer.bookingPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/70 hover:text-white transition-colors duration-300 font-light tracking-wide"
                >
                  {t("footer.cancellationPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/70 hover:text-white transition-colors duration-300 font-light tracking-wide"
                >
                  {t("footer.privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/70 hover:text-white transition-colors duration-300 font-light tracking-wide"
                >
                  {t("footer.faq")}
                </Link>
              </li>
            </ul>
          </div> */}

          {/*      <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("footer.newsletter")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("footer.newsletterDesc")}
            </p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder={t("footer.yourEmail")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />

              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                {t("common.subscribe")}
              </button>
            </form>
          </div> */}
        </div>

        <div className="mt-16 pt-8 border-t border-white/20 text-center text-sm text-white/60">
          <p>
            © {new Date().getFullYear()} Hotel Wellies.{" "}
            {t("footer.allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
}
