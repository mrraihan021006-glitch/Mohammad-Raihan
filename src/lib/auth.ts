/**
 * Admin authentication.
 * Login credentials come from ADMIN_EMAIL / ADMIN_PASSWORD env vars.
 * A stateless HMAC-signed httpOnly cookie authorizes admin API requests.
 */
import { createHmac, timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL?.trim() ?? "";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD?.trim() ?? "";
const COOKIE_NAME = "raihan_admin";

function sign(email: string): string {
  return createHmac("sha256", ADMIN_PASSWORD || "dev-secret")
    .update(email)
    .digest("base64url");
}

export function checkCredentials(email: string, password: string): boolean {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) return false;
  return (
    email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
    password === ADMIN_PASSWORD
  );
}

export function authCookie(): string {
  return `${COOKIE_NAME}=${sign(ADMIN_EMAIL)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`;
}

export function clearAuthCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export function isAuthed(req: NextRequest): boolean {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) return false;
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const expected = sign(ADMIN_EMAIL);
  if (token.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}
