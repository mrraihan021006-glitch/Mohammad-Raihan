import { NextRequest, NextResponse } from "next/server";
import { getContent, setContent } from "@/lib/db-content";
import { isAuthed } from "@/lib/auth";
import { CONTENT_KEYS, type ContentKey } from "@/data/defaults";

export async function GET() {
  const content = await getContent();
  return NextResponse.json({ ok: true, content });
}

export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }
  try {
    const body = await req.json();
    const key = body?.key as string;
    const value = body?.value;
    if (!key || !CONTENT_KEYS.includes(key as ContentKey)) {
      return NextResponse.json(
        { ok: false, error: "Invalid content key" },
        { status: 400 }
      );
    }
    await setContent(key as ContentKey, value);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
