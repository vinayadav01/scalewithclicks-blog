"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-md py-2"
            : "bg-white py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="ScaleWithClicks logo"
              width={140}
              height={40}
              className={`transition-all duration-300 ${
                scrolled ? "h-7" : "h-10"
              } w-auto`}
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">

            <Link href="/" className="hover:text-purple-600 transition">
              Home
            </Link>

            <Link href="/category/google-ads" className="hover:text-purple-600 transition">
              Google Ads
            </Link>

            <Link href="/category/seo" className="hover:text-purple-600 transition">
              SEO
            </Link>

            <Link href="/category/meta" className="hover:text-purple-600 transition">
              Meta
            </Link>

            <Link href="/category/lead-generation" className="hover:text-purple-600 transition">
              Lead Gen
            </Link>

            {/* 🔥 PRIMARY CTA */}
            <a
              href="https://scalewithclicks.com"
              className="ml-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow hover:scale-105 transition"
            >
              Get Free Strategy
            </a>

          </nav>

          {/* MOBILE CTA + MENU */}
          <div className="flex items-center gap-3 md:hidden">

            {/* 🔥 MOBILE CTA */}
            <a
              href="https://scalewithclicks.com"
              className="bg-purple-600 text-white px-4 py-1.5 rounded-full text-xs font-medium"
            >
              Free Call
            </a>

            {/* HAMBURGER */}
            <button
              className="text-2xl"
              onClick={() => setOpen(true)}
            >
              ☰
            </button>
          </div>

        </div>
      </header>

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
        className={`fixed top-0 left-0 h-full w-[280px] bg-white z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 border-b flex justify-between items-center">
          <span className="font-bold">Menu</span>
          <button onClick={() => setOpen(false)}>✕</button>
        </div>

        {/* NAV LINKS */}
        <nav className="flex flex-col p-5 gap-4 text-sm">

          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/category/google-ads" onClick={() => setOpen(false)}>Google Ads</Link>
          <Link href="/category/seo" onClick={() => setOpen(false)}>SEO</Link>
          <Link href="/category/meta" onClick={() => setOpen(false)}>Meta</Link>
          <Link href="/category/lead-generation" onClick={() => setOpen(false)}>Lead Generation</Link>

          {/* 🔥 BIG CTA INSIDE DRAWER */}
          <a
            href="https://scalewithclicks.com"
            className="mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-3 rounded-xl text-center font-semibold"
          >
            Get Free Strategy Call →
          </a>

        </nav>

        {/* TRUST LINE */}
        <div className="px-5 text-xs text-gray-500 mt-6">
          Trusted by businesses for Google Ads growth 🚀
        </div>

      </div>
    </>
  );
}
