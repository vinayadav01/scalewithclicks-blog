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

        {/* ✅ FOOTER (CORRECT POSITION) */}
        <footer
          style={{
            textAlign: "center",
            padding: "20px",
            borderTop: "1px solid #eee",
            marginTop: "40px",
            fontSize: "14px",
            color: "#64748b",
          }}
        >
          <div style={{ marginBottom: "8px" }}>
            © 2026 ScaleWithClicks
          </div>

          <div>
            <a href="/privacy-policy" style={{ marginRight: "10px" }}>
              Privacy Policy
            </a>
            |
            <a href="/terms-and-conditions" style={{ marginLeft: "10px" }}>
              Terms & Conditions
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
