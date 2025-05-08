"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Star } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { motion } from "framer-motion"

export function Testimonials() {
  const { t } = useLanguage()

  const testimonials = [
    {
      name: "陈先生",
      location: "上海",
      rating: 5,
      fallback: "陈",
      comment:
        "酒店环境非常好，服务态度也很棒。房间干净整洁，设施齐全。位置便利，周边有很多餐厅和商店。下次来还会选择这里。",
    },
    {
      name: "田中さん",
      location: "東京",
      rating: 5,
      fallback: "田",
      comment:
        "朝食が非常に豊かで、部屋は広くて明るく、ベッドは快適でした。スタッフは親切で、問題解決が迅速です。非常に満足できる滞在体験でした。",
    },
    {
      name: "John Smith",
      location: "London",
      rating: 4,
      fallback: "S",
      comment:
        "Great location, convenient transportation. The room was clean with good soundproofing. The staff were friendly. Excellent value for money, highly recommended.",
    },
  ]

  return (
    <section className="py-16 bg-muted/30 overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight">{t("testimonials.title")}</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{t("testimonials.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {testimonial.fallback}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating ? "fill-primary text-primary" : "fill-none text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
