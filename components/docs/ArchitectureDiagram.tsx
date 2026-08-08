"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, ArrowLeftRight } from "lucide-react";

interface NodeDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  code: string;
  automatic: boolean;
}

const nodes: NodeDetail[] = [
  {
    id: "sdk",
    title: "GitHubClient / GmailClient / GoogleCalendarClient",
    subtitle: "Public SDK Layer",
    description:
      "Bundled, domain-specific clients (flat methods or resource-based routing) and your own BaseAPIClient subclasses live here.",
    code: "with GitHubClient(token=...) as github:\n    user = github.get_user('torvalds')",
    automatic: true,
  },
  {
    id: "base",
    title: "BaseAPIClient",
    subtitle: "Core Request Pipeline",
    description:
      "Every get/post/put/patch/delete routes through _request(), which owns the retry-mounted session, timeout handling, and JSON/text response parsing.",
    code: "class BaseAPIClient:\n    def __init__(self, base_url: str, auth=None, timeout: float = 10.0): ...",
    automatic: true,
  },
  {
    id: "auth",
    title: "Authentication Strategies",
    subtitle: "core/auth.py",
    description:
      "Pluggable AuthBase strategies inject credentials into every request. Bearer, header/query API keys, and HMAC signing are static; OAuth2Auth calls flow.get_token() fresh on each request.",
    code: "auth = BearerTokenAuth(token)\n# or: auth = OAuth2Auth(flow)",
    automatic: true,
  },
  {
    id: "retry",
    title: "Retry Engine",
    subtitle: "core/retry.py",
    description:
      "create_retry_adapter() mounts an HTTPAdapter backed by urllib3.Retry on both http:// and https:// — exponential backoff on 429/500/502/503/504, 3 retries by default.",
    code: "adapter = create_retry_adapter(max_retries=3, backoff_factor=1.0)\nsession.mount('https://', adapter)",
    automatic: true,
  },
  {
    id: "circuit",
    title: "Circuit Breaker",
    subtitle: "core/circuit_breaker.py — opt-in",
    description:
      "Not wired into the request pipeline automatically. A thread-safe decorator you apply yourself to any callable — a client method or your own function — for fail-fast protection during cascading failures.",
    code: "@CircuitBreaker(failure_threshold=5, recovery_timeout=30.0)\ndef get_user(user_id):\n    return github.get_user(user_id)",
    automatic: false,
  },
];

const STEP_DURATION_MS = 2600;

export function ArchitectureDiagram() {
  const [activeIndex, setActiveIndex] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const rafRef = useRef<number | undefined>(undefined);
  const startRef = useRef<number>(0);

  const activeNode = nodes[activeIndex];

  // Autoplay: steps through each layer like a debugger, with a filling
  // progress bar on the current step before advancing to the next.
  useEffect(() => {
    if (!isPlaying) return;

    startRef.current = performance.now();
    const tick = (now: number) => {
      const t = now - startRef.current;
      setElapsed(t);
      if (t >= STEP_DURATION_MS) {
        setActiveIndex((i) => {
          const next = i + 1;
          if (next >= nodes.length) {
            setIsPlaying(false);
            return i;
          }
          return next;
        });
        startRef.current = now;
        setElapsed(0);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying]);

  const selectStep = (index: number) => {
    setIsPlaying(false);
    setElapsed(0);
    setActiveIndex(index);
  };

  const togglePlay = () => {
    if (!isPlaying && activeIndex === nodes.length - 1) {
      setActiveIndex(0);
    }
    setElapsed(0);
    setIsPlaying((p) => !p);
  };

  const progressPct = isPlaying ? Math.min(100, (elapsed / STEP_DURATION_MS) * 100) : 0;

  return (
    <div className="my-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-floating)]">
      <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--brand-primary)]">
          Interactive Stack Explorer
        </div>
        <button
          onClick={togglePlay}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wide px-3 py-1.5 rounded-full border border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white transition-colors"
          aria-pressed={isPlaying}
        >
          {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          {isPlaying ? "Pause" : "Trace a request"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Visual Stack Column */}
        <div className="lg:col-span-6 relative">
          {/* connecting rail */}
          <div
            className="absolute left-[15px] top-4 bottom-4 w-px bg-[var(--border)]"
            aria-hidden="true"
          />
          <div className="flex flex-col">
            {nodes.map((node, i) => {
              const isActive = i === activeIndex;
              const isPast = i < activeIndex;
              return (
                <button
                  key={node.id}
                  onClick={() => selectStep(i)}
                  aria-current={isActive}
                  className="relative flex items-start gap-3 text-left pb-4 last:pb-0 group"
                >
                  {/* step marker */}
                  <span
                    className={`relative z-10 mt-3 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border-2 font-mono text-[11px] font-bold transition-colors ${
                      isActive
                        ? "bg-[var(--brand-primary)] border-[var(--brand-primary)] text-white"
                        : isPast
                          ? "bg-[var(--brand-primary)]/15 border-[var(--brand-primary)]/40 text-[var(--brand-primary)]"
                          : "bg-[var(--background)] border-[var(--border)] text-[var(--text-muted)]"
                    }`}
                  >
                    {i + 1}
                  </span>

                  <span
                    className={`w-full cursor-pointer p-3.5 rounded-[var(--radius-md)] border transition-all ${
                      isActive
                        ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)] shadow-md scale-[1.02]"
                        : "bg-[var(--background)] text-[var(--text-primary)] border-[var(--border)] opacity-80 group-hover:opacity-100"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span>
                        <span className="block font-bold text-xs sm:text-sm">{node.title}</span>
                        <span className={`block text-[10px] ${isActive ? "text-white/80" : "text-[var(--text-muted)]"}`}>
                          {node.subtitle}
                        </span>
                      </span>
                      <span
                        className={`shrink-0 font-mono text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded ${
                          node.automatic
                            ? isActive
                              ? "bg-white/20 text-white"
                              : "bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]"
                            : isActive
                              ? "bg-white/20 text-white"
                              : "border border-[var(--border)] text-[var(--text-muted)]"
                        }`}
                      >
                        {node.automatic ? "Automatic" : "Opt-in"}
                      </span>
                    </span>

                    {/* per-step progress bar, only shown while playing this step */}
                    {isActive && isPlaying && (
                      <span className="mt-2 block h-[3px] w-full rounded-full bg-white/25 overflow-hidden">
                        <span
                          className="block h-full bg-white rounded-full"
                          style={{ width: `${progressPct}%`, transition: "width 60ms linear" }}
                        />
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* round trip indicator */}
          <div className="mt-1 flex items-center gap-2 pl-[42px] text-[10px] font-mono text-[var(--text-muted)]">
            <ArrowLeftRight className="h-3 w-3 shrink-0" />
            Response parsing and exception mapping unwind back through the same layers.
          </div>
        </div>

        {/* Dynamic Context Panel */}
        <div className="lg:col-span-6 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--code-bg)] p-5 space-y-3 font-mono text-xs lg:sticky lg:top-6">
          <div>
            <span className="text-[var(--brand-primary)] font-bold">{activeNode.subtitle}</span>
            <h4 className="text-base font-bold text-[var(--text-primary)] font-sans mt-0.5">
              {activeNode.title}
            </h4>
          </div>
          <p className="text-[var(--text-secondary)] font-sans leading-relaxed">
            {activeNode.description}
          </p>
          <div className="pt-3 border-t border-[var(--border)] overflow-x-auto text-[var(--text-primary)]">
            <pre><code>{activeNode.code}</code></pre>
          </div>
        </div>
      </div>
    </div>
  );
}
