"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { nav, accents } from "@/data/site";
import { useContent } from "@/components/layout/ContentProvider";

export function Footer() {
  const { content } = useContent();
  const site = content.site;
  const socials = content.socials;
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 mt-auto border-t border-border bg-background">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-14 sm:px-8">
        {/* Big brand wordmark */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-border pb-10 lg:flex-row lg:items-end">
          <div>
            <div className="font-display text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
              {site.brand}
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Designed with creativity and purpose.
            </p>
          </div>
          <button
            type="button"
            onClick={scrollTop}
            className="group inline-flex items-center gap-3 rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold transition-colors hover:border-foreground"
          >
            Back to Top
            <span className="grid h-8 w-8 place-items-center rounded-full bg-foreground text-background transition-transform group-hover:-translate-y-0.5">
              <ArrowUp className="h-4 w-4" />
            </span>
          </button>
        </div>

        {/* Columns */}
        <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Navigation
            </h4>
            <ul className="mt-4 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground transition-colors hover:text-orange"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Social
            </h4>
            <ul className="mt-4 space-y-2">
              {socials.slice(0, 4).map((s) => {
                const color = accents[s.accent];
                return (
                  <li key={s.name}>
                    {s.href ? (
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-orange"
                      >
                        <span
                          className="inline-block h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        {s.name}
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <span
                          className="inline-block h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        {s.name}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Contact
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-foreground">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-orange"
                >
                  {site.email}
                </a>
              </li>
              <li className="text-muted-foreground">{site.location}</li>
              <li>
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-lime animate-soft-pulse" />
                  {site.availability}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Portfolio
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={site.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground transition-colors hover:text-orange"
                >
                  Behance
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 {site.name}. All Rights Reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Crafted with care — Turning ideas into visual experiences.
          </p>
        </div>
      </div>
    </footer>
  );
}
