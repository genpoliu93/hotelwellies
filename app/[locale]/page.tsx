import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Features } from "@/components/features"
import { Rooms } from "@/components/rooms"
import { Testimonials } from "@/components/testimonials"
import { Gallery } from "@/components/gallery"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <Features />
      <Rooms />
      <Testimonials />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  )
}
