"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"

// Extended context-aware cursor states
type CursorVariant =
  | "default"
  | "text"
  | "link"
  | "project"   // general card hover → VIEW
  | "live"      // live button → GO LIVE
  | "github"    // github button → GITHUB icon
  | "code"      // code snippet → COPY
  | "tag"       // tech tag → +
  | "hidden"

interface MagneticTarget {
  el: HTMLElement
  rect: DOMRect
}

// --- Label/icon map per state ---
const STATE_LABELS: Partial<Record<CursorVariant, string>> = {
  project: "VIEW",
  live: "GO LIVE",
  github: "SOURCE",
  code: "COPY",
  tag: "+",
}

const STATE_COLORS: Partial<Record<CursorVariant, string>> = {
  project: "#F0B233",
  live: "#00D9FF",
  github: "#C4B5FD",
  code: "#6ee7b7",
  tag: "#F0B233",
}

export function CustomCursor() {
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default")
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [trailPoints, setTrailPoints] = useState<{ x: number; y: number; id: number }[]>([])
  const trailIdRef = useRef(0)
  const lastTrailTime = useRef(0)

  // Raw mouse position
  const rawX = useRef(-200)
  const rawY = useRef(-200)

  const cursorX = useMotionValue(-200)
  const cursorY = useMotionValue(-200)

  // Outer large blob — soft follow
  const blobConfig = { damping: 22, stiffness: 200, mass: 0.75 }
  const blobX = useSpring(cursorX, blobConfig)
  const blobY = useSpring(cursorY, blobConfig)

  // Inner sharp dot — tight follow
  const followerConfig = { damping: 35, stiffness: 480 }
  const followerX = useSpring(cursorX, followerConfig)
  const followerY = useSpring(cursorY, followerConfig)

  // Magnetic state
  const magnetRef = useRef<MagneticTarget | null>(null)
  const rafRef = useRef<number>()

  // --- Lerp util (GPU-friendly, runs in rAF) ---
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t

  const moveCursor = useCallback(
    (e: MouseEvent) => {
      rawX.current = e.clientX
      rawY.current = e.clientY
      if (!isVisible) setIsVisible(true)

      // Trail throttle
      const now = Date.now()
      if (now - lastTrailTime.current > 55) {
        lastTrailTime.current = now
        const id = trailIdRef.current++
        setTrailPoints(prev => [...prev, { x: e.clientX, y: e.clientY, id }].slice(-6))
      }
    },
    [isVisible]
  )

  // --- rAF loop: apply lerp + magnetic pull ---
  useEffect(() => {
    const MAGNETIC_RADIUS = 42
    const MAGNETIC_STRENGTH = 0.38

    const tick = () => {
      let targetX = rawX.current
      let targetY = rawY.current

      if (magnetRef.current) {
        const { rect } = magnetRef.current
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dist = Math.hypot(targetX - cx, targetY - cy)
        if (dist < MAGNETIC_RADIUS) {
          targetX = lerp(targetX, cx, MAGNETIC_STRENGTH)
          targetY = lerp(targetY, cy, MAGNETIC_STRENGTH)
        } else {
          magnetRef.current = null
        }
      }

      cursorX.set(targetX)
      cursorY.set(targetY)
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [cursorX, cursorY])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    window.addEventListener("mousemove", moveCursor)

    const MAGNETIC_RADIUS = 42

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Check most-specific data-cursor first (precedence order)
      const liveTrigger = target.closest("[data-cursor='live']")
      const githubTrigger = target.closest("[data-cursor='github']")
      const codeTrigger = target.closest("[data-cursor='code']")
      const tagTrigger = target.closest("[data-cursor='tag']")
      const projectTrigger = target.closest("[data-cursor='project']")
      const linkTrigger = target.closest("a") || target.closest("button") || target.closest("[data-cursor='link']")

      if (liveTrigger) {
        setCursorVariant("live")
        const el = liveTrigger as HTMLElement
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dist = Math.hypot(rawX.current - cx, rawY.current - cy)
        if (dist < MAGNETIC_RADIUS) magnetRef.current = { el, rect }
      } else if (githubTrigger) {
        setCursorVariant("github")
        const el = githubTrigger as HTMLElement
        const rect = el.getBoundingClientRect()
        const dist = Math.hypot(rawX.current - (rect.left + rect.width / 2), rawY.current - (rect.top + rect.height / 2))
        if (dist < MAGNETIC_RADIUS) magnetRef.current = { el, rect }
      } else if (codeTrigger) {
        setCursorVariant("code")
      } else if (tagTrigger) {
        setCursorVariant("tag")
      } else if (projectTrigger) {
        // Don't override a more specific state
        if (!liveTrigger && !githubTrigger && !codeTrigger && !tagTrigger) {
          setCursorVariant("project")
        }
      } else if (linkTrigger) {
        setCursorVariant("link")
      } else if (
        target.closest("p") ||
        target.closest("h1") ||
        target.closest("h2") ||
        target.closest("h3") ||
        target.closest("[data-cursor='text']")
      ) {
        setCursorVariant("text")
      } else {
        setCursorVariant("default")
        magnetRef.current = null
      }
    }

    const handleMouseLeave = () => { setIsVisible(false); magnetRef.current = null }
    const handleMouseEnter = () => setIsVisible(true)

    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("resize", checkMobile)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [moveCursor])

  // Expire trail
  useEffect(() => {
    if (trailPoints.length === 0) return
    const timer = setTimeout(() => setTrailPoints(prev => prev.slice(1)), 280)
    return () => clearTimeout(timer)
  }, [trailPoints])

  if (isMobile) return null

  // --- Blob size/glow per state ---
  const BLOB_SIZES: Record<CursorVariant, { w: number; h: number }> = {
    default: { w: 16, h: 16 },
    text:    { w: 3,  h: 28 },
    link:    { w: 52, h: 52 },
    project: { w: 88, h: 88 },
    live:    { w: 70, h: 70 },
    github:  { w: 70, h: 70 },
    code:    { w: 70, h: 70 },
    tag:     { w: 40, h: 40 },
    hidden:  { w: 0,  h: 0  },
  }

  const BLOB_GLOWS: Partial<Record<CursorVariant, string>> = {
    default: "radial-gradient(circle, rgba(0,217,255,0.9) 0%, rgba(0,217,255,0.3) 100%)",
    link:    "radial-gradient(circle, rgba(0,217,255,0.2) 0%, rgba(0,217,255,0.05) 100%)",
    project: "radial-gradient(circle, rgba(240,178,51,0.15) 0%, rgba(0,217,255,0.1) 60%, transparent 100%)",
    live:    "radial-gradient(circle, rgba(0,242,255,0.2) 0%, rgba(0,217,255,0.08) 70%, transparent 100%)",
    github:  "radial-gradient(circle, rgba(196,181,253,0.2) 0%, rgba(196,181,253,0.06) 70%, transparent 100%)",
    code:    "radial-gradient(circle, rgba(110,231,183,0.2) 0%, rgba(110,231,183,0.06) 70%, transparent 100%)",
    tag:     "radial-gradient(circle, rgba(240,178,51,0.25) 0%, rgba(240,178,51,0.08) 70%, transparent 100%)",
  }

  const getBlob = (v: CursorVariant) => ({
    width:  BLOB_SIZES[v].w,
    height: BLOB_SIZES[v].h,
    background: BLOB_GLOWS[v] ?? "transparent",
    mixBlendMode: "screen" as const,
    ...(v === "text" ? { borderRadius: "2px" } : {}),
  })

  const showLabel = ["project", "live", "github", "code", "tag"].includes(cursorVariant)
  const label = STATE_LABELS[cursorVariant]
  const labelColor = STATE_COLORS[cursorVariant] ?? "#00D9FF"

  return (
    <>
      {/* GPU-accelerated trail — will-change: transform */}
      <AnimatePresence>
        {isVisible && trailPoints.map((point, i) => (
          <motion.div
            key={point.id}
            className="pointer-events-none fixed left-0 top-0 z-[100001] rounded-full"
            initial={{ opacity: 0.35, scale: 1 }}
            animate={{ opacity: 0, scale: 0.25 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            style={{
              willChange: "transform, opacity",
              transform: `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%)`,
              width:  4 + i * 1.5,
              height: 4 + i * 1.5,
              background: `rgba(0,217,255,${0.08 + i * 0.035})`,
              boxShadow: `0 0 ${4 + i * 2}px rgba(0,217,255,0.25)`,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Outer blob */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100002] rounded-full"
        style={{
          x: blobX,
          y: blobY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
          willChange: "transform",
        }}
        animate={getBlob(cursorVariant)}
        transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.55 }}
        initial={false}
      >
        {/* Label overlay */}
        {showLabel && label && (
          <motion.span
            key={cursorVariant}
            initial={{ opacity: 0, scale: 0.65 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.65 }}
            className="absolute inset-0 flex items-center justify-center font-bold tracking-widest select-none"
            style={{
              fontSize: cursorVariant === "tag" ? "14px" : "9px",
              color: labelColor,
              fontFamily: "var(--font-space-grotesk)",
              letterSpacing: cursorVariant === "tag" ? 0 : "0.12em",
              textShadow: `0 0 12px ${labelColor}88`,
            }}
          >
            {label}
          </motion.span>
        )}

        {/* Pulsing ring for link / live states */}
        {(cursorVariant === "link" || cursorVariant === "live") && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: `1px solid ${labelColor ?? "#00D9FF"}60` }}
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.div>

      {/* Inner dot */}
      {cursorVariant !== "text" && cursorVariant !== "hidden" && (
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-[100005] rounded-full"
          style={{
            x: followerX,
            y: followerY,
            translateX: "-50%",
            translateY: "-50%",
            width:  4,
            height: 4,
            background: labelColor ?? "#00D9FF",
            boxShadow: `0 0 8px ${labelColor ?? "#00D9FF"}CC`,
            opacity: isVisible ? 1 : 0,
            willChange: "transform",
          }}
        />
      )}
    </>
  )
}
