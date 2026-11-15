import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/lib/cloudinary";
import { isAuthed } from "@/lib/auth";

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { ok: false, error: "No file provided" },
        { status: 400 }
      );
    }
    // 8MB limit
    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json(
        { ok: false, error: "File too large (max 8MB)" },
        { status: 413 }
      );
    }
    const result = await uploadImage(file);
    return NextResponse.json({ ok: true, ...result });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Upload failed" },
      { status: 500 }
    );
  }
}
