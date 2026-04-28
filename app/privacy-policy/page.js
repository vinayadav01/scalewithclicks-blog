export const metadata = {
  title: "Privacy Policy | ScaleWithClicks",
  description: "Learn how ScaleWithClicks collects, uses, and protects your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "60px 20px" }}>
      
      {/* HEADER */}
      <h1 style={{ fontSize: "38px", fontWeight: "800", marginBottom: "10px" }}>
        Privacy Policy
      </h1>
      <p style={{ color: "#64748b", marginBottom: "40px" }}>
        Last updated: April 2026
      </p>

      {/* INTRO */}
      <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "12px", marginBottom: "30px" }}>
        <p>
          We respect your privacy and are committed to protecting your personal information.
        </p>
      </div>

      {/* SECTIONS */}
      <Section title="1. Information We Collect">
        We may collect personal details such as name, email address, and usage data when you interact with our website.
      </Section>

      <Section title="2. How We Use Your Information">
        Your data helps us improve our services, communicate with you, and optimize your experience.
      </Section>

      <Section title="3. Cookies">
        We use cookies to analyze traffic and enhance user experience. You can disable cookies in your browser settings.
      </Section>

      <Section title="4. Third-Party Tools">
        We use tools like Google Analytics to track website performance and user behavior.
      </Section>

      <Section title="5. Data Protection">
        We implement security measures to protect your information, but no method is 100% secure.
      </Section>

      <Section title="6. Your Rights">
        You can request access, correction, or deletion of your personal data at any time.
      </Section>

      <Section title="7. Updates">
        This policy may be updated periodically. Continued use of the website means acceptance of updates.
      </Section>

      {/* CTA */}
      <div style={{
        marginTop: "50px",
        padding: "25px",
        background: "#2563eb",
        color: "#fff",
        borderRadius: "12px"
      }}>
        <h3>Questions About Your Data?</h3>
        <p>Contact us and we’ll help you understand how your data is handled.</p>
        <a
          href="mailto:your@email.com"
          style={{
            display: "inline-block",
            marginTop: "10px",
            background: "#fff",
            color: "#2563eb",
            padding: "10px 14px",
            borderRadius: "8px",
            fontWeight: "600"
          }}
        >
          Contact Us
        </a>
      </div>

    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "30px" }}>
      <h2 style={{ fontSize: "22px", marginBottom: "10px" }}>{title}</h2>
      <p style={{ color: "#475569", lineHeight: "1.7" }}>{children}</p>
    </div>
  );
}
