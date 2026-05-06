"use client";

import Link from "next/link";

export default function Header() {
  return (
   <header className="sticky top-0 z-50 glass">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

        <Link href="/" className="font-semibold text-lg">
          ScaleWithClicks
        </Link>

        <nav className="hidden md:flex gap-8 text-sm text-gray-600">
          <Link href="https://scalewithclicks.com/" className="hover:text-black transition">Home</Link>
          <Link href="/" className="hover:text-black transition">Blog</Link>
        </nav>

        <a
          href="https://wa.me/919589188668"
          className="bg-black text-white px-4 py-2 rounded-full text-sm hover:opacity-80 transition"
        >
          Book Call
        </a>

      </div>
    </header>
  );
}
