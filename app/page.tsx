'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Card from '@/components/Card'
import Button from '@/components/Button'

// Types
interface HeroSlide {
  imageUrl: string
  caption: string
  tag: string
  ctaLabel: string
  ctaLink: string
}

interface PlatformFeature {
  icon: string
  title: string
  description: string
  href: string
}

interface ValueCard {
  icon: string
  title: string
  description: string
}

interface Event {
  id: string
  title: string
  date: string
  location: string
  imageUrl: string
  tag: string
}

interface MediaItem {
  id: string
  title: string
  tag: string
  thumbnail: string
}

interface Counter {
  label: string
  value: number
  suffix?: string
}

// Data
const heroSlides: HeroSlide[] = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop',
    caption: 'Live Music & Culture',
    tag: 'Events',
    ctaLabel: 'Get Tickets',
    ctaLink: '/events',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop',
    caption: 'Premium TV Content',
    tag: 'Entertainment',
    ctaLabel: 'Watch Now',
    ctaLink: '/tv',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=600&fit=crop',
    caption: 'Live Radio Broadcasts',
    tag: 'Radio',
    ctaLabel: 'Listen Live',
    ctaLink: '/radio',
  },
]

const platformFeatures: PlatformFeature[] = [
  {
    icon: '🎉',
    title: 'Events',
    description: 'Discover premium African diaspora events and cultural celebrations',
    href: '/events',
  },
  {
    icon: '📺',
    title: 'TV',
    description: 'Watch exclusive shows and documentaries',
    href: '/tv',
  },
  {
    icon: '📻',
    title: 'Radio',
    description: 'Tune in to music, talk shows, and updates',
    href: '/radio',
  },
  {
    icon: '📰',
    title: 'Media',
    description: 'Access exclusive content and stories',
    href: '/media',
  },
  {
    icon: '🎵',
    title: 'TikTok',
    description: 'Follow trending content and challenges',
    href: '/tiktok',
  },
  {
    icon: '💬',
    title: 'Chat',
    description: 'Connect and chat with Kabs directly',
    href: '/chat',
  },
]

const valueCards: ValueCard[] = [
  {
    icon: '🌍',
    title: 'Culture',
    description: 'Celebrating the rich heritage and traditions of the African diaspora',
  },
  {
    icon: '🤝',
    title: 'Community',
    description: 'Building connections and fostering meaningful relationships',
  },
  {
    icon: '⭐',
    title: 'Quality',
    description: 'Delivering premium content and experiences that matter',
  },
]

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'AfroBeats Festival 2024',
    date: 'March 15, 2024',
    location: 'London, UK',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop',
    tag: 'Music',
  },
  {
    id: '2',
    title: 'Diaspora Business Summit',
    date: 'April 20, 2024',
    location: 'New York, USA',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop',
    tag: 'Business',
  },
  {
    id: '3',
    title: 'Cultural Heritage Gala',
    date: 'May 10, 2024',
    location: 'Lagos, Nigeria',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop',
    tag: 'Culture',
  },
  {
    id: '4',
    title: 'Community Unity Concert',
    date: 'June 5, 2024',
    location: 'Toronto, Canada',
    imageUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop',
    tag: 'Music',
  },
]

const latestDrops: MediaItem[] = [
  {
    id: '1',
    title: 'Exclusive Interview: Rising Stars',
    tag: 'Interview',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
  },
  {
    id: '2',
    title: 'Documentary: Roots & Routes',
    tag: 'Documentary',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=200&fit=crop',
  },
  {
    id: '3',
    title: 'Behind the Scenes: Festival Prep',
    tag: 'Behind Scenes',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=200&fit=crop',
  },
]

const counters: Counter[] = [
  { label: 'Events Hosted', value: 1248 },
  { label: 'Cities Covered', value: 36 },
  { label: 'Creators Featured', value: 520 },
  { label: 'Community Members', value: 18450, suffix: '+' },
]

