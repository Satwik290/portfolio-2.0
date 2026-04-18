"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useCallback, useEffect } from "react"
import { Github, ArrowUpRight, Star, X, ZoomIn, Cpu, Layers, Shield, Zap, CheckCircle, Database, Lock, Eye, TestTube, Package, GitBranch } from "lucide-react"
interface Project {
  id: string
  title: string
  shortTitle: string
  description: string
  tags: string[]
  tagReasons: Record<string, string>
  github?: string
  live?: string
  featured: boolean
  stats?: { label: string; value: string; accent: string }[]
  accent: string
  span?: "wide" | "normal"
  codeLines?: { indent: number; text: string; color: string }[]
  caseStudy?: {
    architecture: string
    problem: string
    solution: string
    metrics: { label: string; value: string; icon: string }[]
  }
}

const projects: Project[] = [
  {
    id: "fintrack-v2",
    title: "FinTrack V2 — AI-Native Wealth Intelligence",
    shortTitle: "FinTrack V2",
    description:
      "Engineered a Zero-Loss Financial Data Layer with BigInt/Integer-cents architecture. Designed Scalable RAG Pipeline for Gemini 2.5 Flash. Optimized throughput by 40% with Read-Model Aggregation pattern.",
    tags: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "Gemini AI", "TypeScript", "Winston", "Jest", "Docker"],
    tagReasons: {
      "Next.js": "SSR + App Router for SEO-critical financial dashboards",
      "NestJS": "DI + Interceptors for modular, testable API layers",
      "PostgreSQL": "ACID compliance critical for financial integrity",
      "Prisma": "Type-safe ORM with migration-first schema management",
      "Gemini AI": "RAG pipeline for context-aware financial insights",
      "TypeScript": "End-to-end type safety eliminates runtime errors",
    },
    github: "https://github.com/Satwik290/FinTrack",
    live: "https://fintrack-pink-five.vercel.app/",
    featured: true,
    accent: "cyan",
    stats: [
      { label: "Architecture", value: "Zero-Loss", accent: "#00D9FF" },
      { label: "Throughput",   value: "+40%",      accent: "#F0B233" },
      { label: "AI Model",     value: "Gemini 2.5", accent: "#C4B5FD" },
    ],
    codeLines: [
      { indent: 0, text: "@Injectable()",                             color: "#00D9FF" },
      { indent: 0, text: "export class FinTrackService {",            color: "#ffffff" },
      { indent: 1, text: "async getPortfolio(userId: string) {",      color: "oklch(0.75 0.05 200)" },
      { indent: 2, text: "const data = await this.db",               color: "#ffffff" },
      { indent: 3, text: ".findUnique({ where: { userId } })",        color: "oklch(0.65 0.01 250)" },
      { indent: 2, text: "return this.aggregate(data)",              color: "#ffffff" },
      { indent: 1, text: "}",                                         color: "oklch(0.65 0.01 250)" },
      { indent: 0, text: "}",                                         color: "rgba(255,255,255,0.5)" },
    ],
    caseStudy: {
      architecture: "Monorepo with NestJS API + Next.js client, Read-Model aggregation, BigInt precision layer",
      problem: "Standard float arithmetic causes $0.01 drift over 10k transactions. No AI layer for contextual advice.",
      solution: "Integer-cents storage (BigInt) + Gemini 2.5 RAG pipeline with streaming responses + CQRS read models.",
      metrics: [
        { label: "Throughput",  value: "+40%",    icon: "zap" },
        { label: "Data Loss",   value: "0%",      icon: "shield" },
        { label: "AI Latency",  value: "~1.2s",   icon: "cpu" },
        { label: "Type Safety", value: "100%",    icon: "layers" },
        { label: "Logging",     value: "Winston", icon: "eye" },
        { label: "Testing",     value: "Jest",    icon: "test-tube" },
        { label: "Deploy",      value: "Docker",  icon: "package" },
        { label: "CI/CD",       value: "GH Actions", icon: "git-branch" },
      ],
    },
  },
  {
    id: "doclync-pro",
    title: "DocLync Pro — Healthcare Platform",
    shortTitle: "DocLync Pro",
    description:
      "Microservices healthcare platform with real-time WebSocket communication. Integrated Stripe payments, Cloudinary storage. Implemented JWT Auth with HttpOnly cookies and RBAC.",
    tags: ["TypeScript", "React", "Node.js", "PostgreSQL", "Redis", "Stripe", "Winston", "Jest", "Docker"],
    tagReasons: {
      "TypeScript": "Strict typing across microservices reduces integration bugs",
      "React": "Component-driven UI with fine-grained re-renders via memo",
      "Node.js": "Event loop ideal for real-time WebSocket throughput",
      "PostgreSQL": "Relational integrity for patient data joins",
      "Redis": "Session cache for sub-10ms auth checks",
      "Stripe": "PCI-compliant payment infrastructure out of the box",
    },
    github: "https://github.com/Satwik290/doclync-pro",
    live: "https://github.com/Satwik290/doclync-pro",
    featured: false,
    accent: "gold",
    span: "wide",
    stats: [
      { label: "Architecture", value: "Turborepo",  accent: "#F0B233" },
      { label: "Scaling",      value: "Horizontal", accent: "#6ee7b7" },
    ],
    codeLines: [
      { indent: 0, text: "@WebSocketGateway()",                         color: "#F0B233" },
      { indent: 0, text: "export class AppointmentGateway {",           color: "#ffffff" },
      { indent: 1, text: "@SubscribeMessage('book')",                   color: "#6ee7b7" },
      { indent: 1, text: "async handleBook(@MessageBody() dto) {",      color: "oklch(0.75 0.05 200)" },
      { indent: 2, text: "await this.redis.setex(dto.id, 3600, dto)",   color: "#ffffff" },
      { indent: 2, text: "this.server.emit('confirmed', { dto })",      color: "oklch(0.65 0.01 250)" },
      { indent: 1, text: "}",                                            color: "oklch(0.65 0.01 250)" },
      { indent: 0, text: "}",                                            color: "rgba(255,255,255,0.5)" },
    ],
    caseStudy: {
      architecture: "Turborepo monorepo, NestJS microservices, Redis pub/sub, React SPA",
      problem: "Healthcare bookings required real-time updates without polling, HIPAA-adjacent auth patterns.",
      solution: "WebSocket gateway with Redis pub/sub for broadcast, JWT with HttpOnly cookies + RBAC middleware.",
      metrics: [
        { label: "Real-time",    value: "< 50ms",  icon: "zap" },
        { label: "Auth Guard",   value: "RBAC",    icon: "shield" },
        { label: "Scale",        value: "H-Scale",  icon: "layers" },
        { label: "Cache Hit",    value: "~92%",    icon: "cpu" },
        { label: "Logging",      value: "Winston", icon: "eye" },
        { label: "Coverage",     value: "95% Jest",icon: "test-tube" },
        { label: "Containers",   value: "Docker",  icon: "package" },
        { label: "Pipeline",     value: "Actions", icon: "git-branch" },
      ],
    },
  },
  {
    id: "learnify",
    title: "Learnify — Professional LMS",
    shortTitle: "Learnify",
    description:
      "High-performance LMS with MongoDB Aggregation stats engine. Atomic Synchronization for eventual consistency. Optimized cache with TanStack Query, reducing API overhead by 60%.",
    tags: ["React", "Node.js", "MongoDB", "Framer Motion", "TanStack Query", "Winston", "Jest", "Docker"],
    tagReasons: {
      "React": "Declarative UI with Suspense for streaming course content",
      "Node.js": "Streams for video content delivery",
      "MongoDB": "Flexible schema for heterogenous course structures",
      "Framer Motion": "Layout animations for seamless course navigation",
      "TanStack Query": "Intelligent caching reduces redundant API calls by 60%",
    },
    github: "https://github.com/Satwik290/Learnify-course-selling-platform",
    live: "https://satwik290.github.io/Learnify-course-selling-platform/",
    featured: false,
    accent: "lavender",
    stats: [
      { label: "API Overhead", value: "-60%",   accent: "#C4B5FD" },
      { label: "Cache",        value: "Smart",  accent: "#00D9FF" },
    ],
    codeLines: [
      { indent: 0, text: "// TanStack Query with stale-while-revalidate", color: "#C4B5FD" },
      { indent: 0, text: "const { data } = useQuery({",                   color: "#ffffff" },
      { indent: 1, text: "queryKey: ['course', id],",                     color: "oklch(0.65 0.01 250)" },
      { indent: 1, text: "queryFn: () => fetchCourse(id),",               color: "#ffffff" },
      { indent: 1, text: "staleTime: 5 * 60 * 1000,",                    color: "#6ee7b7" },
      { indent: 0, text: "})",                                             color: "rgba(255,255,255,0.5)" },
    ],
    caseStudy: {
      architecture: "React SPA + Node.js REST API + MongoDB Atlas with Aggregation pipelines",
      problem: "Frequent re-fetching of the same course data was causing server load spikes.",
      solution: "TanStack Query stale-while-revalidate + MongoDB pre-aggregated stats materialized views.",
      metrics: [
        { label: "API Load",  value: "-60%",   icon: "zap" },
        { label: "TTFB",      value: "< 200ms", icon: "cpu" },
        { label: "Sync",      value: "Atomic", icon: "shield" },
        { label: "Cache",     value: "Smart",  icon: "layers" },
        { label: "Observability",value: "Winston", icon: "eye" },
        { label: "Tests",         value: "Jest",    icon: "test-tube" },
        { label: "Hosting",      value: "Docker",  icon: "package" },
        { label: "DevOps",       value: "GH Actions", icon: "git-branch" },
      ],
    },
  },
  {
    id: "slooze",
    title: "Slooze — Food Ordering Platform",
    shortTitle: "Slooze",
    description:
      "Full-stack food ordering with JWT auth and three-role RBAC. Multi-region data isolation. Real-time shared cart with WebSockets and shareable links.",
    tags: ["NestJS", "Next.js", "PostgreSQL", "Prisma", "Socket.io", "Winston", "Jest", "Docker"],
    tagReasons: {
      "NestJS": "Guard-based RBAC via custom decorators",
      "Next.js": "SSR for fast initial restaurant page loads",
      "PostgreSQL": "Row-level security for multi-tenant data isolation",
      "Prisma": "Typed queries prevent SQL injection vectors",
      "Socket.io": "Shared cart sync across multiple browser tabs",
    },
    github: "https://github.com/Satwik290/Slooze-Food-Application",
    featured: false,
    accent: "green",
    codeLines: [
      { indent: 0, text: "@UseGuards(RolesGuard)",                       color: "#6ee7b7" },
      { indent: 0, text: "@Roles(Role.ADMIN, Role.RESTAURANT)",          color: "#F0B233" },
      { indent: 0, text: "async updateCart(@Body() dto: CartDto) {",     color: "#ffffff" },
      { indent: 1, text: "this.io.to(dto.roomId).emit('cart', dto)",     color: "oklch(0.65 0.01 250)" },
      { indent: 0, text: "}",                                             color: "rgba(255,255,255,0.5)" },
    ],
    caseStudy: {
      architecture: "NestJS + Next.js fullstack, PostgreSQL row-level security, Socket.io rooms",
      problem: "Shared cart needed real-time multi-device sync without conflicts; RBAC for 3 user roles.",
      solution: "Socket.io rooms keyed by cartId + Prisma transactions for atomic cart updates + Guard decorators.",
      metrics: [
        { label: "Roles",     value: "3 RBAC",  icon: "shield" },
        { label: "RT Sync",   value: "< 25ms",  icon: "zap" },
        { label: "Regions",   value: "Multi",   icon: "layers" },
        { label: "Auth",      value: "JWT+HC",  icon: "cpu" },
        { label: "Tracing",      value: "Winston", icon: "eye" },
        { label: "Unit Tests",   value: "Jest",    icon: "test-tube" },
        { label: "Deployment",   value: "Docker",  icon: "package" },
        { label: "Builds",       value: "Actions", icon: "git-branch" },
      ],
    },
  },
  {
    id: "college-appointment-system",
    title: "College Appointment System — Educational Resource Management",
    shortTitle: "College Appointments",
    description:
      "A robust modular backend for managing student-professor interactions. Features automated slot management, JWT-based security with HTTP-only cookies, and role-based access control.",
    tags: ["Node.js", "Express", "TypeScript", "MongoDB", "Zod", "Winston", "Jest", "Docker"],
    tagReasons: {
      "Node.js": "Runtime for high-concurrency appointment booking",
      "Express": "Modular routing for auth, availability, and appointment domains",
      "TypeScript": "Strict type safety across controllers and services",
      "MongoDB": "Flexible document storage with Mongoose ODM for relational-like population",
      "Zod": "Schema validation ensuring 100% data integrity before hitting services",
    },
    github: "https://github.com/Satwik290/College-Appointment-System",
    featured: false,
    accent: "blue",
    codeLines: [
      { indent: 0, text: "export const roleMiddleware =", color: "#6ee7b7" },
      { indent: 1, text: "(...allowedRoles: UserRole[]) =>", color: "#F0B233" },
      { indent: 1, text: "(req, res, next) => {", color: "#ffffff" },
      { indent: 2, text: "if (!allowedRoles.includes(req.user.role)) {", color: "oklch(0.65 0.01 250)" },
      { indent: 3, text: "return res.status(403).json({ message: 'Forbidden' });", color: "rgba(255,255,255,0.5)" },
      { indent: 1, text: "};", color: "#ffffff" },
    ],
    caseStudy: {
      architecture: "Modular Node.js/Express architecture with Service-Controller-Model pattern",
      problem: "Need for real-time race condition handling in slot bookings and strict role separation for security",
      solution: "Atomic MongoDB updates via 'findOneAndUpdate' to prevent overbooking and JWT-based middleware for RBAC",
      metrics: [
        { label: "Roles",     value: "Student/Prof", icon: "shield" },
        { label: "Validation", value: "Zod Schema",  icon: "check-circle" },
        { label: "Database",  value: "Mongoose",     icon: "database" },
        { label: "Security",  value: "JWT/Cookies",  icon: "lock" },
        { label: "Logs",         value: "Winston",   icon: "eye" },
        { label: "Test Suite",   value: "Jest",      icon: "test-tube" },
        { label: "Runtime",      value: "Docker",    icon: "package" },
        { label: "CI Flow",      value: "GH Actions",icon: "git-branch" },
      ],
    },
  },
]

