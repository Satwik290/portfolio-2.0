"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Heart, ArrowUp } from "lucide-react"

const socials = [
  { icon: Github, href: "https://github.com/Satwik290", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/satwik290", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(5, 5, 8, 0.8)",
      }}
    >
      {/* Gradient line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0, 217, 255, 0.4), transparent)" }}
      />

      <div className="section-container py-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                scrollToTop()
              }}
              whileHover={{ scale: 1.02 }}
              className="inline-block text-lg font-bold"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              <span style={{ color: "#00D9FF" }}>satwik</span>
              <span style={{ color: "oklch(0.5 0.012 250)" }}>.dev</span>
            </motion.a>
            <p
              className="mt-1 text-xs"
              style={{ color: "oklch(0.45 0.012 250)", fontFamily: "var(--font-space-grotesk)", letterSpacing: "0.06em" }}
            >
              Fullstack Engineer · Systems Architect
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2.5">
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "oklch(0.55 0.012 250)",
                }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = "rgba(0, 217, 255, 0.25)"
                  ;(e.currentTarget as HTMLElement).style.color = "#00D9FF"
                  ;(e.currentTarget as HTMLElement).style.boxShadow = "0 0 12px rgba(0, 217, 255, 0.15)"
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"
                  ;(e.currentTarget as HTMLElement).style.color = "oklch(0.55 0.012 250)"
                  ;(e.currentTarget as HTMLElement).style.boxShadow = "none"
                }}
              >
                <social.icon className="h-3.5 w-3.5" />
              </motion.a>
            ))}

            {/* Back to top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Back to top"
              className="ml-1 flex h-9 w-9 items-center justify-center rounded-xl"
              style={{
                background: "rgba(0, 217, 255, 0.07)",
                border: "1px solid rgba(0, 217, 255, 0.2)",
                color: "#00D9FF",
              }}
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </motion.button>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="mt-8 flex flex-col items-center justify-between gap-3 border-t pt-6 text-[11px] sm:flex-row"
          style={{ borderColor: "rgba(255,255,255,0.04)", color: "oklch(0.42 0.012 250)", fontFamily: "var(--font-space-grotesk)" }}
        >
          <p>&copy; {currentYear} Satwik Mohanty. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with
            <Heart className="h-3 w-3" style={{ color: "#00D9FF" }} />
            using Next.js & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
