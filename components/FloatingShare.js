"use client";

import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

export default function FloatingShare() {
  const url =
    typeof window !== "undefined" ? window.location.href : "";

  const title =
    typeof document !== "undefined" ? document.title : "";

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "10px",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        zIndex: 999,
      }}
    >
      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        style={iconStyle("#1877F2")}
      >
        <FaFacebookF />
      </a>

      {/* Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?url=${url}&text=${title}`}
        target="_blank"
        rel="noopener noreferrer"
        style={iconStyle("#1DA1F2")}
      >
        <FaTwitter />
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        style={iconStyle("#0A66C2")}
      >
        <FaLinkedinIn />
      </a>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${title} ${url}`}
        target="_blank"
        rel="noopener noreferrer"
        style={iconStyle("#25D366")}
      >
        <FaWhatsapp />
      </a>
    </div>
  );
}

function iconStyle(bg) {
  return {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: bg,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    textDecoration: "none",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    transition: "0.3s",
  };
}
