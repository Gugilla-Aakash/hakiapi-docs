 "use client";

import { ReactNode } from "react";
import { Info, AlertTriangle, XCircle, CheckCircle2 } from "lucide-react";

interface CalloutProps {
  type?: "info" | "note" | "warning" | "danger" | "success";
  title?: string;
  children: ReactNode;
}

const config = {
  info: {
    icon: Info,
    style: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  },
  note: {
    icon: Info,
    style: "border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]",
  },
  warning: {
    icon: AlertTriangle,
    style: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
  },
  danger: {
    icon: XCircle,
    style: "border-red-500/30 bg-red-500/10 text-red-400",
  },
  success: {
    icon: CheckCircle2,
    style: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const safeType = config[type as keyof typeof config] ? type : "info";
  const { icon: Icon, style } = config[safeType as keyof typeof config];

  return (
    <div className={`my-6 rounded-xl border p-4 ${style} backdrop-blur-sm`}>
      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 mt-0.5 shrink-0" />
        <div className="space-y-1 w-full">
          {title && <h5 className="font-bold text-white text-sm">{title}</h5>}
          <div className="text-sm text-[var(--text-secondary)] leading-relaxed [&>p]:m-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
