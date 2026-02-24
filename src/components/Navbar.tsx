"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, ExternalLink, Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const navLinks = ["Agent", "Bot", "Extension", "Docs"];
const DOCS_URL =
  "https://www.notion.so/DeFiGuard-2-0-Multi-Agent-Risk-Management-System-2f408c1083e8806d8582d4eef4107020";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.96]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
        style={{
          backgroundColor: useTransform(
            bgOpacity,
            (v) => `rgba(30,28,40,${v})`,
          ),
          borderBottom: useTransform(
            borderOpacity,
            (v) => `1px solid rgba(165,33,38,${v * 0.18})`,
          ),
        }}
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer select-none"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {/* Shield frame with icon inside */}
            <div className="relative w-8 h-8">
              <Shield
                className="absolute inset-0 w-full h-full text-[#a52126]"
                strokeWidth={1.5}
              />
              <div className="absolute inset-0 flex items-center justify-center pt-0.5">
                <Image
                  src="/icons/defiguard-icon.png"
                  alt="DeFiGuard logo"
                  width={18}
                  height={18}
                  className="object-contain"
                  priority
                />
              </div>
              {/* Glow */}
              <div className="absolute inset-0 bg-[#a52126] opacity-20 blur-lg rounded-full pointer-events-none" />
            </div>
            <span className="text-white font-bold text-xl tracking-wide font-mono">
              DeFi<span className="text-[#a52126]">Guard</span>
            </span>
          </motion.div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link}
                // href={`#${link.toLowerCase()}`} // remove line 74 - 76 when doc page is setup
                href={link === "Docs" ? DOCS_URL : `#${link.toLowerCase()}`}
                target={link === "Docs" ? "_blank" : undefined}
                rel={link === "Docs" ? "noopener noreferrer" : undefined}
                className="text-white/55 hover:text-white text-sm font-medium transition-colors duration-200 relative group font-mono"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i + 0.3 }}
              >
                {link}
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#a52126] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <motion.a
              href="https://asi1.ai/ai/agent1q2zusjcsgluu9pkkf9g2fn5lyqnaf9jqlhm3smlhvqcd6nct46ezy2qvm2l"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-[#a52126] hover:bg-[#c42b31] text-white text-sm font-semibold font-mono px-4 py-2 rounded-lg transition-colors duration-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Launch App
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.a>

            <button
              className="md:hidden text-white/60 hover:text-white"
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        className="fixed inset-0 z-40 bg-[#1e1c28]/97 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={
          mobileOpen
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.97, pointerEvents: "none" }
        }
        transition={{ duration: 0.25 }}
        style={{ pointerEvents: mobileOpen ? "auto" : "none" }}
      >
        {navLinks.map((link, i) => (
          <motion.a
            key={link}
            // href={`#${link.toLowerCase()}`} // remove line 134 - 136 when doc page is setup
            href={link === "Docs" ? DOCS_URL : `#${link.toLowerCase()}`}
            target={link === "Docs" ? "_blank" : undefined}
            rel={link === "Docs" ? "noopener noreferrer" : undefined}
            className="text-white text-2xl font-bold font-mono hover:text-[#a52126] transition-colors"
            onClick={() => setMobileOpen(false)}
            initial={{ opacity: 0, y: 20 }}
            animate={mobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.05 * i }}
          >
            {link}
          </motion.a>
        ))}
        <motion.a
          href="https://asi1.ai/ai/agent1q2zusjcsgluu9pkkf9g2fn5lyqnaf9jqlhm3smlhvqcd6nct46ezy2qvm2l"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center gap-2 bg-[#a52126] text-white font-semibold font-mono px-8 py-3 rounded-lg"
          onClick={() => setMobileOpen(false)}
        >
          Launch App <ExternalLink className="w-4 h-4" />
        </motion.a>
      </motion.div>
    </>
  );
}
