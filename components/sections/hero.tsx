"use client"

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect, useState, useRef, Suspense, useCallback } from "react"
import { Github, Linkedin, Twitter, ArrowRight } from "lucide-react"
import dynamic from "next/dynamic"

const Hero3DModel = dynamic(
  () => import("./hero-3d-model").then((m) => ({ default: m.Hero3DModel })),
  { ssr: false }
)

// ─── Magnetic Button ───────────────────────────────────────────────────────
function MagneticButton({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: () => void
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { damping: 20, stiffness: 300 })
  const springY = useSpring(y, { damping: 20, stiffness: 300 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    const RADIUS = 80
    if (dist < RADIUS) {
      const factor = (RADIUS - dist) / RADIUS
      x.set(dx * factor * 0.45)
      y.set(dy * factor * 0.45)
    }
  }, [x, y])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      style={{
        x: springX,
        y: springY,
        background: "linear-gradient(135deg, rgba(0, 217, 255, 0.25) 0%, rgba(0, 217, 255, 0.1) 100%)",
        border: "1px solid rgba(0, 217, 255, 0.4)",
        color: "#00D9FF",
        boxShadow: "0 0 30px rgba(0, 217, 255, 0.15), 0 8px 32px rgba(0,0,0,0.3)",
        fontFamily: "var(--font-space-grotesk)",
        letterSpacing: "0.02em",
      }}
      className="group relative flex items-center gap-2.5 overflow-hidden rounded-xl px-7 py-3.5 text-sm font-semibold backdrop-blur-sm touch-target"
    >
      {children}
    </motion.button>
  )
}

const morphingRoles = [
  "Fullstack Engineer",
  "Systems Architect",
  "Creative Technologist",
  "Digital Craftsman",
]

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let particles: {
      x: number; y: number; vx: number; vy: number;
      radius: number; opacity: number; baseOpacity: number;
      hue: number;
    }[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      initParticles()
    }

    const initParticles = () => {
      const count = Math.min(70, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 12000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.2 + 0.05,
        baseOpacity: Math.random() * 0.2 + 0.05,
        hue: Math.random() > 0.8 ? 40 : 190, // gold or cyan
      }))
    }

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      const mouse = mouseRef.current

      particles.forEach((p, i) => {
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const repelRadius = 120

        if (dist < repelRadius) {
          const force = (repelRadius - dist) / repelRadius
          p.vx += (dx / dist) * force * 0.8
          p.vy += (dy / dist) * force * 0.8
          p.opacity = Math.min(p.baseOpacity + force * 0.4, 0.7)
        } else {
          p.opacity += (p.baseOpacity - p.opacity) * 0.05
        }

        p.vx *= 0.98
        p.vy *= 0.98

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 2) {
          p.vx = (p.vx / speed) * 2
          p.vy = (p.vy / speed) * 2
        }

        p.vx += (Math.random() - 0.5) * 0.02
        p.vy += (Math.random() - 0.5) * 0.02

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        const color = p.hue === 40
          ? `rgba(240, 178, 51, ${p.opacity})`
          : `rgba(0, 217, 255, ${p.opacity})`
        ctx.fillStyle = color
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const cdx = q.x - p.x
          const cdy = q.y - p.y
          const d = Math.sqrt(cdx * cdx + cdy * cdy)
          if (d < 130) {
            const alpha = (1 - d / 130) * 0.08
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(0, 217, 255, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      animationRef.current = requestAnimationFrame(draw)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    resize()
    draw()

    window.addEventListener("resize", resize)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.8 }}
    />
  )
}

