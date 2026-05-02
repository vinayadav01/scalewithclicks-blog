"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <div>ScaleWithClicks</div>

        <nav>
          <a href="/">Home</a>
          <a href="/blog">Blog</a>
          <a href="/services">Services</a>
        </nav>

        <button className="cta-btn">Start Now</button>
      </div>
    </header>
  );
}
