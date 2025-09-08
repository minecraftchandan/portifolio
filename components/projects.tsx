import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function Projects() {
  const projects = [
    {
      title: "Spring Boot eCommerce",
      description: "Full-stack eCommerce with authentication, product catalog, and multi-database integration.",
      tech: ["Spring Boot","MongoDB","Firebase"],
      github: "https://github.com/minecraftchandan/ecommerce",
      gradient: "from-black to-blue-900",
    },
    {
      title: "Discord Card Trading Bot",
      description: "Trading bot with real-time mechanics, persistent storage, and community-driven features.",
      tech: ["Node.js", "Discord.js", "Firebase"],
      github: "https://github.com/minecraftchandan/card-bot",
      gradient: "from-slate-900 to-blue-800",
    },
    {
      title: "Advanced Discord Bot",
      description: "Multi-feature bot with community engaging games, OCR, event logging, and administrative tools.",
      tech: ["Node.js", "Discord.js", "OCR"],
      github: "https://github.com/minecraftchandan/personal_bot",
      gradient: "from-black via-blue-900 to-slate-900",
    },
  ]

  return (
    <section id="projects" className="py-24 bg-muted/20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-5xl font-bold mb-16 text-center tracking-tight bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          My Fun Projects
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className="glass p-6 hover:scale-105 transition-all duration-300 group overflow-hidden relative flex flex-col"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              ></div>

              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto">
                  <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      View on GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
