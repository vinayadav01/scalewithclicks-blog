"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef(null);
  
  // 🔥 cursor glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <footer
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative bg-[#020617] text-gray-400 border-t border-white/10 overflow-hidden"
    >

      {/* 🔥 Cursor glow */}
      <motion.div
        className="pointer-events-none absolute w-[400px] h-[400px] rounded-full bg-indigo-500/20 blur-[120px]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-24">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12">

          {/* BRAND */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2"
          >
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
          </motion.div>

          {/* COLUMN */}
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {col.title}
              </h3>

              <ul className="mt-4 space-y-3 text-sm">
                {col.links.map(([name, link], idx) => (
                  <MagneticLink key={idx} href={link}>
                    {name}
                  </MagneticLink>
                ))}
              </ul>
            </motion.div>
          ))}

        </div>

        {/* BOTTOM */}
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

// 🧲 Magnetic Link Component
function MagneticLink({ children, href }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 10 });
  const springY = useSpring(y, { stiffness: 150, damping: 10 });

  function handleMouse(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);

    x.set(offsetX * 0.2);
    y.set(offsetY * 0.2);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.li
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
    >
      <a
        href={href}
        className="relative inline-block text-gray-400 hover:text-white transition"
      >
        {children}
        <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
      </a>
    </motion.li>
  );
}
