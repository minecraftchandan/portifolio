"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [currentLineIndex, setCurrentLineIndex] = useState(0)

  const codeLines = [
    "class Developer {",
    "  constructor(name) {",
    "    this.name = 'Notmod';",
    "    this.skills = ['Java', 'HTML', 'Node.js'];",
    "  }",
    "  createMagic() {",
    "    return 'Amazing Projects';",
    "  }",
  ]

  useEffect(() => {
    setMounted(true)

    const typeText = () => {
      const currentLine = codeLines[currentLineIndex]
      let charIndex = 0

      const typeInterval = setInterval(() => {
        if (charIndex < currentLine.length) {
          setTypedText(currentLine.substring(0, charIndex + 1))
          charIndex++
        } else {
          clearInterval(typeInterval)
          setTimeout(() => {
            setCurrentLineIndex((prev) => (prev + 1) % codeLines.length)
            setTypedText("")
          }, 1000) // reduced pause between lines from 2000ms to 1000ms
        }
      }, 50) // increased typing speed from 100ms to 50ms per character
    }

    const timeout = setTimeout(typeText, 500) // reduced initial delay from 1000ms to 500ms
    return () => clearTimeout(timeout)
  }, [currentLineIndex])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 glass rounded-lg p-4 max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="font-mono text-sm text-accent animate-pulse"><span className="text-red-400">Java</span> Developer</div>
        </div>

        <div className="absolute top-60 right-20 glass rounded-lg p-4 max-w-sm">
          <div className="font-mono text-sm text-accent">
            <div className="text-blue-400">function</div>
            <div className="ml-2 animate-pulse">buildAwesome() {"{"}</div>
            <div className="ml-4 text-green-400">return success;</div>
            <div className="ml-2">{"}"}</div>
          </div>
        </div>

        <div className="absolute bottom-32 left-20 glass rounded-lg p-4 max-w-xs">
          <div className="font-mono text-sm">
            <span className="text-purple-400">git</span>
            <span className="text-white ml-2">commit -m</span>
            <span className="text-green-400 ml-2">"✨ Magic"</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Main content */}
        <div className="space-y-8 lg:pr-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-accent font-mono text-lg tracking-wide">Hello, I'm</p>
              <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                Notmod
                <span className="block text-3xl md:text-4xl text-primary mt-2">Full Stack Developer</span>
              </h1>
            </div>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              Transforming ideas into <span className="text-accent font-semibold">robust solutions</span> with modern
              tech stacks, seamless UX, and secure architectures.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 relative z-50">
            <Button
              onClick={() => scrollToSection("projects")}
              className="px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105 relative z-50"
            >
              View Projects
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="px-8 py-4 text-lg font-semibold border-2 border-accent text-accent hover:bg-accent hover:text-black rounded-lg transition-all duration-300 hover:scale-105 relative z-50"
            >
              Contact Me
            </Button>
          </div>
        </div>

        <div className="relative flex justify-center items-center lg:justify-end">
          <div className="relative">
            {/* Main code editor mockup */}
            <div className="w-80 h-80 md:w-96 md:h-96 glass rounded-xl p-6 border border-primary/30">
              {/* Editor header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-primary/20">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-4 text-xs text-muted-foreground font-mono">Developer.java</span>
              </div>

              {/* Code content with typing animation */}
              <div className="font-mono text-sm space-y-1">
                {codeLines.slice(0, currentLineIndex).map((line, index) => (
                  <div key={index} className="text-primary/80">
                    {line}
                  </div>
                ))}
                <div className="text-primary flex">
                  {typedText}
                  <span className="animate-pulse ml-1 bg-accent w-2 h-5"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
