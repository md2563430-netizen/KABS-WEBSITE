'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Button from '@/components/Button'

// Types
interface Show {
  id: string
  title: string
  description: string
  longDescription?: string
  thumbnail: string
  videoUrl?: string
  videoType?: 'youtube' | 'vimeo' | 'direct' | 'live'
  duration?: string
  episode?: number
  season?: number
  airDate?: string
  views?: number
  featured?: boolean
}

interface Channel {
  id: string
  name: string
  description: string
  logo?: string
  genre: 'Talk Show' | 'Music' | 'Documentary' | 'Entertainment' | 'News' | 'Sports' | 'Culture' | 'Lifestyle'
  shows: Show[]
  featured?: boolean
  live?: boolean
}

// Channel Data
const channelsData: Channel[] = [
  {
    id: '1',
    name: 'KABS Prime',
    description: 'Premium entertainment and exclusive content',
    genre: 'Entertainment',
    featured: true,
    live: true,
    shows: [
      {
        id: '1-1',
      title: 'Diaspora Today',
      description: 'Weekly discussions on current events, culture, and community issues.',
        longDescription: 'Join host Kabs and special guests for in-depth conversations about the issues that matter to the African diaspora community. From politics to culture, we cover it all.',
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        videoType: 'youtube',
        duration: '45:00',
        episode: 24,
        season: 2,
        airDate: 'March 15, 2024',
        views: 125000,
        featured: true,
      },
      {
        id: '1-2',
        title: 'Heritage Stories',
        description: 'Exploring the rich history and traditions of African communities worldwide.',
        thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        videoType: 'youtube',
        duration: '30:00',
        episode: 12,
        season: 1,
        views: 89000,
      },
      {
        id: '1-3',
        title: 'Community Spotlight',
        description: 'Celebrating the achievements and stories of diaspora community members.',
        thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        videoType: 'youtube',
        duration: '25:00',
        episode: 18,
        views: 67000,
      },
    ],
  },
  {
    id: '2',
    name: 'KABS Music',
    description: 'Live performances, music videos, and artist interviews',
    genre: 'Music',
    featured: true,
    shows: [
      {
        id: '2-1',
      title: 'Rhythm & Roots',
      description: 'Live performances and interviews with African diaspora musicians.',
        thumbnail: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        videoType: 'youtube',
        duration: '60:00',
        episode: 18,
        views: 234000,
        featured: true,
      },
      {
        id: '2-2',
        title: 'AfroBeats Sessions',
        description: 'Exclusive studio sessions with top AfroBeats artists.',
        thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        videoType: 'youtube',
        duration: '35:00',
        episode: 15,
        views: 156000,
      },
      {
        id: '2-3',
        title: 'New Music Friday',
        description: 'Discover the latest releases from diaspora artists every Friday.',
        thumbnail: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&h=600&fit=crop',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        videoType: 'youtube',
        duration: '20:00',
        episode: 52,
        views: 189000,
      },
    ],
  },
  {
    id: '3',
    name: 'KABS Docs',
    description: 'Documentaries and cultural programming',
      genre: 'Documentary',
    shows: [
      {
        id: '3-1',
        title: 'Roots & Routes',
        description: 'A journey through the African diaspora experience across continents.',
        thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        videoType: 'youtube',
        duration: '90:00',
        episode: 6,
        views: 145000,
        featured: true,
      },
      {
        id: '3-2',
        title: 'Traditions Unbound',
        description: 'How African traditions evolve in modern diaspora communities.',
        thumbnail: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        videoType: 'youtube',
        duration: '55:00',
        episode: 8,
        views: 98000,
      },
    ],
  },
  {
    id: '4',
    name: 'KABS News',
    description: 'Breaking news and current affairs from the diaspora',
    genre: 'News',
    live: true,
    shows: [
      {
        id: '4-1',
        title: 'Diaspora News Hour',
        description: 'Daily news coverage of events affecting the African diaspora.',
        thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        videoType: 'youtube',
        duration: '30:00',
        episode: 156,
        views: 245000,
        featured: true,
      },
      {
        id: '4-2',
        title: 'Community Update',
        description: 'Weekly roundup of community news and events.',
        thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        videoType: 'youtube',
        duration: '15:00',
        episode: 78,
        views: 123000,
      },
    ],
  },
  {
    id: '5',
    name: 'KABS Culture',
    description: 'Celebrating African culture, arts, and lifestyle',
    genre: 'Culture',
    shows: [
      {
        id: '5-1',
        title: 'Fashion Forward',
        description: 'Showcasing African fashion designers and trends.',
        thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        videoType: 'youtube',
        duration: '25:00',
        episode: 20,
        views: 89000,
      },
      {
        id: '5-2',
        title: 'Culinary Heritage',
        description: 'Exploring the rich culinary traditions of the diaspora.',
        thumbnail: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        videoType: 'youtube',
        duration: '30:00',
        episode: 16,
        views: 112000,
      },
    ],
  },
  {
    id: '6',
    name: 'KABS Sports',
    description: 'Sports coverage and athlete profiles',
    genre: 'Sports',
    shows: [
      {
        id: '6-1',
        title: 'Champion Stories',
        description: 'Profiles of diaspora athletes making their mark.',
        thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        videoType: 'youtube',
        duration: '40:00',
        episode: 12,
        views: 145000,
      },
    ],
  },
]

