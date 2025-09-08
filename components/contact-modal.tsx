"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"
import { sendMessage } from "@/lib/send-message"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await sendMessage(formData)
      alert(`Thanks ${formData.name}, I will get back to you soon!`)
      setFormData({ name: "", email: "", message: "" })
      onClose()
    } catch (error) {
      alert("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card/95 backdrop-blur-md border border-border rounded-2xl p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-2xl font-bold mb-6 text-center text-primary">Send Message</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-input border-border focus:border-primary transition-colors"
          />

          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-input border-border focus:border-primary transition-colors"
          />

          <Textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="bg-input border-border focus:border-primary transition-colors resize-none"
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-slate-800 to-blue-900 hover:from-slate-700 hover:to-blue-800 text-white font-semibold rounded-lg border border-blue-800/50 hover:border-blue-700 transition-all duration-300 hover:shadow-md hover:shadow-blue-900/25"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </div>
  )
}
