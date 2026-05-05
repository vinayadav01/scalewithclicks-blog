"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // ✅ Detect scroll
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
    </>
  );
}
