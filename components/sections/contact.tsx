"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Check, Send, Github, Linkedin, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

const loadingFrames = [
  "Sending...",
  "[ ▓▓░░░░░░ ] 25%",
  "[ ▓▓▓▓░░░░ ] 50%",
  "[ ▓▓▓▓▓▓░░ ] 75%",
  "[ ▓▓▓▓▓▓▓▓ ] 100%",
  "Complete.",
]

function TerminalInput({
  label,
  value,
  onChange,
  type = "text",
  multiline = false,
  error = false,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  multiline?: boolean
  error?: boolean
}) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={`group ${error ? "animate-shake" : ""}`}>
      <div className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-primary/60">
        {label}
      </div>
      <div className="flex items-start gap-2 rounded-lg border border-border/50 bg-secondary/30 px-3 py-2.5 transition-all focus-within:border-primary/50 focus-within:bg-secondary/50">
        <span className="font-mono text-sm text-primary/50">&gt;</span>
        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows={4}
            className={`flex-1 resize-none bg-transparent font-mono text-sm outline-none ${
              error ? "text-destructive" : "text-foreground"
            } placeholder:text-muted-foreground/50`}
            placeholder="Type your message..."
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`flex-1 bg-transparent font-mono text-sm outline-none ${
              error ? "text-destructive" : "text-foreground"
            } placeholder:text-muted-foreground/50`}
            placeholder={label === "Signal Address" ? "email@example.com" : ""}
          />
        )}
        {isFocused && !value && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="font-mono text-sm text-primary"
          >
            _
          </motion.span>
        )}
      </div>
    </div>
  )
}

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loadingFrame, setLoadingFrame] = useState(0)
  const [error, setError] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

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
      setError(true)
      setTimeout(() => setError(false), 500)
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
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:hello@alexchen.dev", label: "Email" },
  ]

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-primary">
            Contact
          </span>
          <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Get In Touch
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Have a project in mind or want to collaborate? Send me a message and
            I&apos;ll get back to you soon.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm">
              {/* Terminal header */}
              <div className="flex items-center gap-2 border-b border-border/50 bg-secondary/30 px-4 py-3">
                <div className="h-2.5 w-2.5 rounded-full bg-destructive/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-chart-4/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-chart-3/80" />
                <span className="ml-3 font-mono text-xs text-muted-foreground">
                  contact.sh
                </span>
              </div>

              {/* Form body */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="relative mb-6"
                      >
                        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
                          <Check className="h-8 w-8 text-primary" />
                        </div>
                        <motion.div
                          animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="absolute inset-0 rounded-full border border-primary"
                        />
                      </motion.div>
                      <h3 className="mb-2 text-lg font-semibold text-foreground">
                        Message Sent
                      </h3>
                      <p className="mb-6 text-sm text-muted-foreground">
                        Thanks for reaching out. I&apos;ll respond soon.
                      </p>
                      <button
                        onClick={resetForm}
                        className="text-sm text-primary hover:underline"
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
                      <pre className="font-mono text-sm text-primary">
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
                      <div className="mb-6 font-mono text-xs text-muted-foreground">
                        <span className="text-primary">$</span> ./send_message --secure
                      </div>

                      <TerminalInput
                        label="Name"
                        value={formData.name}
                        onChange={(v) => setFormData({ ...formData, name: v })}
                        error={error && !formData.name}
                      />
                      <TerminalInput
                        label="Signal Address"
                        value={formData.email}
                        onChange={(v) => setFormData({ ...formData, email: v })}
                        type="email"
                        error={error && !formData.email}
                      />
                      <TerminalInput
                        label="Message"
                        value={formData.message}
                        onChange={(v) => setFormData({ ...formData, message: v })}
                        multiline
                        error={error && !formData.message}
                      />

                      <Button
                        type="submit"
                        className="w-full bg-primary font-mono text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Transmit Signal
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="rounded-xl border border-border/50 bg-card/40 p-6 backdrop-blur-sm">
              <h3 className="mb-4 font-semibold text-foreground">Connect</h3>
              <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
                Prefer email or social media? Reach out through any of these channels.
              </p>

              <div className="space-y-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg border border-border/50 bg-secondary/30 px-4 py-3 text-sm text-muted-foreground transition-all hover:border-primary/30 hover:bg-secondary/50 hover:text-foreground"
                  >
                    <social.icon className="h-4 w-4" />
                    {social.label}
                  </a>
                ))}
              </div>

              <div className="mt-8 border-t border-border/50 pt-6">
                <p className="text-xs text-muted-foreground">
                  Based in San Francisco, CA
                  <br />
                  Open to remote opportunities worldwide
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </section>
  )
}
