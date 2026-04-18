"use client"

import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"
import { MapPin, Calendar } from "lucide-react"

interface Experience {
  id: string
  role: string
  company: string
  location: string
  period: string
  description: string
  achievements: string[]
  technologies: string[]
  accent: string
}

const experiences: Experience[] = [
  {
    id: "fintrack",
    role: "Full-Stack Software Engineer",
    company: "FinTrack V2",
    location: "Remote",
    period: "2025 — Present",
    description:
      "Architected an AI-native wealth intelligence platform from ground up, focusing on scalable data layers and advanced RAG pipelines for financial advisory.",
    achievements: [
      "Engineered Zero-Loss Financial Data Layer using BigInt/Integer-cents architecture to eliminate IEEE 754 floating-point precision loss",
      "Designed Scalable RAG Pipeline for Gemini 2.5 Flash with State-Aware Snapshot Builder for contextually accurate AI advisory",
      "Optimized system throughput by 40% via Read-Model Aggregation pattern and PrismaPg native adapter optimization",
      "Engineered Async Task Orchestration Layer for ingesting 15k+ market instruments with NestJS Cron workers",
    ],
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "Gemini AI", "TypeScript"],
    accent: "cyan",
  },
  {
    id: "doclync",
    role: "Full-Stack Software Engineer",
    company: "DocLync Pro",
    location: "Remote",
    period: "2026 (Upcoming)",
    description:
      "Building a comprehensive healthcare platform with real-time communication and secure payment integration using microservices architecture.",
    achievements: [
      "Engineering microservices monorepo (Turborepo) with shared Prisma and Zod packages for 100% type-safety",
      "Built real-time WebSocket chat engine using Socket.io and Redis Pub/Sub for horizontal scaling",
      "Integrated Stripe API for secure payment flows and Cloudinary for medical document storage",
      "Implemented secure JWT Auth with HttpOnly cookies and RBAC using Zustand state management",
    ],
    technologies: ["TypeScript", "React", "Node.js", "PostgreSQL", "Redis", "Stripe"],
    accent: "gold",
  },
  {
    id: "learnify",
    role: "Full-Stack Developer",
    company: "Learnify LMS",
    location: "Remote",
    period: "2023 — 2024",
    description:
      "Developed a high-performance learning management system with advanced analytics and optimized data persistence patterns.",
    achievements: [
      "Architected High-Performance Stats Engine leveraging MongoDB Aggregation Framework with Atomic Synchronization logic",
      "Designed Resilient Data Persistence Layer with custom Mongoose middleware for Soft-Deletion Protection",
      "Optimized client-side state with TanStack Query for intelligent cache invalidation, reducing API overhead by 60%",
      "Ensured eventual consistency across user enrollment events through atomic transaction handling",
    ],
    technologies: ["React", "Node.js", "MongoDB", "Framer Motion", "Zod", "JWT"],
    accent: "lavender",
  },
]

const accentColors: Record<string, { dot: string; border: string; glow: string; tag: string; tagText: string; fill: string }> = {
  cyan: {
    dot: "#00D9FF",
    border: "rgba(0, 217, 255, 0.15)",
    glow: "rgba(0, 217, 255, 0.08)",
    tag: "rgba(0, 217, 255, 0.08)",
    tagText: "#00D9FF",
    fill: "rgba(0, 217, 255, 0.6)",
  },
  gold: {
    dot: "#F0B233",
    border: "rgba(240, 178, 51, 0.15)",
    glow: "rgba(240, 178, 51, 0.08)",
    tag: "rgba(240, 178, 51, 0.08)",
    tagText: "#F0B233",
    fill: "rgba(240, 178, 51, 0.6)",
  },
  lavender: {
    dot: "#C4B5FD",
    border: "rgba(196, 181, 253, 0.15)",
    glow: "rgba(196, 181, 253, 0.08)",
    tag: "rgba(196, 181, 253, 0.08)",
    tagText: "#C4B5FD",
    fill: "rgba(196, 181, 253, 0.6)",
  },
}

