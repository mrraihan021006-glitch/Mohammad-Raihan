import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { saveMessage } from "@/lib/db-content";

const schema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email().max(200),
  projectType: z.string().min(1).max(120),
  budgetRange: z.string().max(60).optional().nullable(),
  details: z.string().min(10).max(5000),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid input", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;
    try {
      await saveMessage({
        fullName: data.fullName,
        email: data.email,
        projectType: data.projectType,
        budgetRange: data.budgetRange ?? null,
        details: data.details,
      });
    } catch {
      // database write is best-effort; still acknowledge the message
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
