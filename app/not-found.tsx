import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--error)]/10 text-[var(--error)]">
          <AlertTriangle className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
            404 - HTTP Not Found
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-md mx-auto">
            The endpoint you are looking for has been dropped. It might have been moved, or it simply doesn't exist.
          </p>
        </div>
        <div className="pt-4">
          <Link href="/">
            <Button size="lg" leftIcon={<ArrowLeft className="h-4 w-4" />}>
              Return to Base URL
            </Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
