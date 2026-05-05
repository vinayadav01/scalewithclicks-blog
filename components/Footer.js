export default function Footer() {
  return (
    <footer className="bg-[#020817] text-gray-300 border-t border-gray-800">
      
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Column 1 */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-4">
            ScaleWithClicks
          </h2>
          <p className="text-gray-400">
            Helping businesses generate leads using Ads, SEO & tracking.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-white font-semibold mb-4">Column 2</h3>
          <p className="text-gray-400">Add your blog links here</p>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-white font-semibold mb-4">Column 3</h3>
          <p className="text-gray-400">Categories / Tags</p>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="text-white font-semibold mb-4">Column 4</h3>
          <p className="text-gray-400">Legal / Info</p>
        </div>

      </div>

      <div className="border-t border-gray-800 text-center py-4 text-gray-500 text-sm">
        © 2026 ScaleWithClicks
      </div>

    </footer>
  );
}
