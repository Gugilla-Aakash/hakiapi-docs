"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    title: "GETTING STARTED",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Quick Start", href: "/docs/quick-start" },
    ],
  },
  {
    title: "CORE FEATURES",
    items: [
      { title: "Authentication", href: "/docs/auth" },
      { title: "Retry Engine", href: "/docs/retries" },
      { title: "Paginator", href: "/docs/paginator" },
      { title: "Exceptions", href: "/docs/exceptions" },
      { title: "Circuit Breaker", href: "/docs/circuit-breaker", badge: "NEW" },
      { title: "Async Client", href: "/docs/async-client" },
      { title: "OAuth2", href: "/docs/oauth" },
    ],
  },
  {
    title: "BUNDLED CLIENTS",
    items: [
      { title: "GitHub Client", href: "/docs/github-client" },
      { title: "Gmail Client", href: "/docs/gmail-client" },
      { title: "Google Calendar", href: "/docs/google-calendar" },
      { title: "Custom Client", href: "/docs/custom-client" },
    ],
  },
  {
    title: "ARCHITECTURE & VISION",
    items: [
      { title: "Architecture", href: "/architecture" },
      { title: "Roadmap", href: "/roadmap" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-8 pr-4">
      {navigation.map((group) => (
        <div key={group.title} className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-bold">
            {group.title}
          </h4>
          <div className="space-y-1">
            {group.items.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href === "/docs/quick-start" && pathname === "/docs/quickstart");

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] border border-[var(--brand-primary)]/20 font-semibold"
                      : "text-[var(--text-secondary)] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{item.title}</span>
                  {item.badge && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--brand-primary)]/20 text-[var(--brand-primary)] border border-[var(--brand-primary)]/30 font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
