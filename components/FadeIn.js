"use client";

import { useEffect, useState, useRef } from "react";

export default function FadeIn({ children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // important
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px", // 👈 FIXES mobile trigger issue
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"
      }`}
    >
      {children}
    </div>
  );
}