// Counter Component with Count Up Animation
function Counter({ end, label, suffix }: { end: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible || prefersReducedMotion) {
      setCount(end)
      return
    }

    let startTime: number | null = null
    const duration = 2000
    const start = 0

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(start + (end - start) * easeOut))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, end, prefersReducedMotion])

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  return (
    <motion.div
      ref={ref}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent-gold to-accent-orange bg-clip-text text-transparent mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-text-muted">{label}</div>
    </motion.div>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-accent-gold to-accent-orange bg-clip-text text-transparent mb-4">
              KABS Promotions
            </h3>
            <p className="text-text-muted text-sm">
              Connecting the African diaspora through events, media, and community.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><Link href="/events" className="hover:text-accent-gold transition-colors">Events</Link></li>
              <li><Link href="/tv" className="hover:text-accent-gold transition-colors">TV</Link></li>
              <li><Link href="/radio" className="hover:text-accent-gold transition-colors">Radio</Link></li>
              <li><Link href="/media" className="hover:text-accent-gold transition-colors">Media</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><Link href="/community" className="hover:text-accent-gold transition-colors">Join Community</Link></li>
              <li><Link href="/chat" className="hover:text-accent-gold transition-colors">Chat with Kabs</Link></li>
              <li><Link href="/tiktok" className="hover:text-accent-gold transition-colors">TikTok</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><Link href="/bulk-sms" className="hover:text-accent-gold transition-colors">Bulk SMS</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-text-muted">
          <p>© {new Date().getFullYear()} KABS Promotions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Main Component
export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Auto-rotate hero slides
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused, prefersReducedMotion])

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const glowBlobVariants = {
    animate: {
      x: [0, 100, 0],
      y: [0, 50, 0],
      scale: [1, 1.2, 1],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: [0.4, 0, 0.6, 1] as const, // easeInOut
      },
    },
  }

  const animationStyle = prefersReducedMotion ? 'none' : 'gradient-shift 15s ease infinite'
  const shimmerStyle = prefersReducedMotion ? 'none' : 'shimmer 3s infinite'

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animated-gradient {
          background: linear-gradient(-45deg, #070A10, #0B1220, #1a1f2e, #0B1220);
          background-size: 400% 400%;
          animation: ${animationStyle};
        }
        .shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(245, 179, 1, 0.1),
            transparent
          );
          background-size: 1000px 100%;
          animation: ${shimmerStyle};
        }
        .scroll-snap-y-proximity {
          scroll-snap-type: y proximity;
        }
        @media (max-width: 767px) {
          .scroll-snap-y-proximity {
            scroll-snap-type: none;
          }
        }
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
      `}} />

      <div className="relative overflow-x-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10 animated-gradient">
          {/* Noise overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
          
          {/* Glow Blobs */}
          {!prefersReducedMotion && (
            <>
              <motion.div
                className="absolute top-20 left-10 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl"
                variants={glowBlobVariants}
                animate="animate"
              />
              <motion.div
                className="absolute bottom-20 right-10 w-96 h-96 bg-accent-orange/10 rounded-full blur-3xl"
                variants={glowBlobVariants}
                animate="animate"
                transition={{ duration: 25, delay: 2 }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 w-80 h-80 bg-accent-gold/5 rounded-full blur-3xl"
                variants={glowBlobVariants}
                animate="animate"
                transition={{ duration: 30, delay: 4 }}
              />
            </>
          )}
        </div>

        {/* Main Content with Scroll Snap */}
        <div className="scroll-smooth scroll-snap-y-proximity">
          {/* Hero Section */}
          <section 
            className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="max-w-7xl mx-auto w-full">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Side - Hero Copy */}
                <motion.div
                  initial="initial"
                  animate="animate"
                  variants={staggerContainer}
                  className="space-y-6"
                >
                  <motion.div variants={fadeInUp}>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm font-medium">
                      <span>Africa. Diaspora. Culture.</span>
                      <svg className="w-4 h-4 text-accent-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </span>
                  </motion.div>

                  <motion.h1 
                    variants={fadeInUp}
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
                  >
                    Experience the{' '}
                    <span className="bg-gradient-to-r from-accent-gold to-accent-orange bg-clip-text text-transparent">
                      Rhythm
                    </span>
                    . Live the Culture.
                  </motion.h1>

                  <motion.p 
                    variants={fadeInUp}
                    className="text-xl text-text-muted max-w-xl"
                  >
                    Connecting communities through events, TV, radio, and vibrant diaspora engagement.
                  </motion.p>

                  <motion.div 
                    variants={fadeInUp}
                    className="flex flex-wrap gap-4"
                  >
                    <Button href="/events" variant="primary">
                      Explore Events
                    </Button>
                    <Button href="/community" variant="outline">
                      Join Community
                    </Button>
                  </motion.div>

                  {/* Trust Row */}
                  <motion.div 
                    variants={fadeInUp}
                    className="flex flex-wrap gap-6 pt-4"
                  >
                    {[
                      { icon: '🎵', label: 'Live Events' },
                      { icon: '📻', label: 'Radio & TV' },
                      { icon: '🌍', label: 'Diaspora Community' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-text-muted">
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Right Side - Hero Slider */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative h-[500px] rounded-2xl overflow-hidden"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <div className="relative h-full">
                        <img
                          src={heroSlides[currentSlide].imageUrl}
                          alt={heroSlides[currentSlide].caption}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 rounded-full bg-accent-gold/20 text-accent-gold text-xs font-medium">
                              {heroSlides[currentSlide].tag}
                            </span>
                          </div>
                          <h3 className="text-3xl font-bold mb-4">{heroSlides[currentSlide].caption}</h3>
                          <Button href={heroSlides[currentSlide].ctaLink} variant="primary">
                            {heroSlides[currentSlide].ctaLabel}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Slide Indicators */}
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    {heroSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentSlide ? 'bg-accent-gold w-6' : 'bg-white/30'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Counters Section */}
          <section 
            className="py-20 px-4 sm:px-6 lg:px-8"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: '-100px' }}
                variants={staggerContainer}
                className="text-center mb-12"
              >
                <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-4">
                  By the Numbers
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-text-muted">
                  Live numbers update as the platform grows
                </motion.p>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {counters.map((counter, idx) => (
                  <Counter
                    key={idx}
                    end={counter.value}
                    label={counter.label}
                    suffix={counter.suffix}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* About Section */}
          <section 
            className="py-20 px-4 sm:px-6 lg:px-8"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: '-100px' }}
                variants={staggerContainer}
              >
                <motion.h2 
                  variants={fadeInUp}
                  className="text-4xl font-bold text-center mb-12"
                >
                  About KABS Promotions
                </motion.h2>

                <div className="grid lg:grid-cols-2 gap-12 mb-12">
                  <motion.div variants={fadeInUp} className="space-y-4 text-text-muted">
                    <p>
                      KABS Promotions bridges the gap between the African diaspora and their roots through 
                      premium events, media, and community engagement. We celebrate culture, foster connections, 
                      and create spaces where heritage meets innovation.
                    </p>
                    <p>
                      From live concerts and cultural festivals to exclusive TV content and radio broadcasts, 
                      we bring the rhythm and vibrancy of the diaspora to audiences worldwide.
                    </p>
                    <p>
                      Our platform is more than entertainment—it's a movement that connects communities, 
                      amplifies voices, and preserves traditions for future generations.
                    </p>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="grid grid-cols-1 gap-6">
                    {valueCards.map((card, idx) => (
                      <div
                        key={idx}
                        className="relative h-full rounded-3xl overflow-hidden bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/50 shadow-2xl transition-all duration-500 hover:border-accent-gold/50 hover:shadow-[0_0_40px_rgba(245,179,1,0.3)]"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
                        <div className="relative p-6">
                          <div className="flex items-start gap-4">
                            <div className="text-4xl">{card.icon}</div>
                            <div>
                              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                              <p className="text-text-muted text-sm">{card.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>

                <motion.div variants={fadeInUp} className="text-center">
                  <Button href="/community" variant="primary">
                    Learn More
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Platform Features */}
          <section 
            className="py-20 px-4 sm:px-6 lg:px-8"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: '-100px' }}
                variants={staggerContainer}
              >
                <motion.h2 
                  variants={fadeInUp}
                  className="text-4xl font-bold text-center mb-12"
                >
                  Explore the Platform
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {platformFeatures.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      variants={fadeInUp}
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link href={feature.href}>
                        <div className="relative h-full rounded-3xl overflow-hidden bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/50 shadow-2xl transition-all duration-500 hover:border-accent-gold/50 hover:shadow-[0_0_40px_rgba(245,179,1,0.3)] group cursor-pointer">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
                          <div className="relative p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-accent-gold transition-colors">
                                  {feature.title}
                                </h3>
                                <p className="text-text-muted text-sm mb-4">{feature.description}</p>
                              </div>
                              <motion.svg
                                className="w-6 h-6 text-text-muted group-hover:text-accent-gold transition-colors"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                initial={{ x: 0 }}
                                whileHover={{ x: 4 }}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </motion.svg>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Featured Events */}
          <section 
            className="py-20 px-4 sm:px-6 lg:px-8"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: '-100px' }}
                variants={staggerContainer}
              >
                <div className="flex items-center justify-between mb-12">
                  <motion.h2 variants={fadeInUp} className="text-4xl font-bold">
                    Featured Events
                  </motion.h2>
                  <motion.div variants={fadeInUp}>
                    <Button href="/events" variant="outline">
                      View All
                    </Button>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {mockEvents.map((event, idx) => (
                    <motion.div
                      key={event.id}
                      variants={fadeInUp}
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link href={`/events#${event.id}`}>
                        <div className="relative h-full rounded-3xl overflow-hidden bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/50 shadow-2xl transition-all duration-500 hover:border-accent-gold/50 hover:shadow-[0_0_40px_rgba(245,179,1,0.3)] group cursor-pointer">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none z-10" />
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={event.imageUrl}
                              alt={event.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                            <div className="absolute top-4 left-4 z-20">
                              <span className="px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md text-accent-gold text-xs font-medium border border-accent-gold/30">
                                {event.tag}
                              </span>
                            </div>
                          </div>
                          <div className="p-6 relative z-10">
                            <h3 className="text-lg font-bold mb-2 group-hover:text-accent-gold transition-colors">
                              {event.title}
                            </h3>
                            <p className="text-text-muted text-sm mb-1">{event.date}</p>
                            <p className="text-text-muted text-sm">{event.location}</p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Media + TV Preview */}
          <section 
            className="py-20 px-4 sm:px-6 lg:px-8"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: '-100px' }}
                variants={staggerContainer}
                className="grid lg:grid-cols-2 gap-8"
              >
                {/* TV Spotlight */}
                <motion.div variants={fadeInUp}>
                  <Link href="/tv">
                    <div className="relative h-full rounded-3xl overflow-hidden bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/50 shadow-2xl transition-all duration-500 hover:border-accent-gold/50 hover:shadow-[0_0_40px_rgba(245,179,1,0.3)] group cursor-pointer">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none z-10" />
                      <div className="relative h-64">
                        <img
                          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=400&fit=crop"
                          alt="KABS TV Spotlight"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                          <motion.div
                            className="w-16 h-16 rounded-full bg-accent-gold/90 flex items-center justify-center"
                            whileHover={{ scale: 1.1 }}
                          >
                            <svg className="w-8 h-8 text-background" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          </motion.div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                          <h3 className="text-2xl font-bold mb-2">KABS TV Spotlight</h3>
                          <ul className="space-y-1 text-sm text-text-muted">
                            <li>• Exclusive interviews</li>
                            <li>• Cultural documentaries</li>
                            <li>• Live event coverage</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>

                {/* Latest Drops */}
                <motion.div variants={fadeInUp}>
                  <div className="relative h-full rounded-3xl overflow-hidden bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/50 shadow-2xl transition-all duration-500 hover:border-accent-gold/50 hover:shadow-[0_0_40px_rgba(245,179,1,0.3)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
                    <div className="relative p-6">
                      <h3 className="text-2xl font-bold mb-6">Latest Drops</h3>
                      <div className="space-y-4">
                        {latestDrops.map((item) => (
                          <Link
                            key={item.id}
                            href={`/media#${item.id}`}
                            className="flex gap-4 group cursor-pointer"
                          >
                            <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="px-2 py-0.5 rounded bg-accent-gold/20 text-accent-gold text-xs font-medium">
                                  {item.tag}
                                </span>
                              </div>
                              <h4 className="font-semibold group-hover:text-accent-gold transition-colors">
                                {item.title}
                              </h4>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-6">
                        <Button href="/media" variant="outline" className="w-full">
                          View All Media
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Bulk SMS Promo */}
          <section 
            className="py-20 px-4 sm:px-6 lg:px-8"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: '-100px' }}
                variants={fadeInUp}
              >
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/50 shadow-2xl transition-all duration-500 hover:border-accent-gold/50 hover:shadow-[0_0_40px_rgba(245,179,1,0.3)] shimmer">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
                  <div className="relative z-10 p-8 md:p-12">
                    <div className="text-center max-w-3xl mx-auto space-y-6">
                      <h2 className="text-3xl md:text-4xl font-bold">
                        Ready to Announce Your Event?
                      </h2>
                      <p className="text-lg text-text-muted">
                        Reach your audience with personalized bulk SMS. Upload CSV files, track delivery, 
                        and send targeted messages to thousands of contacts instantly.
                      </p>
                      <Button href="/bulk-sms" variant="primary">
                        Get Started with Bulk SMS
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}
