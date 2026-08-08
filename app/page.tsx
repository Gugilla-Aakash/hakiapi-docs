import Link from "next/link";
import {
  Github,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Layers,
  Zap,
  Cpu,
  CheckCircle2,
  XCircle,
  Play
} from "lucide-react";

import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { SectionTitle } from "@/components/layout/SectionTitle";
import { Grid } from "@/components/layout/Grid";
import { MotionWrapper } from "@/components/layout/MotionWrapper";
import { Divider } from "@/components/layout/Divider";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

import { FeatureCard } from "@/components/landing/FeatureCard";
import { HeroCodePreview } from "@/components/landing/HeroCodePreview";
import { ArchitectureFlow } from "@/components/landing/ArchitectureFlow";
import { HeroBackground } from "@/components/landing/HeroBackground";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-24 md:pb-32 bg-transparent z-0 overflow-hidden">
        <HeroBackground />
        
        <PageContainer size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Headline Column */}
            <div className="lg:col-span-6 space-y-6">
              <MotionWrapper>
                <Badge variant="brand" size="md" className="shadow-sm border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/10 backdrop-blur-md">
                  <span className="animate-pulse mr-2 inline-block h-2 w-2 rounded-full bg-[var(--brand-primary)]"></span>
                  Python API SDK Framework
                </Badge>
              </MotionWrapper>

              <MotionWrapper delay={0.05}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent leading-[1.15] pb-2">
                  Build Production-Grade Python API SDKs
                </h1>
              </MotionWrapper>

              <MotionWrapper delay={0.1}>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                  Build resilient Python SDKs with retries, OAuth, pagination, and circuit breakers already solved.
                </p>
              </MotionWrapper>

              {/* Action Buttons (3 Actions) */}
              <MotionWrapper delay={0.15}>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link href="/docs/quickstart">
                    <Button size="lg" className="hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(var(--brand-primary-rgb),0.3)] transition-all duration-300" leftIcon={<Play className="h-4 w-4 fill-current" />}>
                      Quick Start
                    </Button>
                  </Link>
                  <a href="https://github.com/Gugilla-Aakash/hakiapi" target="_blank" rel="noreferrer">
                    <Button size="lg" variant="outline" className="hover:-translate-y-1 hover:border-white/20 transition-all duration-300 bg-[var(--surface)]/50 backdrop-blur-sm" leftIcon={<Github className="h-4 w-4" />}>
                      GitHub
                    </Button>
                  </a>
                  <Link href="/docs">
                    <Button size="lg" variant="ghost" className="hover:bg-white/5 transition-colors group">
                      Documentation <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </MotionWrapper>

              {/* Trust Section - Updated Dependencies */}
              <MotionWrapper delay={0.2}>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-8 text-sm font-mono text-[var(--text-muted)]">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[var(--success)]" /> Python 3.10+</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[var(--success)]" /> 100% Type Hints</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[var(--success)]" /> 2 Core Dependencies</span>
                </div>
              </MotionWrapper>
            </div>

            {/* Right Hero Interactive Code Window */}
            <div className="lg:col-span-6 relative group">
              <div className="absolute -inset-4 rounded-[var(--radius-lg)] bg-gradient-to-r from-[var(--brand-primary)]/30 via-[var(--brand-primary)]/10 to-[var(--success)]/20 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
              <MotionWrapper delay={0.25} className="relative">
                <HeroCodePreview /> 
              </MotionWrapper>
            </div>
          </div>
        </PageContainer>
      </section>

      <Divider />

      {/* 2. STATS OVERVIEW */}
      <Section className="py-12 border-y border-[var(--border)] bg-[var(--surface)]/20">
        <Grid cols={3} gap="lg" className="max-w-5xl mx-auto">
          <MotionWrapper delay={0.1}>
            <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] p-8 text-center transition-all hover:border-[var(--brand-primary)]/50 hover:shadow-[0_0_40px_rgba(var(--brand-primary-rgb),0.1)]">
              <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="text-5xl font-extrabold text-white mb-2 tracking-tighter">100<span className="text-[var(--brand-primary)]">%</span></div>
              <div className="text-sm font-mono text-[var(--brand-primary)] mb-1 font-bold">Type Annotated</div>
              <div className="text-sm text-[var(--text-secondary)]">Full IDE autocompletion</div>
            </div>
          </MotionWrapper>
          <MotionWrapper delay={0.15}>
            <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] p-8 text-center transition-all hover:border-[var(--success)]/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)]">
              <div className="absolute inset-0 bg-gradient-to-b from-[var(--success)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="text-5xl font-extrabold text-white mb-2 tracking-tighter">0.2<span className="text-[var(--success)]">s</span></div>
              <div className="text-sm font-mono text-[var(--success)] mb-1 font-bold">Recovery Time</div>
              <div className="text-sm text-[var(--text-secondary)]">Default backoff jitter</div>
            </div>
          </MotionWrapper>
          <MotionWrapper delay={0.2}>
            <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] p-8 text-center transition-all hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="text-5xl font-extrabold text-white mb-2 tracking-tighter">2</div>
              <div className="text-sm font-mono text-white mb-1 font-bold">Core Dependencies</div>
              <div className="text-sm text-[var(--text-secondary)]">requests & httpx</div>
            </div>
          </MotionWrapper>
        </Grid>
      </Section>

      <Divider />

      {/* 3. CORE FEATURES GRID */}
      <Section id="features">
        <SectionTitle
          badge="Resilience Core"
          title="Everything You Need for Resilient APIs"
          description="Built-in API infrastructure pattern so you never write boilerplate integration logic again."
        />
        <Grid cols={3} gap="lg">
          <MotionWrapper delay={0.05}>
            <FeatureCard
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Token Refresh"
              description="Refreshes expired OAuth tokens before requests fail."
              statusLabel="ACTIVE"
              bullets={[
                "Automatic Token Refresh",
                "PKCE Flow Support",
                "Bearer Header Injection"
              ]}
              tags={["OAuth2", "Secure"]}
              href="/docs/oauth"
            />
          </MotionWrapper>
          <MotionWrapper delay={0.1}>
            <FeatureCard
              icon={<RefreshCw className="h-5 w-5" />}
              title="Exponential Retries"
              description="Recovers from rate limits and transient errors with jitter."
              statusLabel="ENABLED"
              bullets={[
                "429 Rate Limit Handling",
                "5xx Server Errors",
                "Randomized Jitter"
              ]}
              tags={["Resilience", "Automated"]}
              href="/docs/retries"
            />
          </MotionWrapper>
          <MotionWrapper delay={0.15}>
            <FeatureCard
              icon={<Layers className="h-5 w-5" />}
              title="Universal Paginator"
              description="Iterate across varied pagination schemas using a single unified iterator."
              statusLabel="READY"
              bullets={[
                "Cursor-based Pagination",
                "Offset & Limit",
                "Page Numbers"
              ]}
              tags={["Iteration", "Async/Sync"]}
              href="/docs/paginator"
            />
          </MotionWrapper>
        </Grid>
      </Section>

      <Divider />

      {/* 4. ARCHITECTURE PREVIEW (Request Lifecycle Pipeline) */}
      <Section background="surface" id="architecture">
        <SectionTitle
          badge="Request Lifecycle"
          title="Every Request Protected by Default"
          description="Watch how a single client invocation travels through security, resilience, and transport layers before hitting upstream APIs."
        />
        <MotionWrapper>
          <ArchitectureFlow /> 
        </MotionWrapper>
      </Section>

      <Divider />

      {/* 5. WHY HAKIAPI? SPLIT SCREEN COMPARISON */}
      <Section id="why" className="border-t border-[var(--border)] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[var(--brand-primary)] opacity-[0.05] blur-[100px] rounded-full pointer-events-none" />

        <SectionTitle
          badge="The Difference"
          title="Raw Requests vs. HakiAPI"
          description="Compare writing raw HTTP integration code against using HakiAPI's production core."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch relative z-10">
          
          {/* Left: Raw Requests (Without HakiAPI) */}
          <MotionWrapper>
            <div className="h-full rounded-2xl border border-red-500/30 bg-[#161111] p-8 flex flex-col relative overflow-hidden group shadow-lg">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500/60" />
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
                    <XCircle className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Without HakiAPI</h3>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                  ~65 Lines of Boilerplate
                </span>
              </div>
              
              <div className="flex-grow bg-[#0c0909] rounded-xl border border-red-500/20 p-5 font-mono text-xs sm:text-sm overflow-hidden text-red-300/70 shadow-inner space-y-2">
                <div className="flex gap-1.5 mb-3 border-b border-red-500/10 pb-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/40" />
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/20" />
                  <span className="ml-2 text-xs text-red-400/50">legacy_integration.py</span>
                </div>
                <div className="text-red-400">while True:</div>
                <div className="pl-4 text-white/60">try:</div>
                <div className="pl-8 text-white/80">resp = requests.get(url, headers=auth)</div>
                <div className="pl-8 text-red-300">if resp.status_code == 401: refresh_token()...</div>
                <div className="pl-8 text-red-300">elif resp.status_code == 429: time.sleep(backoff)</div>
                <div className="pl-4 text-white/60">except (ConnectionError, Timeout):</div>
                <div className="pl-8 text-red-300"># implement manual retry logic & jitter...</div>
              </div>
            </div>
          </MotionWrapper>

          {/* Right: HakiAPI (With HakiAPI) */}
          <MotionWrapper delay={0.1}>
            <div className="h-full rounded-2xl border border-[var(--brand-primary)]/50 bg-[#0d1520] p-8 flex flex-col relative overflow-hidden shadow-[0_0_40px_rgba(var(--brand-primary-rgb),0.15)] group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--success)]" />
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[var(--brand-primary)]/20 text-[var(--brand-primary)] border border-[var(--brand-primary)]/30">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white">With HakiAPI</h3>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] border border-[var(--brand-primary)]/20">
                  8 Lines Clean Logic
                </span>
              </div>
              
              <div className="flex-grow bg-[#0d1117] rounded-xl border border-[var(--brand-primary)]/20 p-5 font-mono text-xs sm:text-sm overflow-hidden shadow-inner relative">
                <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs text-[var(--text-muted)]">modern_client.py</span>
                </div>
                
                <div className="text-[#ff7b72]">from <span className="text-white">hakiapi</span> import <span className="text-[#d2a8ff]">GitHubClient</span></div>
                <br/>
                <div className="text-[#ff7b72]">with <span className="text-[#d2a8ff]">GitHubClient</span><span className="text-white">()</span> as <span className="text-[#79c0ff]">client</span>:</div>
                <div className="text-[#8b949e] pl-4 italic"># Retries, auth, & circuits handled natively</div>
                <div className="text-white pl-4">user = client.<span className="text-[#d2a8ff]">get_user</span>(<span className="text-[#a5d6ff]">"torvalds"</span>)</div>
                <div className="text-[#d2a8ff] pl-4">print<span className="text-white">(user.name)</span></div>
              </div>
            </div>
          </MotionWrapper>

        </div>
      </Section>

      <Divider />

      {/* 6. FINAL CALL TO ACTION (Grand Finale Container) */}
      <Section background="surface" className="border-t border-[var(--border)] overflow-hidden py-24">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="relative rounded-3xl border border-[var(--brand-primary)]/30 bg-gradient-to-b from-[var(--surface)] to-[var(--background)] p-10 sm:p-16 text-center overflow-hidden shadow-2xl">
            
            {/* Center background ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[var(--brand-primary)] opacity-[0.15] blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] border border-[var(--brand-primary)]/30 shadow-[0_0_30px_rgba(var(--brand-primary-rgb),0.3)] mx-auto">
                <Zap className="h-8 w-8 fill-[var(--brand-primary)]/20" />
              </div>
              
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Stop rewriting API infrastructure.
              </h2>
              
              <p className="text-lg text-[var(--text-secondary)]">
                Install HakiAPI today and build production-grade SDKs in minutes. Zero boilerplate, maximum reliability.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link href="/docs/quickstart">
                  <Button size="lg" className="h-12 px-8 text-base font-bold shadow-[0_0_25px_rgba(var(--brand-primary-rgb),0.3)] hover:shadow-[0_0_40px_rgba(var(--brand-primary-rgb),0.5)] hover:-translate-y-0.5 transition-all duration-300" rightIcon={<ArrowRight className="h-4 w-4" />}>
                    Get Started Free
                  </Button>
                </Link>
                <a href="https://github.com/Gugilla-Aakash/hakiapi" target="_blank" rel="noreferrer">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-[var(--surface)]/50 backdrop-blur-sm hover:border-white/30 transition-all duration-300" leftIcon={<Github className="h-4 w-4" />}>
                    Star on GitHub
                  </Button>
                </a>
              </div>
            </div>

          </div>
        </div>
      </Section>
    </div>
  );
}
