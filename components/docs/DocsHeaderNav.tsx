import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface DocsHeaderNavProps {
  category: string;
  title: string;
}

export function DocsHeaderNav({ category, title }: DocsHeaderNavProps) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mb-6 font-mono">
      <Link href="/docs" className="hover:text-[var(--text-primary)] transition-colors">
        Docs
      </Link>
      <ChevronRight className="h-3 w-3" />
      <span>{category}</span>
      <ChevronRight className="h-3 w-3" />
      <span className="text-[var(--brand-primary)] font-semibold">{title}</span>
    </div>
  );
}
