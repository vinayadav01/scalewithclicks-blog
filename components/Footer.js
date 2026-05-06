"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function Footer() {
  return (
    <footer className="relative bg-[#020617] text-gray-400 border-t border-white/10 overflow-hidden">

      {/* subtle background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(99,102,241,0.12),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6 py-24">

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12">

          {/* BRAND */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
            className="md:col-span-2"
          >
            <h2 className="text-white text-xl font-semibold tracking-tight">
              ScaleWithClicks
            </h2>

            <p className="mt-4 text-sm text-gray-400 max-w-sm leading-relaxed">
              Helping businesses generate consistent leads through performance marketing, SEO, and advanced tracking systems.
            </p>

            <div className="flex gap-4 mt-6 text-sm">
              <a href="#" className="hover:text-white transition">Twitter</a>
              <a href="#" className="hover:text-white transition">LinkedIn</a>
              <a href="#" className="hover:text-white transition">Contact</a>
            </div>
          </motion.div>

          {/* COLUMN FUNCTION */}
          {[
            {
              title: "Services",
              links: [
                ["Google Ads","https://scalewithclicks.com/services/google-ads-agency.html"],
                ["Meta Ads","https://scalewithclicks.com/services/meta-ads-agency.html"],
                ["SEO","https://scalewithclicks.com/services/seo-services.html"],
                ["Conversion Tracking","https://scalewithclicks.com/services/conversion-tracking.html"],
              ],
            },
            {
              title: "Resources",
              links: [
                ["Home","https://scalewithclicks.com/"],
                ["About Us","https://scalewithclicks.com/aboutus.html"],
                ["Blog","/"],
                ["Case Studies","https://scalewithclicks.com/casestudy.html"],
                ["Contact Us","https://scalewithclicks.com/contactus.html"],
              ],
            },
            {
              title: "Legal",
              links: [
                ["Privacy Policy","/privacy-policy"],
                ["Terms","/terms"],
                ["Disclaimer","/disclaimer"],
              ],
            },
          ].map((col, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i + 2}
            >
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {col.title}
              </h3>

              <ul className="mt-4 space-y-3 text-sm">
                {col.links.map(([name, link], idx) => (
                  <motion.li
                    key={idx}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a
                      href={link}
                      className="group relative inline-block text-gray-400 hover:text-white transition"
                    >
                      {name}

                      {/* animated underline */}
                      <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

        </div>

        {/* DIVIDER */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500"
        >
          <p>© 2026 ScaleWithClicks</p>

          <div className="flex gap-6">
            <a href="/privacy-policy" className="hover:text-white transition">Privacy</a>
            <a href="/terms" className="hover:text-white transition">Terms</a>
            <a href="/disclaimer" className="hover:text-white transition">Disclaimer</a>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
