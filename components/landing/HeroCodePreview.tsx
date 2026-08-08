"use client";

import { useState } from "react";
import { Check, Terminal, Play } from "lucide-react";
import { CopyButton } from "../code/CopyButton";

const codeSnippets = {
  python: `from hakiapi import GitHubClient

# Resilient GitHub client with built-in retries & circuit breaker
with GitHubClient(timeout=10) as github:
    user = github.get_user("torvalds")
    print(f"User: {user['name']} | Followers: {user['followers']}")`,
  async: `import asyncio
from hakiapi.core.async_base_client import AsyncBaseAPIClient

async def main():
    async with AsyncBaseAPIClient(
        base_url="https://api.github.com"
    ) as client:
        user = await client.get("/users/torvalds")
        print(user["followers"])

asyncio.run(main())` // <-- Added the missing closing backtick here!
};

export function HeroCodePreview() {
  const [tab, setTab] = useState<"python" | "async">("python");
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setHasRun(false);
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
    }, 600);
  };

  return (
    <div className="w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--code-bg)] shadow-[var(--shadow-floating)]">
      {/* Tab & Window Header */}
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          <div className="ml-3 flex gap-1 rounded-[var(--radius-sm)] bg-[var(--background)] p-0.5 border border-[var(--border)] text-xs font-mono">
            <button
              onClick={() => {
                setTab("python");
                setHasRun(false);
              }}
              className={`px-2.5 py-1 rounded-[2px] transition-colors ${
                tab === "python"
                  ? "bg-[var(--surface-hover)] text-[var(--brand-primary)] font-bold"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              }`}
            >
              sync_client.py
            </button>
            <button
              onClick={() => {
                setTab("async");
                setHasRun(false);
              }}
              className={`px-2.5 py-1 rounded-[2px] transition-colors ${
                tab === "async"
                  ? "bg-[var(--surface-hover)] text-[var(--brand-primary)] font-bold"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              }`}
            >
              async_client.py
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 rounded-[var(--radius-sm)] bg-[var(--brand-primary)]/10 px-2.5 py-1 text-xs font-semibold text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/20 transition-colors border border-[var(--brand-primary)]/30 disabled:opacity-50"
          >
            <Play className={`h-3 w-3 ${isRunning ? "animate-spin" : "fill-current"}`} />
            <span>{isRunning ? "Executing..." : "Run"}</span>
          </button>
          <CopyButton code={codeSnippets[tab]} />
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="p-4 font-mono text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed overflow-x-auto">
        <pre>
          <code>{codeSnippets[tab]}</code>
        </pre>
      </div>

      {/* Interactive Execution Terminal Console */}
      <div className="border-t border-[var(--border)] bg-[var(--surface)] p-3 font-mono text-xs text-[var(--text-secondary)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-[var(--brand-primary)]" />
          {isRunning && <span className="animate-pulse">GET https://api.github.com/users/torvalds [200 OK]...</span>}
          {hasRun && (
            <span className="text-[var(--success)] flex items-center gap-1">
              <Check className="h-3 w-3" /> User: Linus Torvalds | Followers: 220,000+
            </span>
          )}
          {!isRunning && !hasRun && (
            <span className="text-[var(--text-muted)]">Click &quot;Run&quot; to test static execution response</span>
          )}
        </div>
        <span className="text-[10px] text-[var(--text-muted)]">HTTP/2 200 OK (42ms)</span>
      </div>
    </div>
  );
}
