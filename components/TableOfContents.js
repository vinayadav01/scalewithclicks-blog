"use client";

import { useEffect, useState } from "react";

export default function TableOfContents({ toc }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const headings = document.querySelectorAll("h2, h3");

    const onScroll = () => {
      let current = "";

      headings.forEach((h) => {
        if (window.scrollY >= h.offsetTop - 120) {
          current = h.id;
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      <h3 className="text-sm font-semibold mb-3">On this page</h3>

      <ul className="space-y-2 text-sm">
        {toc.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block transition ${
                active === item.id
                  ? "text-indigo-600 font-medium"
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
