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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* ✅ ADD HEAD HERE */}
      <head>
        <meta
          name="google-site-verification"
          content="UG50HhrybK9nw-uBE1UJYvuHAsvGdj44bMJajcWMxgU"
        />
      </head>

      <body className="min-h-full flex flex-col">

        {/* ✅ Google Analytics (BLOG PROPERTY) */}
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
              page_title: document.title,
              page_location: window.location.href,
            });
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}
