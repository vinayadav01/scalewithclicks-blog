import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

// ✅ REQUIRED for TS
export const metadata = {
  title: "ScaleWithClicks Blog",
  description: "Performance Marketing Blog",
};

// ✅ TYPE FIX HERE
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-br from-gray-50 to-gray-100`}
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PG5ZS7WVRJ"
          strategy="afterInteractive"
        />
        <Script id="ga" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PG5ZS7WVRJ');
          `}
        </Script>

        {/* HEADER */}
        <Header />

        {/* MAIN */}
       <main className="min-h-[80vh] pb-20 md:pb-0">
  {children}
</main>

{/* ================= MOBILE STICKY CTA ================= */}
<div className="fixed bottom-0 left-0 w-full z-50 md:hidden pb-[env(safe-area-inset-bottom)]">

  <div className="flex items-center justify-between px-4 py-3 bg-white border-t shadow-lg">

    {/* TEXT */}
    <div className="text-xs">
      <p className="font-semibold text-gray-800">Need More Leads?</p>
      <p className="text-gray-500">Free Google Ads Strategy</p>
    </div>

    {/* CTA BUTTON */}
    <a
  href="https://wa.me/919589188668?text=Hi%20I%20want%20help%20with%20Google%20Ads"
  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow hover:scale-105 transition"
>
  💬 Book Call
</a>

  </div>

</div>
        
        {/* FOOTER */}
        <Footer/>
        
      </body>
    </html>
  );
}
