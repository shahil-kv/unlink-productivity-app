import { NextRequest, NextResponse } from "next/server";

// Only the exact subjects the Android app sends are allowed — prevents abuse
const ALLOWED_SUBJECTS = new Set([
  "MOM TEST: UNLOCK VERIFICATION CODE",
  "MOM TEST: UNLINK VERIFICATION CODE",
  "MOM TEST: SETUP VERIFICATION CODE",
]);

export async function POST(req: NextRequest) {
  let body: { to?: string; subject?: string; html?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { to, subject, html } = body;

  if (!to || !subject || !html) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!ALLOWED_SUBJECTS.has(subject)) {
    return NextResponse.json({ error: "Forbidden subject" }, { status: 403 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: "Unlink <auth@getunlink.com>",
      to: [to],
      subject,
      html,
    }),
  });

  if (!resendRes.ok) {
    const err = await resendRes.json().catch(() => ({})) as { message?: string };
    return NextResponse.json({ error: err.message ?? "Email send failed" }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
