import Link from "next/link";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body
        style={{
          margin: 0,
          fontFamily: "var(--font-geist-sans)",
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
      src="/logo.png" // 👈 put logo in public folder
      alt="ScaleWithClicks"
      style={{ height: "40px" }}
    />
  </Link>

  <nav>
    <Link href="/" style={{ marginRight: "15px" }}>Home</Link>
    <Link href="/category/google-ads" style={{ marginRight: "15px" }}>Google Ads</Link>
    <Link href="/category/seo">SEO</Link>
  </nav>
</header>     
        
        {/* MAIN CONTENT */}
        <main style={{ minHeight: "80vh" }}>{children}</main>

        {/* ✅ PREMIUM FOOTER */}
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
              <h3 style={{ color: "#fff", marginBottom: "10px" }}>
                ScaleWithClicks
              </h3>
              <p style={{ fontSize: "14px", lineHeight: "1.7" }}>
                Helping businesses generate leads and scale using Google Ads,
                Meta Ads, SEO, and conversion tracking systems.
              </p>
            </div>

            {/* SERVICES */}
            <div>
              <h4 style={{ color: "#fff", marginBottom: "10px" }}>Services</h4>
              <div style={{ fontSize: "14px", lineHeight: "2.2" }}>
                <div>
                  <a href="https://scalewithclicks.com/services/google-ads-agency.html" target="_blank" rel="noopener noreferrer">Google Ads</a>
                </div>
                <div>
                  <a href="https://scalewithclicks.com/services/meta-ads-agency.html" target="_blank" rel="noopener noreferrer">Meta Ads</a>
                </div>
                <div>
                  <a href="https://scalewithclicks.com/services/seo-services.html" target="_blank" rel="noopener noreferrer">SEO Services</a>
                </div>
                <div>
                  <a href="https://scalewithclicks.com/services/conversion-tracking.html" target="_blank" rel="noopener noreferrer">Conversion Tracking</a>
                </div>
              </div>
            </div>

            {/* RESOURCES */}
            <div>
              <h4 style={{ color: "#fff", marginBottom: "10px" }}>Resources</h4>
              <div style={{ fontSize: "14px", lineHeight: "2.2" }}>
                <div><a href="/">Home</a></div>
                <div><a href="/category/google-ads">Google Ads Blogs</a></div>
                <div><a href="/category/seo">SEO Blogs</a></div>
                <div><a href="/category/lead-generation">Lead Generation</a></div>
              </div>
            </div>

            {/* LEGAL */}
            <div>
              <h4 style={{ color: "#fff", marginBottom: "10px" }}>Legal</h4>
              <div style={{ fontSize: "14px", lineHeight: "2.2" }}>
                <div><a href="/privacy-policy">Privacy Policy</a></div>
                <div><a href="/terms-and-conditions">Terms & Conditions</a></div>
                <div><a href="/contact">Contact</a></div>
              </div>
            </div>
          </div>

          {/* BOTTOM BAR */}
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
            © 2026 ScaleWithClicks. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
