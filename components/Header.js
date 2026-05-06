"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#020617]/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-white font-semibold text-lg">
          ScaleWithClicks
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/" className="hover:text-white transition">Blog</Link>
          <Link href="/about" className="hover:text-white transition">About</Link>
          <Link href="/contact" className="hover:text-white transition">Contact</Link>
        </nav>

        {/* CTA */}
        <a
          href="https://wa.me/919589188668"
          className="bg-white text-black text-sm px-4 py-2 rounded-md font-medium hover:opacity-90 transition"
        >
          Get Help
        </a>

      </div>
    </header>
  );
}
