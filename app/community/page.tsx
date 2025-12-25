"use client"

import { useMemo } from "react"
import { motion, useReducedMotion } from "framer-motion"
import Card from "@/components/Card"
import Button from "@/components/Button"

type Feature = {
  id: number
  title: string
  description: string
  icon: string
  tag?: string
}

export default function Community() {
  const prefersReducedMotion = useReducedMotion()

  const features: Feature[] = useMemo(
    () => [
      {
        id: 1,
        title: "Connect & Network",
        description: "Build meaningful connections with community members from around the world.",
        icon: "👥",
        tag: "Network",
      },
      {
        id: 2,
        title: "Share Your Story",
        description: "Share your experiences, achievements, and contribute to our growing community.",
        icon: "📖",
        tag: "Stories",
      },
      {
        id: 3,
        title: "Join Discussions",
        description: "Participate in forums and discussions on topics that matter to you.",
        icon: "💬",
        tag: "Forums",
      },
      {
        id: 4,
        title: "Events & Meetups",
        description: "Discover local and virtual events to connect with community members.",
        icon: "🎉",
        tag: "Meetups",
      },
      {
        id: 5,
        title: "Resources & Support",
        description: "Access resources, mentorship opportunities, and community support.",
        icon: "🤝",
        tag: "Support",
      },
      {
        id: 6,
        title: "Exclusive Content",
        description: "Get early access to content, events, and special community perks.",
        icon: "⭐",
        tag: "Perks",
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
                Community
              </span>
            </h1>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Connect with like-minded people, share stories, and build lasting relationships across the diaspora.
            </p>
          </motion.div>

          {/* Feature Grid */}
          <motion.section initial="initial" animate="animate" variants={fadeInUp} className="mb-14">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <motion.div
                  key={feature.id}
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
                          <div className="text-4xl leading-none">{feature.icon}</div>

                          {feature.tag && (
                            <span className="px-3 py-1.5 rounded-full bg-accent-gold/20 text-accent-gold text-xs font-medium border border-accent-gold/30">
                              {feature.tag}
                            </span>
                          )}
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold mb-2 group-hover:text-accent-gold transition-colors">
                            {feature.title}
                          </h3>
                          <p className="text-text-muted text-sm leading-relaxed">{feature.description}</p>
                        </div>

                        <div className="pt-2">
                          <Button variant="outline" className="w-full text-sm">
                            Explore
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Join CTA */}
          <motion.section initial="initial" animate="animate" variants={fadeInUp} className="max-w-3xl mx-auto">
            <div className="glass-effect rounded-3xl overflow-hidden glow-effect">
              <div className="relative p-8 sm:p-10 text-center">
                <div className="absolute inset-0 glossy-overlay pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-accent-gold/20 text-accent-gold text-xs font-medium border border-accent-gold/30">
                      JOIN THE MOVEMENT
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-bold">
                    Join Our <span className="text-accent-gold">Community</span>
                  </h2>

                  <p className="text-lg text-text-muted max-w-2xl mx-auto">
                    Become part of a vibrant network celebrating African diaspora culture, achievements, and stories —
                    online and in real life.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="primary">Sign Up Now</Button>
                    <Button variant="outline">Learn More</Button>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3 pt-2 text-sm text-text-muted">
                    <span className="px-3 py-2 rounded-xl bg-background/50 border border-border/50">
                      ✅ Safe community guidelines
                    </span>
                    <span className="px-3 py-2 rounded-xl bg-background/50 border border-border/50">
                      ⭐ Exclusive member perks
                    </span>
                    <span className="px-3 py-2 rounded-xl bg-background/50 border border-border/50">
                      🎉 Local meetups & events
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
