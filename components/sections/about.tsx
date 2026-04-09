"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Code2, Server, Database, Cloud, Zap, Users } from "lucide-react"

const highlights = [
  {
    icon: Code2,
    title: "Frontend",
    description: "React, Next.js, TypeScript, and modern CSS for responsive UIs",
  },
  {
    icon: Server,
    title: "Backend",
    description: "Node.js, Python, Go for scalable APIs and microservices",
  },
  {
    icon: Database,
    title: "Databases",
    description: "PostgreSQL, MongoDB, Redis for optimal data management",
  },
  {
    icon: Cloud,
    title: "Cloud",
    description: "AWS, GCP, Vercel for reliable deployments at scale",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimization for speed, SEO, and user experience",
  },
  {
    icon: Users,
    title: "Leadership",
    description: "Team mentoring and collaborative product delivery",
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
            Crafting Digital Experiences
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground leading-relaxed">
            With 6+ years of experience, I build fullstack applications that are
            technically robust and delightfully designed. I write clean,
            maintainable code that scales.
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
              I&apos;m a fullstack developer based in San Francisco, passionate about
              elegant solutions to complex problems. My journey began with curiosity
              about how things work under the hood.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Currently focused on building accessible, human-centered products at
              scale. I also contribute to open source and explore AI and distributed systems.
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              I&apos;ve worked with startups, agencies, and enterprises, building
              products users love. My approach combines technical excellence with
              user empathy and business understanding.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Always excited to collaborate on projects that push boundaries.
              Let&apos;s build something amazing together.
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
