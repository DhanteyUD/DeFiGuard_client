"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { Shield, Zap, ArrowDown, Activity } from "lucide-react";

const messages = [
  { line1: "DeFi's AI", line2: "Risk Shield" },
  { line1: "Multi-Chain", line2: "Guardian" },
  { line1: "Autonomous", line2: "Defender" },
  { line1: "Real-Time", line2: "Fraud Detection" },
];

const FACE_H = 200;
const HALF = FACE_H / 2;

const DISPLAY_DURATION = 3000;

const chains = ["◎ Solana", "⟠ ETH", "BNB", "MATIC", "ARB", "BASE", "+7 more"];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const shieldRingRef = useRef<HTMLDivElement>(null);

  const cubeRef = useRef<HTMLDivElement>(null);
  const [msgIdx, setMsgIdx] = useState(0);
  const stepRef = useRef(0);
  const spinning = useRef(false);

  /* ── Ambient / background effects ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(orb1Ref.current, {
        x: 40,
        y: -30,
        duration: 7,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(orb2Ref.current, {
        x: -35,
        y: 25,
        duration: 9,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.5,
      });
      gsap.to(orb3Ref.current, {
        x: 20,
        y: 40,
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 3,
      });

      gsap.fromTo(
        scanRef.current,
        { top: "-2px", opacity: 0 },
        {
          top: "100%",
          opacity: 0,
          duration: 9,
          ease: "none",
          repeat: -1,
          delay: 1,
          onStart: () => gsap.set(scanRef.current, { opacity: 0.65 }),
        },
      );

      gsap.to(shieldRingRef.current, {
        rotation: 360,
        duration: 14,
        ease: "none",
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /* ── Cube entrance ── */
  useEffect(() => {
    const el = cubeRef.current;
    if (!el) return;
    gsap.set(el, { rotateX: 30, opacity: 0 });
    gsap.to(el, {
      rotateX: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: 0.3,
    });
  }, []);

  /* ── Cycling interval — rotate cube face ── */
  useEffect(() => {
    const timer = setInterval(() => {
      if (spinning.current) return;
      spinning.current = true;

      stepRef.current -= 1;
      const targetRotX = stepRef.current * 90;

      gsap.to(cubeRef.current, {
        rotateX: targetRotX,
        duration: 0.75,
        ease: "power2.inOut",
        onComplete: () => {
          spinning.current = false;
          setMsgIdx((prev) => (prev + 1) % messages.length);
        },
      });
    }, DISPLAY_DURATION);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#282632] bg-grid"
    >
      {/* ── Ambient orbs ── */}
      <div
        ref={orb1Ref}
        className="absolute -top-16 -left-32 w-130 h-130 rounded-full bg-[#a52126] opacity-[0.07] blur-[100px] pointer-events-none"
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-0 -right-40 w-120 h-120 rounded-full bg-[#a52126] opacity-[0.06] blur-[90px] pointer-events-none"
      />
      <div
        ref={orb3Ref}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-75 rounded-full bg-[#a52126] opacity-[0.03] blur-[80px] pointer-events-none"
      />

      {/* ── Scan line ── */}
      <div
        ref={scanRef}
        className="absolute left-0 right-0 h-[1.5px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(165,33,38,0.7) 40%, rgba(165,33,38,0.9) 50%, rgba(165,33,38,0.7) 60%, transparent)",
          top: "-2px",
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-28 pb-16">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 bg-[#a52126]/10 border border-[#a52126]/30 rounded-full px-4 py-1.5 mb-10"
          initial={{ opacity: 0, y: 24, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Zap className="w-3.5 h-3.5 text-[#a52126] shrink-0" />
          <span className="flex gap-1 md:gap-3 text-xs text-white/75 font-medium font-mono">
            <span className="flex">
              <span className="hidden md:inline mr-1.5">Powered by </span>
              ASI:One
            </span>
            <span>·</span>
            <span>SingularityNET MeTTa</span>
          </span>
          <span className="w-1.5 h-1.5 bg-[#a52126] rounded-full animate-pulse" />
        </motion.div>

        <div
          className="mb-7 select-none"
          style={{
            perspective: "1200px",
            perspectiveOrigin: "50% 50%",
            height: `${FACE_H}px`,
            overflow: "hidden",
          }}
        >
          <div
            ref={cubeRef}
            style={{
              width: "100%",
              height: `${FACE_H}px`,
              position: "relative",
              transformStyle: "preserve-3d",
              transform: "rotateX(0deg)",
            }}
          >
            {messages.map((msg, i) => {
              const faceRotX = i * 90;

              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: `rotateX(${faceRotX}deg) translateZ(${HALF}px)`,
                    backfaceVisibility: "hidden",
                    background:
                      i % 2 === 0
                        ? "rgba(255,255,255,0.00)"
                        : "rgba(165,33,38,0.02)",
                  }}
                >
                  <span
                    className="block font-bold leading-none tracking-tight text-6xl md:text-7xl lg:text-8xl text-white font-mono"
                    style={{ marginBottom: "0.1em" }}
                  >
                    {msg.line1}
                  </span>
                  <span
                    className="block font-bold leading-none tracking-tight text-6xl md:text-7xl lg:text-8xl text-[#a52126] font-mono"
                    style={{ textShadow: "0 0 60px rgba(165,33,38,0.45)" }}
                  >
                    {msg.line2}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Message index dots */}
        <motion.div
          className="flex justify-center gap-2 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {messages.map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                background: i === msgIdx ? "#a52126" : "rgba(255,255,255,0.2)",
                transform: i === msgIdx ? "scale(1.4)" : "scale(1)",
              }}
            />
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-white/55 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          AI-powered, multi-agent portfolio risk monitoring across{" "}
          <span className="text-white font-semibold">
            Solana + 12 EVM chains
          </span>
          . Real-time fraud detection. Autonomous alerts.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.55 }}
        >
          <motion.a
            href="#agent"
            className="flex items-center gap-2 bg-[#a52126] text-white font-semibold px-8 py-3.5 rounded-xl animate-pulse-glow transition-colors hover:bg-[#c42b31]"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
          >
            <Shield className="w-4 h-4" />
            Explore DeFiGuard
          </motion.a>
          <motion.a
            href="#features"
            className="flex items-center gap-2 border border-white/18 hover:border-[#a52126]/50 text-white/75 hover:text-white px-8 py-3.5 rounded-xl transition-all duration-250"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Activity className="w-4 h-4" />
            View Architecture
          </motion.a>
        </motion.div>

        {/* Chain pills */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <span className="text-white/30 text-xs mr-1">Monitoring:</span>
          {chains.map((chain, i) => (
            <motion.span
              key={chain}
              className="text-xs px-2.5 py-1 bg-white/[0.04] border border-white/10 rounded-full text-white/40 hover:border-[#a52126]/40 hover:text-white/70 transition-colors cursor-default"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6 + i * 0.06 }}
            >
              {chain}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* ── Floating shield visual ── */}
      <motion.div
        className="absolute right-8 top-1/3 hidden xl:block animate-float"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <div className="relative w-28 h-28">
          <div
            ref={shieldRingRef}
            className="absolute inset-0 rounded-full border border-dashed border-[#a52126]/30"
          />
          <div className="absolute inset-3 rounded-full border border-[#a52126]/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Shield className="w-12 h-12 text-[#a52126]" strokeWidth={1.2} />
          </div>
          <div className="absolute inset-0 rounded-full bg-[#a52126] opacity-10 blur-2xl" />
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/25 select-none"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[11px] tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-3.5 h-3.5" />
      </motion.div>
    </section>
  );
}
