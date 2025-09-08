"use client"

import { useEffect, useState } from "react"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"


export default function Portfolio() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <footer className="py-8 text-center bg-card/50 text-muted-foreground border-t border-border">
        <p>© {new Date().getFullYear()} notmod • Built with Passion</p>
      </footer>
    </div>
  )
}
