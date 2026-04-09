"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"

interface Skill {
  name: string
  level: number
  category: string
}

const skills: Skill[] = [
  // Frontend
  { name: "React", level: 95, category: "Frontend" },
  { name: "Next.js", level: 92, category: "Frontend" },
  { name: "TypeScript", level: 90, category: "Frontend" },
  { name: "Tailwind CSS", level: 95, category: "Frontend" },
  { name: "Framer Motion", level: 85, category: "Frontend" },
  { name: "Vue.js", level: 75, category: "Frontend" },
  // Backend
  { name: "Node.js", level: 92, category: "Backend" },
  { name: "Python", level: 85, category: "Backend" },
  { name: "Go", level: 70, category: "Backend" },
  { name: "GraphQL", level: 82, category: "Backend" },
  { name: "REST APIs", level: 95, category: "Backend" },
  { name: "Prisma", level: 88, category: "Backend" },
  // Database
  { name: "PostgreSQL", level: 90, category: "Database" },
  { name: "MongoDB", level: 85, category: "Database" },
  { name: "Redis", level: 80, category: "Database" },
  { name: "Supabase", level: 88, category: "Database" },
  // DevOps
  { name: "Docker", level: 85, category: "DevOps" },
  { name: "AWS", level: 80, category: "DevOps" },
  { name: "Vercel", level: 95, category: "DevOps" },
  { name: "CI/CD", level: 88, category: "DevOps" },
]

const categories = ["All", "Frontend", "Backend", "Database", "DevOps"]

export function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory)

  return (
    <section id="skills" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-primary">
            Skills
          </span>
          <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Technologies I Work With
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            A modern toolkit for building fullstack applications from frontend to
            infrastructure.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div layout className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="group rounded-xl border border-border/50 bg-card/40 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/70"
              >
                <div className="mb-2.5 flex items-center justify-between">
                  <span className="font-medium text-foreground">{skill.name}</span>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 overflow-hidden rounded-full bg-secondary/80">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{
                      duration: 0.8,
                      delay: 0.3 + index * 0.03,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-primary/80"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Additional tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14 text-center"
        >
          <p className="mb-5 text-sm text-muted-foreground">Also proficient in</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Jest",
              "Playwright",
              "Figma",
              "Git",
              "Linux",
              "Kubernetes",
              "Terraform",
              "OpenAI API",
            ].map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-border/50 bg-card/30 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
