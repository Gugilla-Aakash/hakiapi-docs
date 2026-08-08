"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Ordered list matching your sidebar sequence
const DOCS_SEQUENCE = [
  { slug: "introduction", label: "Introduction" },
  { slug: "installation", label: "Installation" },
  { slug: "quick-start", label: "Quick Start" },
  { slug: "auth", label: "Authentication" },
  { slug: "retry", label: "Retry Engine" },
  { slug: "paginator", label: "Paginator" },
  { slug: "exceptions", label: "Exceptions" },
  { slug: "circuit-breaker", label: "Circuit Breaker" },
  { slug: "async-client", label: "Async Client" },
  { slug: "oauth", label: "OAuth2" },
  { slug: "github-client", label: "GitHub Client" },
  { slug: "gmail-client", label: "Gmail Client" },
  { slug: "google-calendar", label: "Google Calendar" },
  { slug: "custom-client", label: "Custom Client" },
  { slug: "architecture", label: "Architecture" },
  { slug: "roadmap", label: "Roadmap" },
];

export function DocsPagination({ currentSlug }: { currentSlug: string }) {
  const currentIndex = DOCS_SEQUENCE.findIndex(
    (item) => item.slug === currentSlug || (currentSlug === "quickstart" && item.slug === "quick-start")
  );

  const prev = currentIndex > 0 ? DOCS_SEQUENCE[currentIndex - 1] : null;
  const next = currentIndex !== -1 && currentIndex < DOCS_SEQUENCE.length - 1 ? DOCS_SEQUENCE[currentIndex + 1] : null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--border)] mt-12">
      {prev ? (
        <Link
          href={`/docs/${prev.slug}`}
          className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)]/40 hover:bg-[var(--surface)] hover:border-[var(--brand-primary)]/50 transition-all w-full sm:w-auto"
        >
          <ArrowLeft className="h-4 w-4 text-[var(--text-muted)] group-hover:text-[var(--brand-primary)] group-hover:-translate-x-1 transition-transform" />
          <div className="text-left">
            <div className="text-[10px] font-mono uppercase text-[var(--text-muted)]">Previous</div>
            <div className="text-sm font-bold text-[var(--text-primary)] group-hover:text-white">{prev.label}</div>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)]/40 hover:bg-[var(--surface)] hover:border-[var(--brand-primary)]/50 transition-all w-full sm:w-auto ml-auto text-right"
        >
          <div>
            <div className="text-[10px] font-mono uppercase text-[var(--text-muted)]">Next</div>
            <div className="text-sm font-bold text-[var(--text-primary)] group-hover:text-white">{next.label}</div>
          </div>
          <ArrowRight className="h-4 w-4 text-[var(--text-muted)] group-hover:text-[var(--brand-primary)] group-hover:translate-x-1 transition-transform" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
