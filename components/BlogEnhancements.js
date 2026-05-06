"use client";

import { useEffect, useState } from "react";

export default function BlogEnhancements({ children }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scroll = window.scrollY;
      setProgress((scroll / totalHeight) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-[4px] bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
          style={{ width: `${progress}%` }}
        />
      </div>

      {children}
    </>
  );
}
