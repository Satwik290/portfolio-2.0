"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Code2, Server, Database, Cloud, Zap, Users } from "lucide-react"

const highlights = [
  {
    icon: Code2,
    title: "Frontend",
    description: "React, Next.js, TypeScript, Zustand, TanStack Query & modern CSS",
  },
  {
    icon: Server,
    title: "Backend",
    description: "Node.js, NestJS(Fastify), Microservices, Event-Driven Design",
  },
  {
    icon: Database,
    title: "Data Layer",
    description: "PostgreSQL, MongoDB, Prisma, Mongoose, Redis Pub/Sub",
  },
  {
    icon: Cloud,
    title: "DevOps",
    description: "AWS (EC2, S3), Docker, GitHub Actions, Linux/Bash",
  },
  {
    icon: Zap,
    title: "Architecture",
    description: "Microservices (Turborepo), RAG (AI), WebSockets, RBAC",
  },
  {
    icon: Users,
    title: "Specialization",
    description: "Scalable systems, atomic synchronization, high-availability design",
  },
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="relative py-24 lg:py-32">
      {/* Subtle background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />

      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-primary">
            About
          </span>
          <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Full-Stack Engineering with Architectural Focus
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground leading-relaxed">
            I'm a software engineer passionate about building scalable web systems with clean code and architectural excellence. My focus is on engineering high-availability systems with atomic synchronization and deterministic data layers.
          </p>
        </motion.div>

        {/* Bio - Two columns */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-20 grid gap-8 lg:grid-cols-2"
        >
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Currently pursuing B.Tech in Computer Science at DRIEMS University (CGPA 8.1), I've developed expertise in the modern JavaScript ecosystem across frontend and backend. I'm particularly focused on solving complex architectural challenges through microservices, event-driven design, and zero-loss data layer implementations.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My recent work on FinTrack V2 demonstrates my ability to architect scalable systems—implementing RAG pipelines for AI advisory, optimizing throughput by 40%, and ensuring deterministic accounting through BigInt/Integer-cents architecture.
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              I'm deeply committed to code quality and system optimization, with 350+ DSA problems solved and consistent contributions to competitive programming. I bring strong fundamentals in OS, DBMS, and Computer Networks to every architectural decision.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Always excited to collaborate on projects that push technological boundaries and solve real-world problems with elegant, scalable solutions. Open to remote opportunities and innovative challenges in full-stack engineering.
            </p>
          </div>
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
              className="group rounded-xl border border-border/60 bg-card/30 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/60"
            >
              <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-2.5 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-1.5 font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}