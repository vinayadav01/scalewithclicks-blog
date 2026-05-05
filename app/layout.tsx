import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";

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
        <main className="min-h-[80vh]">{children}</main>

        {/* FOOTER */}
        <footer className="bg-[#020617] text-[#cbd5f5] px-6 py-12 mt-16">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
            {/* BRAND */}
            <div>
              <h3 className="text-white font-bold">ScaleWithClicks</h3>
              <p className="text-sm mt-2">
                Helping businesses generate leads using Ads, SEO & tracking.
              </p>
            </div>

            {/* SERVICES */}
            <div>
              <h4 className="text-white font-semibold">Services</h4>
              <div className="mt-2 space-y-2 text-sm">
                <a href="https://scalewithclicks.com/services/google-ads-agency.html">
                  Google Ads
                </a>
                <br />
                <a href="https://scalewithclicks.com/services/meta-ads-agency.html">
                  Meta Ads
                </a>
                <br />
                <a href="https://scalewithclicks.com/services/seo-services.html">
                  SEO
                </a>
              </div>
            </div>

            {/* RESOURCES */}
            <div>
              <h4 className="text-white font-semibold">Resources</h4>
              <div className="mt-2 space-y-2 text-sm">
                <Link href="/">Home</Link>
                <br />
                <Link href="/category/google-ads">Google Ads</Link>
                <br />
                <Link href="/category/seo">SEO</Link>
              </div>
            </div>

            {/* LEGAL */}
            <div>
              <h4 className="text-white font-semibold">Legal</h4>
              <div className="mt-2 space-y-2 text-sm">
                <Link href="/privacy-policy">Privacy Policy</Link>
                <br />
                <Link href="/terms-and-conditions">Terms</Link>
              </div>
            </div>
          </div>

          <div className="text-center text-xs mt-10 border-t border-gray-700 pt-6">
            © {new Date().getFullYear()} ScaleWithClicks
          </div>
        </footer>
      </body>
    </html>
  );
}
