"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, X, ExternalLink } from "lucide-react";
import { Reveal, SplitText } from "@/components/layout/Reveal";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { type Project, type ProjectCategory } from "@/data/projects";
import { accents } from "@/data/site";
import { useContent } from "@/components/layout/ContentProvider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function aspectFor(size: Project["size"]) {
  switch (size) {
    case "lg":
      return "aspect-[5/6]";
    case "md":
      return "aspect-[4/3]";
    case "sm":
      return "aspect-square";
  }
}

function ProjectThumb({ project, featured }: { project: Project; featured?: boolean }) {
  const [err, setErr] = useState(false);
  const color = accents[project.accent];
  return (
    <div
      className={`relative w-full overflow-hidden ${
        featured ? "aspect-[16/10] sm:col-span-2" : aspectFor(project.size)
      }`}
    >
      {/* gradient fallback */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${color}22, ${color}55), #f4f4f1`,
        }}
      />
      {!err && (
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          onError={() => setErr(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
      )}
      {/* category pill */}
      <div className="absolute left-4 top-4 z-10">
        <span
          className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur"
          style={{ backgroundColor: `${color}cc` }}
        >
          {project.category}
        </span>
      </div>
      {/* year */}
      <div className="absolute right-4 top-4 z-10 rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold text-foreground backdrop-blur">
        {project.year}
      </div>
      {/* hover scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
}

function ProjectCard({
  project,
  onOpen,
  featured,
}: {
  project: Project;
  onOpen: () => void;
  featured?: boolean;
}) {
  const color = accents[project.accent];
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      onClick={onOpen}
      className="group flex w-full flex-col rounded-3xl border border-border bg-white p-2.5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.2)]"
    >
      <div className="relative">
        <ProjectThumb project={project} featured={featured} />
        <div
          className="absolute right-7 top-7 z-20 grid h-10 w-10 place-items-center rounded-full text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          style={{ backgroundColor: color, transform: "translateY(8px)" }}
        >
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
      <div className="flex flex-1 flex-col px-4 py-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-bold leading-tight tracking-tight sm:text-xl">
            {project.title}
          </h3>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
      </div>
    </motion.button>
  );
}

function ProjectModal({
  project,
  onClose,
  onNext,
}: {
  project: Project;
  onClose: () => void;
  onNext: () => void;
}) {
  const color = accents[project.accent];
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="scroll-area-custom max-h-[88vh] max-w-3xl overflow-y-auto rounded-3xl border-border p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>{project.title}</DialogTitle>
        </DialogHeader>
        {/* hero image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-3xl">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${color}33, ${color}66), #f4f4f1`,
            }}
          />
          <img
            src={project.image}
            alt={project.imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-foreground backdrop-blur"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span
              className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white"
              style={{ backgroundColor: color }}
            >
              {project.category}
            </span>
            <span className="rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold backdrop-blur">
              {project.year}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {project.title}
          </h2>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Project Overview
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-foreground">
                {project.detail.overview}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Project Objective
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-foreground">
                {project.detail.objective}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Creative Direction
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-foreground">
              {project.detail.creativeDirection}
            </p>
          </div>

          <div className="mt-8">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Design Process
            </h4>
            <ol className="mt-4 space-y-3">
              {project.detail.process.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span
                    className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: color }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-foreground">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Final Design
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-foreground">
              {project.detail.finalDesign}
            </p>
          </div>

          <div className="mt-8">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Additional Mockups
            </h4>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {project.detail.mockups.map((m) => (
                <div
                  key={m}
                  className="flex aspect-[4/3] flex-col items-center justify-center rounded-2xl border border-border p-4 text-center"
                  style={{ background: `${color}0d` }}
                >
                  <span className="text-xs font-medium text-muted-foreground">
                    {m}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Next project */}
          <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
            <a
              href={behance}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground"
            >
              View on Behance <ExternalLink className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={onNext}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:translate-x-0.5"
            >
              Next Project <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function Portfolio() {
  const { content } = useContent();
  const projects = content.projects;
  const behance = content.site.behance;
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const filters = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))] as const,
    [projects]
  );

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter, projects]);

  const openProject = projects.find((p) => p.id === openId) || null;

  const nextProject = () => {
    if (!openProject) return;
    const idx = projects.findIndex((p) => p.id === openProject.id);
    const next = projects[(idx + 1) % projects.length];
    setOpenId(next.id);
  };

  return (
    <section id="work" className="relative px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <SectionLabel index="03" accent="blush">
                Selected Projects
              </SectionLabel>
            </Reveal>
            <div className="mt-6 max-w-2xl">
              <SplitText
                as="h2"
                text="Some Things I've Created."
                className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-[3.6rem]"
              />
            </div>
          </div>
          <Reveal delay={0.1}>
            <a
              href={behance}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-foreground"
            >
              View All on Behance
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>

        {/* Filters */}
        <Reveal delay={0.05}>
          <div className="mt-10 flex flex-wrap gap-2">
            {filters.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    active
                      ? "bg-foreground text-background"
                      : "border border-border bg-white text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {f === "All" ? "All Projects" : f}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Grid */}
        <motion.div layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                featured={i === 0 && filter === "All"}
                onOpen={() => setOpenId(p.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {openProject && (
        <ProjectModal
          project={openProject}
          onClose={() => setOpenId(null)}
          onNext={nextProject}
        />
      )}
    </section>
  );
}
