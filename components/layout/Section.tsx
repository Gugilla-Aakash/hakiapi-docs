import { ReactNode } from "react";
import { PageContainer } from "./PageContainer";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  containerSize?: "default" | "narrow" | "wide";
  background?: "default" | "surface";
}

export function Section({
  id,
  children,
  className = "",
  containerSize = "wide",
  background = "default",
}: SectionProps) {
  const bgClasses = {
    default: "bg-[var(--background)]",
    surface: "bg-[var(--surface)] border-y border-[var(--border)]",
  };

  return (
    <section
      id={id}
      className={`py-20 md:py-28 ${bgClasses[background]} ${className}`}
    >
      <PageContainer size={containerSize}>{children}</PageContainer>
    </section>
  );
}
