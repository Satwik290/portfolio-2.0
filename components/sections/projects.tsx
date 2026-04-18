"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ExternalLink, Github, ArrowUpRight, Star } from "lucide-react"

interface Project {
  id: string
  title: string
  shortTitle: string
  description: string
  tags: string[]
  github?: string
  live?: string
  featured: boolean
  stats?: { label: string; value: string; accent: string }[]
  accent: string
  span?: "wide" | "normal"
}

const projects: Project[] = [
  {
    id: "fintrack-v2",
    title: "FinTrack V2 — AI-Native Wealth Intelligence",
    shortTitle: "FinTrack V2",
    description:
      "Engineered a Zero-Loss Financial Data Layer with BigInt/Integer-cents architecture. Designed Scalable RAG Pipeline for Gemini 2.5 Flash. Optimized throughput by 40% with Read-Model Aggregation pattern.",
    tags: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "Gemini AI", "TypeScript"],
    github: "https://github.com/Satwik290/FinTrack-V2",
    featured: true,
    accent: "cyan",
    stats: [
      { label: "Architecture", value: "Zero-Loss", accent: "#00D9FF" },
      { label: "Throughput", value: "+40%", accent: "#F0B233" },
      { label: "AI Model", value: "Gemini 2.5", accent: "#C4B5FD" },
    ],
  },
  {
    id: "doclync-pro",
    title: "DocLync Pro — Healthcare Platform",
    shortTitle: "DocLync Pro",
    description:
      "Microservices healthcare platform with real-time WebSocket communication. Integrated Stripe payments, Cloudinary storage. Implemented JWT Auth with HttpOnly cookies and RBAC.",
    tags: ["TypeScript", "React", "Node.js", "PostgreSQL", "Redis", "Stripe"],
    github: "https://github.com/Satwik290/doclync-pro",
    featured: false,
    accent: "gold",
    span: "wide",
    stats: [
      { label: "Architecture", value: "Turborepo", accent: "#F0B233" },
      { label: "Scaling", value: "Horizontal", accent: "#6ee7b7" },
    ],
  },
  {
    id: "learnify",
    title: "Learnify — Professional LMS",
    shortTitle: "Learnify",
    description:
      "High-performance LMS with MongoDB Aggregation stats engine. Atomic Synchronization for eventual consistency. Optimized cache with TanStack Query, reducing API overhead by 60%.",
    tags: ["React", "Node.js", "MongoDB", "Framer Motion", "TanStack Query"],
    github: "https://github.com/Satwik290/learnify",
    featured: false,
    accent: "lavender",
    stats: [
      { label: "API Overhead", value: "-60%", accent: "#C4B5FD" },
      { label: "Cache", value: "Smart", accent: "#00D9FF" },
    ],
  },
  {
    id: "slooze",
    title: "Slooze — Food Ordering Platform",
    shortTitle: "Slooze",
    description:
      "Full-stack food ordering with JWT auth and three-role RBAC. Multi-region data isolation. Real-time shared cart with WebSockets and shareable links.",
    tags: ["NestJS", "Next.js", "PostgreSQL", "Prisma", "Socket.io"],
    github: "https://github.com/Satwik290",
    featured: false,
    accent: "green",
  },
]

const accentColors: Record<string, { border: string; glow: string; tag: string; tagText: string; orb: string }> = {
  cyan: {
    border: "rgba(0, 217, 255, 0.2)",
    glow: "rgba(0, 217, 255, 0.12)",
    tag: "rgba(0, 217, 255, 0.08)",
    tagText: "#00D9FF",
    orb: "rgba(0, 217, 255, 0.06)",
  },
  gold: {
    border: "rgba(240, 178, 51, 0.2)",
    glow: "rgba(240, 178, 51, 0.12)",
    tag: "rgba(240, 178, 51, 0.08)",
    tagText: "#F0B233",
    orb: "rgba(240, 178, 51, 0.05)",
  },
  lavender: {
    border: "rgba(196, 181, 253, 0.2)",
    glow: "rgba(196, 181, 253, 0.12)",
    tag: "rgba(196, 181, 253, 0.08)",
    tagText: "#C4B5FD",
    orb: "rgba(196, 181, 253, 0.05)",
  },
  green: {
    border: "rgba(110, 231, 183, 0.2)",
    glow: "rgba(110, 231, 183, 0.12)",
    tag: "rgba(110, 231, 183, 0.08)",
    tagText: "#6ee7b7",
    orb: "rgba(110, 231, 183, 0.05)",
  },
}

