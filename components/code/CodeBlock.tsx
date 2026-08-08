"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({ code, language = "python", filename, className = "" }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div 
      className={`relative group rounded-xl overflow-hidden bg-[#0d1117] shadow-xl transition-all duration-300 ${
        isCopied 
          ? "border-2 border-[var(--success)]/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]" 
          : "border border-white/10"
      } ${className}`}
    >
      {/* Mac OS Header / Filename Bar with subtle depth gradient */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-[#ff5f56] border border-black/10" />
            <div className="h-3 w-3 rounded-full bg-[#ffbd2e] border border-black/10" />
            <div className="h-3 w-3 rounded-full bg-[#27c93f] border border-black/10" />
          </div>
          {filename && (
            <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-2 bg-white/5 px-2 py-0.5 rounded-md">
              <Terminal className="h-3 w-3" />
              {filename}
            </span>
          )}
        </div>
        <span className="text-xs font-mono text-[var(--text-muted)]/70 uppercase tracking-wider">{language}</span>
      </div>

      {/* Code Content */}
      <div className="relative overflow-x-auto p-5 text-sm font-mono leading-relaxed text-[#c9d1d9]">
        <pre>
          <code>{code}</code>
        </pre>
      </div>

      {/* Hover Copy Button */}
      <button
        onClick={handleCopy}
        className={`absolute top-12 right-4 p-2 rounded-lg border transition-all duration-200 backdrop-blur-md ${
          isCopied
            ? "bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/30 opacity-100"
            : "bg-[var(--surface)]/80 text-[var(--text-muted)] border-[var(--border)] opacity-0 group-hover:opacity-100 hover:text-white hover:border-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/10"
        }`}
        aria-label="Copy code to clipboard"
      >
        {isCopied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
