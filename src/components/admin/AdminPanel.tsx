"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Loader2,
  Trash2,
  Plus,
  ArrowUp,
  ArrowDown,
  Check,
  Cloud,
  LogOut,
  Settings,
  Type,
  User,
  LayoutGrid,
  Folder,
  Wrench,
  Share2,
  ListChecks,
  Star,
  Mail,
  Inbox,
  AlertCircle,
} from "lucide-react";
import { useAdminStore } from "@/stores/useAdminStore";
import { useContent } from "@/components/layout/ContentProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TextField,
  TextAreaField,
  SelectField,
  ImageField,
  StringListEditor,
  ObjectListEditor,
} from "./fields";
import type { Content, ContentKey } from "@/data/defaults";
import type { Service } from "@/data/services";
import type { Project } from "@/data/projects";
import type { Tool } from "@/data/tools";
import type { SocialLink } from "@/data/socials";
import type { ProcessStep } from "@/data/process";
import type { Advantage } from "@/data/advantages";

const ACCENTS = ["orange", "electric", "grape", "lime", "blush"];
const SHAPES = ["circle", "square", "triangle", "ring", "blob", "diamond"];
const CATEGORIES = [
  "Branding",
  "Social Media",
  "YouTube Thumbnails",
  "Advertising",
  "E-commerce",
  "Product Design",
  "Print Design",
];
const SIZES = ["lg", "md", "sm"];

const TABS: {
  id: ContentKey | "messages";
  label: string;
  icon: typeof Settings;
}[] = [
  { id: "site", label: "Site", icon: Settings },
  { id: "hero", label: "Hero", icon: Type },
  { id: "about", label: "About", icon: User },
  { id: "services", label: "Services", icon: LayoutGrid },
  { id: "projects", label: "Projects", icon: Folder },
  { id: "tools", label: "Tools", icon: Wrench },
  { id: "socials", label: "Socials", icon: Share2 },
  { id: "process", label: "Process", icon: ListChecks },
  { id: "advantages", label: "Why Me", icon: Star },
  { id: "contactOptions", label: "Contact", icon: Mail },
  { id: "messages", label: "Messages", icon: Inbox },
];

type SaveStatus = "idle" | "saving" | "saved" | "error";

/** Auto-saving draft hook: persists ~700ms after the last edit. */
function useDraft<K extends ContentKey>(key: K) {
  const { content, updateKey } = useContent();
  const [draft, setDraft] = useState<Content[K]>(content[key]);
  const [status, setStatus] = useState<SaveStatus>("idle");
  const first = useRef(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    // Sync save status immediately; the actual persist is debounced below.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus("saving");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      const ok = await updateKey(key, draft);
      setStatus(ok ? "saved" : "error");
      if (ok) setTimeout(() => setStatus("idle"), 1400);
    }, 700);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [draft, key, updateKey]);

  return { draft, setDraft, status };
}

