import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const { method, amount, currency } = body || {}

  if (!method || !amount || !currency) {
    return NextResponse.json({ error: "Missing payment details." }, { status: 400 })
  }

  // Demo: simulate payment success
  const txId = `TX-${Math.random().toString(36).slice(2, 10).toUpperCase()}`
  return NextResponse.json({ ok: true, txId })
}
