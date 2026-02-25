"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  Gem,
  Brain,
  Bot,
  Puzzle,
  Shield,
  Zap,
  Bell,
  Eye,
  Globe,
  ExternalLink,
  CheckCircle2,
  Clock,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Capability = { icon: React.ElementType; text: string };

interface Feature {
  id: string;
  icon: React.ElementType;
  title: string;
  badge: string;
  badgeStyle: string;
  tagline: string;
  description: string;
  capabilities: Capability[];
  cta: string;
  ctaHref: string;
  featured?: boolean;
  enterFrom: { x?: number; y?: number };
  releaseDate?: Date;
  comingSoon?: boolean;
}

function useCountdown(target?: Date) {
  const [timeLeft, setTimeLeft] = useState(() =>
    target ? Math.max(0, target.getTime() - Date.now()) : 0
  );

  useEffect(() => {
    if (!target) return;
    const id = setInterval(
      () => setTimeLeft(Math.max(0, target.getTime() - Date.now())),
      1000
    );
    return () => clearInterval(id);
  }, [target]);

  const days    = Math.floor(timeLeft / 86_400_000);
  const hours   = Math.floor((timeLeft % 86_400_000) / 3_600_000);
  const minutes = Math.floor((timeLeft % 3_600_000) / 60_000);
  const seconds = Math.floor((timeLeft % 60_000) / 1_000);
  return { days, hours, minutes, seconds, done: timeLeft === 0 };
}

// 20 days from today (Feb 25 2026) → March 17 2026
const TELEGRAM_RELEASE = new Date("2026-03-17T00:00:00Z");

const features: Feature[] = [
  {
    id: "agent",
    icon: Brain,
    title: "AI Agent",
    badge: "via ASI:One",
    badgeStyle: "bg-violet-500/15 text-violet-300 border-violet-500/30",
    tagline: "The Brain Behind the Shield",
    description:
      "A multi-agent AI system powered by SingularityNET MeTTa that monitors your DeFi portfolio around the clock, scores risk intelligently, and autonomously raises the alarm before damage is done.",
    capabilities: [
      { icon: Gem, text: "Solana + 12 EVM chain monitoring" },
      { icon: Brain, text: "MeTTa AI risk scoring engine" },
      { icon: Eye, text: "Fraud & rug-pull detection" },
      { icon: Bell, text: "Autonomous real-time alerts" },
    ],
    cta: "Connect",
    ctaHref:
      "https://asi1.ai/ai/agent1q2zusjcsgluu9pkkf9g2fn5lyqnaf9jqlhm3smlhvqcd6nct46ezy2qvm2l",
    enterFrom: { x: -70, y: 0 },
  },
  {
    id: "bot",
    icon: Bot,
    title: "Telegram Bot",
    badge: "@DeFiGuard_Bot",
    badgeStyle: "bg-[#a52126]/15 text-[#e06065] border-[#a52126]/35",
    tagline: "Alerts In Your Pocket",
    description:
      "Receive instant risk alerts, portfolio health summaries, and high-severity fraud warnings straight to Telegram — wherever you are, on any device.",
    capabilities: [
      { icon: Bell, text: "Instant risk & breach alerts" },
      { icon: Shield, text: "High-risk token warnings" },
      { icon: Zap, text: "On-demand portfolio check" },
      { icon: CheckCircle2, text: "Natural language commands" },
    ],
    cta: "Open Telegram Bot",
    ctaHref: "https://t.me/DeFiGuardBot",
    featured: true,
    releaseDate: TELEGRAM_RELEASE,
    enterFrom: { x: 0, y: 60 },
  },
  {
    id: "extension",
    icon: Puzzle,
    title: "Chrome Extension",
    badge: "Chrome Web Store",
    badgeStyle: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    tagline: "Security in the Browser",
    description:
      "A browser-native DeFi security scanner that surfaces real-time risk indicators as you browse DEXs, token pages, and DeFi protocols — before you sign anything.",
    capabilities: [
      { icon: Eye, text: "Real-time token scanning" },
      { icon: Shield, text: "On-page risk indicators" },
      { icon: Zap, text: "Instant scam alerts" },
      { icon: Globe, text: "Works on all DeFi sites" },
    ],
    cta: "Add to Chrome",
    ctaHref: "#",
    comingSoon: true,
    enterFrom: { x: 70, y: 0 },
  },
];

