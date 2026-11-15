/**
 * Cloudflare D1 REST API client.
 * Executes SQL against the D1 database when CLOUDFLARE_ACCOUNT_ID
 * and CLOUDFLARE_API_TOKEN are configured. Otherwise callers fall
 * back to the local Prisma database.
 */

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN?.trim();
const DATABASE_ID = process.env.CLOUDFLARE_D1_DATABASE_ID?.trim();

export const d1Configured = Boolean(ACCOUNT_ID && API_TOKEN && DATABASE_ID);

const ENDPOINT = () =>
  `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DATABASE_ID}/query`;

export interface D1Result {
  results?: Record<string, unknown>[];
  success: boolean;
  meta?: Record<string, unknown>;
}

export async function d1Query(
  sql: string,
  params: (string | number | boolean | null)[] = []
): Promise<Record<string, unknown>[]> {
  if (!d1Configured) {
    throw new Error("D1 not configured");
  }
  const res = await fetch(ENDPOINT(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sql, params }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`D1 request failed (${res.status}): ${text}`);
  }
  const json = (await res.json()) as {
    result?: D1Result[];
    success: boolean;
    errors?: unknown;
  };
  const result = json.result?.[0];
  if (!json.success || !result) {
    throw new Error(`D1 error: ${JSON.stringify(json.errors)}`);
  }
  return result.results ?? [];
}

/** Ensure the settings + messages tables exist (idempotent). */
export async function ensureD1Schema() {
  if (!d1Configured) return;
  await d1Query(
    `CREATE TABLE IF NOT EXISTS site_settings (key TEXT PRIMARY KEY, value TEXT, updatedAt TEXT);`
  );
  await d1Query(
    `CREATE TABLE IF NOT EXISTS contact_messages (id TEXT PRIMARY KEY, fullName TEXT, email TEXT, projectType TEXT, budgetRange TEXT, details TEXT, createdAt TEXT);`
  );
}
