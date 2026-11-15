"use client";

import { useRef, useState, type ReactNode } from "react";
import { Upload, Trash2, Plus, ArrowUp, ArrowDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </label>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <Textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} />
    </label>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (json.ok) onChange(json.url);
    } catch {
      // ignore
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <div className="flex items-center gap-3">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-secondary">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : null}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="Image URL" />
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
                e.target.value = "";
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
            >
              <Upload className="mr-1.5 h-3.5 w-3.5" />
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** String list editor (e.g. tags, paragraphs). */
export function StringListEditor({
  label,
  items,
  onChange,
  addLabel = "Add item",
}: {
  label: string;
  items: string[];
  onChange: (v: string[]) => void;
  addLabel?: string;
}) {
  const update = (i: number, v: string) => {
    const next = [...items];
    next[i] = v;
    onChange(next);
  };
  return (
    <div>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <div className="space-y-2">
        {items.map((it, i) => (
          <div key={i} className="flex items-start gap-2">
            <Textarea
              value={it}
              onChange={(e) => update(i, e.target.value)}
              rows={2}
              className="flex-1"
            />
            <div className="flex flex-col gap-1">
              <Button type="button" variant="outline" size="sm" onClick={() => move(items, i, -1, onChange)} disabled={i === 0}>
                <ArrowUp className="h-3 w-3" />
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => move(items, i, 1, onChange)} disabled={i === items.length - 1}>
                <ArrowDown className="h-3 w-3" />
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => onChange(items.filter((_, idx) => idx !== i))}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => onChange([...items, ""])}>
        <Plus className="mr-1.5 h-3.5 w-3.5" />
        {addLabel}
      </Button>
    </div>
  );
}

/** Generic object-list editor. */
export function ObjectListEditor<T>({
  label,
  items,
  onChange,
  render,
  makeNew,
  addLabel = "Add item",
  itemTitle,
}: {
  label: string;
  items: T[];
  onChange: (v: T[]) => void;
  render: (item: T, update: (patch: Partial<T>) => void) => ReactNode;
  makeNew: () => T;
  addLabel?: string;
  itemTitle?: (item: T, i: number) => string;
}) {
  return (
    <div>
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label} ({items.length})
      </span>
      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={i} className="rounded-xl border border-border bg-secondary/40 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold">
                {itemTitle ? itemTitle(it, i) : `Item ${i + 1}`}
              </span>
              <div className="flex gap-1">
                <Button type="button" variant="outline" size="sm" onClick={() => move(items, i, -1, onChange)} disabled={i === 0}>
                  <ArrowUp className="h-3 w-3" />
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => move(items, i, 1, onChange)} disabled={i === items.length - 1}>
                  <ArrowDown className="h-3 w-3" />
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => onChange(items.filter((_, idx) => idx !== i))}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
            {render(it, (patch) => {
              const next = [...items];
              next[i] = { ...next[i], ...patch };
              onChange(next);
            })}
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => onChange([...items, makeNew()])}>
        <Plus className="mr-1.5 h-3.5 w-3.5" />
        {addLabel}
      </Button>
    </div>
  );
}

function move<T>(items: T[], i: number, dir: -1 | 1, onChange: (v: T[]) => void) {
  const j = i + dir;
  if (j < 0 || j >= items.length) return;
  const next = [...items];
  [next[i], next[j]] = [next[j], next[i]];
  onChange(next);
}
