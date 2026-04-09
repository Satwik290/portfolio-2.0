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
    id: "current",
    role: "Senior Fullstack Engineer",
    company: "TechCorp",
    location: "San Francisco",
    period: "2023 - Present",
    description:
      "Leading cloud-native applications and mentoring developers. Architecting scalable enterprise solutions.",
    achievements: [
      "Reduced API response time by 60% through optimization",
      "Led microservices migration, improving deployments 10x",
      "Built real-time features serving 100K+ concurrent users",
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    id: "prev1",
    role: "Fullstack Developer",
    company: "StartupXYZ",
    location: "Remote",
    period: "2021 - 2023",
    description:
      "Core team member building B2B SaaS from ground up across frontend, backend, and DevOps.",
    achievements: [
      "Architected entire frontend with React and TypeScript",
      "Built CI/CD reducing deployment from hours to minutes",
      "Developed APIs handling 1M+ daily requests at 99.9% uptime",
    ],
    technologies: ["React", "TypeScript", "Python", "Docker"],
  },
  {
    id: "prev2",
    role: "Frontend Developer",
    company: "Digital Agency",
    location: "New York",
    period: "2019 - 2021",
    description:
      "Interactive web experiences for Fortune 500 clients, collaborating with designers.",
    achievements: [
      "Delivered 20+ client projects from sites to web apps",
      "Reduced page load times by 40% through optimization",
      "Mentored 3 junior developers in frontend practices",
    ],
    technologies: ["React", "Vue.js", "SCSS", "GraphQL"],
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
            Career
          </span>
          <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Work Experience
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            A journey through roles that shaped my expertise in fullstack development.
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
