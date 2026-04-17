"use client"

import { motion, useInView } from "framer-motion"
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
}

const experiences: Experience[] = [
  {
    id: "fintrack",
    role: "Full-Stack Software Engineer",
    company: "FinTrack V2 (B.Tech Project)",
    location: "Remote",
    period: "2025 - Present",
    description:
      "Architected an AI-native wealth intelligence platform from ground up, focusing on scalable data layers and advanced RAG pipelines for financial advisory.",
    achievements: [
      "Engineered Zero-Loss Financial Data Layer using BigInt/Integer-cents architecture to eliminate IEEE 754 floating-point precision loss",
      "Designed Scalable RAG Pipeline for Gemini 2.5 Flash with State-Aware Snapshot Builder for contextually accurate AI advisory",
      "Optimized system throughput by 40% via Read-Model Aggregation pattern and PrismaPg native adapter optimization",
      "Engineered Async Task Orchestration Layer for ingesting 15k+ market instruments with NestJS Cron workers",
    ],
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "Gemini AI", "TypeScript"],
  },
  {
    id: "doclync",
    role: "Full-Stack Software Engineer",
    company: "DocLync Pro (Healthcare Platform)",
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
  },
  {
    id: "learnify",
    role: "Full-Stack Developer",
    company: "Learnify - Professional LMS",
    location: "Remote",
    period: "2023 - 2024",
    description:
      "Developed a high-performance learning management system with advanced analytics and optimized data persistence patterns.",
    achievements: [
      "Architected High-Performance Stats Engine leveraging MongoDB Aggregation Framework with Atomic Synchronization logic",
      "Designed Resilient Data Persistence Layer with custom Mongoose middleware for Soft-Deletion Protection",
      "Optimized client-side state with TanStack Query for intelligent cache invalidation, reducing API overhead by 60%",
      "Ensured eventual consistency across user enrollment events through atomic transaction handling",
    ],
    technologies: ["React", "Node.js", "MongoDB", "Framer Motion", "Zod", "JWT"],
  },
]

function TimelineCard({
  experience,
  index,
}: {
  experience: Experience
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative"
    >
      {/* Timeline connector */}
      {index < experiences.length - 1 && (
        <div className="absolute left-6 top-16 hidden h-full w-px bg-gradient-to-b from-border via-border to-transparent md:block" />
      )}

      <div className="group rounded-xl border border-border/50 bg-card/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/70">
        {/* Header */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {experience.role}
            </h3>
            <p className="text-primary font-medium">{experience.company}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {experience.period}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {experience.location}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
          {experience.description}
        </p>

        {/* Achievements */}
        <ul className="mb-5 space-y-2">
          {experience.achievements.map((achievement, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-sm text-muted-foreground"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
              <span>{achievement}</span>
            </li>
          ))}
        </ul>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5">
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-secondary/80 px-2.5 py-0.5 text-[11px] font-medium text-secondary-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="experience" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-primary">
            Experience
          </span>
          <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Projects & Work
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            A journey through ambitious full-stack projects that shaped my expertise in scalable systems and architectural excellence.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-6">
          {experiences.map((experience, index) => (
            <TimelineCard
              key={experience.id}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}