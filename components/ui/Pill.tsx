"use client";

import React from "react";

// 1. Define specific capability colors
type ColorVariant = "emerald" | "orange" | "indigo" | "cyan" | "purple" | "brand";

interface PillProps {
  label: string;
  icon?: React.ReactNode;
  className?: string;
  statusDot?: boolean | "pulse"; // 2. Add status dot logic
  colorVariant?: ColorVariant;   // 3. Add specific color routing
  tooltip?: string;              // 4. Native tooltip support
}

// Map specific colors to Tailwind classes for the border, text, and shadow glow
const colorStyles = {
  emerald: "hover:border-emerald-500/50 hover:shadow-emerald-500/20 text-emerald-400",
  orange: "hover:border-orange-500/50 hover:shadow-orange-500/20 text-orange-400",
  indigo: "hover:border-indigo-500/50 hover:shadow-indigo-500/20 text-indigo-400",
  cyan: "hover:border-cyan-500/50 hover:shadow-cyan-500/20 text-cyan-400",
  purple: "hover:border-purple-500/50 hover:shadow-purple-500/20 text-purple-400",
  brand: "hover:border-[var(--brand-primary)]/50 hover:shadow-[var(--brand-primary)]/20 text-[var(--brand-primary)]",
};

// Map colors for the solid status dots
const dotColors = {
  emerald: "bg-emerald-500",
  orange: "bg-orange-500",
  indigo: "bg-indigo-500",
  cyan: "bg-cyan-500",
  purple: "bg-purple-500",
  brand: "bg-[var(--brand-primary)]",
};

export function Pill({
  label,
  icon,
  className = "",
  statusDot,
  colorVariant = "brand",
  tooltip
}: PillProps) {
  const activeColor = colorStyles[colorVariant];
  const activeDot = dotColors[colorVariant];

  return (
    <span
      title={tooltip}
      className={`group relative inline-flex items-center gap-2 rounded-full bg-[var(--surface)]/50 backdrop-blur-sm border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_var(--tw-shadow-color)] transition-all duration-300 cursor-default overflow-hidden ${activeColor} ${className}`}
    >
      {/* Subtle Shimmer Effect on Hover */}
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

      {/* Status Dot (Static or Pulsing) */}
      {statusDot && (
        <span className="relative flex h-2 w-2 shrink-0">
          {statusDot === "pulse" && (
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${activeDot}`} />
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${activeDot}`} />
        </span>
      )}

      {/* Icon with 8-degree rotation and glow on hover */}
      {icon && (
        <span className="opacity-80 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_currentColor]">
          {icon}
        </span>
      )}

      <span className="relative z-10">{label}</span>
    </span>
  );
}
