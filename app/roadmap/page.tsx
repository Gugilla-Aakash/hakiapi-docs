import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Github } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { DocsHeaderNav } from "@/components/docs/DocsHeaderNav";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "Explore the HakiAPI release history, upcoming agentic rate-limit governor, and long-term future vision.",
};

type Status = "released" | "in-progress" | "vision";

type Feature = {
  title: string;
  description: string;
  progress?: number;
};

type Milestone = {
  version: string;
  name: string;
  status: Status;
  badge: string;
  tagline: string;
  features: Feature[];
};

const STATUS_STYLES: Record<
  Status,
  { dot: string; text: string; badgeBg: string; badgeText: string; badgeBorder: string; bar: string }
> = {
  released: {
    dot: "bg-emerald-500",
    text: "text-emerald-400",
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-400",
    badgeBorder: "border-emerald-500/30",
    bar: "bg-emerald-500",
  },
  "in-progress": {
    dot: "bg-blue-500",
    text: "text-blue-400",
    badgeBg: "bg-blue-500/10",
    badgeText: "text-blue-400",
    badgeBorder: "border-blue-500/30",
    bar: "bg-blue-500",
  },
  vision: {
    dot: "bg-purple-500",
    text: "text-purple-400",
    badgeBg: "bg-purple-500/10",
    badgeText: "text-purple-400",
    badgeBorder: "border-purple-500/30",
    bar: "bg-purple-500",
  },
};

const MILESTONES: Milestone[] = [
  {
    version: "v1.0",
    name: "Public API Foundation",
    status: "released",
    badge: "Released · Jul 2026",
    tagline: "The base client and public API surface every later SDK is built on top of.",
    features: [
      {
        title: "Public API Surface Upgrade",
        description:
          "Cleaned up and stabilized the client's public interface (v1.0.5) ahead of the SDK integrations that followed.",
      },
      {
        title: "Core Client Bump",
        description: "Foundational fixes and version cleanup (v1.0.4).",
      },
    ],
  },
  {
    version: "v1.1 – v1.2",
    name: "Gmail & Calendar Integration",
    status: "released",
    badge: "Released · Jul 2026",
    tagline: "The first production SDKs on top of HakiAPI's core: Gmail and Google Calendar.",
    features: [
      {
        title: "GmailClient",
        description: "Initial GmailClient release for reading and managing Gmail via the API (v1.1.0).",
      },
      {
        title: "Gmail Resource Routing & Central Pagination",
        description:
          "Reworked Gmail into resource-based routing with a shared pagination core (v1.2.0).",
      },
      {
        title: "GoogleCalendarClient",
        description: "New Calendar API client built on the same pagination core as Gmail (v1.2.2).",
      },
    ],
  },
  {
    version: "v2.0",
    name: "OAuth 2.0 Engine & Token Vault",
    status: "released",
    badge: "Released · Jul 2026",
    tagline: "A real auth layer: token refresh, persistent storage, and pagination hardening.",
    features: [
      {
        title: "Google OAuth 2.0 Engine & Token Vault",
        description:
          "Full OAuth 2.0 flow with a persistent, atomic token store backing the Gmail and Calendar clients (v2.0.0).",
      },
      {
        title: "Paginator Bug Fix",
        description: "Fixed a pagination bug surfaced by the new OAuth engine (v2.0.1).",
      },
    ],
  },
  {
    version: "v2.1",
    name: "GitHub Client & Async Core",
    status: "released",
    badge: "Released · Jul 2026",
    tagline: "A GraphQL-powered GitHub client, plus an async-first rewrite of the base client.",
    features: [
      {
        title: "GitHub Client (GraphQL)",
        description: "New GitHub client built on GraphQL instead of REST (v2.1.0).",
      },
      {
        title: "Async Base Client",
        description:
          "Async-native base client, plus daily/weekly contribution stats in the GitHub client (v2.1.2).",
      },
    ],
  },
  {
    version: "v2.2",
    name: "Predictive Rate-Limit Governor",
    status: "in-progress",
    badge: "Next Up",
    tagline:
      "Built for agentic RAG and multi-agent workflows, where parallel tool calls can burn through rate limits fast. Turns HakiAPI from a passive client into a proactive traffic controller that paces requests before a 429 ever happens.",
    features: [
      {
        title: "Proactive Header Inspection",
        description:
          "Reads remaining-quota and reset-time headers off every response to track consumption velocity in real time.",
      },
      {
        title: "Token Bucket Sliding Window",
        description: "Tracks usage per endpoint in an internal sliding window, not just a global counter.",
      },
      {
        title: "Smart Local Throttling",
        description:
          "Paces and pauses outgoing requests locally for a micro-duration when velocity approaches a threshold, so the 429 never fires.",
      },
      {
        title: "Circuit Breaker Synergy",
        description:
          "Pairs with HakiAPI's client-side circuit breaker: the breaker fast-fails on cascading 5xx outages while the Governor prevents 429s from happening in the first place.",
      },
    ],
  },
];

