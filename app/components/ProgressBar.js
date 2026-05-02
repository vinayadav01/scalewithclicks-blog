"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProgressBar({ image }) {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const scrollPosition = window.scrollY;
      const scrolled = (scrollPosition / totalHeight) * 100;

      setScroll(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* BAR */}
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${scroll}%` 
          height: scroll > 2 ? "6px" : "3px", // 👈 THIS LINE
            }}
/>
      </div>

      {/* THUMB IMAGE */}
      {image && (
        <div
          className="progress-thumb"
          style={{ left: `${scroll}%` }}
        >
          <Image
            src={image}
            alt="progress"
            width={28}
            height={28}
          />
        </div>
      )}
    </>
  );
}
