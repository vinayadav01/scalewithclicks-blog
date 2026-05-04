"use client";

export default function FloatingShare() {
  const url =
    typeof window !== "undefined" ? window.location.href : "";

  const title =
    typeof document !== "undefined" ? document.title : "";

  return (
    <div style={container}>
      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...icon, background: "#1877F2" }}
      >
        <FacebookIcon />
      </a>

      {/* Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?url=${url}&text=${title}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...icon, background: "#1DA1F2" }}
      >
        <TwitterIcon />
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...icon, background: "#0A66C2" }}
      >
        <LinkedInIcon />
      </a>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${title} ${url}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...icon, background: "#25D366" }}
      >
        <WhatsappIcon />
      </a>
    </div>
  );
}

const container = {
  position: "fixed",
  top: "50%",
  left: "10px",
  transform: "translateY(-50%)",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  zIndex: 999,
};

const icon = {
  width: "42px",
  height: "42px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  textDecoration: "none",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  transition: "all 0.3s ease",
};

/* SVG ICONS */

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-4 3.8-4 1.1 0 2.2.2 2.2.2v2.4h-1.3c-1.3 0-1.7.8-1.7 1.6V12H17l-.5 3h-2v7A10 10 0 0 0 22 12z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M22 5.8c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.3 1.7-2.2-.8.5-1.7.8-2.6 1-1.5-1.6-4.2-1.5-5.7.1-1 .9-1.3 2.3-.9 3.5-3.4-.2-6.5-1.8-8.5-4.4-1.1 1.8-.5 4.2 1.3 5.5-.6 0-1.2-.2-1.7-.5 0 2.1 1.5 3.9 3.5 4.3-.6.2-1.3.2-1.9.1.5 1.7 2.1 2.9 4 2.9-1.5 1.2-3.4 1.9-5.3 1.9H2c2 1.3 4.3 2 6.7 2 8 0 12.4-6.6 12.4-12.4v-.6c.8-.6 1.5-1.3 2-2.1z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M20.4 20.4h-3.6v-5.6c0-1.3-.5-2.2-1.7-2.2-1 0-1.6.7-1.9 1.4-.1.2-.1.6-.1.9v5.5H9.5s.1-8.9 0-9.8h3.6v1.4c.5-.8 1.4-1.9 3.4-1.9 2.5 0 4.4 1.6 4.4 5v5.3zM5.3 7.9c-1.2 0-2-.8-2-1.8 0-1 .8-1.8 2-1.8s2 .8 2 1.8c0 1-.8 1.8-2 1.8zm1.8 12.5H3.5v-9.8h3.6v9.8z" />
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M20 4a10 10 0 0 0-17.3 9l-1.4 5.1 5.2-1.3A10 10 0 1 0 20 4zm-8 16a8 8 0 0 1-4.1-1.1l-.3-.2-3.1.8.8-3-.2-.3A8 8 0 1 1 12 20zm4.4-6.1c-.2-.1-1.3-.6-1.5-.7-.2-.1-.4-.1-.5.1-.2.2-.6.7-.7.8-.1.1-.3.1-.5 0-.2-.1-.9-.3-1.6-1-.6-.5-1-1.2-1.1-1.4-.1-.2 0-.3.1-.4.1-.1.2-.3.3-.4.1-.1.1-.2.2-.4 0-.1 0-.3 0-.4 0-.1-.5-1.3-.7-1.7-.2-.4-.4-.3-.5-.3h-.4c-.1 0-.4.1-.6.3-.2.2-.8.8-.8 2s.8 2.3.9 2.4c.1.2 1.6 2.4 3.9 3.3.5.2.9.3 1.2.4.5.2 1 .1 1.3.1.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1z" />
    </svg>
  );
}
