export type BulkUseCaseId =
  | "wedding"
  | "event"
  | "community"
  | "marketing"
  | "reminders"

export type PaymentMethod = "paypal" | "mobile_money" | "card"

export type BulkDraft = {
  useCase: BulkUseCaseId
  campaignName: string
  senderId: string
  recipients: { phone: string; name?: string }[]
  message: string
  scheduledAt?: string | null
  createdAt: number
}

export const useCases: {
  id: BulkUseCaseId
  title: string
  description: string
  icon: string
  defaultCampaignName: string
  template: string
}[] = [
  {
    id: "wedding",
    title: "Promote Wedding",
    description: "Invite guests and share venue/time details with a clean RSVP-style message.",
    icon: "💍",
    defaultCampaignName: "Wedding Invitation",
    template:
      "Hello {name}, you’re warmly invited to our wedding celebration! 🎉\nDate: {date}\nTime: {time}\nVenue: {venue}\nRSVP: {rsvp}\n— KABS Promotions",
  },
  {
    id: "event",
    title: "Promote Event",
    description: "Announce events, tickets, dress code, and reminders to your audience.",
    icon: "🎟️",
    defaultCampaignName: "Event Promo",
    template:
      "Hi {name}! Don’t miss {event_name} 🔥\nDate: {date} • Time: {time}\nLocation: {venue}\nTickets: {link}\nSee you there!",
  },
  {
    id: "community",
    title: "Community Update",
    description: "Send important announcements and updates to community members.",
    icon: "📬",
    defaultCampaignName: "Community Update",
    template:
      "Hello {name}, quick update from KABS Community:\n{update}\nMore info: {link}\nThank you!",
  },
  {
    id: "marketing",
    title: "Marketing Campaign",
    description: "Run targeted promotions and special offers with tracking-friendly links.",
    icon: "📢",
    defaultCampaignName: "Marketing Campaign",
    template:
      "Hi {name}! Special offer just for you 🎁\n{offer}\nUse code: {code}\nShop: {link}\nReply STOP to opt out.",
  },
  {
    id: "reminders",
    title: "Scheduled Reminder",
    description: "Schedule reminders for appointments, meetups, payments, or deadlines.",
    icon: "⏰",
    defaultCampaignName: "Reminder",
    template:
      "Hello {name}, friendly reminder:\n{reminder}\nDate: {date} • Time: {time}\n— KABS Promotions",
  },
]

// Pricing (simple + realistic)
export const pricing = {
  currency: "USD",
  perMessage: 0.015, // 1.5 cents per message segment per recipient
  segmentSize: 160,
  minCharge: 5,
}

export function calcSegments(text: string) {
  const len = (text || "").length
  return Math.max(1, Math.ceil(len / pricing.segmentSize))
}

export function normalizePhone(raw: string) {
  return raw.replace(/[^\d+]/g, "").trim()
}

export function parseRecipientsFromTextarea(text: string) {
  // Accept: +2567..., 2567..., 07..., with commas/newlines
  const tokens = text
    .split(/[\n,;]/g)
    .map((t) => normalizePhone(t))
    .filter(Boolean)

  // Deduplicate
  const set = new Set<string>()
  const recipients = tokens
    .map((phone) => {
      if (!set.has(phone)) set.add(phone)
      return phone
    })
    .filter((phone) => set.has(phone))
    .map((phone) => ({ phone }))

  return recipients
}

export function estimateCost(draft: BulkDraft) {
  const segments = calcSegments(draft.message)
  const qty = draft.recipients.length
  const raw = qty * segments * pricing.perMessage
  const total = Math.max(pricing.minCharge, Number(raw.toFixed(2)))
  return { qty, segments, total, currency: pricing.currency }
}

export function draftStorageKey(useCase: BulkUseCaseId) {
  return `kabs_bulk_sms_draft_${useCase}`
}

export function makeDefaultDraft(useCase: BulkUseCaseId): BulkDraft {
  const uc = useCases.find((u) => u.id === useCase)
  return {
    useCase,
    campaignName: uc?.defaultCampaignName || "Bulk SMS Campaign",
    senderId: "KABS",
    recipients: [],
    message: uc?.template || "Hello {name}, your message here.",
    scheduledAt: null,
    createdAt: Date.now(),
  }
}
