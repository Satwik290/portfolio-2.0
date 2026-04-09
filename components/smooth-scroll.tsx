"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"

interface SmoothScrollProps {
  children: React.ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Add scroll to hash functionality
    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[href^="#"]')
      if (link) {
        e.preventDefault()
        const hash = link.getAttribute("href")
        if (hash) {
          const element = document.querySelector(hash)
          if (element) {
            lenis.scrollTo(element as HTMLElement, {
              offset: -80,
              duration: 1.5,
            })
          }
        }
      }
    }

    document.addEventListener("click", handleHashClick)

    return () => {
      lenis.destroy()
      document.removeEventListener("click", handleHashClick)
    }
  }, [])

  return <>{children}</>
}

// Export scroll functions for use in other components
export function scrollToElement(selector: string, offset = -80) {
  const element = document.querySelector(selector)
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}
