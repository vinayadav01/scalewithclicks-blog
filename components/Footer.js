export default function Footer() {
  return (
    <footer className="relative bg-[#020617] text-gray-400 border-t border-white/10 overflow-hidden">

      {/* subtle glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(99,102,241,0.15),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6 py-24">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12">

          {/* BRAND */}
          <div className="md:col-span-2">
            <h2 className="text-white text-xl font-semibold tracking-tight">
              ScaleWithClicks
            </h2>

            <p className="mt-4 text-sm max-w-sm leading-relaxed">
              Helping businesses generate consistent leads through performance marketing, SEO, and advanced tracking systems.
            </p>

            <div className="flex gap-4 mt-6 text-sm">
              <a href="#" className="hover:text-white transition">Twitter</a>
              <a href="#" className="hover:text-white transition">LinkedIn</a>
              <a href="#" className="hover:text-white transition">Contact</a>
            </div>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Services
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="https://scalewithclicks.com/services/google-ads-agency.html" className="hover:text-white transition hover:translate-x-1 inline-block">Google Ads</a></li>
              <li><a href="https://scalewithclicks.com/services/meta-ads-agency.html" className="hover:text-white transition hover:translate-x-1 inline-block">Meta Ads</a></li>
              <li><a href="https://scalewithclicks.com/services/seo-services.html" className="hover:text-white transition hover:translate-x-1 inline-block">SEO</a></li>
              <li><a href="https://scalewithclicks.com/services/conversion-tracking.html" className="hover:text-white transition hover:translate-x-1 inline-block">Conversion Tracking</a></li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Resources
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="https://scalewithclicks.com/" className="hover:text-white transition hover:translate-x-1 inline-block">Home</a></li>
              <li><a href="https://scalewithclicks.com/aboutus.html" className="hover:text-white transition hover:translate-x-1 inline-block">About Us</a></li>
              <li><a href="/" className="hover:text-white transition hover:translate-x-1 inline-block">Blog</a></li>
              <li><a href="https://scalewithclicks.com/casestudy.html" className="hover:text-white transition hover:translate-x-1 inline-block">Case Studies</a></li>
              <li><a href="https://scalewithclicks.com/contactus.html" className="hover:text-white transition hover:translate-x-1 inline-block">Contact Us</a></li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="/privacy-policy" className="hover:text-white transition hover:translate-x-1 inline-block">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white transition hover:translate-x-1 inline-block">Terms</a></li>
              <li><a href="/disclaimer" className="hover:text-white transition hover:translate-x-1 inline-block">Disclaimer</a></li>
            </ul>
          </div>

        </div>

        {/* divider */}
        <div className="mt-16 border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 ScaleWithClicks</p>

          <div className="flex gap-6">
            <a href="/privacy-policy" className="hover:text-white transition">Privacy</a>
            <a href="/terms" className="hover:text-white transition">Terms</a>
            <a href="/disclaimer" className="hover:text-white transition">Disclaimer</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
