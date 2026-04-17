"use client"

// Force rebuild - cache clear
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScroll } from "@/components/smooth-scroll"
import { CommandPalette } from "@/components/command-palette"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
// import { Experience } from "@/components/sections/experience"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/footer"

export default function Portfolio() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <CommandPalette />
      <Navigation />
      
      <main>
        <Hero />
        <About />
        <section id="skills">
          <Skills />
        </section>
        <Projects />
        {/* <Experience /> */}
        <Contact />
      </main>
      
      <Footer />
    </SmoothScroll>
  )
}
