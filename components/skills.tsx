export function Skills() {
  const skills = [
    { name: "HTML5", icon: "devicon-html5-plain-wordmark colored" },
    { name: "CSS3", icon: "devicon-css3-plain-wordmark colored" },
    { name: "JavaScript", icon: "devicon-javascript-plain colored" },
    { name: "Node.js", icon: "devicon-nodejs-plain colored" },
    { name: "Spring Boot", icon: "devicon-spring-plain colored" },
    { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
    { name: "Firebase", icon: "devicon-firebase-plain colored" },
    { name: "Java", icon: "devicon-java-plain colored" },
  ]

  return (
    <section className="py-24 relative bg-card/20" id="skills">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h2 className="text-5xl font-bold mb-16 tracking-tight text-primary hover:text-accent transition-colors duration-300">
          🛠 My Skills
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <div key={skill.name} className="group cursor-pointer" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="h-20 flex items-center justify-center hover:scale-110 transition-all duration-300">
                <i className={`${skill.icon} text-7xl group-hover:scale-125 transition-transform`}></i>
              </div>
            </div>
          ))}
        </div>
      </div>

      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" />
    </section>
  )
}
