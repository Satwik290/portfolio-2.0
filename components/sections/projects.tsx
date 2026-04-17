"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ExternalLink, Github, ArrowRight, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  github?: string
  live?: string
  featured: boolean
  stats?: { label: string; value: string }[]
}

const projects: Project[] = [
  {
    id: "fintrack-v2",
    title: "FinTrack V2 - AI-Native Wealth Intelligence",
    description:
      "Engineered a Zero-Loss Financial Data Layer with BigInt/Integer-cents architecture. Designed Scalable RAG Pipeline for Gemini 2.5 Flash. Optimized throughput by 40% with Read-Model Aggregation pattern.",
    tags: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "Gemini AI"],
    github: "https://github.com/Satwik290/FinTrack-V2",
    featured: true,
    stats: [
      { label: "Architecture", value: "Zero-Loss" },
      { label: "Throughput", value: "+40%" },
    ],
  },
  {
    id: "doclync-pro",
    title: "DocLync Pro - Healthcare Platform",
    description:
      "Microservices healthcare platform with real-time WebSocket communication. Integrated Stripe payments, Cloudinary storage. Implemented JWT Auth with HttpOnly cookies and RBAC.",
    tags: ["TypeScript", "React", "Node.js", "PostgreSQL", "Redis"],
    github: "https://github.com/Satwik290/doclync-pro",
    featured: true,
    stats: [
      { label: "Architecture", value: "Turborepo" },
      { label: "Scaling", value: "Horizontal" },
    ],
  },
  {
    id: "learnify",
    title: "Learnify - Professional LMS Platform",
    description:
      "High-performance learning management system with MongoDB Aggregation Framework stats engine. Implemented Atomic Synchronization logic for eventual consistency. Optimized cache with TanStack Query, reducing API overhead by 60%.",
    tags: ["React", "Node.js", "MongoDB", "Framer Motion", "TanStack Query"],
    github: "https://github.com/Satwik290/learnify",
    featured: true,
    stats: [
      { label: "API Overhead", value: "-60%" },
      { label: "Cache", value: "Optimized" },
    ],
  },
  {
    id: "slooze",
    title: "Slooze - Food Ordering Platform",
    description:
      "Full-stack food ordering platform with JWT auth and three-role RBAC. Implemented multi-region data isolation. Built real-time shared cart feature using WebSockets and shareable links.",
    tags: ["NestJS", "Next.js", "PostgreSQL", "Prisma", "Socket.io"],
    github: "https://github.com/Satwik290",
    featured: false,
  },
  {
    id: "research-tracker",
    title: "Research Paper Reading Tracker",
    description:
      "Full-stack research paper tracking application. Fixed CORS issues, enum mismatches, and query parameter serialization between frontend and backend.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/Satwik290",
    featured: false,
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
      data-cursor="project"
    >
      <div className="relative h-full overflow-hidden rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/70 hover:shadow-xl hover:shadow-primary/5">
        {/* Visual header */}
        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-primary/10 via-secondary to-secondary/50">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-4 gap-2 opacity-20">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-4 w-4 rounded bg-primary/60"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.15,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
          
          {project.featured && (
            <div className="absolute left-3 top-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
                <Layers className="h-3 w-3" />
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          <p className="mb-4 text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Stats */}
          {project.stats && project.stats.length > 0 && (
            <div className="mb-4 flex gap-6">
              {project.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-base font-semibold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-secondary/80 px-2 py-0.5 text-[11px] font-medium text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 pt-2 border-t border-border/50">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="h-3.5 w-3.5" />
                Code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [showAll, setShowAll] = useState(false)

  const displayedProjects = showAll
    ? projects
    : projects.filter((p) => p.featured)

  return (
    <section id="projects" className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />

      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-primary">
            Portfolio
          </span>
          <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Featured Projects
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            A collection of full-stack projects showcasing expertise in scalable architecture, microservices, and system design.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Show more */}
        {!showAll && projects.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <Button
              variant="outline"
              onClick={() => setShowAll(true)}
              className="group border-border/60 hover:border-primary/40 hover:bg-primary/5"
            >
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}