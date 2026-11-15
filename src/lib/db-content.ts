/**
 * Content data access layer.
 * Reads/writes site content + contact messages.
 * Uses Cloudflare D1 (REST) when configured, else local Prisma (SQLite).
 * Includes a short in-memory cache to avoid repeated DB hits on every render.
 */
import { db } from "./db";
import { d1Configured, d1Query, ensureD1Schema } from "./d1";
import {
  defaultContent,
  CONTENT_KEYS,
  type Content,
  type ContentKey,
} from "@/data/defaults";

const CACHE_TTL = 5000; // 5s
let cache: { at: number; content: Content } | null = null;
let schemaEnsured = false;

async function ensureSchema() {
  if (schemaEnsured) return;
  if (d1Configured) {
    try {
      await ensureD1Schema();
    } catch {
      // ignore — will fall back to Prisma reads below
    }
  }
  schemaEnsured = true;
}

/** Read a single setting value (JSON string) by key. */
async function readSetting(key: string): Promise<string | null> {
  if (d1Configured) {
    try {
      const rows = await d1Query(
        "SELECT value FROM site_settings WHERE key = ?;",
        [key]
      );
      const row = rows[0] as { value?: string } | undefined;
      return row?.value ?? null;
    } catch {
      // fall back to Prisma
    }
  }
  try {
    const row = await db.siteSetting.findUnique({ where: { key } });
    return row?.value ?? null;
  } catch {
    return null;
  }
}

/** Write a single setting value (JSON string) by key. */
async function writeSetting(key: string, value: string): Promise<void> {
  if (d1Configured) {
    try {
      await d1Query(
        "INSERT INTO site_settings (key, value, updatedAt) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updatedAt = excluded.updatedAt;",
        [key, value, new Date().toISOString()]
      );
      cache = null;
      return;
    } catch {
      // fall back to Prisma
    }
  }
  await db.siteSetting.upsert({
    where: { key },
    create: { key, value },
    update: { value },
  });
  cache = null;
}

/** Load the full content, merging DB overrides over defaults. */
export async function getContent(): Promise<Content> {
  if (cache && Date.now() - cache.at < CACHE_TTL) {
    return cache.content;
  }
  await ensureSchema();

  const merged: Content = {
    site: defaultContent.site,
    hero: defaultContent.hero,
    about: defaultContent.about,
    services: defaultContent.services,
    projects: defaultContent.projects,
    tools: defaultContent.tools,
    socials: defaultContent.socials,
    process: defaultContent.process,
    advantages: defaultContent.advantages,
    contactOptions: defaultContent.contactOptions,
  };

  for (const key of CONTENT_KEYS) {
    const raw = await readSetting(key);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        (merged as Record<string, unknown>)[key] = parsed;
      } catch {
        // ignore malformed
      }
    }
  }

  cache = { at: Date.now(), content: merged };
  return merged;
}

/** Persist one content section. */
export async function setContent(key: ContentKey, value: unknown): Promise<void> {
  await ensureSchema();
  await writeSetting(key, JSON.stringify(value));
}

/** Save a contact message (used by /api/contact). */
export async function saveMessage(data: {
  fullName: string;
  email: string;
  projectType: string;
  budgetRange?: string | null;
  details: string;
}): Promise<void> {
  if (d1Configured) {
    try {
      const id = crypto.randomUUID();
      const createdAt = new Date().toISOString();
      await d1Query(
        "INSERT INTO contact_messages (id, fullName, email, projectType, budgetRange, details, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?);",
        [
          id,
          data.fullName,
          data.email,
          data.projectType,
          data.budgetRange ?? null,
          data.details,
          createdAt,
        ]
      );
      return;
    } catch {
      // fall back to Prisma
    }
  }
  await db.contactMessage.create({ data });
}

export interface StoredMessage {
  id: string;
  fullName: string;
  email: string;
  projectType: string;
  budgetRange: string | null;
  details: string;
  createdAt: string;
}

/** List all contact messages (newest first). */
export async function getMessages(): Promise<StoredMessage[]> {
  if (d1Configured) {
    try {
      const rows = await d1Query(
        "SELECT id, fullName, email, projectType, budgetRange, details, createdAt FROM contact_messages ORDER BY createdAt DESC LIMIT 200;"
      );
      return rows as StoredMessage[];
    } catch {
      // fall back to Prisma
    }
  }
  const rows = await db.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });
  return rows.map((r) => ({
    id: r.id,
    fullName: r.fullName,
    email: r.email,
    projectType: r.projectType,
    budgetRange: r.budgetRange,
    details: r.details,
    createdAt: r.createdAt.toISOString(),
  }));
}

/** Delete a contact message by id. */
export async function deleteMessage(id: string): Promise<void> {
  if (d1Configured) {
    try {
      await d1Query("DELETE FROM contact_messages WHERE id = ?;", [id]);
      return;
    } catch {
      // fall back to Prisma
    }
  }
  await db.contactMessage.delete({ where: { id } });
}
