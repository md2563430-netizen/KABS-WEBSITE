'use client'

import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Card from '@/components/Card'
import Button from '@/components/Button'

type Reason =
  | 'No longer needed'
  | 'Privacy concerns'
  | 'Too many messages'
  | 'Found an alternative'
  | 'Trouble using the app'
  | 'Other'

export default function DeleteAccountPage() {
  const prefersReducedMotion = useReducedMotion()

  const fadeInUp = useMemo(
    () => ({
      initial: { opacity: 0, y: 26 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: prefersReducedMotion ? 0 : 0.6 },
    }),
    [prefersReducedMotion]
  )

  const [email, setEmail] = useState('')
  const [confirmText, setConfirmText] = useState('')
  const [reason, setReason] = useState<Reason>('No longer needed')
  const [details, setDetails] = useState('')
  const [ack, setAck] = useState(false)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle')

  const canSubmit =
    email.trim().length > 3 &&
    confirmText.trim().toLowerCase() === 'delete my account' &&
    ack &&
    status !== 'submitting'

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    // This page is "client-ready" but intentionally does NOT delete anything yet.
    // Later you can wire it to:
    // - a Next.js route handler: /app/api/delete-account/route.ts
    // - or Supabase/your backend
    setStatus('submitting')

    // Simulate a request so the UI feels real
    await new Promise((r) => setTimeout(r, 900))

    setStatus('submitted')
  }

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .glass-effect {
            background: rgba(11, 18, 32, 0.7);
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          .glossy-overlay {
            background: linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.10) 0%,
              rgba(255, 255, 255, 0.05) 50%,
              transparent 100%
            );
          }
          .glow-effect {
            box-shadow: 0 0 30px rgba(245, 179, 1, 0.18),
                        0 0 60px rgba(245, 179, 1, 0.10),
                        inset 0 0 30px rgba(255, 255, 255, 0.04);
          }
        `,
        }}
      />

      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
        {/* Background */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-card/50 to-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(245,179,1,0.10),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_85%,rgba(255,138,0,0.10),transparent_55%)]" />
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div initial="initial" animate="animate" variants={fadeInUp} className="text-center mb-10">
            <h1 className="text-5xl sm:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-accent-gold via-accent-orange to-accent-gold bg-clip-text text-transparent">
                Delete Account
              </span>
            </h1>
            <p className="text-xl text-text-muted max-w-3xl mx-auto">
              Request deletion of your KABS Promotions account and associated data.
            </p>
          </motion.div>

          <motion.div initial="initial" animate="animate" variants={fadeInUp}>
            <Card className="p-0 overflow-hidden">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/50 shadow-2xl">
                <div className="absolute inset-0 glossy-overlay pointer-events-none" />
                <div className="relative p-7 sm:p-10 space-y-8">
                  {/* Notice */}
                  <div className="glass-effect glow-effect rounded-2xl p-5">
                    <h2 className="text-xl sm:text-2xl font-bold text-accent-gold">Important</h2>
                    <ul className="mt-3 space-y-2 text-text-muted text-sm list-disc pl-5">
                      <li>
                        This page submits a <span className="text-text-primary font-medium">deletion request</span>. Actual
                        deletion can be wired to your backend later.
                      </li>
                      <li>
                        Deleting your account may remove access to paid services, bulk SMS history, community content, and
                        saved preferences.
                      </li>
                      <li>
                        Some information may be retained where required for legal, security, or fraud-prevention purposes.
                      </li>
                    </ul>
                  </div>

                  {/* Form / Success */}
                  {status === 'submitted' ? (
                    <div className="text-center space-y-5">
                      <div className="mx-auto w-14 h-14 rounded-2xl bg-accent-gold/15 border border-accent-gold/30 flex items-center justify-center">
                        <span className="text-2xl">✅</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold">Request Received</h3>
                      <p className="text-text-muted max-w-2xl mx-auto">
                        Your deletion request has been submitted. If this were connected to your backend, we would email you
                        next steps and confirm once deletion is complete.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                        <Button variant="primary" href="/contact">
                          Contact Support
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setStatus('idle')
                            setConfirmText('')
                            setAck(false)
                          }}
                        >
                          Submit another request
                        </Button>
                      </div>

                      <div className="text-xs text-text-muted">
                        Tip: When you’re ready, connect this form to <code className="px-1">/api/delete-account</code>.
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={onSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Field label="Account Email" hint="Enter the email used on your account.">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all"
                            required
                          />
                        </Field>

                        <Field label="Reason (optional)" hint="This helps us improve.">
                          <select
                            value={reason}
                            onChange={(e) => setReason(e.target.value as Reason)}
                            className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all"
                          >
                            <option value="No longer needed">No longer needed</option>
                            <option value="Privacy concerns">Privacy concerns</option>
                            <option value="Too many messages">Too many messages</option>
                            <option value="Found an alternative">Found an alternative</option>
                            <option value="Trouble using the app">Trouble using the app</option>
                            <option value="Other">Other</option>
                          </select>
                        </Field>
                      </div>

                      <Field label="More details (optional)" hint="Tell us anything we should know (optional).">
                        <textarea
                          value={details}
                          onChange={(e) => setDetails(e.target.value)}
                          placeholder="Optional details..."
                          rows={5}
                          className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all resize-none"
                        />
                      </Field>

                      <div className="glass-effect rounded-2xl p-5 space-y-4">
                        <div>
                          <div className="text-sm text-text-muted mb-2">
                            To confirm, type: <span className="text-text-primary font-semibold">DELETE MY ACCOUNT</span>
                          </div>
                          <input
                            value={confirmText}
                            onChange={(e) => setConfirmText(e.target.value)}
                            placeholder="DELETE MY ACCOUNT"
                            className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all"
                          />
                        </div>

                        <label className="flex items-start gap-3 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={ack}
                            onChange={(e) => setAck(e.target.checked)}
                            className="mt-1 h-4 w-4 rounded border-border/60 bg-background/60"
                          />
                          <span className="text-sm text-text-muted leading-relaxed">
                            I understand this action is permanent and may remove access to my account, purchases, and saved
                            data.
                          </span>
                        </label>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          type="submit"
                          variant="primary"
                          className="w-full"
                          // If your Button component doesn't support disabled, we visually disable instead.
                        >
                          {status === 'submitting' ? 'Submitting…' : 'Submit Deletion Request'}
                        </Button>
                        <Button variant="outline" href="/" className="w-full">
                          Cancel
                        </Button>
                      </div>

                      {/* Visual disabled hint (works even if Button lacks disabled prop) */}
                      {!canSubmit && (
                        <div className="text-xs text-text-muted">
                          To submit: enter your email, type <span className="text-text-primary font-semibold">DELETE MY ACCOUNT</span>, and tick the checkbox.
                        </div>
                      )}

                      {/* Overlay to prevent click if not valid (since your Button type may not support disabled) */}
                      {!canSubmit && (
                        <div className="relative">
                          <div className="absolute inset-0 -mt-[72px] h-[56px] rounded-xl bg-transparent cursor-not-allowed" />
                        </div>
                      )}
                    </form>
                  )}

                  <div className="text-center text-xs text-text-muted">
                    Need help? Visit <span className="text-text-primary font-medium">/contact</span> or email{' '}
                    <span className="text-text-primary font-medium">support@kabspromotions.com</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  )
}

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-end justify-between gap-3">
        <label className="text-sm font-semibold text-text-primary">{label}</label>
        {hint ? <span className="text-xs text-text-muted">{hint}</span> : null}
      </div>
      {children}
    </div>
  )
}
