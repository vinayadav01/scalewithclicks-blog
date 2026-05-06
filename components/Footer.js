export default function Footer() {
  return (
    <footer className="bg-[#020817] text-gray-300">

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

        {/* Brand */}
        <div>
          <h2 className="text-white text-2xl font-semibold mb-5">
            ScaleWithClicks
          </h2>
          <p className="text-gray-400 leading-relaxed max-w-xs text-sm">
            Helping businesses generate leads using Ads, SEO & tracking.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wide">
            Services
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="https://scalewithclicks.com/services/google-ads-agency.html" className="hover:text-white transition">Google Ads</a></li>
            <li><a href="https://scalewithclicks.com/services/meta-ads-agency.html" className="hover:text-white transition">Meta Ads</a></li>
            <li><a href="https://scalewithclicks.com/services/seo-services.html" className="hover:text-white transition">SEO</a></li>
            <li><a href="https://scalewithclicks.com/services/conversion-tracking.html" className="hover:text-white transition">Conversion Tracking</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wide">
            Resources
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="https://scalewithclicks.com/" className="hover:text-white transition">Home</a></li>
            <li><a href="https://scalewithclicks.com/aboutus.html" className="hover:text-white transition">About Us</a></li>
            <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
            <li><a href="https://scalewithclicks.com/casestudy.html" className="hover:text-white transition">Case Studies</a></li>
            <li><a href="https://scalewithclicks.com/contactus.html" className="hover:text-white transition">Contact Us</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wide">
            Legal
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="/privacy-policy" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white transition">Terms</a></li>
            <li><a href="/disclaimer" className="hover:text-white transition">Disclaimer</a></li>
          </ul>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-gray-800"></div>

      {/* Bottom */}
      <div className="text-center py-6 text-gray-500 text-sm">
        © 2026 ScaleWithClicks
      </div>

    </footer>
  );
}
