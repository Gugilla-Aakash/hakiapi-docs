import React, { ReactNode } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function CardGroup({ cols = 2, children }: { cols?: number; children: ReactNode }) {
  const gridCols = cols === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2";
  return <div className={`grid ${gridCols} gap-4 my-6 not-prose`}>{children}</div>;
}

export function Card({
  title,
  href,
  children,
}: {
  title: string;
  href?: string;
  children?: ReactNode;
}) {
  const content = (
    <div className="group relative rounded-2xl border border-[var(--border)] bg-[var(--surface)]/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-primary)]/50 hover:bg-[var(--surface)] hover:shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-base font-bold text-white group-hover:text-[var(--brand-primary)] transition-colors">
          {title}
        </h4>
        {href && <ExternalLink className="h-4 w-4 text-[var(--text-muted)] group-hover:text-[var(--brand-primary)]" />}
      </div>
      
      {/* 
        Changed from <p> to <div> to prevent hydration mismatches! 
        Added [&>p]:m-0 so MDX-injected paragraphs don't break your spacing.
      */}
      <div className="text-xs text-[var(--text-secondary)] leading-relaxed [&>p]:m-0">
        {children}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
