"use client"

import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScroll } from "@/components/smooth-scroll"
import { CommandPalette } from "@/components/command-palette"
import { Navigation } from "@/components/navigation"
import { AmbientParticles } from "@/components/ambient-particles"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { Experience } from "@/components/sections/experience"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/footer"

export default function Portfolio() {
  return (
    <SmoothScroll>
      <div className="bg-mesh-gradient noise-overlay vignette">
        {/* Global atmospheric dust — threads all sections together */}
        <AmbientParticles />
        <CustomCursor />
        <CommandPalette />
        <Navigation />

        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  )
}
