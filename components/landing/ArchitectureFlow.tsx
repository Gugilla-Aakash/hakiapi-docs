"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { 
  ShieldCheck, 
  RefreshCw, 
  Cpu, 
  Globe, 
  Server, 
  CheckCircle2, 
  Lock, 
  Zap, 
  Activity,
  ArrowRight,
  Play,
  Pause
} from "lucide-react";

const pipelineStages = [
  {
    id: "sdk",
    title: "GitHubClient",
    badge: "SDK Layer",
    icon: Globe,
    shortDesc: "High-level interface for invoking APIs with fully typed responses.",
    codeSnippet: `with GitHubClient() as client:\n    user = client.get_user("torvalds")`,
    httpAction: "GET /users/torvalds",
    log: "12:03:41 | Initialized typed client session",
    metrics: { type: "Schema", value: "Strict Pydantic v2" }
  },
  {
    id: "auth",
    title: "Authentication",
    badge: "Security Layer",
    icon: ShieldCheck,
    shortDesc: "Proactive token management & security injection before transmission.",
    checks: [
      "✓ Access Token Verified",
      "✓ Token Refresh Triggered (if expired)",
      "✓ PKCE & Bearer Header Injected"
    ],
    headerOutput: "Authorization: Bearer ghp_93j2...x7Y",
    log: "12:03:41 | OAuth2 bearer token attached successfully",
    metrics: { type: "Lifecycle", value: "Proactive Rotation" }
  },
  {
    id: "retry",
    title: "Retry Engine",
    badge: "Resilience Middleware",
    icon: RefreshCw,
    shortDesc: "Recovers automatically from 429 rate limits and 5xx transient server errors with randomized jitter.",
    sequence: [
      { step: "GET /users", status: "sent" },
      { step: "429 Too Many Requests", status: "error" },
      { step: "Retry #1 (Backoff: 0.4s + Jitter)", status: "retry" },
      { step: "200 OK", status: "success" }
    ],
    log: "12:03:42 | Handled HTTP 429 via exponential backoff",
    metrics: { type: "Recovery Time", value: "0.2s average" }
  },
  {
    id: "circuit",
    title: "Circuit Breaker",
    badge: "Protection Middleware",
    icon: Cpu,
    shortDesc: "Fails fast when target upstream services experience total outages to prevent cascading infrastructure failure.",
    states: [
      { label: "CLOSED", active: false },
      { label: "OPEN", active: false },
      { label: "HALF-OPEN", active: true },
      { label: "RECOVERED", active: false }
    ],
    log: "12:03:42 | Upstream health verified. Circuit status: CLOSED",
    metrics: { type: "Trip Threshold", value: "5 consecutive failures" }
  },
  {
    id: "http",
    title: "HTTP Client Transport",
    badge: "Transport Layer",
    icon: Server,
    shortDesc: "Low-level connection pooling and non-blocking transport execution.",
    pipeline: ["Requests / HTTPX Pool", "TLS 1.3 Handshake", "Gzip / Brotli Compression", "JSON Stream Parsing"],
    log: "12:03:42 | Secure TLS socket reused from connection pool",
    metrics: { type: "Driver", value: "Sync & Async Parity" }
  },
  {
    id: "api",
    title: "GitHub API & Response",
    badge: "Upstream Execution",
    icon: Activity,
    shortDesc: "Final upstream execution completed with full telemetry reporting.",
    responseStats: {
      status: "200 OK",
      latency: "142 ms",
      rateLimitRemaining: "4987 / 5000"
    },
    log: "12:03:42 | Payload validated and deserialized into user schema",
    metrics: { type: "Telemetry", value: "Full Headers Tracked" }
  }
];

