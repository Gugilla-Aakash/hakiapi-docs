"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("article h2, article h3"));
    const items: TocItem[] = elements.map((elem) => {
      const id = elem.id || elem.textContent?.toLowerCase().replace(/\s+/g, "-") || "";
      if (!elem.id) elem.id = id;
      return {
        id,
        text: elem.textContent || "",
        level: Number(elem.tagName.substring(1)),
      };
    });

    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -70% 0px" }
    );

    elements.forEach((elem) => observer.observe(elem));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="w-56 shrink-0 hidden xl:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-8 pl-4 border-l border-[var(--border)] text-xs">
      <div className="space-y-3">
        <p className="font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
          On This Page
        </p>
        <ul className="space-y-2 border-l border-[var(--border)] pl-2">
          {headings.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id} className={item.level === 3 ? "pl-3" : ""}>
                <a
                  href={`#${item.id}`}
                  className={`block truncate transition-colors ${
                    isActive
                      ? "font-bold text-[var(--brand-primary)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
