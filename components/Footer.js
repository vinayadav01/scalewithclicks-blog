export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 border-t border-gray-200">

      {/* TOP */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand */}
        <div>
          <h2 className="text-gray-900 text-2xl font-semibold mb-4">
            ScaleWithClicks
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Actionable marketing insights, Google Ads strategies, and SEO tips to help you grow faster.
          </p>
        </div>

        {/* Blog */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4 text-sm">
            Blog
          </h3>
          <ul className="space-y-3 text-sm">
            <li><a href="/blog" className="hover:text-black">All Posts</a></li>
            <li><a href="/category/google-ads" className="hover:text-black">Google Ads</a></li>
            <li><a href="/category/seo" className="hover:text-black">SEO</a></li>
            <li><a href="/category/marketing" className="hover:text-black">Marketing</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4 text-sm">
            Resources
          </h3>
          <ul className="space-y-3 text-sm">
            <li><a href="/about" className="hover:text-black">About</a></li>
            <li><a href="/contact" className="hover:text-black">Contact</a></li>
            <li><a href="/newsletter" className="hover:text-black">Newsletter</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4 text-sm">
            Stay Updated
          </h3>

          <p className="text-gray-500 text-sm mb-4">
            Get marketing tips in your inbox.
          </p>

          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-black"
            />
            <button className="bg-black text-white py-2 rounded-lg text-sm hover:opacity-90 transition">
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <p>© 2026 ScaleWithClicks</p>

          <div className="flex gap-6">
            <a href="/privacy-policy" className="hover:text-black">Privacy</a>
            <a href="/terms" className="hover:text-black">Terms</a>
            <a href="/disclaimer" className="hover:text-black">Disclaimer</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
