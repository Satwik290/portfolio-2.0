"use client"

import { useEffect, useRef } from "react"

/**
 * AmbientParticles — Global full-page atmospheric dust layer.
 * Very faint, fixed position canvas that renders behind all content.
 * Creates the visual "thread" connecting hero to footer.
 */
export function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Match canvas to viewport
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    type Particle = {
      x: number
      y: number
      vy: number        // upward drift
      vx: number        // lateral wobble
      radius: number
      opacity: number
      maxOpacity: number
      hue: "cyan" | "gold"
      life: number      // 0–1, fades out and respawns
      decay: number     // how fast it fades
    }

    const PARTICLE_COUNT = 40
    const particles: Particle[] = []

    const spawn = (): Particle => ({
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + Math.random() * 100,   // start below viewport
      vy: -(0.15 + Math.random() * 0.3),              // slow upward drift
      vx: (Math.random() - 0.5) * 0.12,              // gentle lateral sway
      radius: 0.8 + Math.random() * 1.6,
      opacity: 0,
      maxOpacity: 0.04 + Math.random() * 0.07,       // very faint
      hue: Math.random() > 0.72 ? "gold" : "cyan",
      life: 0,
      decay: 0.0004 + Math.random() * 0.0003,
    })

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = spawn()
      // Distribute vertically on first load
      p.y = Math.random() * window.innerHeight
      p.life = Math.random()
      particles.push(p)
    }

    let raf: number

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.y += p.vy
        p.x += p.vx + Math.sin(p.life * 30 + i) * 0.06  // sine wobble
        p.life += p.decay

        // Fade in then out
        if (p.life < 0.3) {
          p.opacity = (p.life / 0.3) * p.maxOpacity
        } else if (p.life > 0.7) {
          p.opacity = ((1 - p.life) / 0.3) * p.maxOpacity
        } else {
          p.opacity = p.maxOpacity
        }

        // Respawn when dead or offscreen
        if (p.life >= 1 || p.y < -20) {
          particles[i] = spawn()
          return
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle =
          p.hue === "cyan"
            ? `rgba(0, 217, 255, ${p.opacity})`
            : `rgba(240, 178, 51, ${p.opacity})`
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{ opacity: 1 }}
    />
  )
}
