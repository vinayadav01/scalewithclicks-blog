import Link from "next/link";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Growth Insights | ScaleWithClicks",
  description: "Proven strategies to generate leads and scale your business",
  verification: {
    google: "UG50HhrybK9nw-uBE1UJYvuHAsvGdj44bMJajcWMxgU",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{
          margin: 0,
          background: "#f8fafc",
        }}
      >
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
            gtag('config', 'G-PG5ZS7WVRJ', {
              page_path: window.location.pathname,
            });
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
              alt="ScaleWithClicks"
              style={{ height: "88px" }}
            />
          </Link>

          <nav>
            <Link href="/" style={{ marginRight: "15px" }}>Home</Link>
            <Link href="/category/google-ads" style={{ marginRight: "15px" }}>Google Ads</Link>
            <Link href="/category/seo">SEO</Link>
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
            <div>
              <h3 style={{ color: "#fff" }}>ScaleWithClicks</h3>
              <p style={{ fontSize: "14px" }}>
                Helping businesses generate leads using Ads, SEO & tracking.
              </p>
            </div>

            <div>
              <h4 style={{ color: "#fff" }}>Services</h4>
              <div>
                <a href="https://scalewithclicks.com/services/google-ads-agency.html" target="_blank">Google Ads</a><br />
                <a href="https://scalewithclicks.com/services/meta-ads-agency.html" target="_blank">Meta Ads</a><br />
                <a href="https://scalewithclicks.com/services/seo-services.html" target="_blank">SEO</a><br />
              </div>
            </div>

            <div>
              <h4 style={{ color: "#fff" }}>Resources</h4>
              <div>
                <Link href="/">Home</Link><br />
                <Link href="/category/google-ads">Google Ads</Link><br />
                <Link href="/category/seo">SEO</Link>
              </div>
            </div>

            <div>
              <h4 style={{ color: "#fff" }}>Legal</h4>
              <div>
                <Link href="/privacy-policy">Privacy Policy</Link><br />
                <Link href="/terms-and-conditions">Terms</Link>
              </div>
            </div>
          </div>

          <div
            style={{
              textAlign: "center",
              marginTop: "40px",
              fontSize: "13px",
              borderTop: "1px solid #1e293b",
              paddingTop: "20px",
            }}
          >
            © 2026 ScaleWithClicks
          </div>
        </footer>
      </body>
    </html>
  );
}
