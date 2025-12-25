'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Card from '@/components/Card'
import Button from '@/components/Button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const supabaseReady = !!supabase

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!supabase) {
      setError('Supabase is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)

    if (error) return setError(error.message)
    router.push('/community/hubs')
  }

  return (
    <div className="min-h-screen py-12 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <Card glow className="p-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-accent-gold to-accent-orange bg-clip-text text-transparent">
              Login
            </span>
          </h1>
          <p className="text-text-muted mb-6">Access community hubs and chat in real time.</p>

          {!supabaseReady && (
            <div className="rounded-xl border border-border bg-card/60 p-4 text-sm text-text-muted mb-4">
              <div className="font-semibold text-accent-gold mb-1">Setup required</div>
              <div>
                Add Supabase env vars in <span className="font-mono">.env.local</span>:
                <div className="mt-2 font-mono text-xs">
                  NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
                  <br />
                  NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
                </div>
              </div>
            </div>
          )}

          {error && <div className="text-red-300 text-sm mb-4">{error}</div>}

          <form onSubmit={signIn} className="space-y-4">
            <input
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-text-primary"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              disabled={!supabaseReady || loading}
            />
            <input
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-text-primary"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              disabled={!supabaseReady || loading}
            />

            <Button variant="primary" className="w-full" disabled={!supabaseReady || loading}>
              {loading ? 'Signing in…' : 'Login'}
            </Button>
          </form>

          <div className="text-sm text-text-muted mt-6 text-center">
            Don’t have an account?{' '}
            <Link href="/signup" className="text-accent-gold hover:underline">
              Sign up
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
