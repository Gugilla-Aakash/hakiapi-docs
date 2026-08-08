"use client";

import { useState } from "react";
import { ShieldCheck, ShieldAlert, Shield } from "lucide-react";

type CircuitState = "CLOSED" | "OPEN" | "HALF_OPEN";

export function CircuitBreakerDemo() {
  const [state, setState] = useState<CircuitState>("CLOSED");

  const config = {
    CLOSED: {
      icon: ShieldCheck,
      color: "text-[var(--success)]",
      bg: "bg-[var(--success)]/10",
      border: "border-[var(--success)]/30",
      text: "Normal operation. Requests pass through to upstream target API seamlessly.",
    },
    OPEN: {
      icon: ShieldAlert,
      color: "text-[var(--error)]",
      bg: "bg-[var(--error)]/10",
      border: "border-[var(--error)]/30",
      text: "Threshold exceeded (5 failures). Upstream requests blocked immediately to prevent cascading downtime.",
    },
    HALF_OPEN: {
      icon: Shield,
      color: "text-[var(--warning)]",
      bg: "bg-[var(--warning)]/10",
      border: "border-[var(--warning)]/30",
      text: "Cooldown period active. Trial request sent to probe if upstream server has recovered.",
    },
  };

  const current = config[state];
  const Icon = current.icon;

  return (
    <div className="my-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div>
          <h4 className="font-bold text-sm text-[var(--text-primary)]">
            Circuit Breaker State Machine
          </h4>
          <p className="text-xs text-[var(--text-muted)]">
            Click states to inspect circuit isolation behavior.
          </p>
        </div>
        <div className="flex gap-1.5 font-mono text-xs">
          {(["CLOSED", "OPEN", "HALF_OPEN"] as CircuitState[]).map((st) => (
            <button
              key={st}
              onClick={() => setState(st)}
              className={`px-3 py-1 rounded-[var(--radius-sm)] border transition-all ${
                state === st
                  ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)] font-bold"
                  : "bg-[var(--background)] text-[var(--text-muted)] border-[var(--border)] hover:text-[var(--text-primary)]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className={`p-5 rounded-[var(--radius-md)] border flex items-start gap-4 ${current.bg} ${current.border}`}>
        <Icon className={`h-6 w-6 shrink-0 mt-0.5 ${current.color}`} />
        <div className="space-y-1">
          <div className={`font-mono font-bold text-sm ${current.color}`}>
            STATE: {state}
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">
            {current.text}
          </p>
        </div>
      </div>
    </div>
  );
}
