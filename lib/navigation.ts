export interface NavItem {
  title: string;
  href: string;
  badge?: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const docsNavigation: NavGroup[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs/introduction" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Quick Start", href: "/docs/quick-start" },
    ],
  },
  {
    title: "Core Features",
    items: [
      { title: "Authentication", href: "/docs/authentication" },
      { title: "Retry Engine", href: "/docs/retry" },
      { title: "Paginator", href: "/docs/paginator" },
      { title: "Exceptions", href: "/docs/exceptions" },
      { title: "Circuit Breaker", href: "/docs/circuit-breaker", badge: "NEW" },
      { title: "Async Client", href: "/docs/async-client" },
      { title: "OAuth2", href: "/docs/oauth" },
    ],
  },
  {
    title: "Bundled Clients",
    items: [
      { title: "GitHub Client", href: "/docs/github-client" },
      { title: "Gmail Client", href: "/docs/gmail-client" },
      { title: "Google Calendar", href: "/docs/google-calendar" },
      { title: "Custom Client", href: "/docs/custom-client" },
    ],
  },
  {
    title: "Architecture & Vision",
    items: [
      { title: "Architecture", href: "/docs/architecture" },
      { title: "Roadmap", href: "/docs/roadmap" },
    ],
  },
];

export function getDocPagination(currentPath: string) {
  const allItems = docsNavigation.flatMap((group) => group.items);
  const currentIndex = allItems.findIndex((item) => item.href === currentPath);

  if (currentIndex === -1) return { prev: null, next: null };

  return {
    prev: currentIndex > 0 ? allItems[currentIndex - 1] : null,
    next: currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null,
  };
}