function CountdownBlock({ target }: { target: Date }) {
  const { days, hours, minutes, seconds } = useCountdown(target);
  const units = [
    { label: "Days",    value: days    },
    { label: "Hours",   value: hours   },
    { label: "Min",     value: minutes },
    { label: "Sec",     value: seconds },
  ];
  return (
    <div className="w-full rounded-xl border border-[#a52126]/30 bg-[#a52126]/06 p-4 shadow-lg">
      <div className="flex items-center gap-1.5 mb-3">
        <Clock className="w-3.5 h-3.5 text-[#a52126]" />
        <span className="text-[10px] font-semibold tracking-widest uppercase text-[#a52126]">
          Launching in
        </span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {units.map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <span className="text-xl font-bold text-white tabular-nums leading-none">
              {String(value).padStart(2, "0")}
            </span>
            <span className="text-[10px] text-white/35 uppercase tracking-wide">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const Icon = feature.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        x: feature.enterFrom.x ?? 0,
        y: feature.enterFrom.y ?? 0,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          once: true,
        },
        delay: index * 0.12,
      });
    });
    return () => ctx.revert();
  }, [feature.enterFrom, index]);

  return (
    <motion.div
      ref={cardRef}
      className={`relative rounded-2xl bg-[#2a2736] border overflow-hidden flex flex-col group
        ${feature.featured
          ? "border-[#a52126]/45 scale-[1.025] shadow-[0_0_40px_rgba(165,33,38,0.14)]"
          : "border-[#a52126]/18"
        }
      `}
      whileHover={{ y: -6, scale: feature.featured ? 1.038 : 1.018 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      onHoverStart={() => {
        if (glowRef.current)
          gsap.to(glowRef.current, { opacity: 1, duration: 0.35 });
      }}
      onHoverEnd={() => {
        if (glowRef.current)
          gsap.to(glowRef.current, { opacity: 0, duration: 0.35 });
      }}
    >
      {feature.featured && (
        <div className="absolute top-0 left-0 right-0 flex justify-center">
          <span className="text-[10px] font-semibold tracking-widest text uppercase bg-[#a52126] text-white px-6 py-0.5 rounded-b-lg">
            Core Component
          </span>
        </div>
      )}

      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#a52126]/60 to-transparent" />

      <div
        ref={glowRef}
        className="absolute inset-0 bg-linear-to-br from-[#a52126]/07 via-transparent to-transparent pointer-events-none"
        style={{ opacity: 0 }}
      />

      <div className={`relative z-10 flex flex-col flex-1 p-8 ${feature.featured ? "pt-10" : ""}`}>

        <motion.div
          className="inline-flex w-14 h-14 rounded-xl items-center justify-center bg-[#a52126]/10 border border-[#a52126]/25 mb-5"
          whileHover={{ rotate: [0, -12, 12, -6, 0], transition: { duration: 0.55 } }}
        >
          <Icon className="w-7 h-7 text-[#a52126]" strokeWidth={1.6} />
        </motion.div>

        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <h3 className="text-sm md:text-base font-bold text-white">{feature.title}</h3>
          <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${feature.badgeStyle}`}>
            {feature.badge}
          </span>
        </div>

        {/* Tagline */}
        <p className="text-[#a52126] text-xs font-semibold tracking-wide uppercase mb-3">
          {feature.tagline}
        </p>

        {/* Description */}
        <p className="text-white/50 text-sm leading-relaxed mb-6">
          {feature.description}
        </p>

        {/* Capabilities */}
        <ul className="space-y-2.5 mb-8 flex-1">
          {feature.capabilities.map((cap, j) => {
            const CapIcon = cap.icon;
            return (
              <motion.li
                key={j}
                className="flex items-center gap-2.5 text-xs text-white/65"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 + j * 0.07 + 0.3 }}
              >
                <CapIcon className="w-3.5 h-3.5 text-[#a52126] shrink-0" />
                {cap.text}
              </motion.li>
            );
          })}
        </ul>

        {/* CTA */}
        {feature.releaseDate ? (
          <CountdownBlock target={feature.releaseDate} />
        ) : feature.comingSoon ? (
          <div className="flex items-center justify-center text-xs gap-2 w-full font-semibold py-3 rounded-xl border border-dashed border-white/15 text-white/30 cursor-not-allowed select-none">
            Coming Soon
          </div>
        ) : (
          <motion.a
            href={feature.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 w-full font-semibold text-xs py-3 rounded-xl transition-all duration-250 border
              ${feature.featured
                ? "bg-[#a52126] border-[#a52126] text-white hover:bg-[#c42b31]"
                : "bg-[#a52126]/08 border-[#a52126]/30 text-white/70 hover:bg-[#a52126] hover:text-white hover:border-[#a52126]"
              }
            `}
            whileTap={{ scale: 0.97 }}
          >
            {feature.cta}
            <ExternalLink className="w-3.5 h-3.5" />
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".features-heading-word", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 82%",
          once: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" className="py-14 bg-[#282632] bg-grid overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-20">
          <motion.div
            className="inline-flex items-center gap-2 bg-[#a52126]/10 border border-[#a52126]/22 rounded-full px-4 py-1.5 mb-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Shield className="w-3.5 h-3.5 text-[#a52126]" />
            <span className="text-[#a52126] text-xs font-semibold tracking-wide uppercase">
              Powered by Three Pillars
            </span>
          </motion.div>

          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight"
          >
            {"Your DeFi Security".split(" ").map((word, i) => (
              <span key={i} className="features-heading-word inline-block mr-3">
                {word}
              </span>
            ))}
            <span className="features-heading-word inline-block text-[#a52126]">
              Ecosystem
            </span>
          </h2>

          <motion.p
            className="text-white/45 max-w-xl mx-auto text-sm md:text-base"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
          >
            Three interconnected tools working in concert to keep your portfolio
            safe across every chain, protocol, and browser tab.
          </motion.p>
        </div>

        <div className="hidden md:flex items-center justify-center -mb-7 px-[18%] relative z-10">
          <motion.div
            className="flex-1 h-px bg-linear-to-r from-transparent to-[#a52126]/40"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ originX: 0 }}
          />
          <div className="w-2 h-2 rounded-full bg-[#a52126] mx-4 animate-pulse-glow" />
          <motion.div
            className="flex-1 h-px bg-linear-to-l from-transparent to-[#a52126]/40"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ originX: 1 }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>

        <motion.p
          className="text-center text-white/25 text-xs mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          🥇 Colosseum Cypherpunk Hackathon Winner &nbsp;·&nbsp; ASI Alliance Participant
        </motion.p>
      </div>
    </section>
  );
}
