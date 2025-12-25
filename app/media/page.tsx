'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Button from '@/components/Button'

// Types
interface MediaItem {
  id: string
  title: string
  category: 'Interview' | 'Documentary' | 'Feature' | 'Music Video' | 'Behind Scenes' | 'Live Performance'
  date: string
  description: string
  longDescription?: string
  thumbnail: string
  videoUrl?: string
  videoType?: 'youtube' | 'vimeo' | 'direct' | 'tiktok'
  duration?: string
  views?: number
  featured?: boolean
}

// Media Data
const mediaData: MediaItem[] = [
  {
    id: '1',
    title: 'Exclusive Interview: Rising Stars',
    category: 'Interview',
    date: 'March 1, 2024',
    description: 'In-depth conversations with emerging artists from the African diaspora.',
    longDescription: 'Join us for exclusive interviews with the next generation of African diaspora artists. Discover their journeys, inspirations, and the stories behind their music.',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video
    videoType: 'youtube',
    duration: '15:30',
    views: 12500,
    featured: true,
  },
  {
    id: '2',
    title: 'Cultural Spotlight: Traditions & Modernity',
    category: 'Documentary',
    date: 'February 20, 2024',
    description: 'Exploring how traditional African values meet contemporary life.',
    longDescription: 'A deep dive into how African traditions are preserved and adapted in modern diaspora communities. Featuring interviews with community leaders and cultural experts.',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoType: 'youtube',
    duration: '22:45',
    views: 18900,
    featured: true,
  },
  {
    id: '3',
    title: 'Community Voices: Stories of Success',
    category: 'Feature',
    date: 'February 10, 2024',
    description: 'Inspiring stories from community members making a difference.',
    longDescription: 'Meet the changemakers in our community. From entrepreneurs to activists, discover how they\'re building bridges and creating impact.',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoType: 'youtube',
    duration: '18:20',
    views: 15200,
    featured: true,
  },
  {
    id: '4',
    title: 'AfroBeats Live: Festival Highlights',
    category: 'Live Performance',
    date: 'January 28, 2024',
    description: 'Best moments from our recent AfroBeats festival celebration.',
    thumbnail: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoType: 'youtube',
    duration: '12:15',
    views: 45200,
  },
  {
    id: '5',
    title: 'Behind the Scenes: Event Production',
    category: 'Behind Scenes',
    date: 'January 15, 2024',
    description: 'Go behind the scenes of how we bring events to life.',
    thumbnail: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoType: 'youtube',
    duration: '8:45',
    views: 9800,
  },
  {
    id: '6',
    title: 'New Music: Diaspora Anthem',
    category: 'Music Video',
    date: 'January 5, 2024',
    description: 'Premiere of our latest music video celebrating diaspora unity.',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoType: 'youtube',
    duration: '4:30',
    views: 67800,
  },
  {
    id: '7',
    title: 'Fashion Forward: African Designers',
    category: 'Feature',
    date: 'December 20, 2023',
    description: 'Showcasing innovative African fashion designers.',
    thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoType: 'youtube',
    duration: '14:20',
    views: 23400,
  },
  {
    id: '8',
    title: 'Culinary Journey: Diaspora Flavors',
    category: 'Documentary',
    date: 'December 10, 2023',
    description: 'Exploring the rich culinary traditions of the African diaspora.',
    thumbnail: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoType: 'youtube',
    duration: '19:50',
    views: 31200,
  },
  {
    id: '9',
    title: 'Artist Spotlight: The Next Wave',
    category: 'Interview',
    date: 'November 25, 2023',
    description: 'Conversations with breakthrough artists shaping the future.',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoType: 'youtube',
    duration: '16:40',
    views: 18900,
  },
  {
    id: '10',
    title: 'Community Impact: Building Bridges',
    category: 'Feature',
    date: 'November 15, 2023',
    description: 'How our community initiatives are making a real difference.',
    thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoType: 'youtube',
    duration: '13:25',
    views: 15600,
  },
  {
    id: '11',
    title: 'Live Session: Acoustic Performances',
    category: 'Live Performance',
    date: 'November 5, 2023',
    description: 'Intimate acoustic sessions with talented musicians.',
    thumbnail: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&h=600&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoType: 'youtube',
    duration: '25:10',
    views: 28900,
  },
  {
    id: '12',
    title: 'Tech Innovation: Diaspora Entrepreneurs',
    category: 'Feature',
    date: 'October 28, 2023',
    description: 'Meet the tech innovators changing the game.',
    thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoType: 'youtube',
    duration: '17:30',
    views: 22100,
  },
  {
    id: '13',
    title: 'Heritage Stories: Preserving Culture',
    category: 'Documentary',
    date: 'October 15, 2023',
    description: 'How communities preserve and celebrate their heritage.',
    thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoType: 'youtube',
    duration: '21:15',
    views: 34200,
  },
  {
    id: '14',
    title: 'Music Evolution: From Roots to Now',
    category: 'Documentary',
    date: 'October 5, 2023',
    description: 'The evolution of African music through the diaspora.',
    thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=600&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoType: 'youtube',
    duration: '28:45',
    views: 41200,
  },
  {
    id: '15',
    title: 'Exclusive: Studio Session',
    category: 'Behind Scenes',
    date: 'September 28, 2023',
    description: 'Go inside the studio with recording artists.',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoType: 'youtube',
    duration: '10:20',
    views: 18700,
  },
]

