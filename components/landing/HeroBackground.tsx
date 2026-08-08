"use client";

import { motion } from "framer-motion";

const FLOATING_BADGES = [
  { text: "✓ Retry succeeded", top: "20%", left: "15%", delay: 0 },
  { text: "OAuth refreshed", top: "60%", left: "10%", delay: 2 },
  { text: "Rate Limited → Retrying...", top: "30%", left: "80%", delay: 1 },
  { text: "Circuit Open", top: "75%", left: "75%", delay: 3 },
  { text: "200 OK", top: "45%", left: "85%", delay: 4 },
];

export function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* 1. Core Brand Glow centered behind content */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-[var(--brand-primary)] opacity-[0.15] blur-[120px] rounded-full" />

      {/* 2. Floating API Status Particles */}
      <div className="absolute inset-0 z-0">
        {FLOATING_BADGES.map((badge, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: [0, 0.4, 0.4, 0],
              y: [-20, -40, -60, -80]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: badge.delay,
              ease: "linear"
            }}
            style={{ top: badge.top, left: badge.left }}
            className="absolute px-3 py-1 text-xs font-mono rounded-full border border-[var(--brand-primary)]/20 bg-[var(--brand-primary)]/5 text-[var(--brand-primary)] shadow-[0_0_15px_rgba(var(--brand-primary-rgb),0.1)] backdrop-blur-md"
          >
            {badge.text}
          </motion.div>
        ))}
      </div>

      {/* 3. Engineering Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      
      {/* 4. Subtle Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* 5. Radial Vignette Soft Mask */}
      <div className="absolute inset-0 bg-radial from-transparent via-[var(--background)]/80 to-[var(--background)]" />
    </div>
  );
}
