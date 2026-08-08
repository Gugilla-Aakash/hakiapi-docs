"use client";

import { useState, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className = "" }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={`divide-y divide-[var(--border)] border-y border-[var(--border)] ${className}`}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="py-4">
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between text-left font-semibold text-[var(--text-primary)] hover:text-[var(--brand-primary)] transition-colors"
            >
              <span>{item.title}</span>
              <ChevronDown
                className={`h-4 w-4 text-[var(--text-muted)] transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-[var(--brand-primary)]" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed animate-in fade-in-50 duration-200">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