// ─── Terminal Code Preview SVG ──────────────────────────────────────────────
function TerminalPreview({ accent }: { accent: string }) {
  const colors = accentColors[accent]
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-xl"
      style={{
        background: "rgba(0,0,0,0.4)",
        border: `1px solid ${colors.border}`,
        backdropFilter: "blur(8px)",
        fontFamily: "var(--font-jetbrains-mono, monospace)",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 border-b px-4 py-3"
        style={{ borderColor: colors.border }}
      >
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
        <span className="ml-4 text-[10px] opacity-40" style={{ color: colors.tagText }}>
          app.service.ts
        </span>
      </div>
      {/* Code lines */}
      <div className="p-4 text-[11px] leading-6 opacity-80">
        {[
          { indent: 0, text: "@Injectable()", color: colors.tagText },
          { indent: 0, text: "export class FinTrackService {", color: "#ffffff" },
          { indent: 1, text: "async getPortfolio(userId: string) {", color: "oklch(0.75 0.05 200)" },
          { indent: 2, text: "const data = await this.db", color: "#ffffff" },
          { indent: 3, text: ".findUnique({ where: { userId } })", color: "oklch(0.65 0.01 250)" },
          { indent: 2, text: "return this.aggregate(data)", color: "#ffffff" },
          { indent: 1, text: "}", color: "oklch(0.65 0.01 250)" },
          { indent: 0, text: "}", color: "rgba(255,255,255,0.5)" },
        ].map((line, i) => (
          <div key={i} style={{ paddingLeft: `${line.indent * 16}px`, color: line.color }}>
            {line.text}
          </div>
        ))}
        {/* Blinking cursor */}
        <div className="mt-1" style={{ paddingLeft: "32px" }}>
          <motion.span
            className="inline-block h-3.5 w-0.5 align-middle"
            style={{ background: colors.tagText }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  )
}

// ─── Featured Project ────────────────────────────────────────────────────────
function FeaturedProject({ project }: { project: Project }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const colors = accentColors[project.accent]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group relative mb-8 overflow-hidden rounded-3xl"
      data-cursor="project"
      style={{
        background: "var(--glass-card)",
        border: `1px solid ${colors.border}`,
        backdropFilter: "blur(20px)",
      }}
      whileHover={{
        boxShadow: `0 30px 80px ${colors.glow}, 0 0 0 1px ${colors.border}`,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {/* Background orb */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full transition-all duration-700 group-hover:scale-125"
        style={{ background: `radial-gradient(circle, ${colors.orb} 0%, transparent 70%)` }}
      />

      <div className="relative grid gap-0 lg:grid-cols-5">
        {/* Left: Text content */}
        <div className="p-8 lg:col-span-3 lg:p-12">
          <div className="mb-4 flex items-center gap-3">
            <span
              className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
              style={{
                background: colors.tag,
                color: colors.tagText,
                border: `1px solid ${colors.border}`,
                fontFamily: "var(--font-space-grotesk)",
              }}
            >
              <Star className="h-2.5 w-2.5" />
              Featured Project
            </span>
          </div>

          <h3
            className="mb-4 text-2xl font-bold lg:text-3xl"
            style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em", lineHeight: 1.2 }}
          >
            {project.title}
          </h3>

          {/* Stats pills inline */}
          {project.stats && (
            <div className="mb-5 flex flex-wrap gap-3">
              {project.stats.map((stat) => (
                <span
                  key={stat.label}
                  className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: stat.accent,
                    fontFamily: "var(--font-space-grotesk)",
                  }}
                >
                  <span style={{ opacity: 0.55 }}>{stat.label}: </span>
                  {stat.value}
                </span>
              ))}
            </div>
          )}

          <p
            className="mb-8 text-base leading-relaxed"
            style={{ color: "oklch(0.62 0.015 250)", lineHeight: "1.75" }}
          >
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="mb-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg px-3 py-1.5 text-xs font-medium"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "oklch(0.7 0.01 250)",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold touch-target"
                style={{
                  background: colors.tag,
                  border: `1px solid ${colors.border}`,
                  color: colors.tagText,
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                <Github className="h-4 w-4" />
                View Code
              </motion.a>
            )}
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium touch-target"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "oklch(0.75 0.01 250)",
                }}
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </motion.a>
            )}
          </div>
        </div>

        {/* Right: Terminal code preview */}
        <div
          className="hidden lg:block lg:col-span-2"
          style={{ padding: "24px 24px 24px 0" }}
        >
          <TerminalPreview accent={project.accent} />
        </div>
      </div>
    </motion.div>
  )
}

