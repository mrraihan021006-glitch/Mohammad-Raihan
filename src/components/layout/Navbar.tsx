"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav } from "@/data/site";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { useActiveSection } from "@/hooks/use-active-section";
import { useContent } from "@/components/layout/ContentProvider";
import { useAdminStore } from "@/stores/useAdminStore";

export function Navbar() {
  const progress = useScrollProgress();
  const active = useActiveSection();
  const { content } = useContent();
  const brand = content.site.brand;
  const trigger = useAdminStore((s) => s.trigger);
  const checkAuth = useAdminStore((s) => s.checkAuth);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // map sections to nav highlights
  const navMap: Record<string, string> = {
    home: "Home",
    about: "About",
    work: "Work",
    services: "Services",
    contact: "Contact",
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/70 backdrop-blur-xl border-b border-border/60"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8">
          {/* Logo — double-click to open admin (login first if not authed) */}
          <Link
            href="#home"
            onDoubleClick={(e) => {
              e.preventDefault();
              trigger();
            }}
            title="Double-click to open admin"
            className="font-display text-xl font-bold tracking-tight text-foreground select-none"
          >
            {brand}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const isActive = navMap[active] === item.label;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-secondary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="#contact"
              className="hidden md:inline-flex items-center rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-[1.03] active:scale-95"
            >
              Let&apos;s Talk
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white/60 backdrop-blur md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* scroll progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border/50">
          <div
            className="h-full bg-gradient-to-r from-orange via-grape to-electric transition-[width] duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-white p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xl font-bold">
                  {brand}
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="mt-10 flex flex-col gap-1">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-4 text-2xl font-display font-semibold tracking-tight text-foreground hover:bg-secondary"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <Link
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-auto inline-flex items-center justify-center rounded-full bg-foreground px-5 py-4 text-base font-semibold text-background"
              >
                Let&apos;s Talk
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
