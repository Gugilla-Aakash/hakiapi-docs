"use client";

import { useRef, useState, ReactNode } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockWrapperProps {
  children: ReactNode;
  language?: string;
}

export function CodeBlockWrapper({ children, language = "CODE" }: CodeBlockWrapperProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (preRef.current) {
      const text = preRef.current.textContent || "";
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl relative group w-full">
      {/* IDE Terminal Header Bar with Copy Button */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">
            {language}
          </span>
          
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 transition-colors"
            title="Copy code"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-slate-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Content */}
      <pre 
        ref={preRef}
        className="overflow-x-auto p-5 text-sm leading-6 font-mono text-slate-100 bg-transparent m-0 whitespace-pre"
      >
        {children}
      </pre>
    </div>
  );
}
