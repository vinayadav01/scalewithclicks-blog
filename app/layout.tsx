"use client";

import { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header"; // ✅ NEW

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "ScaleWithClicks Blog",
  description: "Performance Marketing Blog",
};

export default function RootLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-gray-50 to-gray-100`}>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PG5ZS7WVRJ"
          strategy="afterInteractive"
        />
        <Script id="ga" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PG5ZS7WVRJ');
          `}
        </Script>

        {/* ================= HEADER ================= */}
        <header className="bg-white border-b sticky top-0 z-50">

          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

            {/* LOGO */}
            <Link href="/">
              <img src="/logo.png" alt="logo" className="h-10" />
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link href="/">Home</Link>
              <Link href="/category/google-ads">Google Ads</Link>
              <Link href="/category/seo">SEO</Link>
              <Link href="/category/meta">Meta</Link>
              <Link href="/category/lead-generation">Lead Gen</Link>
            </nav>

            {/* HAMBURGER */}
            <button
              className="md:hidden text-2xl"
              onClick={() => setOpen(true)}
            >
              ☰
            </button>

          </div>

          {/* ================= MOBILE DRAWER ================= */}

          {/* OVERLAY */}
          {open && (
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setOpen(false)}
            />
          )}

          {/* DRAWER */}
          <div
            className={`fixed top-0 left-0 h-full w-[260px] bg-white z-50 transform transition-transform duration-300 ${
              open ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="p-5 border-b flex justify-between items-center">
              <span className="font-bold">Menu</span>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            <nav className="flex flex-col p-5 gap-4 text-sm">
              <Link href="/" onClick={() => setOpen(false)}>Home</Link>
              <Link href="/category/google-ads" onClick={() => setOpen(false)}>Google Ads</Link>
              <Link href="/category/seo" onClick={() => setOpen(false)}>SEO</Link>
              <Link href="/category/meta" onClick={() => setOpen(false)}>Meta</Link>
              <Link href="/category/lead-generation" onClick={() => setOpen(false)}>Lead Generation</Link>
            </nav>
          </div>

        </header>

        {/* ================= MAIN ================= */}
        <main className="min-h-[80vh]">{children}</main>

        {/* ================= FOOTER ================= */}
        <footer className="bg-[#020617] text-[#cbd5f5] px-6 py-12 mt-16">

          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">

            <div>
              <h3 className="text-white font-bold">ScaleWithClicks</h3>
              <p className="text-sm mt-2">
                Helping businesses generate leads using Ads, SEO & tracking.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold">Services</h4>
              <div className="mt-2 space-y-2 text-sm">
                <a href="https://scalewithclicks.com/services/google-ads-agency.html">Google Ads</a><br/>
                <a href="https://scalewithclicks.com/services/meta-ads-agency.html">Meta Ads</a><br/>
                <a href="https://scalewithclicks.com/services/seo-services.html">SEO</a><br/>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold">Resources</h4>
              <div className="mt-2 space-y-2 text-sm">
                <Link href="/">Home</Link><br/>
                <Link href="/category/google-ads">Google Ads</Link><br/>
                <Link href="/category/seo">SEO</Link>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold">Legal</h4>
              <div className="mt-2 space-y-2 text-sm">
                <Link href="/privacy-policy">Privacy Policy</Link><br/>
                <Link href="/terms-and-conditions">Terms</Link>
              </div>
            </div>

          </div>

          <div className="text-center text-xs mt-10 border-t border-gray-700 pt-6">
            © {new Date().getFullYear()} ScaleWithClicks
          </div>

        </footer>

      </body>
    </html>
  );
}
