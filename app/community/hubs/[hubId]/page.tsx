'use client'
export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Card from '@/components/Card'
import Button from '@/components/Button'

type Hub = {
  id: string
  name?: string | null
  description?: string | null
  city?: string | null
}

export default function HubsPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hubs, setHubs] = useState<Hub[]>([])

  useEffect(() => {
    const run = async () => {
      setError(null)

      // ✅ Supabase not configured
      if (!supabase) {
        router.replace('/login')
        return
      }

      // ✅ Auth check
      const { data: auth, error: authErr } = await supabase.auth.getUser()
      if (authErr) {
        setError(authErr.message)
        router.replace('/login')
        return
      }

      if (!auth?.user) {
        router.replace('/login')
        return
      }

      // ✅ Load hubs (edit table/fields if your DB differs)
      const { data, error } = await supabase
        .from('hubs')
        .select('id,name,description,city')
        .order('name', { ascending: true })

      if (error) setError(error.message)
      setHubs((data as Hub[]) || [])
      setLoading(false)
    }

    run()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <div className="text-text-muted">Loading hubs…</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              <span className="bg-gradient-to-r from-accent-gold to-accent-orange bg-clip-text text-transparent">
                Community Hubs
              </span>
            </h1>
            <p className="text-text-muted mt-1">Choose a hub to join discussions and meet people.</p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={async () => {
                if (!supabase) return router.push('/login')
                await supabase.auth.signOut()
                router.push('/login')
              }}
            >
              Sign out
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </div>
        )}

        {hubs.length === 0 ? (
          <Card glow className="p-8">
            <div className="text-text-muted">
              No hubs found yet. Add rows to your <span className="font-mono text-text-primary">hubs</span> table in Supabase.
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hubs.map((hub) => (
              <Link key={hub.id} href={`/community/hubs/${hub.id}`} className="block">
                <Card glow className="p-6 hover:scale-[1.01] transition-transform">
                  <div className="text-xl font-bold">{hub.name || 'Unnamed Hub'}</div>
                  {hub.city && <div className="text-sm text-text-muted mt-1">{hub.city}</div>}
                  {hub.description && <p className="text-sm text-text-muted mt-3 line-clamp-3">{hub.description}</p>}
                  <div className="text-accent-gold text-sm font-semibold mt-4">Enter Hub →</div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
