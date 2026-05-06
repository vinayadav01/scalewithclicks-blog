export default function Footer() {
  return (
    <footer className="relative bg-[#020817] text-gray-300 overflow-hidden">

      {/* 🔵 Background glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-20 left-1/2 w-[500px] h-[500px] bg-purple-600 blur-[120px] rounded-full"></div>
      </div>

      {/* MAIN */}
      <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-semibold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
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
            <li>
              <a href="https://scalewithclicks.com/services/google-ads-agency.html" className="group relative inline-block hover:text-white transition">
                Google Ads
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="https://scalewithclicks.com/services/meta-ads-agency.html" className="group relative inline-block hover:text-white transition">
                Meta Ads
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="https://scalewithclicks.com/services/seo-services.html" className="group relative inline-block hover:text-white transition">
                SEO
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="https://scalewithclicks.com/services/conversion-tracking.html" className="group relative inline-block hover:text-white transition">
                Conversion Tracking
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wide">
            Resources
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>
              <a href="https://scalewithclicks.com/" className="group relative inline-block hover:text-white transition">
                Home
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="https://scalewithclicks.com/aboutus.html" className="group relative inline-block hover:text-white transition">
                About Us
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="/blog" className="group relative inline-block hover:text-white transition">
                Blog
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="https://scalewithclicks.com/casestudy.html" className="group relative inline-block hover:text-white transition">
                Case Studies
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="https://scalewithclicks.com/contactus.html" className="group relative inline-block hover:text-white transition">
                Contact Us
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wide">
            Legal
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>
              <a href="/privacy-policy" className="group relative inline-block hover:text-white transition">
                Privacy Policy
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="/terms" className="group relative inline-block hover:text-white transition">
                Terms
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="/disclaimer" className="group relative inline-block hover:text-white transition">
                Disclaimer
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-gray-800"></div>

      {/* Bottom */}
      <div className="text-center py-6 text-gray-500 text-sm">
        © 2026 ScaleWithClicks. All rights reserved.
      </div>

    </footer>
  );
}
