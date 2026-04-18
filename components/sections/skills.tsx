"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

const skillCategories = [
  {
    name: "Frontend",
    color: "#00D9FF",
    glow: "rgba(0,217,255,0.18)",
    border: "rgba(0,217,255,0.25)",
    bg: "rgba(0,217,255,0.06)",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "TanStack Query"],
  },
  {
    name: "Backend",
    color: "#F0B233",
    glow: "rgba(240,178,51,0.18)",
    border: "rgba(240,178,51,0.25)",
    bg: "rgba(240,178,51,0.06)",
    skills: ["Node.js", "NestJS", "GraphQL", "REST APIs", "Prisma", "Socket.io"],
  },
  {
    name: "Database",
    color: "#C4B5FD",
    glow: "rgba(196,181,253,0.18)",
    border: "rgba(196,181,253,0.25)",
    bg: "rgba(196,181,253,0.06)",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Supabase"],
  },
  {
    name: "DevOps & AI",
    color: "#6ee7b7",
    glow: "rgba(110,231,183,0.18)",
    border: "rgba(110,231,183,0.25)",
    bg: "rgba(110,231,183,0.06)",
    skills: ["Docker", "AWS", "GitHub Actions", "Turborepo", "Gemini AI", "OpenAI API"],
  },
]

const additionalTools = [
  "Jest", "Playwright", "Figma", "Git", "Linux", "Zod", "Mongoose", "Cloudinary",
]

function SkillChip({
  name, color, bg, border, glow, index,
}: {
  name: string; color: string; bg: string; border: string; glow: string; index: number
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="skill-chip group relative flex cursor-default items-center gap-3 rounded-xl px-4 py-3"
      style={{
        background: hovered ? bg : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? border : "rgba(255,255,255,0.07)"}`,
        boxShadow: hovered ? `0 0 20px ${glow}, 0 4px 20px rgba(0,0,0,0.2)` : "none",
        backdropFilter: "blur(12px)",
        transition: "all 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
        <span
          className="absolute inline-flex h-full w-full rounded-full"
          style={{
            background: color,
            opacity: hovered ? 1 : 0.5,
            boxShadow: hovered ? `0 0 8px ${color}` : "none",
            transition: "all 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </span>
      <span
        className="text-sm font-medium tracking-wide"
        style={{
          color: hovered ? color : "oklch(0.78 0.01 250)",
          fontFamily: "var(--font-space-grotesk)",
          transition: "color 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
          letterSpacing: "0.01em",
        }}
      >
        {name}
      </span>
    </motion.div>
  )
}

function SkillCategory({
  cat, catIndex,
}: {
  cat: (typeof skillCategories)[number]; catIndex: number
}) {
  const catRef = useRef(null)
  const catInView = useInView(catRef, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={catRef}
      initial={{ opacity: 0, y: 20 }}
      animate={catInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: catIndex * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-4 flex items-center gap-4">
        <span
          className="text-xs font-bold uppercase tracking-[0.18em]"
          style={{ color: cat.color, fontFamily: "var(--font-space-grotesk)" }}
        >
          {cat.name}
        </span>
        <div
          className="h-px flex-1"
          style={{ background: `linear-gradient(90deg, ${cat.color}30, transparent)` }}
        />
      </div>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {catInView && cat.skills.map((skill, si) => (
          <SkillChip
            key={skill}
            name={skill}
            color={cat.color}
            bg={cat.bg}
            border={cat.border}
            glow={cat.glow}
            index={si}
          />
        ))}
      </div>
    </motion.div>
  )
}

export function Skills() {
  const headerRef = useRef(null)
  const isInView = useInView(headerRef, { once: true, margin: "-80px" })

  return (
    <section id="skills" className="relative section-padding overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0, 217, 255, 0.04) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="section-container">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <span
            className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#00D9FF", fontFamily: "var(--font-space-grotesk)" }}
          >
            Skills
          </span>
          <h2
            className="mb-5 font-bold"
            style={{ fontFamily: "var(--font-syne)", fontSize: "var(--text-section)", letterSpacing: "-0.02em" }}
          >
            Technologies I <span className="text-gradient-cyan">master</span>
          </h2>
          <p className="max-w-xl text-lg" style={{ color: "oklch(0.62 0.015 250)", lineHeight: "1.75" }}>
            A curated stack for building performant fullstack applications — from meticulous
            frontend to resilient infrastructure.
          </p>
        </motion.div>

        {/* Category Sections */}
        <div className="space-y-10">
          {skillCategories.map((cat, catIndex) => (
            <SkillCategory key={cat.name} cat={cat} catIndex={catIndex} />
          ))}
        </div>

        {/* Additional tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16"
        >
          <p
            className="mb-5 text-xs uppercase tracking-[0.2em]"
            style={{ color: "oklch(0.45 0.012 250)", fontFamily: "var(--font-space-grotesk)" }}
          >
            Also proficient in
          </p>
          <div className="flex flex-wrap gap-2.5">
            {additionalTools.map((tool) => (
              <motion.span
                key={tool}
                whileHover={{ y: -2, scale: 1.03 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl px-4 py-2 text-sm"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "oklch(0.6 0.012 250)",
                  fontFamily: "var(--font-space-grotesk)",
                  cursor: "default",
                  transition: "border-color 0.25s cubic-bezier(0.22,1,0.36,1), color 0.25s cubic-bezier(0.22,1,0.36,1)",
                }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = "rgba(0, 217, 255, 0.2)"
                  ;(e.currentTarget as HTMLElement).style.color = "oklch(0.85 0.01 220)"
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"
                  ;(e.currentTarget as HTMLElement).style.color = "oklch(0.6 0.012 250)"
                }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
