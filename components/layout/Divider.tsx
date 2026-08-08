interface DividerProps {
  className?: string;
}

export function Divider({ className = "" }: DividerProps) {
  return (
    <hr
      className={`w-full border-t border-[var(--border)] opacity-60 my-0 ${className}`}
    />
  );
}
