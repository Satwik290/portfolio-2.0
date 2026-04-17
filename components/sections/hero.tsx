"use client"

import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NodeGraph } from "@/components/node-graph"

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background Node Graph */}
      <NodeGraph />

      {/* Subtle gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Open to opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
        >
          <span className="text-foreground">Engineering scalable</span>
          <br />
          <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
            high-availability systems
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-muted-foreground leading-relaxed"
          data-cursor="text"
        >
          Hi, I'm Satwik Mohanty. A Full-Stack Software Engineer with architectural focus on building scalable web systems. Experienced in the modern JavaScript ecosystem and skilled in managing complex data layers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            className="min-w-[160px] bg-primary font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
            onClick={() => scrollToSection("contact")}
          >
            Get in touch
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="min-w-[160px] border-border/60 bg-background/50 font-medium backdrop-blur-sm hover:border-primary/40 hover:bg-primary/5"
            onClick={() => scrollToSection("projects")}
          >
            View my work
          </Button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-14 flex items-center justify-center gap-5"
        >
          {[
            { icon: Github, href: "https://github.com/Satwik290", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
            { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-border/50 bg-card/50 text-muted-foreground backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
              aria-label={social.label}
            >
              <social.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToSection("about")}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground/60 transition-colors hover:text-primary"
        aria-label="Scroll to about section"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-5 w-5" />
        </motion.div>
      </motion.button>
    </section>
  )
}