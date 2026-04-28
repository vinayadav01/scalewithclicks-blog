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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">

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

        {/* MAIN CONTENT */}
        <main style={{ flex: 1 }}>{children}</main>

        {/* ✅ IMPROVED FOOTER */}
        <footer
          style={{
            background: "#0f172a",
            color: "#cbd5f5",
            padding: "40px 20px",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              maxWidth: "1100px",
              margin: "auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "30px",
            }}
          >
            {/* BRAND */}
            <div>
              <h3 style={{ color: "#fff", marginBottom: "10px" }}>
                ScaleWithClicks
              </h3>
              <p style={{ fontSize: "14px", lineHeight: "1.6" }}>
                Helping businesses generate leads and scale with Google Ads,
                Meta Ads, SEO, and conversion tracking systems.
              </p>
            </div>

            {/* SERVICES */}
            <div>
              <h4 style={{ color: "#fff", marginBottom: "10px" }}>Services</h4>
              <div style={{ fontSize: "14px", lineHeight: "2" }}>
                <div>
                  <a href="https://scalewithclicks.com/services/google-ads-agency.html">Google Ads</a>
                </div>
                <div>
                  <a href="https://scalewithclicks.com/services/meta-ads-agency.html">Meta Ads</a>
                </div>
                <div>
                  <a href="https://scalewithclicks.com/services/seo-services.html">SEO Services</a>
                </div>
                <div>
                  <a href="https://scalewithclicks.com/services/conversion-tracking.html">Conversion Tracking</a>
                </div>
              </div>
            </div>

            {/* RESOURCES */}
            <div>
              <h4 style={{ color: "#fff", marginBottom: "10px" }}>Resources</h4>
              <div style={{ fontSize: "14px", lineHeight: "2" }}>
                <div>
                  <a href="/">Home</a>
                </div>
                <div>
                  <a href="/category/google-ads">Google Ads Blogs</a>
                </div>
                <div>
                  <a href="/category/seo">SEO Blogs</a>
                </div>
                <div>
                  <a href="/category/lead-generation">Lead Generation</a>
                </div>
              </div>
            </div>

            {/* LEGAL */}
            <div>
              <h4 style={{ color: "#fff", marginBottom: "10px" }}>Legal</h4>
              <div style={{ fontSize: "14px", lineHeight: "2" }}>
                <div>
                  <a href="/privacy-policy">Privacy Policy</a>
                </div>
                <div>
                  <a href="/terms-and-conditions">Terms & Conditions</a>
                </div>
                <div>
                  <a href="/contact">Contact</a>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div
            style={{
              textAlign: "center",
              marginTop: "30px",
              fontSize: "13px",
              borderTop: "1px solid #1e293b",
              paddingTop: "15px",
            }}
          >
            © 2026 ScaleWithClicks. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
