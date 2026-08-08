interface SectionTitleProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionTitle({
  badge,
  title,
  description,
  align = "center",
  className = "",
}: SectionTitleProps) {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
  };

  return (
    <div className={`flex flex-col max-w-3xl mb-12 md:mb-16 ${alignClasses[align]} ${className}`}>
      {badge && (
        <span className="mb-3 inline-block rounded-full bg-[var(--brand-primary)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--brand-primary)] border border-[var(--brand-primary)]/20">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
