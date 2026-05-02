"use client";
import { useEffect } from "react";

export default function ProgressBar() {
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress = (scrollTop / height) * 100;

      const bar = document.querySelector(".progress-bar");
      const thumb = document.querySelector(".progress-thumb");

      if (bar) bar.style.width = progress + "%";
      if (thumb) thumb.style.left = progress + "%";
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="progress-container">
      <div className="progress-bar"></div>

      <div className="progress-thumb">
        <img src="/images/author.jpg" alt="progress" />
      </div>
    </div>
  );
}
