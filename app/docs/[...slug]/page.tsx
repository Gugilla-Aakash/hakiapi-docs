import type { Metadata } from "next"; // <-- Make sure to import Metadata[cite: 1]
import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm"; // <-- Required for Markdown Tables & GFM support[cite: 1]
import { mdxComponents } from "@/components/docs/MDXComponents";
import { DocsPagination } from "@/components/docs/DocsPagination";
import { TableOfContents } from "@/components/docs/TableOfContents";
import { DocsActionBar } from "@/components/docs/DocsActionBar"; // <-- 1. Import the action bar[cite: 1]

export const dynamicParams = false;

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export async function generateStaticParams() {
  const staticSlugs = [
    ["introduction"],
    ["installation"],
    ["quick-start"],
    ["quickstart"],
    ["auth"],
    ["retry"],
    ["retries"],
    ["paginator"],
    ["exceptions"],
    ["circuit-breaker"],
    ["async-client"],
    ["oauth"],
    ["github-client"],
    ["gmail-client"],
    ["google-calendar"],
    ["custom-client"],
    ["architecture"],
    ["roadmap"],
  ];

  try {
    const docsDirectory = path.join(process.cwd(), "content/docs");
    if (fs.existsSync(docsDirectory)) {
      const files = fs.readdirSync(docsDirectory);
      files.forEach((file) => {
        if (file.endsWith(".mdx")) {
          const baseName = file.replace(/\.mdx$/, "");
          staticSlugs.push([baseName]);
        }
      });
    }
  } catch (e) {
    // Build fallback
  }

  const uniqueMap = new Map();
  staticSlugs.forEach((s) => uniqueMap.set(s.join("/"), s));

  return Array.from(uniqueMap.values()).map((slug) => ({ slug }));
}

// Add this function to generate dynamic titles for every doc page[cite: 1]
interface MetadataProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const resolvedParams = await params;
  const rawSlugSegments = resolvedParams.slug || ["introduction"];
  let slugStr = rawSlugSegments.join("/");

  if (slugStr === "quickstart") slugStr = "quick-start";
  if (slugStr === "retries") slugStr = "retry";

  // Format slug nicely (e.g., "quick-start" -> "Quick Start")
  const titleFormatted = slugStr
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: titleFormatted, // Uses the template "%s | HakiAPI" defined in root layout[cite: 1]
  };
}

export default async function DocPage({ params }: PageProps) {
  const resolvedParams = await params;
  const rawSlugSegments = resolvedParams.slug || ["introduction"];
  let slugStr = rawSlugSegments.join("/");

  // Route aliases
  if (slugStr === "quickstart") slugStr = "quick-start";
  if (slugStr === "retries") slugStr = "retry";

  const docsDirectory = path.join(process.cwd(), "content/docs");
  let filePath = path.join(docsDirectory, `${slugStr}.mdx`);

  if (!fs.existsSync(filePath)) {
    if (slugStr === "quick-start" && fs.existsSync(path.join(docsDirectory, "quickstart.mdx"))) {
      filePath = path.join(docsDirectory, "quickstart.mdx");
    } else if (slugStr === "retry" && fs.existsSync(path.join(docsDirectory, "retries.mdx"))) {
      filePath = path.join(docsDirectory, "retries.mdx");
    } else {
      notFound();
    }
  }

  const fileContent = fs.readFileSync(filePath, "utf8");

  const { content } = await compileMDX({
    source: fileContent,
    components: mdxComponents,
    options: { 
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm], // Enables parsing of markdown tables[cite: 1]
      },
    },
  });

  return (
    <div className="pt-4 pb-12 w-full min-w-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Main Content Area (9 Columns) */}
        <div className="lg:col-span-9 space-y-6 min-w-0">
          
          {/* 2. Place the Action Bar here! */}
          <DocsActionBar />

          <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
            <Link href="/" className="hover:text-[var(--brand-primary)]">Home</Link>
            <span>/</span>
            <Link href="/docs" className="hover:text-[var(--brand-primary)]">Docs</Link>
            <span>/</span>
            <span className="text-[var(--brand-primary)]">{slugStr}</span>
          </div>

          <article className="prose prose-invert max-w-none">
            {content}
          </article>

          <DocsPagination currentSlug={slugStr} />
        </div>

        {/* Right Table of Contents (3 Columns) */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="sticky top-20 pl-2">
            <TableOfContents content={fileContent} />
          </div>
        </div>

      </div>
    </div>
  );
}
