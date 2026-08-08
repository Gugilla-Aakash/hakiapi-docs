import { Search } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  shortcut?: string;
  onClick?: () => void;
  className?: string;
}

export function SearchInput({
  placeholder = "Search documentation...",
  shortcut = "⌘K",
  onClick,
  className = "",
}: SearchInputProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-muted)] hover:border-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors ${className}`}
    >
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 shrink-0" />
        <span>{placeholder}</span>
      </div>
      {shortcut && (
        <kbd className="hidden sm:inline-block rounded bg-[var(--background)] px-1.5 py-0.5 text-[10px] font-mono border border-[var(--border)]">
          {shortcut}
        </kbd>
      )}
    </button>
  );
}