// Video Embed Component
function VideoEmbed({ videoUrl, videoType, className = '' }: { videoUrl: string; videoType?: string; className?: string }) {
  if (!videoUrl) return null

  const getEmbedUrl = () => {
    if (videoType === 'youtube') {
      const videoId = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1]
      return videoId ? `https://www.youtube.com/embed/${videoId}` : videoUrl
    }
    if (videoType === 'vimeo') {
      const videoId = videoUrl.match(/vimeo\.com\/(\d+)/)?.[1]
      return videoId ? `https://player.vimeo.com/video/${videoId}` : videoUrl
    }
    return videoUrl
  }

  return (
    <div className={`relative w-full h-full rounded-2xl overflow-hidden bg-card/50 ${className}`}>
      <iframe
        src={getEmbedUrl()}
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Video player"
        style={{ borderRadius: '1rem' }}
      />
    </div>
  )
}

// Channel Card Component
function ChannelCard({ channel, onSelectChannel }: { channel: Channel; onSelectChannel: (channel: Channel) => void }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.02 }}
      className="group"
    >
      <div className="relative h-full rounded-3xl overflow-hidden bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/50 shadow-2xl transition-all duration-500 hover:border-accent-gold/50 hover:shadow-[0_0_40px_rgba(245,179,1,0.3)]">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none z-10" />
        
        <div className="p-6 space-y-4 relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                {channel.live && (
                  <span className="px-2 py-1 rounded-full bg-red-500/90 text-white text-xs font-semibold animate-pulse">
                    🔴 LIVE
                  </span>
                )}
                <span className="px-3 py-1.5 rounded-full bg-accent-gold/20 text-accent-gold text-xs font-medium border border-accent-gold/30">
                  {channel.genre}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-accent-gold transition-colors">
                {channel.name}
              </h3>
              <p className="text-text-muted text-sm mb-4">{channel.description}</p>
              <p className="text-text-muted text-xs">
                {channel.shows.length} {channel.shows.length === 1 ? 'Show' : 'Shows'}
              </p>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full text-sm"
            onClick={() => onSelectChannel(channel)}
          >
            View Channel
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

// Show Card Component
function ShowCard({ show, onPlay }: { show: Show; onPlay: (show: Show) => void }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.02 }}
      className="group"
    >
      <div className="relative h-full rounded-3xl overflow-hidden bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/50 shadow-2xl transition-all duration-500 hover:border-accent-gold/50 hover:shadow-[0_0_40px_rgba(245,179,1,0.3)]">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none z-10" />
        
        <div className="relative h-48 overflow-hidden">
          <img
            src={show.thumbnail}
            alt={show.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
          
          {show.videoUrl && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                onClick={() => onPlay(show)}
                className="w-14 h-14 rounded-full bg-accent-gold/90 backdrop-blur-md flex items-center justify-center text-background hover:bg-accent-gold transition-colors shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-7 h-7 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </motion.button>
            </div>
          )}

          {show.duration && (
            <div className="absolute bottom-4 right-4 z-20">
              <span className="px-2 py-1 rounded bg-background/80 backdrop-blur-md text-text-primary text-xs font-medium">
                {show.duration}
              </span>
            </div>
          )}
        </div>

        <div className="p-6 space-y-4 relative z-10">
          <div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-accent-gold transition-colors">
              {show.title}
            </h3>
            <div className="space-y-1 text-sm text-text-muted">
              {show.episode && (
                <p>Episode {show.episode}{show.season && ` • Season ${show.season}`}</p>
              )}
              {show.airDate && (
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {show.airDate}
                </p>
              )}
              {show.views && (
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {show.views.toLocaleString()} views
                </p>
              )}
            </div>
          </div>

          <p className="text-text-muted text-sm line-clamp-2">{show.description}</p>

          <Button 
            variant="outline" 
            className="w-full text-sm"
            onClick={() => onPlay(show)}
          >
            {show.videoUrl ? '▶ Watch Now' : 'View Details'}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

