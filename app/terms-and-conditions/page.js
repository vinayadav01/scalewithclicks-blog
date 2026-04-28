export const metadata = {
  title: "Terms & Conditions | ScaleWithClicks",
  description: "Read the terms and conditions for using ScaleWithClicks website and services.",
};

export default function TermsPage() {
  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "60px 20px" }}>
      
      {/* HEADER */}
      <h1 style={{ fontSize: "38px", fontWeight: "800", marginBottom: "10px" }}>
        Terms & Conditions
      </h1>
      <p style={{ color: "#64748b", marginBottom: "40px" }}>
        Last updated: April 2026
      </p>

      {/* INTRO BOX */}
      <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "12px", marginBottom: "30px" }}>
        <p>
          By accessing this website, you agree to comply with and be bound by the following terms and conditions.
        </p>
      </div>

      {/* SECTIONS */}
      <Section title="1. Use of Website">
        You agree to use this website only for lawful purposes and in a way that does not infringe the rights of others.
      </Section>

      <Section title="2. Intellectual Property">
        All content, including text, graphics, and branding, is the property of ScaleWithClicks and may not be reused without permission.
      </Section>

      <Section title="3. Services Disclaimer">
        We do not guarantee specific results from marketing services. Results depend on multiple external factors.
      </Section>

      <Section title="4. External Links">
        Our website may contain links to third-party websites. We are not responsible for their content or practices.
      </Section>

      <Section title="5. Limitation of Liability">
        We are not liable for any direct or indirect damages resulting from the use of this website.
      </Section>

      <Section title="6. Changes to Terms">
        We may update these terms at any time. Continued use of the website means you accept the updated terms.
      </Section>

      {/* CTA */}
      <div style={{
        marginTop: "50px",
        padding: "25px",
        background: "#2563eb",
        color: "#fff",
        borderRadius: "12px"
      }}>
        <h3>Need Help Growing Your Business?</h3>
        <p>Get a free strategy call to scale your leads and revenue.</p>
        <a
          href="https://calendly.com/vinayyadav01992"
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
          Book Free Call
        </a>
      </div>

    </div>
  );
}

/* REUSABLE SECTION COMPONENT */
function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "30px" }}>
      <h2 style={{ fontSize: "22px", marginBottom: "10px" }}>{title}</h2>
      <p style={{ color: "#475569", lineHeight: "1.7" }}>{children}</p>
    </div>
  );
}