export function ArchitectureFlow() {
  const [activeId, setActiveId] = useState("retry");
  const [isPlaying, setIsPlaying] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const activeStage = pipelineStages.find((s) => s.id === activeId) || pipelineStages[2];

  // Auto-cycle every 5 seconds — only while isPlaying is true. Selecting a
  // stage manually (or hitting pause) stops the cycle instead of fighting it.
  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) return;
    const timer = setInterval(() => {
      setActiveId((currentId) => {
        const currentIndex = pipelineStages.findIndex((s) => s.id === currentId);
        const nextIndex = (currentIndex + 1) % pipelineStages.length;
        return pipelineStages[nextIndex].id;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [isPlaying, prefersReducedMotion]);

  const selectStage = (id: string) => {
    setIsPlaying(false);
    setActiveId(id);
  };

  return (
    <div className="relative max-w-7xl mx-auto p-2">
      {/* Blueprint background grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-3xl"
        style={{
          backgroundImage: `radial-gradient(var(--text-primary) 1.5px, transparent 1.5px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="flex justify-end mb-3 relative z-10">
        <button
          onClick={() => setIsPlaying((p) => !p)}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wide px-3 py-1.5 rounded-full border border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2"
          aria-pressed={isPlaying}
        >
          {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          {isPlaying ? "Auto-cycling" : "Paused"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Left Column: Interactive Pipeline Stream */}
        <div className="lg:col-span-5 flex flex-col relative space-y-3">
          {/* Connecting Line */}
          <div className="absolute left-7 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[var(--brand-primary)]/20 via-[var(--brand-primary)] to-[var(--success)]/20 -z-10" />

          {pipelineStages.map((stage, index) => {
            const Icon = stage.icon;
            const isActive = activeId === stage.id;

            return (
              <button
                key={stage.id}
                onClick={() => selectStage(stage.id)}
                aria-current={isActive}
                className={`relative w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 text-left group overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2 ${
                  isActive
                    ? "border-[var(--brand-primary)] bg-[var(--surface)] shadow-[0_0_30px_rgba(var(--brand-primary-rgb),0.15)] translate-x-1"
                    : "border-[var(--border)] bg-[var(--background)]/80 hover:bg-[var(--surface)] hover:border-[var(--border)]"
                }`}
              >
                {/* Active glow background wash */}
                {isActive && (
                  <motion.div 
                    layoutId="active-stage-glow"
                    className="absolute inset-0 bg-gradient-to-r from-[var(--brand-primary)]/10 via-transparent to-transparent opacity-80"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <div className="flex items-center gap-4 relative z-10">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                    isActive 
                      ? "border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white shadow-[0_0_15px_rgba(var(--brand-primary-rgb),0.5)] scale-105" 
                      : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] group-hover:text-white"
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] block">
                      Stage 0{index + 1} • {stage.badge}
                    </span>
                    <span className={`text-base font-bold transition-colors duration-300 ${isActive ? "text-white" : "text-[var(--text-secondary)] group-hover:text-white"}`}>
                      {stage.title}
                    </span>
                  </div>
                </div>

                {/* Traveling packet indicator dot */}
                {isActive && (
                  <motion.div 
                    layoutId="traveling-packet"
                    className="relative z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--brand-primary)]/20 border border-[var(--brand-primary)]/40 text-[var(--brand-primary)] text-xs font-mono"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-primary)] motion-safe:animate-ping" />
                    Active
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Column: Dynamic Stage Inspection Card */}
        <div className="lg:col-span-7 sticky top-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.id}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: prefersReducedMotion ? 0.15 : 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="rounded-3xl border border-[var(--brand-primary)]/40 bg-[var(--surface)]/60 backdrop-blur-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between"
            >
              {/* Top Accent Gradient Bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--brand-primary)] via-[var(--success)] to-transparent" />

              <div>
                {/* Card Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] border border-[var(--brand-primary)]/20 shadow-inner">
                      <activeStage.icon className="h-7 w-7" />
                    </div>
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-[var(--brand-primary)] font-bold">
                        {activeStage.badge}
                      </span>
                      <h3 className="text-3xl font-extrabold text-[var(--text-primary)] mt-0.5 tracking-tight">
                        {activeStage.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Metric Pill */}
                  <div className="hidden sm:flex flex-col items-end bg-[var(--background)]/80 border border-white/10 px-3 py-1.5 rounded-xl">
                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">{activeStage.metrics.type}</span>
                    <span className="text-sm font-mono text-[var(--success)] font-bold">{activeStage.metrics.value}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-6">
                  {activeStage.shortDesc}
                </p>

                {/* Dynamic Stage-Specific Visual Interactive Box */}
                <div className="rounded-2xl bg-[#0d1117] border border-white/10 p-5 font-mono text-sm mb-6 shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-3 py-1 bg-white/5 border-b border-l border-white/10 rounded-bl-xl text-[10px] text-gray-400 uppercase tracking-wider">
                    Live Telemetry Preview
                  </div>

                  {/* 1. SDK Stage Preview */}
                  {activeStage.id === "sdk" && (
                    <div className="space-y-3 pt-2">
                      <div className="text-gray-500 italic"># Executing SDK client method</div>
                      <div className="text-white bg-white/5 p-3 rounded-lg border border-white/5">{activeStage.codeSnippet}</div>
                      <div className="flex items-center gap-2 text-[var(--brand-primary)] pt-1">
                        <ArrowRight className="h-4 w-4" /> <span>Dispatching {activeStage.httpAction}</span>
                      </div>
                    </div>
                  )}

                  {/* 2. Authentication Stage Preview */}
                  {activeStage.id === "auth" && (
                    <div className="space-y-2.5 pt-2">
                      {activeStage.checks?.map((check, i) => (
                        <div key={i} className="flex items-center gap-2 text-emerald-400">
                          <CheckCircle2 className="h-4 w-4 shrink-0" />
                          <span>{check}</span>
                        </div>
                      ))}
                      <div className="mt-4 p-3 rounded-lg bg-[var(--background)] border border-white/10 text-xs text-[var(--text-secondary)]">
                        <span className="text-[var(--text-muted)] block mb-1">Injected Header:</span>
                        <span className="text-purple-400 font-bold">{activeStage.headerOutput}</span>
                      </div>
                    </div>
                  )}

                  {/* 3. Retry Engine Stage Preview */}
                  {activeStage.id === "retry" && (
                    <div className="space-y-2 pt-2">
                      {activeStage.sequence?.map((seq, i) => (
                        <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-none">
                          <span className={`text-xs ${seq.status === "error" ? "text-red-400 font-bold" : seq.status === "success" ? "text-emerald-400 font-bold" : "text-white"}`}>
                            {seq.step}
                          </span>
                          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/5 text-[var(--text-muted)]">
                            {seq.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 4. Circuit Breaker Stage Preview */}
                  {activeStage.id === "circuit" && (
                    <div className="space-y-3 pt-2">
                      <div className="grid grid-cols-4 gap-2">
                        {activeStage.states?.map((st, i) => (
                          <div 
                            key={i} 
                            className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                              st.active 
                                ? "bg-[var(--brand-primary)]/20 border-[var(--brand-primary)] text-white shadow-[0_0_15px_rgba(var(--brand-primary-rgb),0.3)]" 
                                : "bg-white/5 border-white/5 text-[var(--text-muted)] opacity-50"
                            }`}
                          >
                            {st.label}
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-300 pt-2 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
                        <span>Upstream health probe active. Requests flowing normally.</span>
                      </div>
                    </div>
                  )}

                  {/* 5. HTTP Client Stage Preview */}
                  {activeStage.id === "http" && (
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      {activeStage.pipeline?.map((item, i) => (
                        <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs flex items-center gap-2 text-white">
                          <Zap className="h-3.5 w-3.5 text-[var(--brand-primary)] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 6. GitHub API Response Preview */}
                  {activeStage.id === "api" && (
                    <div className="space-y-3 pt-2">
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                          <span className="text-[10px] text-gray-400 uppercase block mb-1">Status</span>
                          <span className="text-emerald-400 font-bold text-sm">{activeStage.responseStats?.status}</span>
                        </div>
                        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                          <span className="text-[10px] text-gray-400 uppercase block mb-1">Latency</span>
                          <span className="text-white font-bold text-sm">{activeStage.responseStats?.latency}</span>
                        </div>
                        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                          <span className="text-[10px] text-gray-400 uppercase block mb-1">Rate Limit</span>
                          <span className="text-[var(--brand-primary)] font-bold text-xs">{activeStage.responseStats?.rateLimitRemaining}</span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

              </div>

              {/* Realistic Timestamped Terminal Log Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 motion-safe:animate-ping" />
                  <span className="text-white font-medium">{activeStage.log}</span>
                </div>
                <span className="hidden sm:inline opacity-60">hakiapi.engine v2.0</span>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
