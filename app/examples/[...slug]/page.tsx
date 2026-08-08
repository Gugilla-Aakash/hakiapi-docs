import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/docs/MDXComponents";
import { TableOfContents } from "@/components/docs/TableOfContents";
export const dynamicParams = false;
interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export async function generateStaticParams() {
  const examplesDirectory = path.join(process.cwd(), "content/examples");
  try {
    if (fs.existsSync(examplesDirectory)) {
      const files = fs.readdirSync(examplesDirectory);
      return files
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => ({ slug: [file.replace(/\.mdx$/, "")] }));
    }
  } catch (e) {
    // Build fallback
  }
  return [];
}

export default async function ExamplePage({ params }: PageProps) {
  const resolvedParams = await params;
  const slugStr = (resolvedParams.slug || []).join("/");

  const examplesDirectory = path.join(process.cwd(), "content/examples");
  const filePath = path.join(examplesDirectory, `${slugStr}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf8");

  const { content } = await compileMDX({
    source: fileContent,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return (
    <div className="pt-4 pb-12 w-full min-w-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-9 space-y-6 min-w-0">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
            <Link href="/" className="hover:text-[var(--brand-primary)]">Home</Link>
            <span>/</span>
            <Link href="/examples" className="hover:text-[var(--brand-primary)]">Examples</Link>
            <span>/</span>
            <span className="text-[var(--brand-primary)]">{slugStr}</span>
          </div>

          <article className="prose prose-invert max-w-none">
            {content}
          </article>
        </div>

        <div className="hidden lg:block lg:col-span-3">
          <div className="sticky top-20 pl-2">
            <TableOfContents content={fileContent} />
          </div>
        </div>
      </div>
    </div>
  );
}
