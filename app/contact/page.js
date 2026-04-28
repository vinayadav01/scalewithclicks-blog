export default function Contact() {
  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "40px 20px", textAlign: "center" }}>

      <h1>Contact Us</h1>
      <p style={{ color: "#64748b", marginBottom: "30px" }}>
        Want to grow your business? Let's talk.
      </p>

      {/* CTA */}
      <a
        href="https://calendly.com/vinayyadav01992"
        style={{
          display: "inline-block",
          padding: "14px 22px",
          background: "#2563eb",
          color: "#fff",
          borderRadius: "10px",
          fontWeight: "600",
          marginBottom: "30px",
        }}
      >
        🚀 Book Free Strategy Call
      </a>

      <div style={{ marginTop: "30px" }}>
        <p><strong>Email:</strong> scalewithclicks@gmail.com</p>
        <p><strong>Phone:</strong> +91 9589188668</p>
      </div>

      {/* WhatsApp CTA */}
      <a
        href="https://wa.me/919589188668"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "12px 18px",
          background: "#25D366",
          color: "#fff",
          borderRadius: "10px",
          fontWeight: "600",
        }}
      >
        💬 Chat on WhatsApp
      </a>

    </div>
  );
}
