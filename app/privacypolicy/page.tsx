'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Card from '@/components/Card'
import Button from '@/components/Button'

export default function PrivacyPolicyPage() {
  const prefersReducedMotion = useReducedMotion()

  const fadeInUp = {
    initial: { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: prefersReducedMotion ? 0 : 0.6 },
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
              rgba(255, 255, 255, 0.10) 0%,
              rgba(255, 255, 255, 0.05) 50%,
              transparent 100%
            );
          }
          .glow-effect {
            box-shadow: 0 0 30px rgba(245, 179, 1, 0.18),
                        0 0 60px rgba(245, 179, 1, 0.10),
                        inset 0 0 30px rgba(255, 255, 255, 0.04);
          }
        `,
        }}
      />

      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
        {/* Background */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-card/50 to-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(245,179,1,0.10),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_85%,rgba(255,138,0,0.10),transparent_55%)]" />
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div initial="initial" animate="animate" variants={fadeInUp} className="text-center mb-10">
            <h1 className="text-5xl sm:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-accent-gold via-accent-orange to-accent-gold bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </h1>
            <p className="text-xl text-text-muted max-w-3xl mx-auto">
              This Privacy Policy explains how KABS Promotions collects, uses, and protects your information when you use
              our website and services.
            </p>
            <p className="text-sm text-text-muted mt-3">
              Effective date: <span className="text-text-primary font-medium">December 27, 2025</span>
            </p>
          </motion.div>

          {/* Main content */}
          <motion.div initial="initial" animate="animate" variants={fadeInUp}>
            <Card className="p-0 overflow-hidden">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/50 shadow-2xl">
                <div className="absolute inset-0 glossy-overlay pointer-events-none" />
                <div className="relative p-7 sm:p-10 space-y-10">
                  <Section title="1) Who We Are">
                    <p className="text-text-muted leading-relaxed">
                      KABS Promotions (“KABS”, “we”, “us”, or “our”) provides media and promotions services including (but
                      not limited to) radio, TV content listings/streaming links, events promotion, community features,
                      and bulk messaging tools.
                    </p>
                    <p className="text-text-muted leading-relaxed mt-3">
                      If you have questions about this policy, contact us using the details in the “Contact Us” section.
                    </p>
                  </Section>

                  <Section title="2) Information We Collect">
                    <div className="space-y-4">
                      <BulletBlock
                        title="A) Information you provide"
                        bullets={[
                          'Account details (such as name, email, phone number) when you create an account or contact us.',
                          'Content you submit (messages, community posts, event details, or support requests).',
                          'Payment-related information when purchasing services (processed by third-party payment providers).',
                        ]}
                      />
                      <BulletBlock
                        title="B) Information collected automatically"
                        bullets={[
                          'Device and usage data (IP address, browser type, pages viewed, time spent, referring links).',
                          'Cookies or similar technologies to support security, analytics, and feature functionality.',
                        ]}
                      />
                      <BulletBlock
                        title="C) Information from third parties"
                        bullets={[
                          'Payment confirmation and limited transaction metadata from payment providers (e.g., Flutterwave, PayPal).',
                          'Service delivery status data from messaging providers (e.g., Africa’s Talking) if you use Bulk SMS.',
                        ]}
                      />
                    </div>
                  </Section>

                  <Section title="3) How We Use Your Information">
                    <BulletList
                      bullets={[
                        'To provide and operate our services (streaming links, community features, event listings, bulk messaging).',
                        'To process requests, send service notifications, and provide customer support.',
                        'To improve site performance, user experience, and feature reliability.',
                        'To prevent fraud, abuse, and security incidents.',
                        'To comply with legal obligations and enforce our terms.',
                      ]}
                    />
                  </Section>

                  <Section title="4) Cookies & Analytics">
                    <p className="text-text-muted leading-relaxed">
                      We may use cookies and similar technologies for essential functionality (like keeping you logged in),
                      security, and analytics. You can control cookies in your browser settings. Disabling cookies may
                      impact some features.
                    </p>
                  </Section>

                  <Section title="5) Payments">
                    <p className="text-text-muted leading-relaxed">
                      Payments are processed by third-party providers (for example: PayPal, Flutterwave). We do not store
                      your full card details on our servers. Payment providers may collect and process your information
                      according to their own privacy policies.
                    </p>
                  </Section>

                  <Section title="6) Bulk SMS & Communications">
                    <p className="text-text-muted leading-relaxed">
                      If you use our Bulk SMS tools, we may process recipient numbers, message content, delivery status,
                      and campaign metadata to send messages and provide reporting. Messaging delivery may be carried out
                      through third-party providers (such as Africa’s Talking) depending on configuration and country.
                    </p>
                    <p className="text-text-muted leading-relaxed mt-3">
                      You are responsible for ensuring you have appropriate consent and comply with applicable laws and
                      regulations for messaging recipients.
                    </p>
                  </Section>

                  <Section title="7) How We Share Information">
                    <BulletList
                      bullets={[
                        'With service providers who help us operate (hosting, analytics, messaging delivery, payments).',
                        'When required by law, regulation, or legal process.',
                        'To protect rights, safety, and security of users and our platform.',
                        'In connection with a business transaction (merger, acquisition, or sale), subject to protections.',
                      ]}
                    />
                  </Section>

                  <Section title="8) Data Retention">
                    <p className="text-text-muted leading-relaxed">
                      We keep information only as long as needed to provide services, meet legal obligations, resolve
                      disputes, and enforce our agreements. Retention periods vary depending on the data type and purpose.
                    </p>
                  </Section>

                  <Section title="9) Security">
                    <p className="text-text-muted leading-relaxed">
                      We use reasonable administrative, technical, and physical safeguards to protect your information.
                      However, no method of transmission or storage is 100% secure. We cannot guarantee absolute security.
                    </p>
                  </Section>

                  <Section title="10) Your Choices & Rights">
                    <BulletList
                      bullets={[
                        'Access/Update: You may request access to or correction of your personal information.',
                        'Deletion: You may request deletion of your account and associated data, subject to legal retention requirements.',
                        'Marketing: You can opt out of promotional messages where applicable.',
                        'Cookies: You can manage cookie preferences via browser settings.',
                      ]}
                    />
                  </Section>

                  <Section title="11) Children’s Privacy">
                    <p className="text-text-muted leading-relaxed">
                      Our services are not intended for children under 13 (or the applicable age of digital consent in your
                      location). We do not knowingly collect personal data from children. If you believe a child has
                      provided information, contact us to remove it.
                    </p>
                  </Section>

                  <Section title="12) International Users">
                    <p className="text-text-muted leading-relaxed">
                      Your information may be processed in countries other than where you live, including where our hosting
                      and service providers operate. We take steps to protect your data consistent with this policy.
                    </p>
                  </Section>

                  <Section title="13) Changes to This Policy">
                    <p className="text-text-muted leading-relaxed">
                      We may update this policy from time to time. If we make material changes, we will update the “Effective
                      date” and may provide additional notice on the site.
                    </p>
                  </Section>

                  <Section title="14) Contact Us">
                    <p className="text-text-muted leading-relaxed">
                      For privacy questions, requests, or complaints, contact us:
                    </p>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="glass-effect rounded-2xl p-4">
                        <div className="text-sm text-text-muted">Email</div>
                        <div className="font-semibold text-text-primary">support@kabspromotions.com</div>
                      </div>
                      <div className="glass-effect rounded-2xl p-4">
                        <div className="text-sm text-text-muted">Business</div>
                        <div className="font-semibold text-text-primary">KABS Promotions</div>
                      </div>
                    </div>
                  </Section>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="primary" href="/contact">
                      Contact Support
                    </Button>
                    <Button variant="outline" href="/">
                      Back to Home
                    </Button>
                  </div>

                  <div className="text-center text-xs text-text-muted">
                    This document is a general privacy policy template for your site. If you want it tailored for your exact
                    legal jurisdiction, tracking tools, and payment/messaging setup, we can refine the wording.
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl sm:text-3xl font-bold text-accent-gold">{title}</h2>
      <div className="text-base">{children}</div>
    </section>
  )
}

function BulletList({ bullets }: { bullets: string[] }) {
  return (
    <ul className="space-y-2 pl-5 list-disc">
      {bullets.map((b) => (
        <li key={b} className="text-text-muted leading-relaxed">
          {b}
        </li>
      ))}
    </ul>
  )
}

function BulletBlock({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <div className="glass-effect rounded-2xl p-5">
      <div className="font-semibold text-text-primary mb-2">{title}</div>
      <BulletList bullets={bullets} />
    </div>
  )
}
