"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { Menu, X, Command } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [scrollProgress, setScrollProgress] = useState(0)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return
      ticking.current = true

      requestAnimationFrame(() => {
        const scrollY = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0)
        setIsScrolled(scrollY > 60)

        // Scroll direction detection
        if (scrollY > lastScrollY.current + 5 && scrollY > 120) {
          setIsVisible(false)
        } else if (scrollY < lastScrollY.current - 5) {
          setIsVisible(true)
        }
        lastScrollY.current = scrollY

        // Active section detection
        const sections = navItems.map(item => item.href.substring(1))
        for (const section of sections.slice().reverse()) {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            if (rect.top <= 160) {
              setActiveSection(section)
              break
            }
          }
        }

        ticking.current = false
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
          isScrolled
            ? "border-b border-white/[0.06] bg-background/75 backdrop-blur-2xl"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-12">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("#hero")
            }}
            className="group relative flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="relative">
              <div
                className="h-7 w-7 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{
                  background: "linear-gradient(135deg, rgba(0, 217, 255, 0.2) 0%, rgba(0, 217, 255, 0.05) 100%)",
                  border: "1px solid rgba(0, 217, 255, 0.3)",
                  color: "#00D9FF",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                SM
              </div>
              <motion.div
                className="absolute inset-0 rounded-lg"
                animate={{ boxShadow: ["0 0 0px rgba(0, 217, 255, 0)", "0 0 15px rgba(0, 217, 255, 0.3)", "0 0 0px rgba(0, 217, 255, 0)"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <span
              className="text-sm font-semibold tracking-wide text-foreground/80 transition-colors group-hover:text-foreground"
              style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "0.04em" }}
            >
              satwik<span style={{ color: "#00D9FF" }}>.</span>dev
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item, i) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg",
                    activeSection === item.href.substring(1)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  style={{ letterSpacing: "0.02em" }}
                >
                  {activeSection === item.href.substring(1) && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: "rgba(0, 217, 255, 0.07)",
                        border: "1px solid rgba(0, 217, 255, 0.15)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                  {activeSection === item.href.substring(1) && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-1.5 left-4 right-4 h-px rounded-full"
                      style={{ background: "linear-gradient(90deg, #00D9FF, #F0B233)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </a>
              </motion.li>
            ))}
          </ul>

          {/* Right side */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => {
                const event = new KeyboardEvent("keydown", { key: "k", metaKey: true })
                document.dispatchEvent(event)
              }}
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground transition-all hover:text-foreground"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Command className="h-3 w-3" />
              <span>K</span>
            </button>
            <motion.button
              onClick={() => scrollToSection("#contact")}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-lg px-4 py-2 text-sm font-semibold transition-all"
              style={{
                background: "linear-gradient(135deg, rgba(0, 217, 255, 0.2) 0%, rgba(0, 217, 255, 0.08) 100%)",
                border: "1px solid rgba(0, 217, 255, 0.3)",
                color: "#00D9FF",
                boxShadow: "0 0 20px rgba(0, 217, 255, 0.1)",
                fontFamily: "var(--font-space-grotesk)",
                letterSpacing: "0.03em",
              }}
            >
              Contact
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="h-4 w-4" />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-x-4 top-20 z-40 rounded-2xl md:hidden overflow-hidden"
            style={{
              background: "rgba(9, 9, 20, 0.92)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0, 217, 255, 0.05)",
            }}
          >
            <nav className="p-4">
              <ul className="space-y-1">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection(item.href)
                      }}
                      className={cn(
                        "block rounded-xl px-4 py-3.5 text-sm font-medium transition-all",
                        activeSection === item.href.substring(1)
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                      style={
                        activeSection === item.href.substring(1)
                          ? {
                              background: "rgba(0, 217, 255, 0.07)",
                              border: "1px solid rgba(0, 217, 255, 0.15)",
                              color: "#00D9FF",
                            }
                          : { border: "1px solid transparent" }
                      }
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.05 }}
                  className="pt-2"
                >
                  <button
                    className="w-full rounded-xl py-3.5 text-sm font-semibold transition-all"
                    onClick={() => scrollToSection("#contact")}
                    style={{
                      background: "linear-gradient(135deg, rgba(0, 217, 255, 0.2) 0%, rgba(0, 217, 255, 0.08) 100%)",
                      border: "1px solid rgba(0, 217, 255, 0.3)",
                      color: "#00D9FF",
                    }}
                  >
                    Get in touch
                  </button>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
