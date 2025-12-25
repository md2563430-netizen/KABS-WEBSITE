import { NextResponse } from "next/server"

type Body = { message?: string }

function fallbackReply(message: string) {
  const m = message.toLowerCase()

  if (m.includes("event") || m.includes("ticket")) {
    return "For Events & Tickets: visit the Events page to browse categories, then click “Get Tickets”. If you tell me the city/date, I can guide you to the best event option."
  }
  if (m.includes("radio")) {
    return "For Radio: go to the Radio page and tap “Listen Live”. You can also select a program from the schedule to see what’s on."
  }
  if (m.includes("tv") || m.includes("watch")) {
    return "For TV: head to KABS TV, pick a channel, then watch a show. If a video is LIVE you’ll see the LIVE badge."
  }
  if (m.includes("community") || m.includes("join")) {
    return "For Community: go to the Community page and select “Sign Up”. You can also explore discussions and meetups from there."
  }
  if (m.includes("bulk") || m.includes("sms")) {
    return "Bulk SMS is an add-on: choose a package, compose your message (supports {name}), upload CSV recipients, then pay and track delivery."
  }

  return "I can help with Events, TV, Radio, Community, and Bulk SMS. What are you trying to do today?"
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Body
  const message = (body.message || "").trim()

  if (!message) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 })
  }

  // If no AI key is configured, return a helpful fallback (keeps app functional).
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ reply: fallbackReply(message) })
  }

  try {
    // Simple, reliable call to OpenAI Chat Completions endpoint
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.4,
        messages: [
          {
            role: "system",
            content:
              "You are Kabs, a helpful assistant for KABS Promotions. Be concise, friendly, and practical. Prioritize guidance about Events, TV, Radio, Community, and Bulk SMS. If uncertain, ask one short clarifying question.",
          },
          { role: "user", content: message },
        ],
      }),
    })

    if (!res.ok) {
      const txt = await res.text()
      return NextResponse.json({ error: `AI request failed: ${txt}` }, { status: 500 })
    }

    const data = await res.json()
    const reply = data?.choices?.[0]?.message?.content?.trim()

    return NextResponse.json({ reply: reply || fallbackReply(message) })
  } catch (err: any) {
    return NextResponse.json({ reply: fallbackReply(message) })
  }
}
