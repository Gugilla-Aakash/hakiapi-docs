import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://hakiapi-docs.hakiapi.workers.dev/"
  ),
  applicationName: "HakiAPI", // Forces the application name for search engines
  title: {
    template: "%s | HakiAPI",
    default: "HakiAPI — High Reliability Python API Client Engine",
  },
  description:
    "Build production-grade Python API SDKs. Stop rewriting authentication, exponential retries, pagination, and error handling.",

  // Simplified to only use the 512x512 icon you confirmed you have, preventing 404s
  icons: {
    icon: [
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/icon-512x512.png",
    apple: [{ url: "/icon-512x512.png", sizes: "180x180", type: "image/png" }],
  },

  openGraph: {
    title: "HakiAPI — Production-Grade Python SDKs",
    description:
      "The resilient engine for your API integrations. Built-in OAuth2, circuit breakers, and retries.",
    url: "https://hakiapi-docs.hakiapi.workers.dev/",
    siteName: "HakiAPI", // Keep this strictly to your brand name
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HakiAPI - Production-Grade Python SDKs",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "HakiAPI — High Reliability API Client Engine",
    description: "Stop rewriting API boilerplate. Use HakiAPI.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This JSON-LD snippet explicitly tells Google your site's real name
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "HakiAPI",
    "alternateName": "HakiAPI Documentation",
    "url": "https://hakiapi-docs.hakiapi.workers.dev/"
  };

  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
