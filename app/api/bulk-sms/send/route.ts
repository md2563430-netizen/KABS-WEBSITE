import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const draft = body?.draft

  if (!draft?.recipients?.length || !draft?.message) {
    return NextResponse.json({ success: false, sent: 0, failed: 0, error: "Invalid draft." }, { status: 400 })
  }

  // Demo: pretend we sent messages
  const total = draft.recipients.length
  const failed = total > 10 ? Math.floor(total * 0.02) : 0
  const sent = total - failed

  return NextResponse.json({ success: failed === 0, sent, failed })
}
