import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkCredentials, authCookie } from "@/lib/auth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid input" },
        { status: 400 }
      );
    }
    const ok = checkCredentials(parsed.data.email, parsed.data.password);
    if (!ok) {
      return NextResponse.json(
        { ok: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }
    const res = NextResponse.json({ ok: true });
    res.headers.set("Set-Cookie", authCookie());
    return res;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
