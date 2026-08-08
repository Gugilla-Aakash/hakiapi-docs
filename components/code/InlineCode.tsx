interface InlineCodeProps {
  children: React.ReactNode;
  className?: string;
}

export function InlineCode({ children, className = "" }: InlineCodeProps) {
  return (
    <code
      className={`rounded bg-[var(--code-bg)] border border-[var(--border)] px-1.5 py-0.5 font-mono text-[0.875em] text-[var(--brand-primary)] ${className}`}
    >
      {children}
    </code>
  );
}
