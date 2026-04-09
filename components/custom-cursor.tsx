"use client"

// Force clean rebuild
import { useEffect, useState, useCallback } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

type CursorVariant = "default" | "text" | "link" | "project" | "hidden"

export function CustomCursor() {
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default")
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const moveCursor = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    },
    [cursorX, cursorY, isVisible]
  )

  useEffect(() => {
    // Check if mobile
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

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

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

  if (isMobile) return null

  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: "rgba(45, 212, 191, 0.05)",
      border: "2px solid rgba(45, 212, 191, 0.7)",
      mixBlendMode: "difference" as const,
    },
    text: {
      width: 4,
      height: 24,
      backgroundColor: "rgba(45, 212, 191, 0.85)",
      border: "2px solid rgba(45, 212, 191, 0)",
      borderRadius: "2px",
      mixBlendMode: "difference" as const,
    },
    link: {
      width: 48,
      height: 48,
      backgroundColor: "rgba(45, 212, 191, 0.12)",
      border: "2px solid rgba(45, 212, 191, 0.5)",
      mixBlendMode: "normal" as const,
    },
    project: {
      width: 80,
      height: 80,
      backgroundColor: "rgba(45, 212, 191, 0.08)",
      border: "2px solid rgba(45, 212, 191, 0.4)",
      mixBlendMode: "normal" as const,
    },
    hidden: {
      width: 0,
      height: 0,
      backgroundColor: "rgba(45, 212, 191, 0.01)",
      border: "2px solid rgba(45, 212, 191, 0)",
      mixBlendMode: "normal" as const,
    },
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={cursorVariant}
        variants={variants}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        initial={false}
      >
        {cursorVariant === "project" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center text-xs font-medium text-primary"
          >
            View
          </motion.span>
        )}
      </motion.div>

      {/* Trailing glow effect */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-6 w-6 rounded-full opacity-30"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(45, 212, 191, 0.35) 0%, rgba(45, 212, 191, 0) 70%)",
        }}
        animate={{
          opacity: isVisible ? 0.3 : 0,
          scale: cursorVariant === "link" ? 2 : cursorVariant === "project" ? 2.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      />
    </>
  )
}
