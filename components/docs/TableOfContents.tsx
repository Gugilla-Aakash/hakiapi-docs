"use client";

import { useEffect, useState } from "react";

export function TableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState<string>("");
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    // 1. Remove all code blocks (```...```) so Python comments aren't treated as headers
    const contentWithoutCodeBlocks = content.replace(/```[\s\S]*?```/g, "");

    // 2. Extract only ## and ### headings from the clean content
    const extractedHeadings = Array.from(
      contentWithoutCodeBlocks.matchAll(/^(##|###)\s+(.*)$/gm)
    ).map((match) => {
      const level = match[1].length; 
      
      // Remove escaped backslashes
      let text = match[2].replace(/\\/g, "").trim();
      
      // Convert markdown links: [Text](url) -> Text
      text = text.replace(/\[(.*?)\]\((.*?)\)/g, "$1").trim();
      
      // Remove HTML tags
      text = text.replace(/<[^>]*>/g, "").trim();
      
      // Generate the URL-friendly ID
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/[\s_]+/g, "-");

      return { id, text, level };
    });

    setHeadings(extractedHeadings);

    // Intersection Observer for scroll highlighting
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" }
    );

    extractedHeadings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <div className="space-y-4 text-sm">
      <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
        On This Page
      </h4>
      <ul className="space-y-2.5">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
          >
            <a
              href={`#${heading.id}`}
              className={`block truncate transition-colors duration-200 ${
                activeId === heading.id
                  ? "text-[var(--brand-primary)] font-medium"
                  : "text-[var(--text-secondary)] hover:text-white"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