const VISION: Feature[] = [
  {
    title: "SDK Marketplace",
    description: "A registry of community-maintained clients built on the HakiAPI core.",
  },
  {
    title: "OpenAPI Codegen",
    description: "Generate a fully typed HakiAPI client directly from an OpenAPI spec.",
  },
  {
    title: "Agent-Aware Observability",
    description: "Tracing built around multi-agent call graphs, not just single request/response pairs.",
  },
];

function ProgressBar({ value, status }: { value: number; status: Status }) {
  const styles = STATUS_STYLES[status];
  return (
    <div className="flex items-center gap-3 mt-2">
      <div className="h-1.5 flex-1 rounded-full bg-[var(--border)] overflow-hidden">
        <div
          className={`h-full rounded-full ${styles.bar}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs font-medium text-[var(--text-muted)] tabular-nums w-9 text-right">
        {value}%
      </span>
    </div>
  );
}

function StatusBadge({ status, label }: { status: Status; label: string }) {
  const styles = STATUS_STYLES[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${styles.badgeBg} ${styles.badgeText} ${styles.badgeBorder}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
      {label}
    </span>
  );
}

function MilestoneCard({ milestone, isLast }: { milestone: Milestone; isLast: boolean }) {
  const styles = STATUS_STYLES[milestone.status];

  return (
    <div className="relative pl-10 sm:pl-14">
      <div
        className={`absolute left-0 sm:left-1 top-1 h-4 w-4 rounded-full border-2 border-[var(--background)] ${styles.dot} ring-4 ring-[var(--background)]`}
      />
      {!isLast && (
        <div className="absolute left-[7px] sm:left-[15px] top-5 bottom-[-2rem] w-px bg-[var(--border)]" />
      )}

      <div className="pb-12">
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <h3 className="text-2xl font-bold text-[var(--text-primary)]">{milestone.version}</h3>
          <StatusBadge status={milestone.status} label={milestone.badge} />
        </div>
        <p className={`text-sm font-semibold mb-1 ${styles.text}`}>{milestone.name}</p>
        <p className="text-[var(--text-secondary)] mb-5 max-w-2xl">{milestone.tagline}</p>

        <div className="grid sm:grid-cols-2 gap-4">
          {milestone.features.map((feature) => (
            <div
              key={feature.title}
              className="p-4 border border-[var(--border)] rounded-[var(--radius-lg)] bg-[var(--surface)]"
            >
              <h4 className="font-semibold text-[var(--text-primary)] mb-1">{feature.title}</h4>
              <p className="text-sm text-[var(--text-secondary)]">{feature.description}</p>
              {typeof feature.progress === "number" && (
                <ProgressBar value={feature.progress} status={milestone.status} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RoadmapPage() {
  return (
    <PageContainer className="py-12 md:py-20 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/docs"
          className="group flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-white transition-colors"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 group-hover:bg-white/10 transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </div>
          <span>Back</span>
        </Link>

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

      <DocsHeaderNav category="Vision" title="Roadmap" />

      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] mb-4">
        HakiAPI Roadmap
      </h1>
      <p className="text-lg text-[var(--text-secondary)] mb-14 max-w-2xl">
        Our mission is to make HakiAPI the default infrastructure core for Python API SDKs — and
        increasingly, for the agentic workloads built on top of them. Here's what's shipped, what's
        next, and where we're headed.
      </p>

      <div>
        {MILESTONES.map((milestone, i) => (
          <MilestoneCard
            key={milestone.version}
            milestone={milestone}
            isLast={i === MILESTONES.length - 1}
          />
        ))}
      </div>

      <div className="mt-4 pt-10 border-t border-[var(--border)]">
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <h3 className="text-2xl font-bold text-[var(--text-primary)]">Beyond v2.2</h3>
          <StatusBadge status="vision" label="Future Vision" />
        </div>
        <p className="text-[var(--text-secondary)] mb-5 max-w-2xl">
          Experimental ideas we're excited about, not yet scheduled or guaranteed.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {VISION.map((feature) => (
            <div
              key={feature.title}
              className="p-4 border border-dashed border-[var(--border)] rounded-[var(--radius-lg)] bg-[var(--background)]"
            >
              <h4 className="font-semibold text-[var(--text-primary)] mb-1">{feature.title}</h4>
              <p className="text-sm text-[var(--text-muted)]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 p-6 border border-[var(--border)] rounded-[var(--radius-lg)] bg-[var(--surface)]">
        <h3 className="font-semibold text-[var(--text-primary)] mb-2">Release philosophy</h3>
        <p className="text-[var(--text-secondary)]">
          HakiAPI follows a stability-first release cycle. Core infrastructure is completed before
          new API integrations are added, ensuring every client inherits a consistent,
          well-tested foundation.
        </p>
      </div>
    </PageContainer>
  );
}