function MorphingText() {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex(i => (i + 1) % morphingRoles.length)
    }, 3200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[1.2em] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={roleIndex}
          initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 flex items-center text-gradient-cyan"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {morphingRoles[roleIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
  },
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const sharedMouseRef = useRef<[number, number]>([0, 0])

  // Framer Motion shared values for Text Parallax (Reverse direction)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 150 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)
  
  // Parallax shift for text (moves opposite to mouse)
  const textX = useTransform(springX, [-1, 1], [15, -15])
  const textY = useTransform(springY, [-1, 1], [15, -15])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }

  const handleGlobalMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2

    // Passes pointer coordinates to WebGL Model (Y is flipped in 3D-space)
    sharedMouseRef.current = [normX, -normY]

    // Sets motion values for framer text
    mouseX.set(normX)
    mouseY.set(normY)
  }

  const handleGlobalMouseLeave = () => {
    sharedMouseRef.current = [0, 0]
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleGlobalMouseMove}
      onMouseLeave={handleGlobalMouseLeave}
      className="relative flex min-h-[105vh] items-center overflow-hidden"
    >
      {/* Particle Canvas */}
      <ParticleCanvas />

      {/* Atmospheric gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0, 217, 255, 0.06) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 right-0 h-[500px] w-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(240, 178, 51, 0.05) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Subtle vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(5,5,8,0.7) 100%)",
        }}
      />

      {/* Center Glassmorphism Blend Blur */}
      <div 
        className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[25%] -translate-x-1/2 pointer-events-none z-10" 
        style={{ 
          backdropFilter: "blur(10px)", 
          WebkitMaskImage: "linear-gradient(to right, transparent, black 40%, black 60%, transparent)", 
          maskImage: "linear-gradient(to right, transparent, black 40%, black 60%, transparent)" 
        }} 
      />

      {/* Content Layout */}
      <div className="relative z-10 mx-auto max-w-7xl w-full">
        <div className="relative flex items-center min-h-[85vh]">

          {/* ────── Right Layer: 3D Model (Bleeds left, pushed back) ────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.35 }}
            className="absolute top-0 bottom-0 right-[-5%] hidden lg:flex items-center justify-center w-[65%] z-0 pointer-events-auto cursor-grab active:cursor-grabbing"
          >
            <Suspense fallback={
              <div className="flex h-4 w-4 items-center justify-center">
                <div className="h-2 w-2 animate-ping rounded-full bg-cyan-400 opacity-75" />
              </div>
            }>
              <Hero3DModel mouseRef={sharedMouseRef} />
            </Suspense>
          </motion.div>

          {/* ────── Left Layer: Text (Elevated z-index, padded, reverse parallax) ────── */}
          <motion.div
            style={{ x: textX, y: textY }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-20 w-full lg:w-[50%] px-6 lg:pl-16 pt-32 lg:pt-0 pointer-events-auto"
          >
            {/* Global Light Source tying to the 3D model: Subtle gold glow directly behind text */}
            <div 
              className="absolute left-[-20%] top-[40%] -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none mix-blend-screen z-[-1]" 
              style={{ 
                background: "radial-gradient(circle, rgba(240, 178, 51, 0.05) 0%, transparent 60%)", 
                filter: "blur(40px)" 
              }} 
            />

            {/* Status badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span
                className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-medium backdrop-blur-sm"
                style={{
                  background: "rgba(0, 217, 255, 0.07)",
                  border: "1px solid rgba(0, 217, 255, 0.2)",
                  color: "#00D9FF",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
                </span>
                Open to opportunities
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1
                className="font-display leading-none tracking-tight"
                style={{
                  fontSize: "var(--text-display)",
                  fontFamily: "var(--font-space-grotesk)",
                  letterSpacing: "-0.03em",
                }}
              >
                <span className="block text-foreground/90">Satwik</span>
                <span className="block text-foreground">Mohanty</span>
              </h1>
              <div
                className="text-xl sm:text-2xl lg:text-3xl font-semibold"
                style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.01em" }}
              >
                <MorphingText />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mt-8 max-w-[90%] text-base sm:text-lg leading-relaxed"
              style={{ color: "oklch(0.62 0.015 250)", lineHeight: "1.8" }}
            >
              Architecting scalable web systems with a focus on high-availability design, 
              zero-loss data layers, and AI-native applications. I build the future, one 
              system at a time.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center gap-5">
              {/* Magnetic primary CTA */}
              <MagneticButton onClick={() => scrollToSection("contact")}>
                <span>Let's build together</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>

              <motion.button
                onClick={() => scrollToSection("projects")}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2.5 rounded-xl px-7 py-3.5 text-sm font-medium transition-all backdrop-blur-sm"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "oklch(0.75 0.01 250)",
                  fontFamily: "var(--font-space-grotesk)",
                  letterSpacing: "0.02em",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"
                  ;(e.currentTarget as HTMLElement).style.color = "white"
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"
                  ;(e.currentTarget as HTMLElement).style.color = "oklch(0.75 0.01 250)"
                }}
              >
                View my work
              </motion.button>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants} className="mt-10 flex items-center gap-4">
              {[
                { icon: Github, href: "https://github.com/Satwik290", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/satwik290", label: "LinkedIn" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl transition-all backdrop-blur-sm"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "oklch(0.6 0.01 250)",
                  }}
                  onMouseEnter={e => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = "rgba(0, 217, 255, 0.25)"
                    ;(e.currentTarget as HTMLElement).style.color = "#00D9FF"
                    ;(e.currentTarget as HTMLElement).style.boxShadow = "0 0 15px rgba(0, 217, 255, 0.15)"
                  }}
                  onMouseLeave={e => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"
                    ;(e.currentTarget as HTMLElement).style.color = "oklch(0.6 0.01 250)"
                    ;(e.currentTarget as HTMLElement).style.boxShadow = "none"
                  }}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}

              {/* Divider */}
              <div className="h-px w-16 opacity-20" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.5), transparent)" }} />
              <span
                className="text-xs"
                style={{ color: "oklch(0.45 0.01 250)", fontFamily: "var(--font-jetbrains-mono)", letterSpacing: "0.04em" }}
              >
                mohanty.satwik290@gmail.com
              </span>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToSection("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group z-30 pointer-events-auto"
        aria-label="Scroll down"
      >
        <span
          className="text-[9px] tracking-[0.2em] uppercase"
          style={{ color: "oklch(0.4 0.01 250)", fontFamily: "var(--font-space-grotesk)" }}
        >
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-8 w-5 items-start justify-center rounded-full pt-1.5"
          style={{ border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <motion.div
            className="h-1.5 w-0.5 rounded-full"
            style={{ background: "#00D9FF" }}
            animate={{ scaleY: [1, 0.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.button>
    </section>
  )
}