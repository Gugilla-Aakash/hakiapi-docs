"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Github } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { ArchitectureFlow } from "@/components/landing/ArchitectureFlow";
import { DocsHeaderNav } from "@/components/docs/DocsHeaderNav";

export default function ArchitecturePage() {
  const router = useRouter();

  return (
    <PageContainer size="wide" className="py-12 md:py-20">
      
      {/* Top Action Bar: Back Button & GitHub Link */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-white transition-colors"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 group-hover:bg-white/10 transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </div>
          <span>Back</span>
        </button>

        <a
          href="https://github.com/Gugilla-Aakash/hakiapi"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-white transition-colors"
          title="View on GitHub"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 group-hover:bg-white/10 transition-colors">
            <Github className="h-4 w-4" />
          </div>
        </a>
      </div>

      <DocsHeaderNav category="Vision" title="Architecture" />
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] mb-4">
          System Architecture
        </h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Follow the complete lifecycle of an API request—from your client method to the network and back through retries, authentication, parsing, and exception mapping.
        </p>
      </div>
      <ArchitectureFlow />
    </PageContainer>
  );
}