const accentColors: Record<string, { border: string; glow: string; tag: string; tagText: string; orb: string }> = {
  cyan: {
    border:   "rgba(0,217,255,0.2)",
    glow:     "rgba(0,217,255,0.12)",
    tag:      "rgba(0,217,255,0.08)",
    tagText:  "#00D9FF",
    orb:      "rgba(0,217,255,0.06)",
  },
  gold: {
    border:   "rgba(240,178,51,0.2)",
    glow:     "rgba(240,178,51,0.12)",
    tag:      "rgba(240,178,51,0.08)",
    tagText:  "#F0B233",
    orb:      "rgba(240,178,51,0.05)",
  },
  lavender: {
    border:   "rgba(196,181,253,0.2)",
    glow:     "rgba(196,181,253,0.12)",
    tag:      "rgba(196,181,253,0.08)",
    tagText:  "#C4B5FD",
    orb:      "rgba(196,181,253,0.05)",
  },
  green: {
    border:   "rgba(110,231,183,0.2)",
    glow:     "rgba(110,231,183,0.12)",
    tag:      "rgba(110,231,183,0.08)",
    tagText:  "#6ee7b7",
    orb:      "rgba(110,231,183,0.05)",
  },
  blue: {
    border:   "rgba(59,130,246,0.2)",
    glow:     "rgba(59,130,246,0.12)",
    tag:      "rgba(59,130,246,0.08)",
    tagText:  "#3b82f6",
    orb:      "rgba(59,130,246,0.05)",
  },
}