// Main Component
export default function TV() {
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null)
  const [selectedShow, setSelectedShow] = useState<Show | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState<string>('All')
  const prefersReducedMotion = useReducedMotion()

  const genres = ['All', 'Talk Show', 'Music', 'Documentary', 'Entertainment', 'News', 'Sports', 'Culture', 'Lifestyle']

  const allShows = useMemo(() => {
    return channelsData.flatMap(channel => 
      channel.shows.map(show => ({ ...show, channelName: channel.name, channelId: channel.id }))
    )
  }, [])

  const filteredChannels = useMemo(() => {
    return channelsData.filter(channel => {
      const matchesGenre = selectedGenre === 'All' || channel.genre === selectedGenre
      const matchesSearch = 
        channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        channel.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesGenre && matchesSearch
    })
  }, [selectedGenre, searchQuery])

  const filteredShows = useMemo(() => {
    if (!selectedChannel) return []
    return selectedChannel.shows.filter(show => {
      return show.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             show.description.toLowerCase().includes(searchQuery.toLowerCase())
    })
  }, [selectedChannel, searchQuery])

  const featuredChannels = channelsData.filter(c => c.featured)

  const handleSelectChannel = (channel: Channel) => {
    setSelectedChannel(channel)
    setSearchQuery('')
  }

  const handlePlay = (show: Show) => {
    setSelectedShow(show)
    setShowModal(true)
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
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

      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-card/50 to-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,179,1,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,138,0,0.1),transparent_50%)]" />
        </div>

      <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-accent-gold via-accent-orange to-accent-gold bg-clip-text text-transparent">
                KABS TV
            </span>
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Premium TV channels and entertainment featuring African diaspora content
            </p>
          </motion.div>

          {!selectedChannel ? (
            <>
              {/* Featured Channels */}
              {featuredChannels.length > 0 && (
                <motion.section
                  initial="initial"
                  animate="animate"
                  variants={fadeInUp}
                  className="mb-16"
                >
                  <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                    <span>⭐</span>
                    <span>Featured Channels</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredChannels.map((channel) => (
                      <ChannelCard
                        key={channel.id}
                        channel={channel}
                        onSelectChannel={handleSelectChannel}
                      />
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Filters and Search */}
              <motion.div
                initial="initial"
                animate="animate"
                variants={fadeInUp}
                className="mb-8 space-y-4"
              >
                <div className="glass-effect rounded-2xl p-4">
                  <div className="relative">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search channels..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-background/50 border border-border/50 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all"
                    />
                  </div>
        </div>

                <div className="flex flex-wrap gap-3">
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => setSelectedGenre(genre)}
                      className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                        selectedGenre === genre
                          ? 'glass-effect text-accent-gold border-2 border-accent-gold/50 glow-effect'
                          : 'bg-card/50 border border-border/50 text-text-muted hover:border-accent-gold/30 hover:text-text-primary'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* All Channels Grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedGenre + searchQuery}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredChannels.map((channel) => (
                    <ChannelCard
                      key={channel.id}
                      channel={channel}
                      onSelectChannel={handleSelectChannel}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            <>
              {/* Channel View */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8"
              >
                <button
                  onClick={() => setSelectedChannel(null)}
                  className="flex items-center gap-2 text-text-muted hover:text-accent-gold transition-colors mb-6"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Channels
                </button>

                <div className="glass-effect rounded-2xl p-6 mb-8">
                  <div className="flex items-center gap-4">
                    {selectedChannel.live && (
                      <span className="px-3 py-1 rounded-full bg-red-500/90 text-white text-sm font-semibold animate-pulse">
                        🔴 LIVE
                      </span>
                    )}
                <div>
                      <h2 className="text-3xl font-bold mb-2">{selectedChannel.name}</h2>
                      <p className="text-text-muted">{selectedChannel.description}</p>
                    </div>
                  </div>
                </div>

                <div className="glass-effect rounded-2xl p-4 mb-6">
                  <input
                    type="text"
                    placeholder="Search shows..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-background/50 border border-border/50 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all"
                  />
              </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredShows.map((show) => (
                    <ShowCard
                      key={show.id}
                      show={show}
                      onPlay={handlePlay}
                    />
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {showModal && selectedShow && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-md"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-effect rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto glow-effect"
              >
                <div className="relative">
                  <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass-effect flex items-center justify-center text-text-primary hover:text-accent-gold transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="relative w-full aspect-video bg-card rounded-t-3xl overflow-hidden">
                    {selectedShow.videoUrl ? (
                      <VideoEmbed 
                        videoUrl={selectedShow.videoUrl} 
                        videoType={selectedShow.videoType}
                        className="absolute inset-0" 
                      />
                    ) : (
                      <img
                        src={selectedShow.thumbnail}
                        alt={selectedShow.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div className="p-8 space-y-6">
                    <div>
                      <h2 className="text-4xl font-bold mb-4">{selectedShow.title}</h2>
                      <div className="flex items-center gap-3 flex-wrap">
                        {selectedShow.episode && (
                          <span className="px-3 py-1 rounded-full bg-card/50 text-text-muted text-sm">
                            Episode {selectedShow.episode}{selectedShow.season && ` • Season ${selectedShow.season}`}
                          </span>
                        )}
                        {selectedShow.duration && (
                          <span className="px-3 py-1 rounded-full bg-card/50 text-text-muted text-sm">
                            {selectedShow.duration}
                          </span>
                        )}
                        {selectedShow.views && (
                          <span className="px-3 py-1 rounded-full bg-card/50 text-text-muted text-sm">
                            {selectedShow.views.toLocaleString()} views
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-3">About</h3>
                      <p className="text-text-muted leading-relaxed">
                        {selectedShow.longDescription || selectedShow.description}
                      </p>
        </div>
      </div>
    </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
