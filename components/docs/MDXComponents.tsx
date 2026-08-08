import React, { ReactNode } from "react";
import { Callout } from "@/components/docs/Callout";
import { Grid } from "@/components/layout/Grid";
import { APISignature } from "@/components/docs/APISignature";
import { RetryAnimation } from "@/components/docs/RetryAnimation";
import { CircuitBreakerDemo } from "@/components/docs/CircuitBreakerDemo";
import { Steps } from "@/components/docs/Steps";
import { ArchitectureDiagram } from "@/components/docs/ArchitectureDiagram";
import { Accordion, AccordionGroup } from "@/components/docs/Accordion";
import { Card, CardGroup } from "@/components/docs/Card";
import { CodeBlockWrapper } from "@/components/docs/CodeBlockWrapper";

// --- Text Utility Helpers ---
function getTextContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(getTextContent).join("");
  }
  if (node && typeof node === "object" && "props" in node) {
    return getTextContent((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-");
}

// --- Export All MDX Components ---
export const mdxComponents = {
  Callout,
  Grid,
  CardGroup,
  Card,
  AccordionGroup,
  Accordion,
  APISignature,
  RetryAnimation,
  CircuitBreakerDemo,
  Steps,
  ArchitectureDiagram,

  // --- Custom Table Styling for Markdown ---
  table: ({ children, ...props }: { children?: ReactNode }) => (
    <div className="my-8 w-full overflow-x-auto rounded-2xl border border-white/10 bg-[#0d1117] shadow-xl">
      <table className="w-full text-left border-collapse text-sm table-fixed [&_th:first-child]:w-[22%] [&_th]:w-[39%] [&_td:first-child]:w-[22%] [&_td]:w-[39%]" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: { children?: ReactNode }) => (
    <thead className="border-b border-white/10 bg-white/5 font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }: { children?: ReactNode }) => (
    <tbody className="divide-y divide-white/5 text-slate-300" {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }: { children?: ReactNode }) => (
    <tr className="transition-colors hover:bg-white/[0.02]" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }: { children?: ReactNode }) => (
    <th className="py-4 px-5 font-semibold text-white" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: { children?: ReactNode }) => (
    <td 
      className="py-4 px-5 align-top leading-relaxed break-words text-slate-300 first:font-semibold first:text-white [&>code]:bg-white/10 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:font-mono [&>code]:text-xs [&>code]:text-[var(--brand-primary)]" 
      {...props}
    >
      {children}
    </td>
  ),

  // Headings with scroll anchors & offsets
  h1: ({ children, ...props }: { children?: ReactNode }) => {
    const id = slugify(getTextContent(children));
    return (
      <h1 id={id} className="scroll-mt-24 text-3xl font-extrabold text-white mb-6" {...props}>
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }: { children?: ReactNode }) => {
    const id = slugify(getTextContent(children));
    return (
      <h2 id={id} className="scroll-mt-24 text-2xl font-bold text-white mt-10 mb-4 border-b border-[var(--border)] pb-2" {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }: { children?: ReactNode }) => {
    const id = slugify(getTextContent(children));
    return (
      <h3 id={id} className="scroll-mt-24 text-xl font-bold text-white mt-6 mb-3" {...props}>
        {children}
      </h3>
    );
  },

  // Code Block Container integrated with Copy functionality
  pre: ({ children, ...props }: { children?: ReactNode }) => {
    const className = (props as { className?: string })?.className || "";
    const match = className.match(/language-(?<lang>.*)/);
    const lang = match?.groups?.lang ? match.groups.lang.toUpperCase() : "CODE";

    return (
      <CodeBlockWrapper language={lang}>
        <pre {...props} className="bg-transparent m-0 p-0 border-0">
          {children}
        </pre>
      </CodeBlockWrapper>
    );
  },

  // Inline Code Formatting
  code: ({ children, className, ...props }: { children?: ReactNode; className?: string }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs text-[var(--brand-primary)] border border-white/10" {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};
