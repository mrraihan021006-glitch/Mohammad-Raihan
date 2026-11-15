import { NextRequest, NextResponse } from "next/server";
import { getMessages, deleteMessage } from "@/lib/db-content";
import { isAuthed } from "@/lib/auth";

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }
  const messages = await getMessages();
  return NextResponse.json({ ok: true, messages });
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { ok: false, error: "Missing id" },
        { status: 400 }
      );
    }
    await deleteMessage(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
