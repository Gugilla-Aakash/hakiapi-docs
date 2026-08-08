import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}

const sizeClasses = {
  narrow: "max-w-4xl",   // ~896px - for focused reading / blog
  default: "max-w-6xl",  // ~1152px - standard docs / layout
  wide: "max-w-7xl",     // ~1280px - landing page grid hero
};

export function PageContainer({
  children,
  className = "",
  size = "wide",
}: PageContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${sizeClasses[size]} ${className}`}
    >
      {children}
    </div>
  );
}
