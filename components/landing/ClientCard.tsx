import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

interface ClientCardProps {
  name: string;
  icon: React.ReactNode;
  badges: string[];
  docUrl: string;
}

export function ClientCard({ name, icon, badges, docUrl }: ClientCardProps) {
  return (
    <Link href={docUrl} className="block group">
      <Card className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <h4 className="font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors">
              {name}
            </h4>
            <div className="mt-1 flex gap-1.5">
              {badges.map((b) => (
                <Badge key={b} variant="neutral" size="sm">
                  {b}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-[var(--text-muted)] group-hover:text-[var(--brand-primary)] group-hover:translate-x-1 transition-all" />
      </Card>
    </Link>
  );
}
