"use client";

import { ReactNode, useRef, useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, Shield } from "lucide-react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  statusLabel?: string;
  bullets?: string[];
  tags?: string[];
  href?: string;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  statusLabel = "ACTIVE",
  bullets = [],
  tags = [],
  href,
  className = "",
}: FeatureCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-[var(--surface)]/50 border border-[var(--border)] p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(var(--brand-primary-rgb),0.12)] hover:border-[var(--brand-primary)]/40 backdrop-blur-sm ${className}`}
    >
      {/* Dynamic Mouse Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px z-10 transition-opacity duration-500 ease-out"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(var(--brand-primary-rgb), 0.12), transparent 40%)`,
        }}
      />

      {/* Magic top border highlight that animates left-to-right on hover */}
      <div className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-transparent via-[var(--brand-primary)] to-transparent opacity-0 transition-all duration-700 ease-out group-hover:w-full group-hover:opacity-100" />

      {/* Subtle Radial background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-primary)]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-20 flex flex-col flex-grow">
        
        {/* Header: Icon & Status Label */}
        <div className="flex justify-between items-start mb-5">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--text-secondary)] shadow-sm transition-all duration-500 group-hover:border-[var(--brand-primary)]/50 group-hover:bg-[var(--brand-primary)]/10 group-hover:text-[var(--brand-primary)] group-hover:rotate-[5deg] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(var(--brand-primary-rgb),0.2)]">
            {icon}
          </div>
          {statusLabel && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--background)] border border-[var(--border)] text-[10px] font-bold tracking-wider text-[var(--text-secondary)] uppercase group-hover:border-[var(--success)]/30 group-hover:text-[var(--success)] group-hover:bg-[var(--success)]/10 transition-colors duration-300">
              <Shield className="h-3 w-3" />
              {statusLabel}
            </div>
          )}
        </div>
        
        {/* Core Content: Short Title & Subtitle */}
        <div className="mb-4">
          <h3 className="mb-1.5 text-lg font-extrabold text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[var(--brand-primary)]">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)] transition-colors duration-300 group-hover:text-white/90">
            {description}
          </p>
        </div>

        {/* Feature Bullets (High density technical data) */}
        {bullets.length > 0 && (
          <div className="pt-4 mt-auto border-t border-white/5 space-y-2.5">
            {bullets.map((bullet, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)] group-hover:text-white/80 transition-colors duration-300">
                <Check className="h-4 w-4 mt-0.5 text-[var(--success)] shrink-0" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        )}

        {/* Footer: Tags & Learn More Action */}
        <div className="pt-5 mt-5 border-t border-white/5 flex items-center justify-between">
          <div className="flex flex-wrap gap-2 relative z-30">
            {tags.map((tag, i) => (
              <span key={i} className="px-2 py-1 text-[11px] font-mono rounded bg-white/5 border border-white/10 text-[var(--text-muted)] group-hover:text-white group-hover:border-white/20 transition-colors duration-300">
                {tag}
              </span>
            ))}
          </div>
          
          {href && (
            <Link 
              href={href}
              /* The `before:absolute before:inset-0` makes the whole card clickable */
              className="flex items-center gap-1 text-sm font-bold text-[var(--brand-primary)] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out before:absolute before:inset-0 before:z-10"
            >
              Learn more <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}