function TimelineCard({ experience, index }: { experience: Experience; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const colors = accentColors[experience.accent]

  // Alternate cards from left and right
  const isLeft = index % 2 === 0

  return (
    <div className="relative flex gap-6 lg:gap-10">
      {/* Dot on the line */}
      <div className="relative flex flex-col items-center pt-7">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
          style={{
            background: colors.dot,
            boxShadow: `0 0 0 4px rgba(0,0,0,0.5), 0 0 20px ${colors.fill}`,
          }}
        >
          {/* Pulsing ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ scale: [1, 2.2, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
            style={{ background: colors.dot }}
          />
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        ref={ref}
        initial={{
          opacity: 0,
          x: isLeft ? -40 : 40,
          filter: "blur(6px)",
        }}
        animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
        transition={{
          duration: 0.7,
          delay: index * 0.12 + 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="group mb-10 flex-1 overflow-hidden rounded-2xl"
        style={{
          background: "var(--glass-card)",
          border: `1px solid ${colors.border}`,
          backdropFilter: "blur(16px)",
        }}
        whileHover={{
          y: -4,
          boxShadow: `0 24px 60px ${colors.glow}, 0 0 0 1px ${colors.border}`,
          transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
        }}
      >
        {/* Top accent gradient */}
        <div
          className="h-px w-full"
          style={{ background: `linear-gradient(90deg, ${colors.dot}90, transparent 60%)` }}
        />

        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3
                className="mb-1 text-xl font-bold"
                style={{
                  fontFamily: "var(--font-syne)",
                  letterSpacing: "-0.01em",
                  color: "oklch(0.92 0.006 220)",
                }}
              >
                {experience.role}
              </h3>
              <p className="font-semibold" style={{ color: colors.dot }}>
                {experience.company}
              </p>
            </div>
            <div
              className="flex flex-wrap items-start gap-3 text-xs"
              style={{ color: "oklch(0.52 0.012 250)" }}
            >
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                {experience.period}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3" />
                {experience.location}
              </span>
            </div>
          </div>

          {/* Description */}
          <p
            className="mb-6 text-sm leading-relaxed"
            style={{ color: "oklch(0.6 0.012 250)", lineHeight: "1.75" }}
          >
            {experience.description}
          </p>

          {/* Achievements — staggered */}
          <ul className="mb-6 space-y-3">
            {experience.achievements.map((achievement, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.4,
                  delay: index * 0.12 + 0.3 + i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-start gap-3 text-sm"
                style={{ color: "oklch(0.62 0.012 250)", lineHeight: "1.65" }}
              >
                <div
                  className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: colors.dot, boxShadow: `0 0 6px ${colors.dot}` }}
                />
                <span>{achievement}</span>
              </motion.li>
            ))}
          </ul>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-lg px-3 py-1 text-[11px] font-medium"
                style={{
                  background: colors.tag,
                  color: colors.tagText,
                  border: `1px solid ${colors.border}`,
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef(null)
  const isInView = useInView(headerRef, { once: true, margin: "-80px" })

  // Scroll-fill timeline line
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "end 0.3"],
  })
  const rawScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])
  const scaleY = useSpring(rawScaleY, { damping: 20, stiffness: 80 })

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      style={{ position: "relative" }}
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(196, 181, 253, 0.04) 0%, transparent 60%)",
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
            Experience
          </span>
          <h2
            className="mb-6 font-bold"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "var(--text-section)",
              letterSpacing: "-0.02em",
            }}
          >
            Projects &{" "}
            <span className="text-gradient-mixed">Journey</span>
          </h2>
          <p
            className="max-w-xl text-lg"
            style={{ color: "oklch(0.62 0.015 250)", lineHeight: "1.75" }}
          >
            A journey through ambitious full-stack projects that shaped my expertise in
            scalable systems and architectural excellence.
          </p>
        </motion.div>

        {/* Timeline wrapper */}
        <div ref={timelineRef} className="relative max-w-4xl">
          {/* Master scroll-fill line */}
          <div
            className="absolute left-[10px] top-0 w-px"
            style={{
              height: "100%",
              background: "rgba(255,255,255,0.05)",
            }}
          >
            <motion.div
              className="absolute inset-x-0 top-0 origin-top rounded-full"
              style={{
                height: "100%",
                background:
                  "linear-gradient(to bottom, #00D9FF, #C4B5FD 60%, #F0B233)",
                scaleY,
                boxShadow: "0 0 12px rgba(0,217,255,0.4)",
              }}
            />
          </div>

          {/* Cards */}
          {experiences.map((experience, index) => (
            <TimelineCard key={experience.id} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}