"use client"

import { Github, Linkedin, Twitter, Heart } from "lucide-react"

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <a href="#hero" className="text-lg font-bold text-foreground">
              <span className="text-primary">alex</span>
              <span className="text-muted-foreground">.dev</span>
            </a>
            <p className="mt-1 text-sm text-muted-foreground">
              Fullstack Developer
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-secondary/30 text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            &copy; {currentYear} Alex Chen. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Built with <Heart className="h-3 w-3 text-primary" /> using Next.js
          </p>
        </div>
      </div>
    </footer>
  )
}