// Video Embed Component
function VideoEmbed({ mediaItem, className = '' }: { mediaItem: MediaItem; className?: string }) {
  if (!mediaItem.videoUrl) return null

  const getEmbedUrl = () => {
    if (!mediaItem.videoUrl) return ''
    
    if (mediaItem.videoType === 'youtube') {
      // Extract video ID from YouTube URL
      const videoId = mediaItem.videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1]
      return videoId ? `https://www.youtube.com/embed/${videoId}` : mediaItem.videoUrl
    }
    if (mediaItem.videoType === 'vimeo') {
      const videoId = mediaItem.videoUrl.match(/vimeo\.com\/(\d+)/)?.[1]
      return videoId ? `https://player.vimeo.com/video/${videoId}` : mediaItem.videoUrl
    }
    return mediaItem.videoUrl
  }

  return (
    <div className={`relative w-full h-full rounded-2xl overflow-hidden bg-card/50 ${className}`}>
      <iframe
        src={getEmbedUrl()}
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={mediaItem.title}
        style={{ borderRadius: '1rem' }}
      />
    </div>
  )
}

// Media Card Component with Glassmorphism
function MediaCard({ mediaItem, onPlay }: { mediaItem: MediaItem; onPlay: (item: MediaItem) => void }) {
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
        {/* Glossy overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none z-10" />
        
        {/* Thumbnail/Video */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={mediaItem.thumbnail}
            alt={mediaItem.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
          
          {/* Play Button Overlay */}
          {mediaItem.videoUrl && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                onClick={() => onPlay(mediaItem)}
                className="w-16 h-16 rounded-full bg-accent-gold/90 backdrop-blur-md flex items-center justify-center text-background hover:bg-accent-gold transition-colors shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </motion.button>
            </div>
          )}

          {/* Category Tag */}
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md text-accent-gold text-xs font-medium border border-accent-gold/30">
              {mediaItem.category}
            </span>
          </div>

          {/* Duration */}
          {mediaItem.duration && (
            <div className="absolute bottom-4 right-4 z-20">
              <span className="px-2 py-1 rounded bg-background/80 backdrop-blur-md text-text-primary text-xs font-medium">
                {mediaItem.duration}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 relative z-10">
          <div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-accent-gold transition-colors">
              {mediaItem.title}
            </h3>
            <div className="space-y-2 text-sm text-text-muted">
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {mediaItem.date}
              </p>
              {mediaItem.views && (
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {mediaItem.views.toLocaleString()} views
                </p>
              )}
            </div>
          </div>

          <p className="text-text-muted text-sm line-clamp-2">{mediaItem.description}</p>

          <Button 
            variant="outline" 
            className="w-full text-sm"
            onClick={() => onPlay(mediaItem)}
          >
            {mediaItem.videoUrl ? '▶ Watch Now' : 'Read More'}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

// Main Component
export default function Media() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [showModal, setShowModal] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const categories = ['All', 'Interview', 'Documentary', 'Feature', 'Music Video', 'Behind Scenes', 'Live Performance']

  const filteredMedia = useMemo(() => {
    return mediaData.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const featuredMedia = mediaData.filter(m => m.featured)

  const handlePlay = (item: MediaItem) => {
    setSelectedMedia(item)
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
                Media
              </span>
            </h1>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Exclusive content, interviews, documentaries, and stories from the African diaspora
            </p>
          </motion.div>

          {/* Featured Media */}
          {featuredMedia.length > 0 && (
            <motion.section
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <span>⭐</span>
                <span>Featured Content</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredMedia.map((item) => (
                  <MediaCard
                    key={item.id}
                    mediaItem={item}
                    onPlay={handlePlay}
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
            {/* Search */}
            <div className="glass-effect rounded-2xl p-4">
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search media..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-background/50 border border-border/50 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold/50 transition-all"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'glass-effect text-accent-gold border-2 border-accent-gold/50 glow-effect'
                      : 'bg-card/50 border border-border/50 text-text-muted hover:border-accent-gold/30 hover:text-text-primary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Media Grid */}
          <AnimatePresence mode="wait">
            {filteredMedia.length > 0 ? (
              <motion.div
                key={selectedCategory + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredMedia.map((item) => (
                  <MediaCard
                    key={item.id}
                    mediaItem={item}
                    onPlay={handlePlay}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-text-muted text-xl">No media found matching your criteria.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {showModal && selectedMedia && (
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
                  {/* Close Button */}
                  <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass-effect flex items-center justify-center text-text-primary hover:text-accent-gold transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Video Player */}
                  <div className="relative w-full aspect-video bg-card rounded-t-3xl overflow-hidden">
                    {selectedMedia.videoUrl ? (
                      <VideoEmbed mediaItem={selectedMedia} className="absolute inset-0" />
                    ) : (
                      <img
                        src={selectedMedia.thumbnail}
                        alt={selectedMedia.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Media Details */}
                  <div className="p-8 space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-accent-gold/20 text-accent-gold text-sm font-medium">
                          {selectedMedia.category}
                        </span>
                        {selectedMedia.duration && (
                          <span className="px-3 py-1 rounded-full bg-card/50 text-text-muted text-sm">
                            {selectedMedia.duration}
                          </span>
                        )}
                        {selectedMedia.views && (
                          <span className="px-3 py-1 rounded-full bg-card/50 text-text-muted text-sm">
                            {selectedMedia.views.toLocaleString()} views
                          </span>
                        )}
                      </div>
                      <h2 className="text-4xl font-bold mb-4">{selectedMedia.title}</h2>
                      <p className="text-text-muted flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {selectedMedia.date}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-3">About</h3>
                      <p className="text-text-muted leading-relaxed">
                        {selectedMedia.longDescription || selectedMedia.description}
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
