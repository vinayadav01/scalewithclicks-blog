export default function Footer() {
  return (
    <footer className="bg-[#020817] text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Column 1 */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-4">
            ScaleWithClicks
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Helping businesses generate leads using Ads, SEO & tracking.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-white font-semibold mb-4">Services</h3>
          <ul className="space-y-2">
            <li><a href="/services/google-ads" className="hover:text-white">Google Ads</a></li>
            <li><a href="/services/meta-ads" className="hover:text-white">Meta Ads</a></li>
            <li><a href="/services/seo" className="hover:text-white">SEO</a></li>
            <li><a href="/services/conversion-tracking" className="hover:text-white">Conversion Tracking</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-white font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/blog" className="hover:text-white">Blog</a></li>
            <li><a href="/case-studies" className="hover:text-white">Case Studies</a></li>
            <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="text-white font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><a href="/privacy-policy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white">Terms</a></li>
            <li><a href="/disclaimer" className="hover:text-white">Disclaimer</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 text-center py-4 text-gray-500 text-sm">
        © 2026 ScaleWithClicks
      </div>
    </footer>
  );
}
