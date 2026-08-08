import { Sidebar } from "@/components/docs/Sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--background)] pt-16">
      {/* Expanded max-width to 1600px to utilize wide monitors */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8 lg:gap-12">
          
          {/* Left Navigation Sidebar */}
          <aside className="hidden md:block w-64 shrink-0 pt-4 pb-10 border-r border-[var(--border)] h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
            <Sidebar />
          </aside>

          {/* Main Doc Page Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>

        </div>
      </div>
    </div>
  );
}
