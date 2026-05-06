export default function Footer() {
  return (
    <footer className="bg-[#020817] text-gray-300 border-t border-gray-800">

      {/* TOP */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand */}
        <div>
          <h2 className="text-white text-2xl font-semibold tracking-tight mb-4">
            ScaleWithClicks
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Actionable marketing insights, Google Ads strategies, and SEO tips to help you grow faster.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <a href="#" className="p-2 bg-gray-900 rounded-lg hover:bg-gray-800 transition">
              🌐
            </a>
            <a href="#" className="p-2 bg-gray-900 rounded-lg hover:bg-gray-800 transition">
              💼
            </a>
            <a href="#" className="p-2 bg-gray-900 rounded-lg hover:bg-gray-800 transition">
              📘
            </a>
          </div>
        </div>

        {/* Blog */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm tracking-wide">
            Blog
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="/blog" className="hover:text-white transition">All Posts</a></li>
            <li><a href="/category/google-ads" className="hover:text-white transition">Google Ads</a></li>
            <li><a href="/category/seo" className="hover:text-white transition">SEO</a></li>
            <li><a href="/category/marketing" className="hover:text-white transition">Marketing</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm tracking-wide">
            Resources
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="/about" className="hover:text-white transition">About</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            <li><a href="/case-studies" className="hover:text-white transition">Case Studies</a></li>
            <li><a href="/newsletter" className="hover:text-white transition">Newsletter</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm tracking-wide">
            Stay Updated
          </h3>

          <p className="text-gray-400 text-sm mb-4">
            Get marketing tips straight to your inbox.
          </p>

          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-sm focus:outline-none focus:border-indigo-500 transition"
            />

            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition shadow-md">
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-800" />

      {/* BOTTOM */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm">

        <p>© 2026 ScaleWithClicks. All rights reserved.</p>

        <div className="flex gap-6">
          <a href="/privacy-policy" className="hover:text-white transition">Privacy</a>
          <a href="/terms" className="hover:text-white transition">Terms</a>
          <a href="/disclaimer" className="hover:text-white transition">Disclaimer</a>
        </div>

      </div>
    </footer>
  );
}
