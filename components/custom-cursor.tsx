"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"

type CursorVariant = "default" | "text" | "link" | "project" | "hidden"

export function CustomCursor() {
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default")
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [trailPoints, setTrailPoints] = useState<{ x: number; y: number; id: number }[]>([])
  const trailIdRef = useRef(0)
  const lastTrailTime = useRef(0)

  const cursorX = useMotionValue(-200)
  const cursorY = useMotionValue(-200)

  // Liquid blob spring - very soft
  const blobConfig = { damping: 20, stiffness: 180, mass: 0.8 }
  const blobX = useSpring(cursorX, blobConfig)
  const blobY = useSpring(cursorY, blobConfig)

  // Tight follower
  const followerConfig = { damping: 30, stiffness: 400 }
  const followerX = useSpring(cursorX, followerConfig)
  const followerY = useSpring(cursorY, followerConfig)

  const moveCursor = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)

      // Add trail point
      const now = Date.now()
      if (now - lastTrailTime.current > 60) {
        lastTrailTime.current = now
        const id = trailIdRef.current++
        setTrailPoints(prev => {
          const next = [...prev, { x: e.clientX, y: e.clientY, id }]
          return next.slice(-6)
        })
      }
    },
    [cursorX, cursorY, isVisible]
  )

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    window.addEventListener("mousemove", moveCursor)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("a") || target.closest("button") || target.closest("[data-cursor='link']")) {
        setCursorVariant("link")
      } else if (target.closest("[data-cursor='project']")) {
        setCursorVariant("project")
      } else if (
        target.closest("p") ||
        target.closest("h1") ||
        target.closest("h2") ||
        target.closest("h3") ||
        target.closest("span") ||
        target.closest("[data-cursor='text']")
      ) {
        setCursorVariant("text")
      } else {
        setCursorVariant("default")
      }
    }

    const handleMouseLeave = () => setIsVisible(false)
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

  // Clean up expired trail points
  useEffect(() => {
    if (trailPoints.length === 0) return
    const timer = setTimeout(() => {
      setTrailPoints(prev => prev.slice(1))
    }, 300)
    return () => clearTimeout(timer)
  }, [trailPoints])

  if (isMobile) return null

  const blobVariants = {
    default: {
      width: 16,
      height: 16,
      background: "radial-gradient(circle, rgba(0, 217, 255, 0.9) 0%, rgba(0, 217, 255, 0.3) 100%)",
      boxShadow: "0 0 20px rgba(0, 217, 255, 0.5), 0 0 40px rgba(0, 217, 255, 0.2)",
      mixBlendMode: "screen" as const,
    },
    text: {
      width: 3,
      height: 28,
      borderRadius: "2px",
      background: "rgba(0, 217, 255, 1)",
      boxShadow: "0 0 10px rgba(0, 217, 255, 0.8)",
      mixBlendMode: "screen" as const,
    },
    link: {
      width: 52,
      height: 52,
      background: "radial-gradient(circle, rgba(0, 217, 255, 0.2) 0%, rgba(0, 217, 255, 0.05) 100%)",
      boxShadow: "0 0 30px rgba(0, 217, 255, 0.3), 0 0 60px rgba(0, 217, 255, 0.1), inset 0 0 20px rgba(0, 217, 255, 0.05)",
      mixBlendMode: "screen" as const,
    },
    project: {
      width: 88,
      height: 88,
      background: "radial-gradient(circle, rgba(240, 178, 51, 0.15) 0%, rgba(0, 217, 255, 0.1) 60%, transparent 100%)",
      boxShadow: "0 0 40px rgba(240, 178, 51, 0.2), 0 0 80px rgba(0, 217, 255, 0.1)",
      mixBlendMode: "screen" as const,
    },
    hidden: {
      width: 0,
      height: 0,
      opacity: 0,
      mixBlendMode: "screen" as const,
    },
  }

  return (
    <>
      {/* Trail particles */}
      <AnimatePresence>
        {isVisible && trailPoints.map((point, i) => (
          <motion.div
            key={point.id}
            className="pointer-events-none fixed left-0 top-0 z-[9996] rounded-full"
            initial={{ opacity: 0.4, scale: 1 }}
            animate={{ opacity: 0, scale: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              x: point.x,
              y: point.y,
              translateX: "-50%",
              translateY: "-50%",
              width: 4 + i * 1.5,
              height: 4 + i * 1.5,
              background: `rgba(0, 217, 255, ${0.1 + i * 0.04})`,
              boxShadow: `0 0 ${4 + i * 2}px rgba(0, 217, 255, 0.3)`,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Outer soft glow blob */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9997] rounded-full"
        style={{
          x: blobX,
          y: blobY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={cursorVariant}
        variants={blobVariants}
        transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.6 }}
        initial={false}
      >
        {cursorVariant === "project" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold tracking-widest"
            style={{ color: "#F0B233", fontFamily: "var(--font-space-grotesk)" }}
          >
            VIEW
          </motion.span>
        )}
        {cursorVariant === "link" && (
          <motion.div
            className="absolute inset-0 rounded-full border border-cyan-400/40"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.div>

      {/* Sharp inner dot - tight follower */}
      {cursorVariant !== "text" && cursorVariant !== "hidden" && (
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
          style={{
            x: followerX,
            y: followerY,
            translateX: "-50%",
            translateY: "-50%",
            width: 4,
            height: 4,
            background: "#00D9FF",
            boxShadow: "0 0 8px rgba(0, 217, 255, 0.9)",
            opacity: isVisible ? 1 : 0,
          }}
        />
      )}
    </>
  )
}
