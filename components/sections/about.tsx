"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Code2, Server, Database, Cloud, Zap, Users } from "lucide-react"

const stats = [
  { value: "350+", label: "DSA Problems", accent: "cyan" },
  { value: "8.1", label: "CGPA", accent: "gold" },
  { value: "40%", label: "Throughput ↑", accent: "cyan" },
  { value: "60%", label: "API Overhead ↓", accent: "gold" },
]

const highlights = [
  {
    icon: Code2,
    title: "Frontend",
    description: "React, Next.js, TypeScript, Zustand, TanStack Query & modern CSS",
    accent: "cyan",
  },
  {
    icon: Server,
    title: "Backend",
    description: "Node.js, NestJS (Fastify), Microservices, Event-Driven Design",
    accent: "gold",
  },
  {
    icon: Database,
    title: "Data Layer",
    description: "PostgreSQL, MongoDB, Prisma, Mongoose, Redis Pub/Sub",
    accent: "cyan",
  },
  {
    icon: Cloud,
    title: "DevOps",
    description: "AWS (EC2, S3), Docker, GitHub Actions, Linux/Bash",
    accent: "lavender",
  },
  {
    icon: Zap,
    title: "Architecture",
    description: "Microservices (Turborepo), RAG (AI), WebSockets, RBAC",
    accent: "gold",
  },
  {
    icon: Users,
    title: "Specialization",
    description: "Scalable systems, atomic synchronization, high-availability design",
    accent: "cyan",
  },
]

const accentColors = {
  cyan: {
    icon: "rgba(0, 217, 255, 0.15)",
    iconText: "#00D9FF",
    border: "rgba(0, 217, 255, 0.15)",
    glow: "rgba(0, 217, 255, 0.08)",
  },
  gold: {
    icon: "rgba(240, 178, 51, 0.12)",
    iconText: "#F0B233",
    border: "rgba(240, 178, 51, 0.15)",
    glow: "rgba(240, 178, 51, 0.06)",
  },
  lavender: {
    icon: "rgba(196, 181, 253, 0.12)",
    iconText: "#C4B5FD",
    border: "rgba(196, 181, 253, 0.15)",
    glow: "rgba(196, 181, 253, 0.06)",
  },
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
}

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="about" className="relative section-padding overflow-hidden">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 80% 50%, rgba(240, 178, 51, 0.04) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="section-container">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-24"
        >
          <span
            className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#00D9FF", fontFamily: "var(--font-space-grotesk)" }}
          >
            About
          </span>
          <h2
            className="mb-6 text-section font-bold"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "var(--text-section)",
              letterSpacing: "-0.02em",
            }}
          >
            Engineering-first,{" "}
            <span className="text-gradient-gold">design-aware</span>
          </h2>
          <p
            className="max-w-2xl text-lg leading-relaxed"
            style={{ color: "oklch(0.62 0.015 250)", lineHeight: "1.8" }}
          >
            I&apos;m a software engineer passionate about building scalable web systems with clean code and architectural excellence. My focus is on engineering high-availability systems with atomic synchronization and deterministic data layers.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              className="rounded-2xl p-5 text-center"
              style={{
                background: "var(--glass-card)",
                border: `1px solid ${stat.accent === "cyan" ? "rgba(0, 217, 255, 0.1)" : "rgba(240, 178, 51, 0.1)"}`,
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                className="mb-1 text-3xl font-bold"
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  color: stat.accent === "cyan" ? "#00D9FF" : "#F0B233",
                  lineHeight: 1.1,
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs uppercase tracking-widest"
                style={{ color: "oklch(0.5 0.012 250)", fontFamily: "var(--font-space-grotesk)" }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bio columns */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-20 grid gap-8 lg:grid-cols-2"
        >
          <div className="space-y-5">
            <p style={{ color: "oklch(0.62 0.015 250)", lineHeight: "1.8" }}>
              Currently pursuing B.Tech in Computer Science at DRIEMS University (CGPA 8.1), I&apos;ve developed expertise in the modern JavaScript ecosystem across frontend and backend. I&apos;m particularly focused on solving complex architectural challenges through microservices, event-driven design, and zero-loss data layer implementations.
            </p>
            <p style={{ color: "oklch(0.62 0.015 250)", lineHeight: "1.8" }}>
              My recent work on FinTrack V2 demonstrates my ability to architect scalable systems—implementing RAG pipelines for AI advisory, optimizing throughput by 40%, and ensuring deterministic accounting through BigInt/Integer-cents architecture.
            </p>
          </div>
          <div className="space-y-5">
            <p style={{ color: "oklch(0.62 0.015 250)", lineHeight: "1.8" }}>
              I&apos;m deeply committed to code quality and system optimization, with 350+ DSA problems solved and consistent contributions to competitive programming. I bring strong fundamentals in OS, DBMS, and Computer Networks to every architectural decision.
            </p>
            <p style={{ color: "oklch(0.62 0.015 250)", lineHeight: "1.8" }}>
              Always excited to collaborate on projects that push technological boundaries and solve real-world problems with elegant, scalable solutions. Open to remote opportunities and innovative challenges in full-stack engineering.
            </p>
          </div>
        </motion.div>

        {/* Highlights Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {highlights.map((item) => {
            const colors = accentColors[item.accent as keyof typeof accentColors]
            return (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="group rounded-2xl p-6 transition-all duration-300"
                style={{
                  background: "var(--glass-card)",
                  border: `1px solid ${colors.border}`,
                  backdropFilter: "blur(16px)",
                }}
                whileHover={{
                  y: -4,
                  boxShadow: `0 20px 40px ${colors.glow}, 0 0 0 1px ${colors.border}`,
                }}
              >
                <div
                  className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: colors.icon }}
                >
                  <item.icon className="h-5 w-5" style={{ color: colors.iconText }} />
                </div>
                <h3
                  className="mb-2 font-semibold"
                  style={{ fontFamily: "var(--font-syne)", color: "oklch(0.9 0.005 220)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.55 0.012 250)", lineHeight: "1.7" }}
                >
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}