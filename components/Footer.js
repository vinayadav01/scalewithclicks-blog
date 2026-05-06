export default function Footer() {
  return (
    <footer className="bg-[#020817] text-gray-300 border-t border-gray-800">
      
      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-white text-2xl font-semibold mb-4">
            ScaleWithClicks
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Actionable marketing insights, Google Ads strategies, and SEO tips to help you grow faster.
          </p>

          {/* Socials */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-white">🌐</a>
            <a href="#" className="hover:text-white">💼</a>
            <a href="#" className="hover:text-white">📘</a>
          </div>
        </div>

        {/* Blog */}
        <div>
          <h3 className="text-white font-semibold mb-4">Blog</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/blog" className="hover:text-white">All Posts</a></li>
            <li><a href="/category/google-ads" className="hover:text-white">Google Ads</a></li>
            <li><a href="/category/seo" className="hover:text-white">SEO</a></li>
            <li><a href="/category/marketing" className="hover:text-white">Marketing</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
            <li><a href="/case-studies" className="hover:text-white">Case Studies</a></li>
            <li><a href="/newsletter" className="hover:text-white">Newsletter</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
          <p className="text-gray-400 mb-4">
            Get latest marketing tips directly in your inbox.
          </p>

          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-sm focus:outline-none focus:border-indigo-500"
            />
            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition">
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-800" />

      {/* BOTTOM BAR */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm gap-4">
        
        <p>© 2026 ScaleWithClicks. All rights reserved.</p>

        <div className="flex gap-6">
          <a href="/privacy-policy" className="hover:text-white">Privacy</a>
          <a href="/terms" className="hover:text-white">Terms</a>
          <a href="/disclaimer" className="hover:text-white">Disclaimer</a>
        </div>

      </div>
    </footer>
  );
}
