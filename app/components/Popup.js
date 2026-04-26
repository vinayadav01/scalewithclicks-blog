"use client";

import { useState, useEffect } from "react";

export default function Popup() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("popupShown");

    if (!hasSeen) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        localStorage.setItem("popupShown", "true");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!showPopup) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    }}>
      <div style={{
        background: "white",
        padding: "30px",
        borderRadius: "12px",
        textAlign: "center",
        maxWidth: "400px",
        width: "90%"
      }}>
        <h2>Get Free Growth Tips 🚀</h2>

        <p style={{ color: "#666", marginBottom: "20px" }}>
          Join our newsletter and learn how to generate more leads.
        </p>

        <a
          href="https://forms.gle/Hi8piFdKtNhHVrCg6"
          target="_blank"
          style={{
            background: "#4f46e5",
            color: "white",
            padding: "12px 20px",
            borderRadius: "8px",
            textDecoration: "none"
          }}
        >
          Subscribe Free
        </a>

        <br /><br />

        <button
          onClick={() => {
            localStorage.setItem("popupShown", "true");
            setShowPopup(false);
          }}
          style={{
            background: "none",
            border: "none",
            color: "#888",
            cursor: "pointer"
          }}
        >
          No thanks
        </button>
      </div>
    </div>
  );
}