// ─── Bento Grid Card ─────────────────────────────────────────────────────────
function BentoCard({
  project,
  index,
  wide = false,
}: {
  project: Project
  index: number
  wide?: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })
  const colors = accentColors[project.accent]
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative overflow-hidden rounded-2xl ${wide ? "lg:col-span-2" : ""}`}
      data-cursor="project"
      style={{
        background: "var(--glass-card)",
        border: hovered ? `1px solid ${colors.border}` : "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(16px)",
        boxShadow: hovered ? `0 20px 50px ${colors.glow}` : "none",
        transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* Top accent line */}
      <div
        className="h-px w-full"
        style={{
          background: `linear-gradient(90deg, ${colors.tagText}60, transparent)`,
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.3s",
        }}
      />

      {/* Always visible content */}
      <div className="p-6">
        <div className="mb-3 flex items-start justify-between">
          <h3
            className="text-lg font-bold"
            style={{
              fontFamily: "var(--font-syne)",
              letterSpacing: "-0.01em",
              color: hovered ? colors.tagText : "oklch(0.9 0.006 220)",
              transition: "color 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {project.shortTitle}
          </h3>
          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg touch-target transition-all"
                style={{
                  background: hovered ? colors.tag : "rgba(255,255,255,0.04)",
                  border: `1px solid ${hovered ? colors.border : "rgba(255,255,255,0.08)"}`,
                  color: hovered ? colors.tagText : "oklch(0.6 0.012 250)",
                  transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-3.5 w-3.5" />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg touch-target transition-all"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "oklch(0.6 0.012 250)",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Stats if any */}
        {project.stats && (
          <div className="mb-3 flex gap-4">
            {project.stats.slice(0, 2).map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-base font-bold"
                  style={{ color: stat.accent, fontFamily: "var(--font-space-grotesk)" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-[9px] uppercase tracking-widest"
                  style={{ color: "oklch(0.45 0.012 250)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Description — hover reveal */}
        <div className="relative overflow-hidden">
          <p
            className="text-sm leading-relaxed line-clamp-2"
            style={{
              color: "oklch(0.58 0.012 250)",
              lineHeight: "1.7",
              maxHeight: hovered ? "200px" : "3.4em",
              transition: "max-height 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
              overflow: "hidden",
            }}
          >
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div
          className="mt-4 flex flex-wrap gap-1.5"
          style={{
            opacity: hovered ? 1 : 0.7,
            transition: "opacity 0.3s",
          }}
        >
          {project.tags.slice(0, wide ? 5 : 4).map((tag) => (
            <span
              key={tag}
              className="rounded-lg px-2.5 py-1 text-[11px] font-medium"
              style={{
                background: hovered ? colors.tag : "rgba(255,255,255,0.04)",
                color: hovered ? colors.tagText : "oklch(0.6 0.01 250)",
                border: `1px solid ${hovered ? colors.border : "rgba(255,255,255,0.06)"}`,
                fontFamily: "var(--font-space-grotesk)",
                transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Projects Section ───────────────────────────────────────────────────
export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const featuredProject = projects[0]
  const gridProjects = projects.slice(1)

  return (
    <section id="projects" className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 50% at 30% 60%, rgba(240, 178, 51, 0.035) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="section-container">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <span
            className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#00D9FF", fontFamily: "var(--font-space-grotesk)" }}
          >
            Portfolio
          </span>
          <h2
            className="mb-6 font-bold"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "var(--text-section)",
              letterSpacing: "-0.02em",
            }}
          >
            Things I&apos;ve{" "}
            <span className="text-gradient-gold">built</span>
          </h2>
          <p
            className="max-w-xl text-lg"
            style={{ color: "oklch(0.62 0.015 250)", lineHeight: "1.75" }}
          >
            Full-stack projects showcasing expertise in scalable architecture, microservices,
            and system design.
          </p>
        </motion.div>

        {/* Featured */}
        <FeaturedProject project={featuredProject} />

        {/* Asymmetric Bento Grid: [wide(2)] [normal(1)] [normal(1)] */}
        <div className="grid gap-5 lg:grid-cols-3">
          {gridProjects.map((project, index) => (
            <BentoCard
              key={project.id}
              project={project}
              index={index}
              wide={project.span === "wide"}
            />
          ))}
        </div>
      </div>
    </section>
  )
}