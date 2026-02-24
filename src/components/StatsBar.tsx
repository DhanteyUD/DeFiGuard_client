"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Link2, Brain, Clock, ShieldAlert } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 13, suffix: "", label: "Chains Monitored", icon: Link2 },
  { value: 5,  suffix: "", label: "Autonomous AI Agents", icon: Brain },
  { value: 24, suffix: "/7", label: "Real-time Monitoring", icon: Clock },
  { value: 100, suffix: "+", label: "Risk Indicators", icon: ShieldAlert },
];

export default function StatsBar() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = sectionRef.current?.querySelectorAll<HTMLElement>(".stat-num");
      if (!targets) return;

      targets.forEach((el, i) => {
        const target = stats[i].value;
        const obj = { v: 0 };

        gsap.to(obj, {
          v: target,
          duration: 2.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
          onUpdate() {
            el.textContent = Math.round(obj.v).toString();
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-14 bg-[#1e1c28] border-y border-[#a52126]/15 overflow-hidden"
    >
      {/* Subtle red glow bar */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#a52126]/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#a52126]/50 to-transparent" />

      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center text-center group"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              >
                {/* Icon */}
                <div className="mb-3 w-10 h-10 rounded-xl bg-[#a52126]/10 border border-[#a52126]/20 flex items-center justify-center group-hover:bg-[#a52126]/20 transition-colors duration-300">
                  <Icon className="w-4.5 h-4.5 text-[#a52126]" strokeWidth={1.7} />
                </div>

                {/* Counter */}
                <div className="text-3xl font-bold text-[#a52126] mb-1 tabular-nums leading-none">
                  <span className="stat-num">0</span>
                  <span>{stat.suffix}</span>
                </div>

                {/* Label */}
                <div className="text-white/45 text-xs font-medium tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
