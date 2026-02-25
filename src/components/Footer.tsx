"use client";

import { motion } from "framer-motion";
import { Shield, Github, Youtube, ExternalLink, Mail } from "lucide-react";
import Image from "next/image";

const techPills = [
  "ASI Alliance",
  "Fetch.ai uAgents",
  "SingularityNET MeTTa",
  "Solana",
  "12 EVM Chains",
  "Security",
];

const links = [
  {
    label: "GitHub",
    href: "https://github.com/DhanteyUD/DeFiGuard",
    Icon: Github,
  },
  {
    label: "Demo",
    href: "https://www.youtube.com/watch?v=xyt-SBwxnIo",
    Icon: Youtube,
  },
  {
    label: "ASI:One",
    href: "https://asi1.ai/ai/agent1q2zusjcsgluu9pkkf9g2fn5lyqnaf9jqlhm3smlhvqcd6nct46ezy2qvm2l",
    Icon: ExternalLink,
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#1e1c28] border-t border-[#a52126]/18 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#a52126]/50 to-transparent" />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-150 h-50 bg-[#a52126] opacity-[0.04] blur-[80px] pointer-events-none rounded-full" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-14">

        {/* Main row */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 mb-12">

          {/* Brand */}
          <motion.div
            className="flex flex-col items-center md:items-start gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2">
              <div className="relative w-6 h-6">
                <Shield
                  className="absolute inset-0 w-full h-full text-[#a52126]"
                  strokeWidth={1.5}
                />
                <div className="absolute inset-0 flex items-center justify-center pt-0.5">
                  <Image
                    src="/icons/defiguard-icon.png"
                    alt="DeFiGuard logo"
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                </div>
                <div className="absolute inset-0 bg-[#a52126] opacity-20 blur-lg rounded-full pointer-events-none" />
              </div>
              <span className="text-white font-bold text-xl tracking-wide font-mono">
                DeFi<span className="text-[#a52126]">Guard</span>
              </span>
            </div>
            <p className="text-white/35 text-xs max-w-55 text-center md:text-left leading-relaxed">
              AI-powered multi-chain DeFi portfolio risk monitoring with
              autonomous agents.
            </p>
            <a
              href="mailto:defiguard.agent@gmail.com"
              className="flex items-center gap-1.5 text-white/35 hover:text-[#a52126] text-xs transition-colors duration-200"
            >
              <Mail className="w-3 h-3" />
              defiguard.agent@gmail.com
            </a>
          </motion.div>

          {/* Links */}
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {links.map(({ label, href, Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white/40 hover:text-white text-sm transition-colors duration-200"
                whileHover={{ y: -2 }}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </motion.a>
            ))}
          </motion.div>

          <motion.p
            className="text-white/28 text-xs"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Built by{" "}
            <a
              href="https://github.com/DhanteyUD"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a52126] hover:underline"
            >
              DhanteyUD
            </a>{" "}
            · MIT License
          </motion.p>
        </div>

        {/* Tech pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
        >
          {techPills.map((tech, i) => (
            <motion.span
              key={tech}
              className="text-[11px] px-3 py-1 bg-white/4 border border-white/10 rounded-full text-white/35 hover:border-[#a52126]/35 hover:text-white/60 transition-colors cursor-default"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 + i * 0.05 }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          className="text-center text-white/20 text-[11px] mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
        >
          © {new Date().getFullYear()} DeFiGuard · Protecting DeFi portfolios
          across Solana and beyond 🛡️
        </motion.p>
      </div>
    </footer>
  );
}
