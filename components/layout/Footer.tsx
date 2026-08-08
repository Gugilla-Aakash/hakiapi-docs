import Link from "next/link";
import { Zap } from "lucide-react";
import { PageContainer } from "./PageContainer";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)] py-12 transition-colors">
      <PageContainer size="wide">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand Note */}
          <div className="space-y-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-base">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]">
                <Zap className="h-3.5 w-3.5 fill-current" />
              </span>
              <span>HakiAPI</span>
            </Link>
            <p className="text-xs text-[var(--text-muted)] max-w-sm">
              Build resilient, production-grade Python API SDKs with automatic retries and circuit breakers.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-[var(--text-secondary)]">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://pypi.org"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              PyPI
            </a>
            <Link
              href="/docs/license"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              MIT License
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border)]/50 text-xs text-[var(--text-muted)] flex justify-between items-center">
          <span>© 2026 Gugilla Aakash. All rights reserved.</span>
          <span>Designed for Developers</span>
        </div>
      </PageContainer>
    </footer>
  );
}
