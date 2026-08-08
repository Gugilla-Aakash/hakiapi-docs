import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://hakiapi.dev"
  ),
  title: {
    template: "%s | HakiAPI",
    default: "HakiAPI — High Reliability Python API Client Engine",
  },
  description:
    "Build production-grade Python API SDKs. Stop rewriting authentication, exponential retries, pagination, and error handling.",

  icons: {
    icon: [
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/icon-32x32.png",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },

  openGraph: {
    title: "HakiAPI — Production-Grade Python SDKs",
    description:
      "The resilient engine for your API integrations. Built-in OAuth2, circuit breakers, and retries.",
    url: "https://yourusername.github.io/HakiAPI",
    siteName: "HakiAPI Documentation",
    images: [
      {
        url: "/og-image.png", // We will assume you add a cool image here later
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "HakiAPI — High Reliability API Client Engine",
    description: "Stop rewriting API boilerplate. Use HakiAPI.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
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
