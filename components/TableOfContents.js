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

          if (top <= 120) {
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
    <div className="bg-white border rounded-xl p-5">
      <h3 className="font-semibold mb-4 text-sm text-gray-500 uppercase">
        On this page
      </h3>

      <ul className="space-y-2 text-sm">
        {toc.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block transition ${
                active === item.id
                  ? "text-indigo-600 font-medium"
                  : "text-gray-600 hover:text-black"
              }`}
              style={{ paddingLeft: item.level === 3 ? "12px" : "0px" }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
