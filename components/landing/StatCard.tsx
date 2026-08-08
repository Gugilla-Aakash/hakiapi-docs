import { Card } from "../ui/Card";

interface StatCardProps {
  value: string;
  label: string;
  subtext?: string;
}

export function StatCard({ value, label, subtext }: StatCardProps) {
  return (
    <Card hoverable={false} className="text-center">
      <div className="text-3xl sm:text-4xl font-extrabold text-[var(--brand-primary)] tracking-tight font-mono">
        {value}
      </div>
      <div className="mt-2 text-sm font-semibold text-[var(--text-primary)]">
        {label}
      </div>
      {subtext && (
        <div className="mt-1 text-xs text-[var(--text-muted)]">{subtext}</div>
      )}
    </Card>
  );
}