// ─── Metric Icon ───────────────────────────────────────────────────────────────
function MetricIcon({ icon }: { icon: string }) {
  const cls = "w-3.5 h-3.5"
  if (icon === "zap")          return <Zap          className={cls} />
  if (icon === "shield")       return <Shield       className={cls} />
  if (icon === "cpu")          return <Cpu          className={cls} />
  if (icon === "layers")       return <Layers       className={cls} />
  if (icon === "check-circle") return <CheckCircle  className={cls} />
  if (icon === "database")     return <Database     className={cls} />
  if (icon === "lock")         return <Lock         className={cls} />
  if (icon === "eye")          return <Eye          className={cls} />
  if (icon === "test-tube")    return <TestTube     className={cls} />
  if (icon === "package")      return <Package      className={cls} />
  if (icon === "git-branch")   return <GitBranch    className={cls} />
  return null
}

// (SpotlightCard logic is inlined into BentoCard for correct pointer-event wiring)

// ─── Tag with Tooltip ──────────────────────────────────────────────────────────
function TagWithTooltip({
  tag,
  reason,
  colors,
  hovered: cardHovered,
}: {
  tag: string
  reason?: string
  colors: (typeof accentColors)[string]
  hovered: boolean
}) {
  const [show, setShow] = useState(false)
  return (
    <span
      className="relative"
      data-cursor="tag"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <span
        className="rounded-lg px-2.5 py-1 text-[11px] font-medium cursor-default"
        style={{
          background: cardHovered ? colors.tag : "rgba(255,255,255,0.04)",
          color:      cardHovered ? colors.tagText : "oklch(0.6 0.01 250)",
          border: `1px solid ${cardHovered ? colors.border : "rgba(255,255,255,0.06)"}`,
          fontFamily: "var(--font-space-grotesk)",
          transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {tag}
      </span>
      <AnimatePresence>
        {show && reason && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.94 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-full left-1/2 z-[100000] mb-2 w-44 rounded-xl px-3 py-2 text-[10px] leading-snug pointer-events-none"
            style={{
              transform: "translateX(-50%)",
              background: "rgba(8,8,16,0.95)",
              border: `1px solid ${colors.border}`,
              color: "oklch(0.75 0.01 250)",
              boxShadow: `0 8px 30px rgba(0,0,0,0.6), 0 0 12px ${colors.tagText}22`,
              backdropFilter: "blur(16px)",
              fontFamily: "var(--font-space-grotesk)",
            }}
          >
            <span style={{ color: colors.tagText, fontWeight: 600 }}>{tag}</span>
            <br />
            {reason}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}

// ─── Terminal Preview ──────────────────────────────────────────────────────────
function TerminalPreview({
  project,
  dimmed,
}: {
  project: Project
  dimmed: boolean
}) {
  const colors = accentColors[project.accent]
  const lines = project.codeLines ?? []

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-xl"
      data-cursor="code"
      style={{
        background: "rgba(0,0,0,0.4)",
        border: `1px solid ${colors.border}`,
        backdropFilter: "blur(8px)",
        fontFamily: "var(--font-jetbrains-mono, monospace)",
        opacity: dimmed ? 0.22 : 1,
        transition: "opacity 0.4s cubic-bezier(0.22,1,0.36,1)",
        willChange: "opacity",
      }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b px-4 py-3" style={{ borderColor: colors.border }}>
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
        <span className="ml-4 text-[10px] opacity-40" style={{ color: colors.tagText }}>
          service.ts
        </span>
      </div>
      <div className="p-4 text-[11px] leading-6 opacity-80">
        {lines.map((line, i) => (
          <div key={i} style={{ paddingLeft: `${line.indent * 14}px`, color: line.color }}>
            {line.text}
          </div>
        ))}
        <div className="mt-1 pl-8">
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

// ─── Portal Case Study Modal ──────────────────────────────────────────────────
function PortalModal({
  project,
  originX,
  originY,
  onClose,
}: {
  project: Project
  originX: number
  originY: number
  onClose: () => void
}) {
  const colors = accentColors[project.accent]
  const cs = project.caseStudy

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  const originPct = {
    x: `${(originX / window.innerWidth) * 100}%`,
    y: `${(originY / window.innerHeight) * 100}%`,
  }

  return (
    <motion.div
      className="fixed inset-0 z-[99990] overflow-y-auto"
      data-lenis-prevent="true"
      initial={{ clipPath: `circle(0px at ${originPct.x} ${originPct.y})` }}
      animate={{ clipPath: `circle(200% at ${originPct.x} ${originPct.y})` }}
      exit={{ clipPath: `circle(0px at ${originPct.x} ${originPct.y})` }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      style={{ background: "rgba(4,4,12,0.97)", backdropFilter: "blur(32px)" }}
    >
      {/* Scanline CRT overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[99991]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
          mixBlendMode: "overlay",
        }}
      />

      <div className="relative z-[99992] mx-auto max-w-4xl px-6 py-16 lg:px-12">
        {/* Close */}
        <motion.button
          className="fixed right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full transition-all"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: `1px solid ${colors.border}`,
            color: colors.tagText,
          }}
          onClick={onClose}
          whileHover={{ scale: 1.12, rotate: 90 }}
          transition={{ duration: 0.22 }}
          aria-label="Close case study"
        >
          <X className="h-4 w-4" />
        </motion.button>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 flex items-center gap-3"
        >
          <span
            className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
            style={{ background: colors.tag, color: colors.tagText, border: `1px solid ${colors.border}` }}
          >
            <ZoomIn className="h-2.5 w-2.5" /> Case Study
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 text-4xl font-bold lg:text-5xl"
          style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.025em", color: colors.tagText }}
        >
          {project.title}
        </motion.h2>

        {/* Metrics */}
        {cs && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {cs.metrics.map((m) => (
              <div
                key={m.label}
                className="flex flex-col gap-1 rounded-2xl p-4"
                style={{ background: colors.tag, border: `1px solid ${colors.border}` }}
              >
                <div className="flex items-center gap-1.5" style={{ color: colors.tagText }}>
                  <MetricIcon icon={m.icon} />
                  <span className="text-[10px] uppercase tracking-widest opacity-70">{m.label}</span>
                </div>
                <span className="text-2xl font-bold" style={{ color: colors.tagText, fontFamily: "var(--font-space-grotesk)" }}>
                  {m.value}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Architecture / Problem / Solution */}
        {cs && (
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              { label: "Architecture", content: cs.architecture },
              { label: "Problem",      content: cs.problem },
              { label: "Solution",     content: cs.solution },
            ].map(({ label, content }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.48 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl p-5"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest" style={{ color: colors.tagText }}>
                  {label}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "oklch(0.65 0.012 250)" }}>
                  {content}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Code snippet */}
        {project.codeLines && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.68, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 rounded-2xl overflow-hidden"
            style={{ border: `1px solid ${colors.border}` }}
          >
            <div className="flex items-center gap-2 border-b px-5 py-3" style={{ borderColor: colors.border, background: "rgba(0,0,0,0.4)" }}>
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
              <span className="ml-3 text-[11px] opacity-50" style={{ color: colors.tagText }}>service.ts</span>
            </div>
            <div className="p-6 text-sm leading-7" style={{ background: "rgba(0,0,0,0.3)", fontFamily: "var(--font-jetbrains-mono, monospace)" }}>
              {project.codeLines.map((line, i) => (
                <div key={i} style={{ paddingLeft: `${line.indent * 18}px`, color: line.color }}>
                  {line.text}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.78, duration: 0.4 }}
          className="mt-8 flex flex-wrap gap-2"
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3 py-1.5 text-xs font-medium"
              style={{ background: colors.tag, color: colors.tagText, border: `1px solid ${colors.border}`, fontFamily: "var(--font-space-grotesk)" }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.84, duration: 0.4 }}
          className="mt-8 flex items-center gap-4"
        >
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="github"
              className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "oklch(0.8 0.01 250)",
              }}
            >
              <Github className="h-4 w-4" /> Source Code
            </a>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

// ─── Featured Project ─────────────────────────────────────────────────────────
function FeaturedProject({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const colors = accentColors[project.accent]
  const [isLiveHovering, setIsLiveHovering] = useState(false)
  const [portalOpen, setPortalOpen] = useState(false)
  const [portalOrigin, setPortalOrigin] = useState({ x: 0, y: 0 })

  const openPortal = useCallback((e: React.MouseEvent) => {
    setPortalOrigin({ x: e.clientX, y: e.clientY })
    setPortalOpen(true)
  }, [])

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="group relative mb-8 overflow-hidden rounded-3xl"
        data-cursor="project"
        onClick={openPortal}
        style={{
          background: "var(--glass-card)",
          border: `1px solid ${colors.border}`,
          backdropFilter: "blur(20px)",
          cursor: "none",
        }}
        whileHover={{
          boxShadow: `0 30px 80px ${colors.glow}, 0 0 0 1px ${colors.border}`,
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        }}
      >
        {/* BG Orb */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full transition-all duration-700 group-hover:scale-125"
          style={{ background: `radial-gradient(circle, ${colors.orb} 0%, transparent 70%)` }}
        />

        <div className="relative grid gap-0 lg:grid-cols-5">
          {/* Left */}
          <div className="p-8 lg:col-span-3 lg:p-12">
            <div className="mb-4 flex items-center gap-3">
              <span
                className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                style={{ background: colors.tag, color: colors.tagText, border: `1px solid ${colors.border}`, fontFamily: "var(--font-space-grotesk)" }}
              >
                <Star className="h-2.5 w-2.5" /> Featured Project
              </span>
            </div>

            <h3
              className="mb-4 text-2xl font-bold lg:text-3xl"
              style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em", lineHeight: 1.2 }}
            >
              {project.title}
            </h3>

            {project.stats && (
              <div className="mb-5 flex flex-wrap gap-3">
                {project.stats.map((stat) => (
                  <span
                    key={stat.label}
                    className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: stat.accent, fontFamily: "var(--font-space-grotesk)" }}
                  >
                    <span style={{ opacity: 0.55 }}>{stat.label}: </span>{stat.value}
                  </span>
                ))}
              </div>
            )}

            <p className="mb-8 text-base leading-relaxed" style={{ color: "oklch(0.62 0.015 250)", lineHeight: "1.75" }}>
              {project.description}
            </p>

            {/* Tech tags with tooltip */}
            <div className="mb-8 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <TagWithTooltip
                  key={tag}
                  tag={tag}
                  reason={project.tagReasons?.[tag]}
                  colors={colors}
                  hovered={true}
                />
              ))}
            </div>

            {/* ── Button Hierarchy ── */}
            <div
              className="flex flex-wrap gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* PRIMARY: Live Preview */}
              {project.live && (
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="live"
                  onMouseEnter={() => setIsLiveHovering(true)}
                  onMouseLeave={() => setIsLiveHovering(false)}
                  className="group/btn relative flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${colors.tagText}18 0%, ${colors.tagText}08 100%)`,
                    border: `1px solid ${colors.tagText}55`,
                    color: colors.tagText,
                    fontFamily: "var(--font-space-grotesk)",
                  }}
                  whileHover={{
                    background: colors.tagText,
                    color: "#0a0a12",
                    boxShadow: `0 0 30px ${colors.tagText}55, 0 8px 30px rgba(0,0,0,0.4)`,
                  }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="pulse-dot" style={{ background: colors.tagText }} />
                  Live Preview
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </motion.a>
              )}

              {/* SECONDARY: View Code */}
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="github"
                  className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
                  style={{
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "oklch(0.72 0.01 250)",
                    fontFamily: "var(--font-space-grotesk)",
                  }}
                  whileHover={{
                    background: "rgba(255,255,255,0.06)",
                    borderColor: "rgba(255,255,255,0.25)",
                    color: "oklch(0.9 0.006 220)",
                  }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Github className="h-4 w-4" />
                  Source Code
                </motion.a>
              )}
            </div>
          </div>

          {/* Right: Terminal (dims on live hover) */}
          <div className="hidden lg:block lg:col-span-2" style={{ padding: "24px 24px 24px 0" }}>
            <TerminalPreview project={project} dimmed={isLiveHovering} />
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {portalOpen && (
          <PortalModal
            project={project}
            originX={portalOrigin.x}
            originY={portalOrigin.y}
            onClose={() => setPortalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Bento Card ───────────────────────────────────────────────────────────────
function BentoCard({
  project,
  index,
  wide = false,
}: {
  project: Project
  index: number
  wide?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })
  const colors = accentColors[project.accent]
  const [hovered, setHovered] = useState(false)
  const [portalOpen, setPortalOpen] = useState(false)
  const [portalOrigin, setPortalOrigin] = useState({ x: 0, y: 0 })

  const openPortal = useCallback((e: React.MouseEvent) => {
    // Only open if not clicking an <a> or <button>
    const target = e.target as HTMLElement
    if (target.closest("a") || target.closest("button")) return
    setPortalOrigin({ x: e.clientX, y: e.clientY })
    setPortalOpen(true)
  }, [])

  const bentoCardRef = useRef<HTMLDivElement>(null)
  const handleSpotlight = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!bentoCardRef.current) return
    const rect = bentoCardRef.current.getBoundingClientRect()
    bentoCardRef.current.style.setProperty("--spot-x", `${e.clientX - rect.left}px`)
    bentoCardRef.current.style.setProperty("--spot-y", `${e.clientY - rect.top}px`)
  }, [])

  return (
    <>
      <motion.div
        ref={(node) => {
          // Assign both refs
          ;(ref as React.MutableRefObject<HTMLDivElement | null>).current = node
          ;(bentoCardRef as React.MutableRefObject<HTMLDivElement | null>).current = node
        }}
        initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleSpotlight}
        onClick={openPortal}
        className={`spotlight-card group relative overflow-hidden rounded-2xl ${wide ? "lg:col-span-2" : ""}`}
        data-cursor="project"
        style={{
          background: "var(--glass-card)",
          border: hovered ? `1px solid ${colors.border}` : "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(16px)",
          boxShadow: hovered ? `0 20px 50px ${colors.glow}` : "none",
          transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
          cursor: "none",
          "--spot-accent": colors.tagText,
        } as React.CSSProperties}
      >
        {/* Spotlight reveal layer — revealed by CSS mask on spotlight-card:hover */}
        <div className="spotlight-reveal-layer" aria-hidden="true" />

        {/* Top accent line */}
        <div
          className="h-px w-full"
          style={{
            background: `linear-gradient(90deg, ${colors.tagText}60, transparent)`,
            opacity: hovered ? 1 : 0.5,
            transition: "opacity 0.3s",
          }}
        />

        <div className="p-6">
          <div className="mb-3 flex items-start justify-between">
            <h3
              className="text-lg font-bold"
              style={{
                fontFamily: "var(--font-syne)",
                letterSpacing: "-0.01em",
                color: hovered ? colors.tagText : "oklch(0.9 0.006 220)",
                transition: "color 0.3s cubic-bezier(0.22,1,0.36,1)",
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
                  data-cursor="github"
                  className="flex h-9 w-9 items-center justify-center rounded-lg touch-target transition-all"
                  style={{
                    background: hovered ? colors.tag : "rgba(255,255,255,0.04)",
                    border: `1px solid ${hovered ? colors.border : "rgba(255,255,255,0.08)"}`,
                    color: hovered ? colors.tagText : "oklch(0.6 0.012 250)",
                    transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
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
                  data-cursor="live"
                  className="flex h-9 w-9 items-center justify-center rounded-lg touch-target transition-all"
                  style={{
                    background: hovered ? colors.tag : "rgba(255,255,255,0.04)",
                    border: `1px solid ${hovered ? colors.border : "rgba(255,255,255,0.08)"}`,
                    color: hovered ? colors.tagText : "oklch(0.6 0.012 250)",
                    transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>

          {project.stats && (
            <div className="mb-3 flex gap-4">
              {project.stats.slice(0, 2).map((stat) => (
                <div key={stat.label}>
                  <div className="text-base font-bold" style={{ color: stat.accent, fontFamily: "var(--font-space-grotesk)" }}>{stat.value}</div>
                  <div className="text-[9px] uppercase tracking-widest" style={{ color: "oklch(0.45 0.012 250)" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="relative overflow-hidden">
            <p
              className="text-sm leading-relaxed"
              style={{
                color: "oklch(0.58 0.012 250)",
                lineHeight: "1.7",
                maxHeight: hovered ? "200px" : "3.4em",
                transition: "max-height 0.5s cubic-bezier(0.22,1,0.36,1)",
                overflow: "hidden",
              }}
            >
              {project.description}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5" style={{ opacity: hovered ? 1 : 0.7, transition: "opacity 0.3s" }}>
              {project.tags.slice(0, wide ? 5 : 4).map((tag) => (
                <TagWithTooltip
                  key={tag}
                  tag={tag}
                  reason={project.tagReasons?.[tag]}
                  colors={colors}
                  hovered={hovered}
                />
              ))}
            </div>

            {/* Quick Live Link */}
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="live"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 10 }}
                className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors"
                style={{ color: colors.tagText, fontFamily: "var(--font-space-grotesk)" }}
                onClick={(e) => e.stopPropagation()}
              >
                <span className="pulse-dot" style={{ background: colors.tagText, width: 5, height: 5 }} />
                Live Preview
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {portalOpen && (
          <PortalModal
            project={project}
            originX={portalOrigin.x}
            originY={portalOrigin.y}
            onClose={() => setPortalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const featuredProject = projects[0]
  const gridProjects = projects.slice(1)

  return (
    <section id="projects" className="relative section-padding overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 70% 50% at 30% 60%, rgba(240,178,51,0.035) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="section-container">
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
            style={{ fontFamily: "var(--font-syne)", fontSize: "var(--text-section)", letterSpacing: "-0.02em" }}
          >
            Things I&apos;ve{" "}
            <span className="text-gradient-gold">built</span>
          </h2>
          <p className="max-w-xl text-lg" style={{ color: "oklch(0.62 0.015 250)", lineHeight: "1.75" }}>
            Full-stack projects showcasing expertise in scalable architecture, microservices, and system design.
          </p>
        </motion.div>

        <FeaturedProject project={featuredProject} />

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