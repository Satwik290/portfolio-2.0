"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { 
  Home, 
  User, 
  Briefcase, 
  FolderOpen, 
  Mail, 
  Github, 
  Linkedin, 
  FileText,
  Moon,
  Sun,
  Terminal
} from "lucide-react"

interface CommandPaletteProps {
  onNavigate?: (section: string) => void
}

export function CommandPalette({ onNavigate }: CommandPaletteProps) {
  const [open, setOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setOpen(false)
    onNavigate?.(sectionId)
  }, [onNavigate])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault()
      setOpen((prev) => !prev)
    }
    if (e.key === "Escape") {
      setOpen(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
    setOpen(false)
  }

  const openLink = (url: string) => {
    window.open(url, "_blank")
    setOpen(false)
  }

  const commands = [
    {
      heading: "Navigation",
      items: [
        { icon: Home, label: "Home", shortcut: "H", action: () => scrollToSection("hero") },
        { icon: User, label: "About", shortcut: "A", action: () => scrollToSection("about") },
        { icon: Briefcase, label: "Experience", shortcut: "E", action: () => scrollToSection("experience") },
        { icon: FolderOpen, label: "Projects", shortcut: "P", action: () => scrollToSection("projects") },
        { icon: Mail, label: "Contact", shortcut: "C", action: () => scrollToSection("contact") },
      ],
    },
    {
      heading: "Links",
      items: [
        { icon: Github, label: "GitHub", action: () => openLink("https://github.com") },
        { icon: Linkedin, label: "LinkedIn", action: () => openLink("https://linkedin.com") },
        { icon: FileText, label: "Resume", action: () => openLink("/resume.pdf") },
      ],
    },
    {
      heading: "Settings",
      items: [
        { 
          icon: isDark ? Sun : Moon, 
          label: isDark ? "Light Mode" : "Dark Mode", 
          shortcut: "T",
          action: toggleTheme 
        },
      ],
    },
  ]

  return (
    <>
      {/* Keyboard hint */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-secondary/80 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm transition-colors hover:bg-secondary hover:text-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Terminal className="h-4 w-4" />
        <span className="hidden sm:inline">Press</span>
        <kbd className="rounded bg-background/50 px-1.5 py-0.5 text-xs font-mono">
          <span className="hidden sm:inline">Cmd + </span>K
        </kbd>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Command Dialog */}
            <motion.div
              className="fixed left-1/2 top-1/2 z-[101] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-4"
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", duration: 0.3 }}
            >
              <Command className="rounded-xl border border-border bg-popover shadow-2xl">
                <div className="flex items-center border-b border-border px-3">
                  <Terminal className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                  <CommandInput
                    placeholder="Type a command or search..."
                    className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <CommandList className="max-h-[300px] overflow-y-auto p-2">
                  <CommandEmpty>No results found.</CommandEmpty>
                  {commands.map((group, index) => (
                    <div key={group.heading}>
                      <CommandGroup heading={group.heading}>
                        {group.items.map((item) => (
                          <CommandItem
                            key={item.label}
                            onSelect={item.action}
                            className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm aria-selected:bg-accent"
                          >
                            <item.icon className="h-4 w-4 text-muted-foreground" />
                            <span>{item.label}</span>
                            {item.shortcut && (
                              <kbd className="ml-auto rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-muted-foreground">
                                {item.shortcut}
                              </kbd>
                            )}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      {index < commands.length - 1 && <CommandSeparator className="my-2" />}
                    </div>
                  ))}
                </CommandList>
                <div className="flex items-center justify-between border-t border-border px-3 py-2 text-xs text-muted-foreground">
                  <span>Navigate with arrow keys</span>
                  <span>
                    <kbd className="rounded bg-muted px-1 py-0.5 font-mono">Enter</kbd> to select
                  </span>
                </div>
              </Command>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
