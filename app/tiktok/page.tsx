"use client"

import { useMemo } from "react"
import { motion, useReducedMotion } from "framer-motion"
import Card from "@/components/Card"
import Button from "@/components/Button"

type Highlight = {
  id: number
  title: string
  description: string
  views: string
  tag?: string
}

export default function TikTok() {
  const prefersReducedMotion = useReducedMotion()

  const highlights: Highlight[] = useMemo(
    () => [
      {
        id: 1,
        title: "Trending Challenges",
        description: "Join viral challenges and showcase your creativity with the community.",
        views: "2.5M",
        tag: "Trending",
      },
      {
        id: 2,
        title: "Behind the Scenes",
        description: "Get exclusive behind-the-scenes content from events and productions.",
        views: "1.8M",
        tag: "Exclusive",
      },
      {
        id: 3,
        title: "Community Spotlights",
        description: "Featured content from community members making waves.",
        views: "3.2M",
        tag: "Spotlight",
      },
    ],
    []
  )

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  return (
    <>
      {/* Match TV page styling helpers */}
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
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.05) 50%,
            transparent 100%
          );
        }
        .glow-effect {
          box-shadow: 0 0 30px rgba(245, 179, 1, 0.2),
                      0 0 60px rgba(245, 179, 1, 0.1),
                      inset 0 0 30px rgba(255, 255, 255, 0.05);
        }
      `,
        }}
      />

      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
        {/* Animated Background (same vibe as TV) */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-card/50 to-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,179,1,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,138,0,0.1),transparent_50%)]" />
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div initial="initial" animate="animate" variants={fadeInUp} className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-accent-gold via-accent-orange to-accent-gold bg-clip-text text-transparent">
                TikTok
              </span>
            </h1>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Follow our TikTok for trending content, challenges, behind-the-scenes, and viral moments.
            </p>
          </motion.div>

          {/* Highlights Grid */}
          <motion.section initial="initial" animate="animate" variants={fadeInUp} className="mb-14">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {highlights.map((highlight) => (
                <motion.div
                  key={highlight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.02 }}
                  className="group"
                >
                  <Card className="p-0 overflow-hidden">
                    <div className="relative h-full rounded-3xl overflow-hidden bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/50 shadow-2xl transition-all duration-500 hover:border-accent-gold/50 hover:shadow-[0_0_40px_rgba(245,179,1,0.3)]">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none z-10" />

                      <div className="p-6 space-y-4 relative z-10">
                        <div className="flex items-start justify-between gap-3">
                          {highlight.tag && (
                            <span className="px-3 py-1.5 rounded-full bg-accent-gold/20 text-accent-gold text-xs font-medium border border-accent-gold/30">
                              {highlight.tag}
                            </span>
                          )}

                          <span className="px-3 py-1.5 rounded-full bg-background/60 border border-border/50 text-text-muted text-xs font-medium">
                            {highlight.views} views
                          </span>
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold mb-2 group-hover:text-accent-gold transition-colors">
                            {highlight.title}
                          </h3>
                          <p className="text-text-muted text-sm leading-relaxed">{highlight.description}</p>
                        </div>

                        <div className="flex items-center gap-2 text-text-muted text-sm pt-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          <span>Trending across the diaspora</span>
                        </div>

                        <Button variant="outline" className="w-full text-sm">
                          View Highlights
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Follow CTA */}
          <motion.section initial="initial" animate="animate" variants={fadeInUp} className="max-w-3xl mx-auto">
            <div className="glass-effect rounded-3xl overflow-hidden glow-effect">
              <div className="relative p-8 sm:p-10 text-center">
                <div className="absolute inset-0 glossy-overlay pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-accent-gold/20 text-accent-gold text-xs font-medium border border-accent-gold/30">
                      FOLLOW & STAY UPDATED
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-bold">
                    Follow Us on <span className="text-accent-gold">TikTok</span>
                  </h2>

                  <p className="text-lg text-text-muted max-w-2xl mx-auto">
                    Stay connected and never miss our latest content, challenges, and community spotlights — straight from
                    the culture.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="primary"
                      href="https://tiktok.com/@kabspromotions"
                      className="mx-auto sm:mx-0"
                    >
                      Follow @kabspromotions
                    </Button>
                    <Button variant="outline" className="mx-auto sm:mx-0">
                      Explore Community
                    </Button>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3 pt-2 text-sm text-text-muted">
                    <span className="px-3 py-2 rounded-xl bg-background/50 border border-border/50">
                      🎥 Weekly highlights
                    </span>
                    <span className="px-3 py-2 rounded-xl bg-background/50 border border-border/50">
                      🔥 Trending challenges
                    </span>
                    <span className="px-3 py-2 rounded-xl bg-background/50 border border-border/50">
                      ⭐ Community spotlights
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </>
  )
}
