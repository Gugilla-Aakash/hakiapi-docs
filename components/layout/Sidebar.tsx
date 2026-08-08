"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { docsNavigation } from "@/lib/navigation";
import { Badge } from "@/components/ui/Badge";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (title: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <aside className="w-64 shrink-0 hidden lg:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-8 pr-4 border-r border-[var(--border)] text-sm">
      <div className="space-y-6">
        {docsNavigation.map((group) => {
          const isCollapsed = collapsedGroups[group.title];

          return (
            <div key={group.title} className="space-y-2">
              <button
                type="button"
                onClick={() => toggleGroup(group.title)}
                className="flex w-full items-center justify-between font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                <span>{group.title}</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    isCollapsed ? "-rotate-90" : ""
                  }`}
                />
              </button>

              {!isCollapsed && (
                <ul className="space-y-1 border-l border-[var(--border)] ml-1 pl-3">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center justify-between rounded-[var(--radius-sm)] px-2.5 py-1.5 text-xs transition-colors ${
                            isActive
                              ? "bg-[var(--brand-primary)]/10 font-bold text-[var(--brand-primary)] border-l-2 border-[var(--brand-primary)] -ml-[13px] pl-3"
                              : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                          }`}
                        >
                          <span>{item.title}</span>
                          {item.badge && (
                            <Badge variant="brand" size="sm">
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
