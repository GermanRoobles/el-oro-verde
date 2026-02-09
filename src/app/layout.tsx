import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/context/LocaleContext";
import AgeGate from "@/components/AgeGate";
import Header from "@/components/Header";
import TrustBar from "@/components/TrustBar";
import Footer from "@/components/Footer";
import Roulette from "@/components/Roulette";
import BackToTop from "@/components/BackToTop";
import ThemeInit from "@/components/ThemeInit";
import ToastProvider from "@/components/ToastProvider";
import QuickViewModal from "@/components/QuickViewModal";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "El Oro Verde - Growshop",
  description: "Cultivo, CBD y parafernalia. El Oro Verde growshop.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={plusJakarta.variable}>
      <body className="min-h-screen flex flex-col antialiased font-sans bg-[var(--background)] text-[var(--foreground)] min-[100dvh]:min-h-[100dvh]">
        <LocaleProvider>
          <ThemeInit />
          <AgeGate>
            <Suspense fallback={<header className="sticky top-0 z-50 h-14 border-b border-[var(--border)] bg-[var(--surface)]/98" />}>
              <Header />
            </Suspense>
            <TrustBar />
            <main className="mobile-container flex-1 pb-[env(safe-area-inset-bottom)]">{children}</main>
            <Footer />
            <Roulette />
            <BackToTop />
            <ToastProvider />
            <QuickViewModal />
          </AgeGate>
        </LocaleProvider>
      </body>
    </html>
  );
}
