"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import Card from "@/components/Card"
import Button from "@/components/Button"
import { BulkDraft, BulkUseCaseId, draftStorageKey, estimateCost } from "@/lib/bulkSms"

function readDraft(useCase: BulkUseCaseId) {
  try {
    const raw = localStorage.getItem(draftStorageKey(useCase))
    if (!raw) return null
    return JSON.parse(raw) as BulkDraft
  } catch {
    return null
  }
}

export default function SuccessPage({ params }: { params: { useCase: string } }) {
  const useCase = params.useCase as BulkUseCaseId
  const sp = useSearchParams()
  const tx = sp.get("tx") || "TX-DEMO"
  const method = sp.get("method") || "paypal"

  const [draft, setDraft] = useState<BulkDraft | null>(null)
  const [sending, setSending] = useState(false)
  const [sentReport, setSentReport] = useState<{ success: boolean; sent: number; failed: number } | null>(null)

  useEffect(() => {
    setDraft(readDraft(useCase))
  }, [useCase])

  const cost = useMemo(() => (draft ? estimateCost(draft) : null), [draft])

  async function sendNow() {
    if (!draft) return
    setSending(true)
    setSentReport(null)
    try {
      const res = await fetch("/api/bulk-sms/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draft }),
      })
      const data = await res.json()
      setSentReport(data)
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-effect{background:rgba(11,18,32,.7);backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);border:1px solid rgba(255,255,255,.1)}
        .glossy-overlay{background:linear-gradient(135deg,rgba(255,255,255,.1) 0%,rgba(255,255,255,.05) 50%,transparent 100%)}
        .glow-effect{box-shadow:0 0 30px rgba(245,179,1,.2),0 0 60px rgba(245,179,1,.1),inset 0 0 30px rgba(255,255,255,.05)}
      `}} />

      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-card/50 to-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,179,1,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,138,0,0.1),transparent_50%)]" />
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="text-5xl sm:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-accent-gold via-accent-orange to-accent-gold bg-clip-text text-transparent">
                Payment Complete
              </span>
            </h1>
            <p className="text-xl text-text-muted">
              Transaction <span className="text-text-primary font-semibold">{tx}</span> • Method:{" "}
              <span className="text-text-primary font-semibold">{method}</span>
            </p>
          </motion.div>

          <div className="glass-effect rounded-3xl overflow-hidden glow-effect">
            <div className="relative p-6 sm:p-8">
              <div className="absolute inset-0 glossy-overlay pointer-events-none" />
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 space-y-4">
                  <h2 className="text-2xl font-bold">Ready to Send</h2>
                  <p className="text-text-muted">
                    Click “Send Now” to simulate delivery. Later we’ll connect a real SMS gateway (Africa’s Talking / Twilio / etc).
                  </p>

                  <Button variant="primary" className="w-full" onClick={sendNow} disabled={sending || !draft}>
                    {sending ? "Sending…" : "Send Now"}
                  </Button>

                  {sentReport && (
                    <div className={`rounded-2xl border p-4 ${sentReport.success ? "border-accent-gold/30 bg-accent-gold/10" : "border-red-500/30 bg-red-500/10"}`}>
                      <p className="font-semibold">
                        {sentReport.success ? "✅ Messages processed" : "⚠️ Some messages failed"}
                      </p>
                      <p className="text-sm text-text-muted mt-2">
                        Sent: {sentReport.sent} • Failed: {sentReport.failed}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/bulk-sms" className="w-full">
                      <Button variant="outline" className="w-full">Start Another Campaign</Button>
                    </Link>
                    <Link href={`/bulk-sms/${useCase}/compose`} className="w-full">
                      <Button variant="outline" className="w-full">Edit This Campaign</Button>
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <Card className="p-0 overflow-hidden">
                    <div className="rounded-3xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/50">
                      <div className="p-6 space-y-3">
                        <h3 className="text-xl font-bold">Receipt</h3>
                        <p className="text-sm text-text-muted">
                          <span className="text-text-primary font-semibold">Recipients:</span> {cost?.qty ?? 0}
                        </p>
                        <p className="text-sm text-text-muted">
                          <span className="text-text-primary font-semibold">Segments:</span> {cost?.segments ?? 1}
                        </p>
                        <p className="text-lg">
                          <span className="text-text-primary font-semibold">Total:</span>{" "}
                          <span className="text-accent-gold font-bold">{cost?.currency ?? "USD"} {cost?.total.toFixed(2) ?? "0.00"}</span>
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
