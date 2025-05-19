"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export default function NewsPage() {
  const { t, locale } = useLanguage();

  return (
    <main className="flex-1">
      {/* 页面标题 */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t("news.title")}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {t("news.subtitle")}
            </p>
            <nav className="flex">
              <ol className="flex items-center gap-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href={`/${locale}`}
                    className="hover:text-primary transition-colors"
                  >
                    {t("news.sustainability.breadcrumbHome")}
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4" />
                  <span>{t("news.sustainability.breadcrumbNews")}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </section>

      {/* 主要内容 */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {t("news.sustainability.pageTitle")}
              </h2>
              <div className="mb-6">
                <span className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded text-sm">
                  {t("news.sustainability.publicationDate")}
                </span>
              </div>
              <p className="text-lg text-muted-foreground mb-10">
                {t("news.sustainability.introduction")}
              </p>

              <ul className="space-y-8">
                <li className="relative pl-12 p-6 bg-muted/50 rounded-lg border">
                  <div className="absolute left-4 top-6 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    {t("news.sustainability.initiatives.policy.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("news.sustainability.initiatives.policy.content")}
                  </p>
                </li>

                <li className="relative pl-12 p-6 bg-muted/50 rounded-lg border">
                  <div className="absolute left-4 top-6 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    {t("news.sustainability.initiatives.compliance.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("news.sustainability.initiatives.compliance.content")}
                  </p>
                </li>

                <li className="relative pl-12 p-6 bg-muted/50 rounded-lg border">
                  <div className="absolute left-4 top-6 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    {t(
                      "news.sustainability.initiatives.internalDialogue.title"
                    )}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(
                      "news.sustainability.initiatives.internalDialogue.content"
                    )}
                  </p>
                </li>

                <li className="relative pl-12 p-6 bg-muted/50 rounded-lg border">
                  <div className="absolute left-4 top-6 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                    4
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    {t("news.sustainability.initiatives.feedback.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("news.sustainability.initiatives.feedback.content")}
                  </p>
                </li>

                <li className="relative pl-12 p-6 bg-muted/50 rounded-lg border">
                  <div className="absolute left-4 top-6 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                    7
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    {t("news.sustainability.initiatives.workConditions.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(
                      "news.sustainability.initiatives.workConditions.content"
                    )}
                  </p>
                </li>

                <li className="relative pl-12 p-6 bg-muted/50 rounded-lg border">
                  <div className="absolute left-4 top-6 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                    9
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    {t("news.sustainability.initiatives.culture.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("news.sustainability.initiatives.culture.content")}
                  </p>
                </li>

                <li className="relative pl-12 p-6 bg-muted/50 rounded-lg border">
                  <div className="absolute left-4 top-6 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                    13
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    {t("news.sustainability.initiatives.sustainable.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("news.sustainability.initiatives.sustainable.content")}
                  </p>
                </li>

                <li className="relative pl-12 p-6 bg-muted/50 rounded-lg border">
                  <div className="absolute left-4 top-6 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                    15
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    {t("news.sustainability.initiatives.energy.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("news.sustainability.initiatives.energy.content")}
                  </p>
                </li>

                <li className="relative pl-12 p-6 bg-muted/50 rounded-lg border">
                  <div className="absolute left-4 top-6 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                    20
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    {t("news.sustainability.initiatives.waste.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("news.sustainability.initiatives.waste.content")}
                  </p>
                </li>
              </ul>

              <div className="mt-12 pt-6 border-t">
                <p className="mb-4 text-muted-foreground">
                  {t("news.sustainability.conclusion1")}
                </p>
                <p className="text-muted-foreground">
                  {t("news.sustainability.conclusion2")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
