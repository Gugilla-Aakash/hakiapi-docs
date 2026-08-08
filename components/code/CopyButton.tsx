"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  code: string;
  className?: string;
}

export function CopyButton({ code, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback ignored for brevity
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`p-1.5 rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors ${className}`}
      aria-label="Copy code"
    >
      {copied ? (
        <Check className="h-4 w-4 text-[var(--success)]" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </button>
  );
}
