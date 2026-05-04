import Link from "next/link";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // ✅ better performance (prevents layout shift)
});

export const metadata = {
  title: "ScaleWithClicks Blog",
  description: "Performance Marketing Blog",

  verification: {
    google: "UG50HhrybK9nw-uBE1UJYvuHAsvGdj44bMJajcWMxgU",
  },

  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0, background: "#f8fafc" }}>
        
        {/* ✅ Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PG5ZS7WVRJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PG5ZS7WVRJ');
          `}
        </Script>

        {/* HEADER */}
        <header
          style={{
            padding: "20px",
            borderBottom: "1px solid #eee",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link href="/">
            <img
              src="/logo.png"
              alt="ScaleWithClicks logo"
              style={{ height: "60px" }} // ✅ better UX (88px too big)
            />
          </Link>

          <nav>
            <Link href="/" style={{ marginRight: "15px" }}>Home</Link>
            <Link href="/category/google-ads" style={{ marginRight: "15px" }}>Google Ads</Link>
            <Link href="/category/seo">SEO</Link>
            <Link href="/category/meta">Meta</Link>
            <Link href="/category/lead-generation">Lead Generation</Link>
          </nav>
        </header>

        {/* MAIN */}
        <main style={{ minHeight: "80vh" }}>{children}</main>

        {/* FOOTER */}
        <footer
          style={{
            background: "#020617",
            color: "#cbd5f5",
            padding: "50px 20px",
            marginTop: "60px",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "40px",
            }}
          >
            {/* BRAND */}
            <div>
              <h3 style={{ color: "#fff" }}>ScaleWithClicks</h3>
              <p style={{ fontSize: "14px", lineHeight: "1.6" }}>
                Helping businesses generate leads using Ads, SEO & tracking.
              </p>
            </div>

            {/* SERVICES */}
            <div>
              <h4 style={{ color: "#fff" }}>Services</h4>
              <div style={{ lineHeight: "2" }}>
                <a href="https://scalewithclicks.com/services/google-ads-agency.html" target="_blank" rel="noopener noreferrer">Google Ads</a><br />
                <a href="https://scalewithclicks.com/services/meta-ads-agency.html" target="_blank" rel="noopener noreferrer">Meta Ads</a><br />
                <a href="https://scalewithclicks.com/services/seo-services.html" target="_blank" rel="noopener noreferrer">SEO</a>
                <a href="https://scalewithclicks.com/services/conversion-tracking.html" target="_blank" rel="noopener noreferrer">Conversion Tracking</a>
              </div>
            </div>

            {/* RESOURCES */}
            <div>
              <h4 style={{ color: "#fff" }}>Resources</h4>
              <div style={{ lineHeight: "2" }}>
                <Link href="/">Home</Link><br />
                <Link href="/category/google-ads">Google Ads</Link><br />
                <Link href="/category/seo">SEO</Link>
              </div>
            </div>

            {/* LEGAL */}
            <div>
              <h4 style={{ color: "#fff" }}>Legal</h4>
              <div style={{ lineHeight: "2" }}>
                <Link href="/privacy-policy">Privacy Policy</Link><br />
                <Link href="/terms-and-conditions">Terms</Link>
              </div>
            </div>
          </div>

          {/* COPYRIGHT */}
          <div
            style={{
              textAlign: "center",
              marginTop: "40px",
              fontSize: "13px",
              borderTop: "1px solid #1e293b",
              paddingTop: "20px",
              color: "#94a3b8",
            }}
          >
            © {new Date().getFullYear()} ScaleWithClicks
          </div>
        </footer>
      </body>
    </html>
  );
}
