"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Check, Send, Github, Linkedin, Twitter, Mail, MapPin, Phone } from "lucide-react"

const loadingFrames = [
  "Initializing...",
  "[ ▓▓░░░░░░ ] 25%",
  "[ ▓▓▓▓░░░░ ] 50%",
  "[ ▓▓▓▓▓▓░░ ] 75%",
  "[ ▓▓▓▓▓▓▓▓ ] 100%",
  "Transmitted.",
]

function EliteInput({
  label,
  value,
  onChange,
  type = "text",
  multiline = false,
  hasError = false,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  multiline?: boolean
  hasError?: boolean
}) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="group">
      <div
        className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em]"
        style={{
          color: isFocused ? "#00D9FF" : "oklch(0.5 0.012 250)",
          transition: "color 0.2s",
          fontFamily: "var(--font-space-grotesk)",
        }}
      >
        {label}
      </div>
      <div
        className="relative rounded-xl transition-all duration-300"
        style={{
          background: isFocused ? "rgba(0, 217, 255, 0.04)" : "rgba(255,255,255,0.03)",
          border: `1px solid ${hasError ? "rgba(239, 68, 68, 0.5)" : isFocused ? "rgba(0, 217, 255, 0.4)" : "rgba(255,255,255,0.08)"}`,
          boxShadow: isFocused ? "0 0 20px rgba(0, 217, 255, 0.08)" : "none",
        }}
      >
        <div className="flex items-start gap-3 px-4 py-3.5">
          <span
            className="mt-0.5 shrink-0 font-mono text-xs"
            style={{ color: isFocused ? "#00D9FF" : "oklch(0.45 0.012 250)", transition: "color 0.2s" }}
          >
            &gt;
          </span>
          {multiline ? (
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              rows={4}
              className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground/30"
              style={{ fontFamily: "var(--font-jetbrains-mono)", color: "oklch(0.88 0.006 220)" }}
              placeholder="Describe your project or opportunity..."
            />
          ) : (
            <input
              type={type}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/30"
              style={{ fontFamily: "var(--font-jetbrains-mono)", color: "oklch(0.88 0.006 220)" }}
              placeholder={type === "email" ? "you@company.com" : `Your ${label.toLowerCase()}...`}
            />
          )}
          {isFocused && !value && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.7, repeat: Infinity }}
              className="shrink-0 font-mono text-sm"
              style={{ color: "#00D9FF" }}
            >
              _
            </motion.span>
          )}
        </div>
      </div>
    </div>
  )
}

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loadingFrame, setLoadingFrame] = useState(0)
  const [hasError, setHasError] = useState(false)

  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  useEffect(() => {
    if (isSubmitting) {
      const interval = setInterval(() => {
        setLoadingFrame((prev) => {
          if (prev >= loadingFrames.length - 1) {
            clearInterval(interval)
            setIsSubmitting(false)
            setSubmitted(true)
            return prev
          }
          return prev + 1
        })
      }, 400)
      return () => clearInterval(interval)
    }
  }, [isSubmitting])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      setHasError(true)
      setTimeout(() => setHasError(false), 600)
      return
    }
    setLoadingFrame(0)
    setIsSubmitting(true)
  }

  const resetForm = () => {
    setSubmitted(false)
    setFormData({ name: "", email: "", message: "" })
  }

  const socials = [
    { icon: Github, href: "https://github.com/Satwik290", label: "GitHub", color: "#ffffff" },
    { icon: Linkedin, href: "https://linkedin.com/in/satwik290", label: "LinkedIn", color: "#0077B5" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter", color: "#1DA1F2" },
    { icon: Mail, href: "mailto:mohanty.satwik290@gmail.com", label: "Email", color: "#00D9FF" },
  ]

  return (
    <section id="contact" className="relative section-padding overflow-hidden">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(0, 217, 255, 0.05) 0%, transparent 60%)",
          }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0, 217, 255, 0.04) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="section-container">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span
            className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#00D9FF", fontFamily: "var(--font-space-grotesk)" }}
          >
            Contact
          </span>
          <h2
            className="mb-6 font-bold"
            style={{ fontFamily: "var(--font-syne)", fontSize: "var(--text-section)", letterSpacing: "-0.02em" }}
          >
            Let&apos;s build{" "}
            <span className="text-gradient-cyan">something</span>
          </h2>
          <p className="max-w-xl text-lg" style={{ color: "oklch(0.62 0.015 250)", lineHeight: "1.75" }}>
            Have an interesting project or opportunity? Let&apos;s discuss how I can help you build scalable, high-performance systems.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Terminal form */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="lg:col-span-3"
          >
            <div
              className="overflow-hidden rounded-2xl"
              style={{
                background: "rgba(9, 9, 20, 0.8)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04) inset",
              }}
            >
              {/* Terminal title bar */}
              <div
                className="flex items-center gap-2 border-b px-5 py-4"
                style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
              >
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#FF5F57" }} />
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#28C840" }} />
                <span
                  className="ml-4 text-xs"
                  style={{ color: "oklch(0.45 0.012 250)", fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  ~/contact.sh
                </span>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full" style={{ background: "#00D9FF" }} />
                  <span className="text-[10px]" style={{ color: "#00D9FF", fontFamily: "var(--font-jetbrains-mono)" }}>
                    secure
                  </span>
                </div>
              </div>

              {/* Form area */}
              <div className="p-6 lg:p-8">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-center justify-center py-14 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 250, damping: 18 }}
                        className="relative mb-8"
                      >
                        <div
                          className="flex h-20 w-20 items-center justify-center rounded-full"
                          style={{
                            background: "rgba(0, 217, 255, 0.1)",
                            border: "2px solid rgba(0, 217, 255, 0.4)",
                          }}
                        >
                          <Check className="h-10 w-10" style={{ color: "#00D9FF" }} />
                        </div>
                        <motion.div
                          animate={{ scale: [1, 1.5, 1.8], opacity: [0.6, 0.3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="absolute inset-0 rounded-full"
                          style={{ border: "1px solid rgba(0, 217, 255, 0.4)" }}
                        />
                      </motion.div>
                      <h3
                        className="mb-3 text-xl font-bold"
                        style={{ fontFamily: "var(--font-syne)", color: "#00D9FF" }}
                      >
                        Message Transmitted
                      </h3>
                      <p className="mb-8 text-sm" style={{ color: "oklch(0.6 0.012 250)" }}>
                        Signal received. I&apos;ll get back to you within 24 hours.
                      </p>
                      <button
                        onClick={resetForm}
                        className="text-sm underline-gradient"
                        style={{ color: "oklch(0.65 0.012 250)", fontFamily: "var(--font-space-grotesk)" }}
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : isSubmitting ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-16"
                    >
                      <pre
                        className="text-sm"
                        style={{ fontFamily: "var(--font-jetbrains-mono)", color: "#00D9FF" }}
                      >
                        {loadingFrames[loadingFrame]}
                      </pre>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <div
                        className="mb-6 text-xs"
                        style={{ fontFamily: "var(--font-jetbrains-mono)", color: "oklch(0.45 0.012 250)" }}
                      >
                        <span style={{ color: "#00D9FF" }}>$</span>{" "}
                        ./send_message --secure --encrypt
                      </div>

                      <EliteInput
                        label="Name"
                        value={formData.name}
                        onChange={(v) => setFormData({ ...formData, name: v })}
                        hasError={hasError && !formData.name}
                      />
                      <EliteInput
                        label="Email Address"
                        value={formData.email}
                        onChange={(v) => setFormData({ ...formData, email: v })}
                        type="email"
                        hasError={hasError && !formData.email}
                      />
                      <EliteInput
                        label="Message"
                        value={formData.message}
                        onChange={(v) => setFormData({ ...formData, message: v })}
                        multiline
                        hasError={hasError && !formData.message}
                      />

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.01, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-2 flex w-full items-center justify-center gap-3 rounded-xl py-4 text-sm font-semibold transition-all"
                        style={{
                          background: "linear-gradient(135deg, rgba(0, 217, 255, 0.25) 0%, rgba(0, 217, 255, 0.12) 100%)",
                          border: "1px solid rgba(0, 217, 255, 0.4)",
                          color: "#00D9FF",
                          boxShadow: "0 0 30px rgba(0, 217, 255, 0.12)",
                          fontFamily: "var(--font-space-grotesk)",
                          letterSpacing: "0.04em",
                        }}
                      >
                        <Send className="h-4 w-4" />
                        Transmit Message
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col gap-5 lg:col-span-2"
          >
            {/* Connect card */}
            <div
              className="rounded-2xl p-7"
              style={{
                background: "var(--glass-card)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(16px)",
              }}
            >
              <h3
                className="mb-2 text-lg font-bold"
                style={{ fontFamily: "var(--font-syne)", color: "oklch(0.9 0.006 220)" }}
              >
                Let&apos;s connect
              </h3>
              <p className="mb-6 text-sm leading-relaxed" style={{ color: "oklch(0.58 0.012 250)", lineHeight: "1.7" }}>
                Reach out through any channel. I&apos;m always interested in new opportunities and interesting collaborations.
              </p>

              <div className="space-y-2.5">
                {socials.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm transition-all"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      color: "oklch(0.7 0.012 250)",
                    }}
                    onMouseEnter={e => {
                      ;(e.currentTarget as HTMLElement).style.borderColor = `${social.color}25`
                      ;(e.currentTarget as HTMLElement).style.color = social.color
                    }}
                    onMouseLeave={e => {
                      ;(e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"
                      ;(e.currentTarget as HTMLElement).style.color = "oklch(0.7 0.012 250)"
                    }}
                  >
                    <social.icon className="h-4 w-4 shrink-0" />
                    <span style={{ fontFamily: "var(--font-space-grotesk)" }}>{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Info card */}
            <div
              className="rounded-2xl p-7"
              style={{
                background: "rgba(0, 217, 255, 0.03)",
                border: "1px solid rgba(0, 217, 255, 0.1)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="space-y-4 text-sm" style={{ color: "oklch(0.62 0.012 250)" }}>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 shrink-0" style={{ color: "#00D9FF" }} />
                  <span>Cuttack, Odisha, India</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0" style={{ color: "#00D9FF" }} />
                  <span style={{ fontFamily: "var(--font-jetbrains-mono)" }}>+91-7978657181</span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: "#28C840", boxShadow: "0 0 8px rgba(40, 200, 64, 0.5)" }}
                  />
                  <span>Open to remote worldwide</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}