"use client";

import React, { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";

export function AccordionGroup({ children }: { children: ReactNode }) {
  // Increased gap slightly for better breathing room
  return <div className="my-6 space-y-4 not-prose">{children}</div>;
}

export function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "border-[var(--brand-primary)]/40 bg-gradient-to-b from-[var(--brand-primary)]/10 to-transparent shadow-[0_4px_20px_rgba(var(--brand-primary-rgb),0.1)]"
          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-5 text-left font-semibold text-slate-200 transition-colors focus:outline-none"
      >
        <span
          className={`transition-colors duration-200 ${
            isOpen ? "text-[var(--brand-primary)]" : "group-hover:text-white"
          }`}
        >
          {title}
        </span>
        
        {/* Animated Icon Container */}
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 ${
            isOpen
              ? "bg-[var(--brand-primary)]/20"
              : "bg-white/5 group-hover:bg-white/10"
          }`}
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${
              isOpen
                ? "rotate-180 text-[var(--brand-primary)]"
                : "text-[var(--text-muted)]"
            }`}
          />
        </div>
      </button>

      {/* Smooth CSS Grid Animation for opening/closing */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 text-sm leading-relaxed text-slate-400 border-t border-white/5 pt-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
