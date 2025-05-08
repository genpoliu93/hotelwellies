"use client"

import type React from "react"
import { useState, useRef, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { toast } from "@/hooks/use-toast"

export function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const mailtoLinkRef = useRef<HTMLAnchorElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // 构建邮件内容
    const body = `
Name: ${formData.name}

Email: ${formData.email}

Message:
${formData.message}
    `

    // 构建mailto链接
    const mailtoLink = `mailto:info@hotelwellies.jp?subject=${encodeURIComponent(
      formData.subject || t("contact.defaultSubject"),
    )}&body=${encodeURIComponent(body)}`

    // 设置隐藏链接的href属性
    if (mailtoLinkRef.current) {
      mailtoLinkRef.current.href = mailtoLink

      // 直接触发点击事件
      mailtoLinkRef.current.click()

      // 显示成功消息
      toast({
        title: t("contact.messageSent"),
        description: t("contact.messageSentDesc"),
      })
    } else {
      // 如果链接元素不存在，回退到window.location方法
      try {
        window.location.href = mailtoLink
        toast({
          title: t("contact.messageSent"),
          description: t("contact.messageSentDesc"),
        })
      } catch (error) {
        // 如果打开邮件客户端失败，显示错误消息
        toast({
          title: t("contact.error"),
          description: t("contact.errorDesc"),
          variant: "destructive",
        })
      }
    }
  }

  return (
    <section id="contact" className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">{t("contact.title")}</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{t("contact.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">{t("contact.address")}</h3>
                <p className="text-muted-foreground">
                  〒389-0111 Nagano, Kitasaku District, Karuizawa, Nagakura, 2350-160
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">{t("contact.phone")}</h3>
                <p className="text-muted-foreground">
                  <a href="tel:+81-267-46-1670" className="hover:text-primary transition-colors">
                    +81-267-46-1670
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">{t("contact.email")}</h3>
                <p className="text-muted-foreground">
                  <a href="mailto:info@hotelwellies.jp" className="hover:text-primary transition-colors">
                    info@hotelwellies.jp
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">{t("contact.frontDeskHours")}</h3>
                <p className="text-muted-foreground">24 hours</p>
              </div>
            </div>

            <div className="pt-4">
              <div className="aspect-video bg-muted rounded-lg">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=138.62112045288089%2C36.34350169924191%2C138.64112854003909%2C36.35350169924191&amp;layer=mapnik&amp;marker=36.3485%2C138.6312"
                  className="w-full h-full rounded-lg"
                  title={t("gallery.mapAriaLabel")}
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-6">{t("contact.sendMessage")}</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    {t("contact.name")}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("contact.yourName")}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    {t("contact.email")}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder={t("contact.yourEmail")}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  {t("contact.subject")}
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t("contact.yourSubject")}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  {t("contact.message")}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("contact.yourMessage")}
                  rows={5}
                  required
                />
              </div>

              {/* 直接邮件链接按钮 */}
              <div className="flex flex-col gap-2">
                <Button type="submit" className="w-full">
                  {t("contact.sendMessage")}
                </Button>

                <p className="text-xs text-muted-foreground text-center">{t("contact.orClickBelow")}</p>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    if (mailtoLinkRef.current) {
                      mailtoLinkRef.current.href = `mailto:info@hotelwellies.jp?subject=${encodeURIComponent(t("contact.defaultSubject"))}`
                      mailtoLinkRef.current.click()
                    }
                  }}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {t("contact.openEmailApp")}
                </Button>
              </div>
            </form>

            {/* 隐藏的mailto链接 */}
            <a
              ref={mailtoLinkRef}
              href="mailto:info@hotelwellies.jp"
              className="hidden"
              target="_blank"
              rel="noopener noreferrer"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
