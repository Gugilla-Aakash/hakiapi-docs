"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Github } from "lucide-react";

export function DocsActionBar() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between mb-8">
      <button
        onClick={() => router.back()}
        className="group flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-white transition-colors"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 group-hover:bg-white/10 transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </div>
        <span>Back</span>
      </button>

      <a
        href="https://github.com/Gugilla-Aakash/hakiapi"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-white transition-colors"
        title="View on GitHub"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 group-hover:bg-white/10 transition-colors">
          <Github className="h-4 w-4" />
        </div>
      </a>
    </div>
  );
}