function AutoSaveStatus({ status }: { status: SaveStatus }) {
  return (
    <div className="sticky bottom-0 -mx-6 mt-6 flex items-center justify-between gap-3 border-t border-border bg-white/90 px-6 py-3 backdrop-blur">
      <span className="flex items-center gap-2 text-xs text-muted-foreground">
        <Cloud className="h-3.5 w-3.5" />
        Auto-save enabled — changes apply globally.
      </span>
      <span
        className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
          status === "saving"
            ? "bg-secondary text-muted-foreground"
            : status === "saved"
              ? "bg-lime/20 text-foreground"
              : status === "error"
                ? "bg-destructive/15 text-destructive"
                : "text-muted-foreground"
        }`}
      >
        {status === "saving" && <Loader2 className="h-3 w-3 animate-spin" />}
        {status === "saved" && <Check className="h-3 w-3" />}
        {status === "error" && <AlertCircle className="h-3 w-3" />}
        {status === "saving"
          ? "Saving..."
          : status === "saved"
            ? "Saved"
            : status === "error"
              ? "Re-login needed"
              : "All changes saved"}
      </span>
    </div>
  );
}

function SiteEditor() {
  const { draft, setDraft, status } = useDraft("site");
  const s = draft;
  const set = (patch: Partial<typeof s>) => setDraft({ ...s, ...patch });
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Name" value={s.name} onChange={(v) => set({ name: v })} />
        <TextField label="Brand (logo)" value={s.brand} onChange={(v) => set({ brand: v })} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Profession" value={s.profession} onChange={(v) => set({ profession: v })} />
        <TextField label="Experience" value={s.experience} onChange={(v) => set({ experience: v })} />
      </div>
      <TextField label="Tagline" value={s.tagline} onChange={(v) => set({ tagline: v })} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Location" value={s.location} onChange={(v) => set({ location: v })} />
        <TextField label="Availability" value={s.availability} onChange={(v) => set({ availability: v })} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Contact Email" value={s.email} onChange={(v) => set({ email: v })} />
        <TextField label="WhatsApp Number" value={s.whatsapp} onChange={(v) => set({ whatsapp: v })} />
      </div>
      <TextField label="Behance URL" value={s.behance} onChange={(v) => set({ behance: v })} />
      <ImageField label="Personal Image (About section)" value={s.personalImage} onChange={(v) => set({ personalImage: v })} />
      <AutoSaveStatus status={status} />
    </div>
  );
}

function HeroEditor() {
  const { draft, setDraft, status } = useDraft("hero");
  const h = draft;
  const set = (patch: Partial<typeof h>) => setDraft({ ...h, ...patch });
  return (
    <div className="space-y-4">
      <TextField label="Label (eyebrow)" value={h.label} onChange={(v) => set({ label: v })} />
      <StringListEditor label="Heading lines" items={h.headingLines} onChange={(v) => set({ headingLines: v })} addLabel="Add line" />
      <TextField label="Highlight word (orange pill)" value={h.highlight} onChange={(v) => set({ highlight: v })} />
      <TextAreaField label="Paragraph" value={h.paragraph} onChange={(v) => set({ paragraph: v })} rows={3} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Primary CTA" value={h.ctaPrimary} onChange={(v) => set({ ctaPrimary: v })} />
        <TextField label="Secondary CTA" value={h.ctaSecondary} onChange={(v) => set({ ctaSecondary: v })} />
      </div>
      <StringListEditor label="Info chips" items={h.chips} onChange={(v) => set({ chips: v })} addLabel="Add chip" />
      <AutoSaveStatus status={status} />
    </div>
  );
}

function AboutEditor() {
  const { draft, setDraft, status } = useDraft("about");
  const a = draft;
  const set = (patch: Partial<typeof a>) => setDraft({ ...a, ...patch });
  return (
    <div className="space-y-4">
      <TextField label="Label" value={a.label} onChange={(v) => set({ label: v })} />
      <TextField label="Heading" value={a.heading} onChange={(v) => set({ heading: v })} />
      <StringListEditor label="Paragraphs" items={a.paragraphs} onChange={(v) => set({ paragraphs: v })} addLabel="Add paragraph" />
      <StringListEditor label="Info cards" items={a.cards} onChange={(v) => set({ cards: v })} addLabel="Add card" />
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Stats
        </span>
        {a.stats.map((st, i) => (
          <div key={i} className="grid grid-cols-[1fr_80px_1fr_auto] gap-2">
            <Input
              value={st.label}
              onChange={(e) => {
                const next = [...a.stats];
                next[i] = { ...st, label: e.target.value };
                set({ stats: next });
              }}
              placeholder="Label"
            />
            <Input
              type="number"
              value={st.value}
              onChange={(e) => {
                const next = [...a.stats];
                next[i] = { ...st, value: Number(e.target.value) };
                set({ stats: next });
              }}
              placeholder="Value"
            />
            <Input
              value={st.suffix}
              onChange={(e) => {
                const next = [...a.stats];
                next[i] = { ...st, suffix: e.target.value };
                set({ stats: next });
              }}
              placeholder="Suffix"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => set({ stats: a.stats.filter((_, idx) => idx !== i) })}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => set({ stats: [...a.stats, { value: 0, suffix: "", label: "" }] })}
        >
          <Plus className="mr-1.5 h-3.5 w-3.5" /> Add stat
        </Button>
      </div>
      <AutoSaveStatus status={status} />
    </div>
  );
}

function ServicesEditor() {
  const { draft, setDraft, status } = useDraft("services");
  return (
    <div className="space-y-4">
      <ObjectListEditor<Service>
        label="Services"
        items={draft}
        onChange={setDraft}
        makeNew={() => ({
          index: String(draft.length + 1).padStart(2, "0"),
          title: "New Service",
          description: "",
          accent: "orange",
          shape: "circle",
          items: [],
        })}
        itemTitle={(it) => `${it.index} — ${it.title}`}
        render={(it, update) => (
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField label="Index" value={it.index} onChange={(v) => update({ index: v })} />
              <TextField label="Title" value={it.title} onChange={(v) => update({ title: v })} />
            </div>
            <TextAreaField label="Description" value={it.description} onChange={(v) => update({ description: v })} />
            <div className="grid gap-3 sm:grid-cols-2">
              <SelectField label="Accent" value={it.accent} onChange={(v) => update({ accent: v as Service["accent"] })} options={ACCENTS} />
              <SelectField label="Shape" value={it.shape} onChange={(v) => update({ shape: v as Service["shape"] })} options={SHAPES} />
            </div>
            <StringListEditor label="Items" items={it.items} onChange={(v) => update({ items: v })} addLabel="Add item" />
          </div>
        )}
      />
      <AutoSaveStatus status={status} />
    </div>
  );
}

function ProjectsEditor() {
  const { draft, setDraft, status } = useDraft("projects");
  return (
    <div className="space-y-4">
      <ObjectListEditor<Project>
        label="Projects"
        items={draft}
        onChange={setDraft}
        makeNew={() => ({
          id: `proj-${Date.now()}`,
          title: "New Project",
          category: "Branding",
          year: String(new Date().getFullYear()),
          description: "",
          accent: "orange",
          image: "",
          imageAlt: "",
          size: "md",
          detail: {
            overview: "",
            objective: "",
            creativeDirection: "",
            process: [],
            finalDesign: "",
            mockups: [],
          },
        })}
        itemTitle={(it) => `${it.title} (${it.category})`}
        render={(it, update) => (
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField label="Title" value={it.title} onChange={(v) => update({ title: v })} />
              <TextField label="Year" value={it.year} onChange={(v) => update({ year: v })} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <SelectField label="Category" value={it.category} onChange={(v) => update({ category: v as Project["category"] })} options={CATEGORIES} />
              <SelectField label="Accent" value={it.accent} onChange={(v) => update({ accent: v as Project["accent"] })} options={ACCENTS} />
            </div>
            <SelectField label="Card size" value={it.size} onChange={(v) => update({ size: v as Project["size"] })} options={SIZES} />
            <TextAreaField label="Short description" value={it.description} onChange={(v) => update({ description: v })} />
            <ImageField label="Project / banner image" value={it.image} onChange={(v) => update({ image: v })} />
            <TextField label="Image alt text" value={it.imageAlt} onChange={(v) => update({ imageAlt: v })} />
            <div className="rounded-lg border border-border bg-secondary/30 p-3">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Project detail (modal)
              </div>
              <div className="space-y-3">
                <TextAreaField label="Overview" value={it.detail.overview} onChange={(v) => update({ detail: { ...it.detail, overview: v } })} />
                <TextAreaField label="Objective" value={it.detail.objective} onChange={(v) => update({ detail: { ...it.detail, objective: v } })} />
                <TextAreaField label="Creative direction" value={it.detail.creativeDirection} onChange={(v) => update({ detail: { ...it.detail, creativeDirection: v } })} />
                <StringListEditor label="Process steps" items={it.detail.process} onChange={(v) => update({ detail: { ...it.detail, process: v } })} addLabel="Add step" />
                <TextAreaField label="Final design" value={it.detail.finalDesign} onChange={(v) => update({ detail: { ...it.detail, finalDesign: v } })} />
                <StringListEditor label="Mockups" items={it.detail.mockups} onChange={(v) => update({ detail: { ...it.detail, mockups: v } })} addLabel="Add mockup" />
              </div>
            </div>
          </div>
        )}
      />
      <AutoSaveStatus status={status} />
    </div>
  );
}

function ToolsEditor() {
  const { draft, setDraft, status } = useDraft("tools");
  return (
    <div className="space-y-4">
      <ObjectListEditor<Tool>
        label="Tools"
        items={draft}
        onChange={setDraft}
        makeNew={() => ({ name: "New Tool", category: "Design", accent: "orange", glyph: "T", icon: "" })}
        itemTitle={(it) => it.name}
        render={(it, update) => (
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField label="Name" value={it.name} onChange={(v) => update({ name: v })} />
              <TextField label="Category" value={it.category} onChange={(v) => update({ category: v })} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField label="Glyph (text fallback)" value={it.glyph} onChange={(v) => update({ glyph: v })} />
              <SelectField label="Accent" value={it.accent} onChange={(v) => update({ accent: v as Tool["accent"] })} options={ACCENTS} />
            </div>
            <ImageField label="Custom icon image (optional — overrides glyph)" value={it.icon ?? ""} onChange={(v) => update({ icon: v })} />
          </div>
        )}
      />
      <AutoSaveStatus status={status} />
    </div>
  );
}

function SocialsEditor() {
  const { draft, setDraft, status } = useDraft("socials");
  return (
    <div className="space-y-4">
      <ObjectListEditor<SocialLink>
        label="Social links"
        items={draft}
        onChange={setDraft}
        makeNew={() => ({ name: "New Social", handle: "", href: "", accent: "orange" })}
        itemTitle={(it) => it.name}
        render={(it, update) => (
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField label="Name" value={it.name} onChange={(v) => update({ name: v })} />
              <TextField label="Handle" value={it.handle} onChange={(v) => update({ handle: v })} />
            </div>
            <TextField label="URL (leave empty = 'coming soon')" value={it.href} onChange={(v) => update({ href: v })} />
            <SelectField label="Accent" value={it.accent} onChange={(v) => update({ accent: v as SocialLink["accent"] })} options={ACCENTS} />
          </div>
        )}
      />
      <AutoSaveStatus status={status} />
    </div>
  );
}

function ProcessEditor() {
  const { draft, setDraft, status } = useDraft("process");
  return (
    <div className="space-y-4">
      <ObjectListEditor<ProcessStep>
        label="Process steps"
        items={draft}
        onChange={setDraft}
        makeNew={() => ({ index: String(draft.length + 1).padStart(2, "0"), title: "New Step", description: "", accent: "orange" })}
        itemTitle={(it) => `${it.index} — ${it.title}`}
        render={(it, update) => (
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField label="Index" value={it.index} onChange={(v) => update({ index: v })} />
              <TextField label="Title" value={it.title} onChange={(v) => update({ title: v })} />
            </div>
            <TextAreaField label="Description" value={it.description} onChange={(v) => update({ description: v })} />
            <SelectField label="Accent" value={it.accent} onChange={(v) => update({ accent: v as ProcessStep["accent"] })} options={ACCENTS} />
          </div>
        )}
      />
      <AutoSaveStatus status={status} />
    </div>
  );
}

function AdvantagesEditor() {
  const { draft, setDraft, status } = useDraft("advantages");
  return (
    <div className="space-y-4">
      <ObjectListEditor<Advantage>
        label="Advantages (Why Work With Me)"
        items={draft}
        onChange={setDraft}
        makeNew={() => ({ title: "New Advantage", description: "", accent: "orange" })}
        itemTitle={(it) => it.title}
        render={(it, update) => (
          <div className="space-y-3">
            <TextField label="Title" value={it.title} onChange={(v) => update({ title: v })} />
            <TextAreaField label="Description" value={it.description} onChange={(v) => update({ description: v })} />
            <SelectField label="Accent" value={it.accent} onChange={(v) => update({ accent: v as Advantage["accent"] })} options={ACCENTS} />
          </div>
        )}
      />
      <AutoSaveStatus status={status} />
    </div>
  );
}

function ContactOptionsEditor() {
  const { draft, setDraft, status } = useDraft("contactOptions");
  return (
    <div className="space-y-4">
      <StringListEditor label="Project types" items={draft.projectTypes} onChange={(v) => setDraft({ ...draft, projectTypes: v })} addLabel="Add type" />
      <StringListEditor label="Budget ranges" items={draft.budgetRanges} onChange={(v) => setDraft({ ...draft, budgetRanges: v })} addLabel="Add range" />
      <AutoSaveStatus status={status} />
    </div>
  );
}

interface Message {
  id: string;
  fullName: string;
  email: string;
  projectType: string;
  budgetRange: string | null;
  details: string;
  createdAt: string;
}

function MessagesEditor() {
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/messages", { cache: "no-store" });
      const json = await res.json();
      setMessages(json.messages ?? []);
    } catch {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {
    await fetch("/api/admin/messages", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setMessages((m) => (m ?? []).filter((x) => x.id !== id));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Contact submissions ({messages?.length ?? 0})
        </span>
        <Button type="button" variant="outline" size="sm" onClick={load} disabled={loading}>
          {loading ? "Loading..." : "Refresh"}
        </Button>
      </div>
      {messages === null ? (
        <div className="text-sm text-muted-foreground">Loading...</div>
      ) : messages.length === 0 ? (
        <div className="rounded-lg border border-border bg-secondary/30 p-6 text-center text-sm text-muted-foreground">
          No messages yet.
        </div>
      ) : (
        <div className="space-y-2">
          {messages.map((m) => (
            <div key={m.id} className="rounded-lg border border-border bg-white p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-display text-sm font-semibold">{m.fullName}</div>
                  <div className="text-xs text-muted-foreground">{m.email}</div>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={() => remove(m.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                <span className="rounded-full bg-secondary px-2 py-0.5">{m.projectType}</span>
                {m.budgetRange && <span className="rounded-full bg-secondary px-2 py-0.5">{m.budgetRange}</span>}
                <span className="rounded-full bg-secondary px-2 py-0.5">
                  {new Date(m.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="mt-2 text-sm text-foreground">{m.details}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EditorFor({ tab }: { tab: ContentKey | "messages" }) {
  switch (tab) {
    case "site":
      return <SiteEditor />;
    case "hero":
      return <HeroEditor />;
    case "about":
      return <AboutEditor />;
    case "services":
      return <ServicesEditor />;
    case "projects":
      return <ProjectsEditor />;
    case "tools":
      return <ToolsEditor />;
    case "socials":
      return <SocialsEditor />;
    case "process":
      return <ProcessEditor />;
    case "advantages":
      return <AdvantagesEditor />;
    case "contactOptions":
      return <ContactOptionsEditor />;
    case "messages":
      return <MessagesEditor />;
    default:
      return null;
  }
}

export function AdminPanel() {
  const open = useAdminStore((s) => s.open);
  const close = useAdminStore((s) => s.closeAdmin);
  const logout = useAdminStore((s) => s.logout);
  const { backendStatus } = useContent();
  const [tab, setTab] = useState<ContentKey | "messages">("site");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={close} />
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="relative flex h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-secondary/30 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-foreground text-background">
                  <Settings className="h-4 w-4" />
                </span>
                <div>
                  <div className="font-display text-lg font-bold tracking-tight">
                    Admin Panel
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span
                      className={`inline-block h-1.5 w-1.5 rounded-full ${
                        backendStatus.d1 ? "bg-lime" : "bg-muted-foreground"
                      }`}
                    />
                    {backendStatus.d1 ? "Cloudflare D1" : "Local DB"} ·{" "}
                    {backendStatus.cloudinary ? "Cloudinary" : "Local uploads"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    logout();
                  }}
                >
                  <LogOut className="mr-1.5 h-3.5 w-3.5" /> Logout
                </Button>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close admin"
                  className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
              {/* Tabs */}
              <nav className="no-scrollbar flex shrink-0 gap-1 overflow-x-auto border-b border-border p-2 md:w-52 md:flex-col md:overflow-y-auto md:border-b-0 md:border-r">
                {TABS.map((t) => {
                  const Icon = t.icon;
                  const active = tab === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTab(t.id)}
                      className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all ${
                        active
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {t.label}
                    </button>
                  );
                })}
              </nav>

              {/* Editor area */}
              <div className="scroll-area-custom flex-1 overflow-y-auto px-6 py-5">
                <EditorFor tab={tab} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
