import React from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

interface NewsLayoutProps {
  children: React.ReactNode;
}

export default function NewsLayout({ children }: NewsLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
