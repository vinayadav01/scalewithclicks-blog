export default function Footer() {
  return (
    <footer className="relative bg-[#020817] text-gray-300 overflow-hidden">

      {/* 🔵 Multi-layer glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 w-[600px] h-[600px] bg-purple-600 opacity-20 blur-[140px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-600 opacity-10 blur-[120px] rounded-full"></div>
      </div>

      {/* ✨ Top gradient border */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-40"></div>

      {/* MAIN */}
      <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

        {/* Brand */}
        <div className="backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400">
            ScaleWithClicks
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Helping businesses generate leads using Ads, SEO & tracking.
          </p>

          {/* Social */}
          <div className="flex gap-4 text-lg">
            <a href="https://scalewithclicks.com/" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition">🌐</a>
           <a 
  href="tel:+919876543210" 
  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
>
  📞
</a>

<a 
  href="https://wa.me/919876543210" 
  target="_blank" 
  rel="noopener noreferrer"
  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
>
  💬
</a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
            Services
          </h3>
          <ul className="space-y-3 text-sm">
            {[
              ["Google Ads","https://scalewithclicks.com/services/google-ads-agency.html"],
              ["Meta Ads","https://scalewithclicks.com/services/meta-ads-agency.html"],
              ["SEO","https://scalewithclicks.com/services/seo-services.html"],
              ["Conversion Tracking","https://scalewithclicks.com/services/conversion-tracking.html"],
            ].map(([name, link], i) => (
              <li key={i}>
                <a href={link} className="group flex items-center gap-2 text-gray-400 hover:text-white transition duration-300">
                  <span className="w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition"></span>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
            Resources
          </h3>
          <ul className="space-y-3 text-sm">
            {[
              ["Home","https://scalewithclicks.com/"],
              ["About Us","https://scalewithclicks.com/aboutus.html"],
              ["Blog","/"],
              ["Case Studies","https://scalewithclicks.com/casestudy.html"],
              ["Contact Us","https://scalewithclicks.com/contactus.html"],
            ].map(([name, link], i) => (
              <li key={i}>
                <a href={link} className="group flex items-center gap-2 text-gray-400 hover:text-white transition duration-300">
                  <span className="w-1 h-1 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition"></span>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
            Legal
          </h3>
          <ul className="space-y-3 text-sm">
            {[
              ["Privacy Policy","/privacy-policy"],
              ["Terms","/terms"],
              ["Disclaimer","/disclaimer"],
            ].map(([name, link], i) => (
              <li key={i}>
                <a href={link} className="group flex items-center gap-2 text-gray-400 hover:text-white transition duration-300">
                  <span className="w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition"></span>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-white/10"></div>

      {/* Bottom */}
      <div className="text-center py-6 text-gray-500 text-sm tracking-wide">
        © 2026 ScaleWithClicks. Crafted for growth 🚀
      </div>

    </footer>
  );
}
