"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Command } from "lucide-react"
import { Button } from "@/components/ui/button"
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = navItems.map((item) => item.href.substring(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
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
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("#hero")
            }}
            className="text-lg font-bold text-foreground"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-primary">alex</span>
            <span className="text-muted-foreground">.dev</span>
          </motion.a>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors",
                    activeSection === item.href.substring(1)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                  {activeSection === item.href.substring(1) && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Keyboard hint + CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => {
                const event = new KeyboardEvent("keydown", {
                  key: "k",
                  metaKey: true,
                })
                document.dispatchEvent(event)
              }}
              className="flex items-center gap-1.5 rounded-md border border-border/50 bg-secondary/30 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
            >
              <Command className="h-3 w-3" />
              <span>K</span>
            </button>
            <Button
              size="sm"
              onClick={() => scrollToSection("#contact")}
              className="bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90"
            >
              Contact
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 border-b border-border/50 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <nav className="mx-auto max-w-5xl px-6 py-4">
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
                        "block rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                        activeSection === item.href.substring(1)
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
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
                  <Button
                    className="w-full bg-primary text-primary-foreground"
                    onClick={() => scrollToSection("#contact")}
                  >
                    Get in touch
                  </Button>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
