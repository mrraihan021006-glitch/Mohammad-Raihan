"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Content, ContentKey } from "@/data/defaults";

interface ContentContextValue {
  content: Content;
  /** Update one section: optimistic state update + persist to API. */
  updateKey: (key: ContentKey, value: unknown) => Promise<boolean>;
  /** Reload content from the server. */
  reload: () => Promise<void>;
  saving: boolean;
  backendStatus: { d1: boolean; cloudinary: boolean };
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({
  initial,
  backendStatus,
  children,
}: {
  initial: Content;
  backendStatus: { d1: boolean; cloudinary: boolean };
  children: ReactNode;
}) {
  const [content, setContent] = useState<Content>(initial);
  const [saving, setSaving] = useState(false);

  const updateKey = useCallback(
    async (key: ContentKey, value: unknown) => {
      setSaving(true);
      // optimistic
      setContent((prev) => ({ ...prev, [key]: value } as Content));
      try {
        const res = await fetch("/api/admin/content", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key, value }),
        });
        setSaving(false);
        return res.ok;
      } catch {
        setSaving(false);
        return false;
      }
    },
    []
  );

  const reload = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/content", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.content) setContent(json.content as Content);
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <ContentContext.Provider value={{ content, updateKey, reload, saving, backendStatus }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error("useContent must be used within ContentProvider");
  }
  return ctx;
}
