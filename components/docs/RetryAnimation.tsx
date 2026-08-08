"use client";

import { useState } from "react";
import { Play, RotateCcw, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "../ui/Button";

export function RetryAnimation() {
  const [step, setStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulation = () => {
    setIsSimulating(true);
    setStep(1); // Attempt 1 -> 429

    setTimeout(() => {
      setStep(2); // Backoff wait (~1s)
      setTimeout(() => {
        setStep(3); // Attempt 2 -> 200 OK
        setIsSimulating(false);
      }, 1000);
    }, 1000);
  };

  return (
    <div className="my-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div>
          <h4 className="font-bold text-sm text-[var(--text-primary)]">
            Exponential Backoff Simulation
          </h4>
          <p className="text-xs text-[var(--text-muted)]">
            Simulates HTTP 429 recovery with exponential backoff.
          </p>
        </div>
        <Button
          size="sm"
          onClick={runSimulation}
          isLoading={isSimulating}
          leftIcon={<Play className="h-3 w-3" />}
        >
          Run Flow
        </Button>
      </div>

      {/* Timeline Nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs text-center">
        {/* Attempt 1 */}
        <div
          className={`p-4 rounded-[var(--radius-md)] border transition-all ${
            step >= 1
              ? "bg-[var(--warning)]/10 border-[var(--warning)] text-[var(--warning)]"
              : "bg-[var(--background)] border-[var(--border)] opacity-40"
          }`}
        >
          <div className="font-bold">Attempt 01</div>
          <div className="mt-1 flex items-center justify-center gap-1">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>429 Too Many</span>
          </div>
        </div>

        {/* Backoff Delay */}
        <div
          className={`p-4 rounded-[var(--radius-md)] border transition-all ${
            step >= 2
              ? "bg-[var(--brand-primary)]/10 border-[var(--brand-primary)] text-[var(--brand-primary)] animate-pulse"
              : "bg-[var(--background)] border-[var(--border)] opacity-40"
          }`}
        >
          <div className="font-bold">Backoff Wait</div>
          <div className="mt-1 flex items-center justify-center gap-1">
            <RotateCcw className="h-3.5 w-3.5 animate-spin" />
            <span>Delay ~1.0s</span>
          </div>
        </div>

        {/* Attempt 2 */}
        <div
          className={`p-4 rounded-[var(--radius-md)] border transition-all ${
            step >= 3
              ? "bg-[var(--success)]/10 border-[var(--success)] text-[var(--success)]"
              : "bg-[var(--background)] border-[var(--border)] opacity-40"
          }`}
        >
          <div className="font-bold">Attempt 02</div>
          <div className="mt-1 flex items-center justify-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>200 OK</span>
          </div>
        </div>
      </div>
    </div>
  );
}
