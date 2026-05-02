"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;

    const bar = document.getElementById("progress-bar");
    if (bar) {
      bar.style.width = progress + "%";
    }

    setScrolled(scrollTop > 50);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  
  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
  <div className="nav-container">
    
    <div className="logo">ScaleWithClicks</div>

    <nav className="nav-links">
      <a href="/">Home</a>
      <a href="/blog">Blog</a>
      <a href="/services">Services</a>
    </nav>
  </div>
</header>
  );
}
