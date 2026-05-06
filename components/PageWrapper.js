"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageWrapper({ children }) {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
    setTimeout(() => setShow(true), 50);
  }, [pathname]);

  return (
    <div
      className={`transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      {children}
    </div>
  );
}
