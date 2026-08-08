import { ReactNode } from "react";

interface StepItem {
  title: string;
  content: ReactNode;
}

// Add items = [] default value here to prevent crashes
export function Steps({ items = [] }: { items?: StepItem[] }) {
  // Safeguard: If no items are passed or the array is empty, return null
  if (!items || items.length === 0) return null;

  return (
    <div className="my-8 space-y-6 border-l-2 border-[var(--border)] pl-6 ml-3">
      {items.map((item, index) => (
        <div key={item.title || index} className="relative space-y-2">
          <span className="absolute -left-[35px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--brand-primary)] text-white text-xs font-bold font-mono">
            {index + 1}
          </span>
          <h4 className="text-base font-bold text-[var(--text-primary)]">
            {item.title}
          </h4>
          <div className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
}
