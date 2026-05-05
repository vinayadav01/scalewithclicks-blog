import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>

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

        {/* ================= HEADER ================= */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">

          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="ScaleWithClicks logo"
                className="h-10 w-auto"
              />
              <span className="font-semibold text-lg tracking-tight">
                ScaleWithClicks
              </span>
            </Link>

            {/* NAV */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">

              <Link href="/" className="hover:text-purple-600 transition">
                Home
              </Link>

              <Link href="/category/google-ads" className="hover:text-purple-600 transition">
                Google Ads
              </Link>

              <Link href="/category/seo" className="hover:text-purple-600 transition">
                SEO
              </Link>

              <Link href="/category/meta" className="hover:text-purple-600 transition">
                Meta
              </Link>

              <Link href="/category/lead-generation" className="hover:text-purple-600 transition">
                Lead Gen
              </Link>

            </nav>

            {/* CTA BUTTON */}
            <a
              href="https://scalewithclicks.com"
              className="hidden md:inline-block bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition"
            >
              Free Audit
            </a>

          </div>
        </header>

        {/* ================= MAIN ================= */}
        <main className="min-h-[80vh]">
          {children}
        </main>

        {/* ================= FOOTER ================= */}
        <footer className="bg-slate-950 text-slate-300 mt-20">

          <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">

            {/* BRAND */}
            <div>
              <h3 className="text-white text-lg font-semibold">
                ScaleWithClicks
              </h3>
              <p className="text-sm mt-3 leading-relaxed">
                Helping businesses generate high-quality leads using Ads, SEO & tracking.
              </p>
            </div>

            {/* SERVICES */}
            <div>
              <h4 className="text-white font-semibold mb-3">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://scalewithclicks.com/services/google-ads-agency.html" target="_blank">Google Ads</a></li>
                <li><a href="https://scalewithclicks.com/services/meta-ads-agency.html" target="_blank">Meta Ads</a></li>
                <li><a href="https://scalewithclicks.com/services/seo-services.html" target="_blank">SEO</a></li>
                <li><a href="https://scalewithclicks.com/services/conversion-tracking.html" target="_blank">Tracking</a></li>
              </ul>
            </div>

            {/* RESOURCES */}
            <div>
              <h4 className="text-white font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/category/google-ads">Google Ads</Link></li>
                <li><Link href="/category/seo">SEO</Link></li>
                <li><Link href="/category/meta">Meta</Link></li>
              </ul>
            </div>

            {/* LEGAL */}
            <div>
              <h4 className="text-white font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                <li><Link href="/terms-and-conditions">Terms</Link></li>
              </ul>
            </div>

          </div>

          {/* COPYRIGHT */}
          <div className="text-center text-xs border-t border-slate-800 py-6 text-slate-500">
            © {new Date().getFullYear()} ScaleWithClicks. All rights reserved.
          </div>

        </footer>

      </body>
    </html>
  );
}
