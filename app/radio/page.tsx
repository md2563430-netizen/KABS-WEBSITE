// app/radio/page.tsx
"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import Card from "@/components/Card"
import Button from "@/components/Button"

type Station = {
  id: string
  name: string
  tagline: string
  location: string
  country?: string
  genre: string
  streamUrl: string
  website?: string
  featured?: boolean
}

export default function Radio() {
  const prefersReducedMotion = useReducedMotion()

  const stations: Station[] = useMemo(
    () => [
      {
        id: "sanyu",
        name: "Sanyu Radio",
        tagline: "Feel the Music • Live from Kampala",
        location: "Kampala",
        country: "Uganda",
        genre: "Contemporary / Variety",
        streamUrl: "https://s44.myradiostream.com:8138/stream/1/",
        featured: true,
      },
      {
        id: "kabs",
        name: "KABS Radio (Coming Soon)",
        tagline: "Diaspora vibes, talk, and culture",
        location: "Online",
        country: "Global",
        genre: "Talk / Music / Culture",
        streamUrl: "https://s44.myradiostream.com:8138/stream/1/",
      },
      // Add more stations here...
    ],
    []
  )

  const featuredStations = stations.filter((s) => s.featured)
  const [activeStation, setActiveStation] = useState<Station>(featuredStations[0] || stations[0])
  const [isPlaying, setIsPlaying] = useState(false)

  // Search & filters
  const [query, setQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("All")
  const [selectedCountry, setSelectedCountry] = useState("All")
  const [onlyFeatured, setOnlyFeatured] = useState(false)

  const genres = useMemo(() => {
    const all = Array.from(new Set(stations.map((s) => s.genre))).sort()
    return ["All", ...all]
  }, [stations])

  const countries = useMemo(() => {
    const all = Array.from(new Set(stations.map((s) => s.country || "Unknown"))).sort()
    return ["All", ...all]
  }, [stations])

  const filteredStations = useMemo(() => {
    const q = query.trim().toLowerCase()
    return stations.filter((s) => {
      const matchesQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.genre.toLowerCase().includes(q) ||
        (s.country || "").toLowerCase().includes(q) ||
        (s.location || "").toLowerCase().includes(q)

      const matchesGenre = selectedGenre === "All" || s.genre === selectedGenre

      const stationCountry = s.country || "Unknown"
      const matchesCountry = selectedCountry === "All" || stationCountry === selectedCountry

      const matchesFeatured = !onlyFeatured || !!s.featured

      return matchesQuery && matchesGenre && matchesCountry && matchesFeatured
    })
  }, [stations, query, selectedGenre, selectedCountry, onlyFeatured])

  const fadeInUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
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
          .audio-wrap audio {
            width: 100%;
            border-radius: 14px;
          }
          select, input[type="text"] {
            outline: none;
          }
        `,
        }}
      />

      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
        {/* Background */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-card/50 to-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,179,1,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,138,0,0.1),transparent_50%)]" />
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div initial="initial" animate="animate" variants={fadeInUp} className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-accent-gold via-accent-orange to-accent-gold bg-clip-text text-transparent">
                Radio
              </span>
            </h1>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Browse stations and stream live. Use search + filters to find what you want fast.
            </p>
          </motion.div>

          {/* Live Player (Active Station) */}
          <motion.div initial="initial" animate="animate" variants={fadeInUp} className="mb-12">
            <div className="glass-effect rounded-3xl overflow-hidden glow-effect">
              <div className="relative p-6 sm:p-8">
                <div className="absolute inset-0 glossy-overlay pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-accent-gold font-semibold">LIVE RADIO</span>
                  </div>

                  <div className="text-center space-y-3">
                    <h2 className="text-3xl sm:text-4xl font-bold">{activeStation.name}</h2>
                    <p className="text-text-muted text-lg">{activeStation.tagline}</p>

                    <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-text-muted">
                      <span className="px-3 py-1.5 rounded-full bg-card/50 border border-border/50">
                        {activeStation.genre}
                      </span>
                      <span className="px-3 py-1.5 rounded-full bg-card/50 border border-border/50">
                        {activeStation.location}
                        {activeStation.country ? ` • ${activeStation.country}` : ""}
                      </span>
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                          isPlaying
                            ? "bg-accent-gold/20 text-accent-gold border-accent-gold/30"
                            : "bg-card/50 text-text-muted border-border/50"
                        }`}
                      >
                        {isPlaying ? "Playing" : "Paused"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 max-w-3xl mx-auto">
                    <Card className="p-0 overflow-hidden">
                      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/50 shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

                        <div className="p-6 sm:p-7 relative space-y-5">
                          <div className="audio-wrap">
                            <audio
                              key={activeStation.streamUrl}
                              controls
                              preload="none"
                              onPlay={() => setIsPlaying(true)}
                              onPause={() => setIsPlaying(false)}
                              onEnded={() => setIsPlaying(false)}
                            >
                              <source src={activeStation.streamUrl} type="audio/mpeg" />
                              Your browser does not support the audio element.
                            </audio>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button
                              variant="outline"
                              className="sm:w-auto"
                              onClick={() => window.open(activeStation.streamUrl, "_blank", "noopener,noreferrer")}
                            >
                              Open Stream in New Tab
                            </Button>

                            <Button
                              variant="primary"
                              className="sm:w-auto"
                              onClick={() => {
                                const a = document.querySelector("audio")
                                if (!a) return
                                if (a.paused) a.play()
                                else a.pause()
                              }}
                            >
                              {isPlaying ? "Pause" : "Play"}
                            </Button>
                          </div>

                          <p className="text-xs text-text-muted text-center">
                            Tip: If playback pauses on mobile, tap play again.
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <div className="mt-8 max-w-3xl mx-auto">
                    <div className="glass-effect rounded-2xl p-4">
                      <p className="text-sm text-text-muted">
                        Schedules are optional — this page focuses on live streaming + station discovery.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Search + Filters */}
          <motion.div initial="initial" animate="animate" variants={fadeInUp} className="mb-8 space-y-4">
            <div className="glass-effect rounded-2xl p-4">
              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search stations, genre, country..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-background/50 border border-border/50 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all"
                />
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-text-muted block mb-2">Genre</label>
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-xl text-text-primary focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all"
                  >
                    {genres.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-text-muted block mb-2">Country</label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-xl text-text-primary focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all"
                  >
                    {countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => setOnlyFeatured((v) => !v)}
                    className={`w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 border ${
                      onlyFeatured
                        ? "glass-effect text-accent-gold border-2 border-accent-gold/50 glow-effect"
                        : "bg-card/50 border-border/50 text-text-muted hover:border-accent-gold/30 hover:text-text-primary"
                    }`}
                  >
                    {onlyFeatured ? "★ Featured Only" : "Show Featured"}
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="sm:w-auto"
                  onClick={() => {
                    setQuery("")
                    setSelectedGenre("All")
                    setSelectedCountry("All")
                    setOnlyFeatured(false)
                  }}
                >
                  Reset Filters
                </Button>

                <div className="text-sm text-text-muted flex items-center">
                  Showing <span className="text-accent-gold font-semibold mx-1">{filteredStations.length}</span> stations
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stations Directory */}
          <motion.div initial="initial" animate="animate" variants={fadeInUp} className="mb-6">
            <h3 className="text-3xl font-bold mb-6">Stations</h3>

            <AnimatePresence mode="popLayout">
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredStations.map((station) => {
                  const active = station.id === activeStation.id
                  return (
                    <motion.button
                      key={station.id}
                      layout
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.02 }}
                      transition={{ duration: 0.25 }}
                      onClick={() => {
                        setActiveStation(station)
                        setIsPlaying(false)
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }}
                      className="text-left group"
                    >
                      <div
                        className={`relative h-full rounded-3xl overflow-hidden bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border shadow-2xl transition-all duration-500 ${
                          active
                            ? "border-accent-gold/60 glow-effect"
                            : "border-border/50 hover:border-accent-gold/50 hover:shadow-[0_0_40px_rgba(245,179,1,0.3)]"
                        }`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

                        <div className="p-6 space-y-4 relative">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                {station.featured && (
                                  <span className="px-2 py-1 rounded-full bg-accent-gold/20 text-accent-gold text-xs font-medium border border-accent-gold/30">
                                    Featured
                                  </span>
                                )}
                                <span className="px-2 py-1 rounded-full bg-card/50 text-text-muted text-xs border border-border/50">
                                  {station.genre}
                                </span>
                              </div>

                              <h4 className="text-2xl font-bold group-hover:text-accent-gold transition-colors">
                                {station.name}
                              </h4>
                              <p className="text-text-muted text-sm mt-1">{station.tagline}</p>
                            </div>

                            {active && (
                              <span className="px-2 py-1 rounded-full bg-accent-gold/20 text-accent-gold text-xs font-semibold border border-accent-gold/30">
                                Active
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-text-muted">
                            {station.location}
                            {station.country ? ` • ${station.country}` : ""}
                          </p>

                          <Button variant="outline" className="w-full text-sm">
                            Listen
                          </Button>
                        </div>
                      </div>
                    </motion.button>
                  )
                })}
              </motion.div>
            </AnimatePresence>

            {filteredStations.length === 0 && (
              <div className="glass-effect rounded-2xl p-6 text-center text-text-muted">
                No stations match your search/filters. Try resetting filters.
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  )
}
