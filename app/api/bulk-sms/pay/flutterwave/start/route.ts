import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  const { amount, currency, email, name, useCase } = body

  const tx_ref = `flw_${Date.now()}`

  const res = await fetch("https://api.flutterwave.com/v3/payments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tx_ref,
      amount,
      currency: currency || "UGX",
      redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/bulk-sms/${useCase}/success?provider=flutterwave`,
      customer: {
        email,
        name,
      },
      customizations: {
        title: "KABS Promotions – Bulk SMS",
        description: "Bulk SMS Campaign Payment",
      },
    }),
  })

  const data = await res.json()

  if (data.status !== "success") {
    return NextResponse.json({ ok: false, error: "Flutterwave init failed" }, { status: 400 })
  }

  return NextResponse.json({
    ok: true,
    redirectUrl: data.data.link,
  })
}
