"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Menu, X, TerminalSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Documentation", href: "/docs" },
    { name: "Architecture", href: "/architecture" },
    { name: "Roadmap", href: "/roadmap" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)] shadow-sm py-2" // Shorter padding when scrolled
            : "bg-transparent border-b border-transparent py-4" // Taller padding at the top
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Height transitions smoothly due to the py-2/py-4 padding shift above */}
          <div className="flex justify-between items-center h-12">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-[var(--brand-primary)]/10 p-1.5 rounded-lg border border-[var(--brand-primary)]/20 group-hover:bg-[var(--brand-primary)]/20 group-hover:scale-105 transition-all duration-300">
                <TerminalSquare className="h-5 w-5 text-[var(--brand-primary)]" />
              </div>
              <span className="font-extrabold tracking-tight text-lg text-white">
                HakiAPI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <div className="flex gap-6 text-sm font-medium relative">
                {navLinks.map((link) => {
                  const isActive = pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`relative px-1 py-2 transition-colors hover:text-white ${
                        isActive ? "text-white" : "text-[var(--text-secondary)]"
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--brand-primary)] rounded-full"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 border-l border-[var(--border)] pl-6">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="text-[var(--text-secondary)] hover:text-white transition-colors hover:scale-110 duration-200">
                  <Github className="h-5 w-5" />
                </a>
                <Link href="/docs/quickstart">
                  <Button size="sm" className="shadow-[0_0_15px_rgba(var(--brand-primary-rgb),0.3)] hover:shadow-[0_0_25px_rgba(var(--brand-primary-rgb),0.5)] transition-shadow">
                    Quick Start
                  </Button>
                </Link>
              </div>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-[var(--text-secondary)] hover:text-white transition-transform active:scale-95"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay with Framer Motion */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[72px] z-40 bg-[var(--background)]/95 backdrop-blur-xl border-t border-[var(--border)] md:hidden"
          >
            <div className="flex flex-col p-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`p-4 rounded-xl font-medium text-lg transition-colors ${
                    pathname.startsWith(link.href)
                      ? "bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] border border-[var(--brand-primary)]/20"
                      : "text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-[var(--border)] flex flex-col gap-4">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-white font-medium transition-colors">
                  <Github className="h-5 w-5" /> GitHub Repository
                </a>
                <Link href="/docs/quickstart" className="w-full">
                  <Button size="lg" className="w-full">
                    Quick Start
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
