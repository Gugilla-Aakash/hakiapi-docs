interface BadgeProps {
  children: React.ReactNode;
  variant?: "brand" | "success" | "warning" | "error" | "neutral";
  size?: "sm" | "md";
  className?: string;
}

const badgeVariants = {
  brand:
    "bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] border-[var(--brand-primary)]/20",
  success:
    "bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20",
  warning:
    "bg-[var(--warning)]/10 text-[var(--warning)] border-[var(--warning)]/20",
  error:
    "bg-[var(--error)]/10 text-[var(--error)] border-[var(--error)]/20",
  neutral:
    "bg-[var(--surface-hover)] text-[var(--text-secondary)] border-[var(--border)]",
};

export function Badge({
  children,
  variant = "brand",
  size = "sm",
  className = "",
}: BadgeProps) {
  const sizeClass = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center font-mono font-semibold uppercase tracking-wider rounded-full border ${badgeVariants[variant]} ${sizeClass} ${className}`}
    >
      {children}
    </span>
  );
}
