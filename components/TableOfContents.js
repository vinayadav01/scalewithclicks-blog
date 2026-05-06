"use client";

import { useEffect, useState } from "react";

export default function TableOfContents({ toc }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      let current = "";

      toc.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.getBoundingClientRect().top;

          if (top < 120) {
            current = item.id;
          }
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

  return (
    <div className="bg-[#0b1220] border border-white/10 rounded-xl p-5">
      <h3 className="text-xs text-gray-400 uppercase mb-4 tracking-wider">
        On this page
      </h3>

      <ul className="space-y-2 text-sm">
        {toc.map((item, i) => (
          <li
            key={i}
            className={`transition ${
              item.level === 3 ? "ml-4" : ""
            }`}
          >
            <a
              href={`#${item.id}`}
              className={`block transition ${
                active === item.id
                  ? "text-white font-medium"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
