"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export default function NewsPage() {
  const { t, locale } = useLanguage();

  const removeCodeInParenthesis = (text: string): string => {
    return text.replace(/\s*\([A-Z][0-9](?:\.[0-9])?\)\s*$/, "");
  };

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
                    {removeCodeInParenthesis(
                      t("news.sustainability.initiatives.policy.title")
                    )}
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    {t("news.sustainability.initiatives.policy.content")}
                  </p>
                  <p className="text-muted-foreground">
                    私たちの持続可能な経営方針は、定期的に見直され、時代の変化や新たな環境課題に対応して更新されます。最新の取り組みとしては、カーボンフットプリントの削減目標を設定し、エネルギー使用量と廃棄物の監視システムを導入しています。また、客室内の案内資料や館内の掲示板にQRコードを設置し、お客様がデジタルで環境への取り組みについて詳しく知ることができるようにしています。
                  </p>
                </li>

                <li className="relative pl-12 p-6 bg-muted/50 rounded-lg border">
                  <div className="absolute left-4 top-6 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    {removeCodeInParenthesis(
                      t("news.sustainability.initiatives.compliance.title")
                    )}
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    {t("news.sustainability.initiatives.compliance.content")}
                  </p>
                  <p className="text-muted-foreground">
                    法令遵守は単なる規則の遵守以上のものと考えています。私たちは、法的要件を超えたベストプラクティスを目指し、業界標準を上回るサービスと安全基準を提供することに努めています。最近では、データセキュリティと個人情報保護に関する追加の社内ガイドラインを策定し、全スタッフを対象とした詳細なトレーニングプログラムを実施しました。お客様の情報を守ることは私たちの最優先事項の一つです。
                  </p>
                </li>

                <li className="relative pl-12 p-6 bg-muted/50 rounded-lg border">
                  <div className="absolute left-4 top-6 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    {removeCodeInParenthesis(
                      t(
                        "news.sustainability.initiatives.internalDialogue.title"
                      )
                    )}
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    {t(
                      "news.sustainability.initiatives.internalDialogue.content"
                    )}
                  </p>
                  <p className="text-muted-foreground">
                    定期的なミーティングに加えて、匿名のフィードバックシステムを導入し、スタッフがより自由に意見やアイデアを共有できる環境を整えました。また、部門を越えた「イノベーションチーム」を結成し、異なる視点からのアイデアを集約して新たなサービス改善や環境イニシアチブを開発しています。昨年は従業員からの提案により、使い捨てのアメニティ削減と地元産の有機アメニティへの切り替えを実現しました。
                  </p>
                </li>

                <li className="relative pl-12 p-6 bg-muted/50 rounded-lg border">
                  <div className="absolute left-4 top-6 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                    4
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    {removeCodeInParenthesis(
                      t("news.sustainability.initiatives.feedback.title")
                    )}
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    {t("news.sustainability.initiatives.feedback.content")}
                  </p>
                  <p className="text-muted-foreground">
                    お客様のフィードバックを効率的に管理するため、最新のCRMシステムを導入し、全てのご意見を一元管理できるようにしました。これにより、共通のテーマやトレンドをより迅速に特定し、サービス改善に役立てることができます。また、チェックアウト時だけでなく、滞在中にもリアルタイムでフィードバックを収集する「ライブフィードバック」プログラムを試験的に開始しており、滞在中の問題をその場で解決できるよう取り組んでいます。
                  </p>
                </li>

                <li className="relative pl-12 p-6 bg-muted/50 rounded-lg border">
                  <div className="absolute left-4 top-6 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                    5
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    {removeCodeInParenthesis(
                      t("news.sustainability.initiatives.workConditions.title")
                    )}
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    {t(
                      "news.sustainability.initiatives.workConditions.content"
                    )}
                  </p>
                  <p className="text-muted-foreground">
                    従業員の満足度と定着率を高めるため、業界標準を上回る福利厚生プログラムを実施しています。これには、柔軟な勤務時間、キャリア開発支援、健康増進プログラム、そして地域のレジャー施設での特別割引などが含まれます。また、近年は従業員のメンタルヘルスサポートを強化し、ストレス管理ワークショップやカウンセリングサービスへのアクセスを提供しています。健康で幸せなスタッフが、最高のホスピタリティを提供できると信じています。
                  </p>
                </li>

                <li className="relative pl-12 p-6 bg-muted/50 rounded-lg border">
                  <div className="absolute left-4 top-6 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                    6
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    {removeCodeInParenthesis(
                      t("news.sustainability.initiatives.culture.title")
                    )}
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    {t("news.sustainability.initiatives.culture.content")}
                  </p>
                  <p className="text-muted-foreground">
                    地域文化との連携をさらに深めるため、地元のアーティストや職人と「クリエイターインレジデンス」プログラムを開始しました。このプログラムでは、定期的にホテル内でワークショップやデモンストレーションを開催し、お客様が軽井沢の伝統工芸や芸術を直接体験できる機会を提供しています。また、季節ごとに地元の文化イベントと連携したテーマ宿泊パッケージを企画し、地域の文化的魅力を紹介しています。
                  </p>
                </li>

                <li className="relative pl-12 p-6 bg-muted/50 rounded-lg border">
                  <div className="absolute left-4 top-6 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                    7
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    {removeCodeInParenthesis(
                      t("news.sustainability.initiatives.sustainable.title")
                    )}
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    {t("news.sustainability.initiatives.sustainable.content")}
                  </p>
                  <p className="text-muted-foreground">
                    サプライチェーン全体での持続可能性を確保するため、全ての主要サプライヤーと協力して「グリーン調達ガイドライン」を策定しました。このガイドラインでは、商品のライフサイクル全体での環境影響を評価し、使用から廃棄までの過程で環境負荷が低い製品を優先的に選定しています。特に、客室のリネン類については、オーガニックコットンやリサイクル素材を使用した製品への切り替えを段階的に進めており、すでに全体の60%を環境に配慮した素材に置き換えています。
                  </p>
                </li>

                <li className="relative pl-12 p-6 bg-muted/50 rounded-lg border">
                  <div className="absolute left-4 top-6 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                    8
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    {removeCodeInParenthesis(
                      t("news.sustainability.initiatives.energy.title")
                    )}
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    {t("news.sustainability.initiatives.energy.content")}
                  </p>
                  <p className="text-muted-foreground">
                    エネルギー効率をさらに向上させるため、建物全体のエネルギー監査を実施し、熱損失の大きい箇所を特定して断熱改修を行いました。また、スマートエネルギーマネジメントシステムを導入し、使用状況に応じて照明や空調を自動調整することで、不要なエネルギー消費を削減しています。最近では、屋上の一部に小規模な太陽光パネルを設置する試験プロジェクトを開始し、再生可能エネルギーの本格導入に向けた検証を行っています。
                  </p>
                </li>

                <li className="relative pl-12 p-6 bg-muted/50 rounded-lg border">
                  <div className="absolute left-4 top-6 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                    9
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    {removeCodeInParenthesis(
                      t("news.sustainability.initiatives.waste.title")
                    )}
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    {t("news.sustainability.initiatives.waste.content")}
                  </p>
                  <p className="text-muted-foreground">
                    廃棄物管理の一環として、食品廃棄物削減プログラムを導入しました。レストランの食材はできる限り地元で調達し、メニュー計画を最適化して廃棄を最小限に抑えています。余った食材は地域の堆肥化プログラムに寄付し、有機廃棄物のリサイクルを促進しています。また、ペーパーレス運営を目指し、チェックインやルームサービスのデジタル化を進めており、過去1年間で紙の使用量を約40%削減することに成功しました。
                  </p>
                </li>
              </ul>

              <div className="mt-12 pt-6 border-t">
                <p className="mb-4 text-muted-foreground">
                  {t("news.sustainability.conclusion1")}
                </p>
                <p className="text-muted-foreground mb-4">
                  これらの取り組みは私たちの持続可能な経営の第一歩に過ぎません。今後も継続的に新たな技術や方法を取り入れ、環境への影響をさらに軽減するとともに、地域社会への貢献を強化していきます。私たちは環境に配慮したサービスが、お客様の滞在体験を損なうものではなく、むしろ向上させるものであると信じています。
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
