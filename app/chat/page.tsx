"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import Card from "@/components/Card"
import Button from "@/components/Button"

type Sender = "user" | "kabs"

type ChatMessage = {
  id: string
  text: string
  sender: Sender
  ts: number
}

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export default function Chat() {
  const prefersReducedMotion = useReducedMotion()
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uid(),
      text: "Hey! Welcome to Chat with Kabs. How can I help you today?",
      sender: "kabs",
      ts: Date.now(),
    },
  ])

  const endRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" })
  }, [messages, isTyping, prefersReducedMotion])

  const quickTopics = useMemo(
    () => [
      { label: "Events & Tickets", prompt: "I need help with events and tickets." },
      { label: "Radio & TV", prompt: "How do I watch KABS TV or listen to Radio?" },
      { label: "Community", prompt: "How do I join the community and participate?" },
      { label: "Bulk SMS", prompt: "How does Bulk SMS work and how do I start?" },
    ],
    []
  )

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  async function sendToAI(userText: string) {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText }),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data?.error || "Failed to get AI response.")
    }

    const data: { reply?: string } = await res.json()
    return data.reply?.trim() || "Thanks for reaching out — how can I help further?"
  }

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setError(null)

    const text = message.trim()
    if (!text) return

    const userMsg: ChatMessage = { id: uid(), text, sender: "user", ts: Date.now() }
    setMessages((prev) => [...prev, userMsg])
    setMessage("")
    setIsTyping(true)

    try {
      const reply = await sendToAI(text)
      const kabsMsg: ChatMessage = { id: uid(), text: reply, sender: "kabs", ts: Date.now() }
      setMessages((prev) => [...prev, kabsMsg])
    } catch (err: any) {
      setError(err?.message || "Something went wrong.")
      // Friendly fallback message in UI
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          text:
            "I’m having trouble reaching the assistant right now. Try again in a moment — or ask about Events, TV/Radio, Community, or Bulk SMS.",
          sender: "kabs",
          ts: Date.now(),
        },
      ])
    } finally {
      setIsTyping(false)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }

  const handleQuickTopic = (prompt: string) => {
    setMessage(prompt)
    setTimeout(() => handleSend(), 50)
  }

  return (
    <>
      {/* Same helpers as TV page */}
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
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-card/50 to-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,179,1,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,138,0,0.1),transparent_50%)]" />
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div initial="initial" animate="animate" variants={fadeInUp} className="text-center mb-10">
            <h1 className="text-5xl sm:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-accent-gold via-accent-orange to-accent-gold bg-clip-text text-transparent">
                Chat with Kabs
              </span>
            </h1>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Ask anything about Events, TV/Radio, Community — or the Bulk SMS add-on.
            </p>
          </motion.div>

          {/* Quick topics */}
          <motion.div initial="initial" animate="animate" variants={fadeInUp} className="mb-6 flex flex-wrap gap-3 justify-center">
            {quickTopics.map((t) => (
              <button
                key={t.label}
                onClick={() => handleQuickTopic(t.prompt)}
                className="px-5 py-3 rounded-xl font-medium transition-all duration-300 bg-card/50 border border-border/50 text-text-muted hover:border-accent-gold/30 hover:text-text-primary"
              >
                {t.label}
              </button>
            ))}
          </motion.div>

          {/* Chat container */}
          <motion.div initial="initial" animate="animate" variants={fadeInUp}>
            <div className="glass-effect rounded-3xl overflow-hidden glow-effect">
              <div className="relative p-6 sm:p-8">
                <div className="absolute inset-0 glossy-overlay pointer-events-none" />

                <div className="relative z-10">
                  <Card className="h-[640px] flex flex-col bg-transparent border-0 shadow-none p-0">
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                      <AnimatePresence initial={false}>
                        {messages.map((msg) => (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[85%] rounded-2xl px-4 py-3 border transition-colors ${
                                msg.sender === "user"
                                  ? "bg-accent-gold text-background border-accent-gold/40"
                                  : "bg-card/40 text-text-primary border-border/50"
                              }`}
                            >
                              <p className="text-sm sm:text-base leading-relaxed">{msg.text}</p>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      {/* Typing indicator */}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-card/40 border border-border/50 rounded-2xl px-4 py-3 text-text-muted">
                            <div className="flex items-center gap-2">
                              {!prefersReducedMotion ? (
                                <>
                                  <span className="inline-block w-2 h-2 rounded-full bg-accent-gold/70 animate-bounce" />
                                  <span className="inline-block w-2 h-2 rounded-full bg-accent-gold/70 animate-bounce [animation-delay:150ms]" />
                                  <span className="inline-block w-2 h-2 rounded-full bg-accent-gold/70 animate-bounce [animation-delay:300ms]" />
                                </>
                              ) : (
                                <span>Typing…</span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      <div ref={endRef} />
                    </div>

                    {/* Error */}
                    {error && (
                      <div className="mt-4 text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                        {error}
                      </div>
                    )}

                    {/* Input */}
                    <form onSubmit={handleSend} className="mt-6 flex gap-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message…"
                        className="flex-1 px-4 py-3 rounded-xl bg-background/40 border border-border/50 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-gold/40 focus:border-accent-gold/40 transition-all"
                      />
                      <Button type="submit" variant="primary" disabled={isTyping}>
                        {isTyping ? "Sending…" : "Send"}
                      </Button>
                    </form>
                  </Card>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Small note */}
          <p className="text-center text-sm text-text-muted mt-6">
            Tip: Ask about ticket pricing, upcoming events, how to tune into radio, or how Bulk SMS works.
          </p>
        </div>
      </div>
    </>
  )
}
