"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ContactModal } from "./contact-modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faYoutube, faGithub, faDiscord } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

export function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const iconsRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )
    
    if (iconsRef.current) {
      observer.observe(iconsRef.current)
    }
    
    return () => observer.disconnect()
  }, [])

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/shake.png')] bg-no-repeat" style={{backgroundSize: '100% auto', backgroundPosition: '0% 31%'}}></div>
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-5"></div>
      <div className="max-w-2xl mx-auto px-6 relative z-10">
        <h2 className="text-5xl font-bold mb-16 text-center tracking-tight text-primary">Get In Touch</h2>

        <Card className="glass p-8 hover:scale-105 transition-transform duration-300">
          <div className="text-center space-y-8">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-4 bg-gradient-to-r from-slate-800 to-blue-900 hover:from-slate-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-900/25 text-lg"
            >
              Send a Message 👋
            </Button>
            
            <div className="text-center">
              <p className="text-lg font-medium text-foreground underline decoration-primary decoration-2 underline-offset-4">Social Links</p>
            </div>

            <div ref={iconsRef} className="flex justify-center space-x-8">
              <a
                href="https://youtube.com/@sojao"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-14 h-14 bg-red-600/20 rounded-full flex items-center justify-center hover:bg-red-600/40 hover:scale-110 transition-all duration-500 text-2xl border border-red-600/30 hover:border-red-600/60 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: '100ms' }}
                title="YouTube"
              >
                <FontAwesomeIcon icon={faYoutube} className="text-2xl" />
              </a>
              <a
                href="https://github.com/minecraftchandan"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-14 h-14 bg-gray-600/20 rounded-full flex items-center justify-center hover:bg-gray-600/40 hover:scale-110 transition-all duration-500 text-2xl border border-gray-600/30 hover:border-gray-600/60 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: '200ms' }}
                title="GitHub"
              >
                <FontAwesomeIcon icon={faGithub} className="text-2xl" />
              </a>
              <a
                href="https://discord.com/users/587709425708695552"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-14 h-14 bg-indigo-600/20 rounded-full flex items-center justify-center hover:bg-indigo-600/40 hover:scale-110 transition-all duration-500 text-2xl border border-indigo-600/30 hover:border-indigo-600/60 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: '300ms' }}
                title="Discord"
              >
                <FontAwesomeIcon icon={faDiscord} className="text-2xl" />
              </a>
              <a
                href="mailto:not yet built"
                className={`w-14 h-14 bg-blue-600/20 rounded-full flex items-center justify-center hover:bg-blue-600/40 hover:scale-110 transition-all duration-500 text-2xl border border-blue-600/30 hover:border-blue-600/60 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: '400ms' }}
                title="Email"
              >
                <FontAwesomeIcon icon={faEnvelope} className="text-2xl" />
              </a>
            </div>
          </div>
        </Card>

        <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </section>
  )
}