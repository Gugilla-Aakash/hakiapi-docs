import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { Card } from "../ui/Card";

interface ExampleCardProps {
  title: string;
  description: string;
  readTime: string;
  href: string;
}

export function ExampleCard({
  title,
  description,
  readTime,
  href,
}: ExampleCardProps) {
  return (
    <Link href={href} className="block group">
      <Card className="flex flex-col justify-between h-full space-y-4">
        <div>
          <h4 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors">
            {title}
          </h4>
          <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)] text-xs text-[var(--text-muted)]">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {readTime}
          </span>
          <span className="flex items-center gap-1 font-medium text-[var(--brand-primary)]">
            View Example
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
