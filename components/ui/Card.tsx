import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function Card({ children, className = "", hoverable = true }: CardProps) {
  return (
    <div
      className={`rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-200 ${
        hoverable
          ? "hover:border-[var(--brand-primary)]/40 hover:bg-[var(--surface-hover)] hover:shadow-[var(--shadow-floating)]"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
