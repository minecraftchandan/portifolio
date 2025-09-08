"use client"

import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface LanyardData {
  discord_user: {
    id: string
    username: string
    avatar: string
    discriminator: string
    global_name: string
  }
  discord_status: "online" | "idle" | "dnd" | "offline"
  activities: Array<{
    name: string
    type: number
    state?: string
    details?: string
    assets?: {
      large_image?: string
      large_text?: string
      small_image?: string
      small_text?: string
    }
    application_id?: string
    timestamps?: {
      start?: number
      end?: number
    }
  }>
  listening_to_spotify: boolean
  spotify?: {
    song: string
    artist: string
    album: string
    album_art_url: string
    timestamps: {
      start: number
      end: number
    }
  }
}

export function About() {
  const [discordData, setDiscordData] = useState<LanyardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(Date.now())

  useEffect(() => {
    const ws = new WebSocket("wss://api.lanyard.rest/socket")

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          op: 2,
          d: { subscribe_to_id: "587709425708695552" },
        }),
      )
    }

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data)
      if (msg.t === "INIT_STATE" || msg.t === "PRESENCE_UPDATE") {
        setDiscordData(msg.d)
        setLoading(false)
      }
    }

    ws.onerror = (error) => {
      console.error("WebSocket error:", error)
      setLoading(false)
    }

    const timeInterval = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)

    return () => {
      ws.close()
      clearInterval(timeInterval)
    }
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "idle":
        return "bg-yellow-500"
      case "dnd":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const renderActivity = () => {
    if (!discordData) return null

    if (discordData.listening_to_spotify && discordData.spotify) {
      const elapsed = currentTime - discordData.spotify.timestamps.start
      const total = discordData.spotify.timestamps.end - discordData.spotify.timestamps.start
      const remaining = discordData.spotify.timestamps.end - currentTime

      const formatTime = (ms: number) => {
        const hours = Math.floor(ms / (1000 * 60 * 60))
        const mins = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
        const secs = Math.floor((ms % (1000 * 60)) / 1000)
        
        if (hours > 0) {
          return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
        }
        return `${mins}:${secs.toString().padStart(2, '0')}`
      }

      return (
        <div className="flex items-center p-4 bg-gray-900 text-white rounded-2xl shadow-lg transition-transform hover:scale-105">
          <img
            src={discordData.spotify.album_art_url || "/placeholder.svg"}
            alt="Album Art"
            className="w-16 h-16 rounded-lg mr-4"
          />
          <div className="flex-1">
            <h2 className="text-lg font-bold">Listening to Spotify 🎵</h2>
            <p className="text-sm text-gray-300">
              {discordData.spotify.song} — {discordData.spotify.artist}
            </p>
            <p className="text-xs text-gray-400">
              {remaining > 0 ? `Ends in ${formatTime(remaining)}` : `Elapsed: ${formatTime(elapsed)}`}
            </p>
          </div>
        </div>
      )
    }

    const activity = discordData.activities.find((a) => a.type === 0)
    if (activity) {
      let iconSrc = "https://cdn-icons-png.flaticon.com/512/2111/2111370.png"

      if (activity.assets?.large_image) {
        const img = activity.assets.large_image
        if (img.startsWith("mp:")) {
          iconSrc = `https://cdn.discordapp.com/app-assets/${activity.application_id}/${img.replace("mp:", "")}.png`
        } else {
          iconSrc = `https://cdn.discordapp.com/app-assets/${activity.application_id}/${img}.png`
        }
      }

      const elapsed = activity.timestamps?.start ? currentTime - activity.timestamps.start : 0
      const formatElapsed = (ms: number) => {
        const hours = Math.floor(ms / (1000 * 60 * 60))
        const mins = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
        const secs = Math.floor((ms % (1000 * 60)) / 1000)
        
        if (hours > 0) {
          return `Elapsed: ${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
        }
        return `Elapsed: ${mins}:${secs.toString().padStart(2, '0')}`
      }

      return (
        <div className="flex items-center p-4 bg-gray-900 text-white rounded-2xl shadow-lg transition-transform hover:scale-105">
          <img
            src={iconSrc || "/placeholder.svg"}
            alt="Activity Icon"
            className="w-16 h-16 rounded-lg mr-4"
            onError={(e) => {
              e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/2111/2111370.png"
            }}
          />
          <div className="flex-1">
            <h2 className="text-lg font-bold">{activity.name}</h2>
            <p className="text-sm text-gray-300">{activity.details || activity.state || "Active now"}</p>
            {activity.timestamps?.start && <p className="text-xs text-gray-400">{formatElapsed(elapsed)}</p>}
          </div>
        </div>
      )
    }

    return (
      <div className="flex items-center p-4 bg-gray-900 text-white rounded-2xl shadow-lg">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2111/2111370.png"
          alt="Discord Logo"
          className="w-16 h-16 rounded-lg mr-4"
        />
        <div className="flex-1">
          <h2 className="text-lg font-bold">Not doing anything</h2>
          <p className="text-sm text-gray-300">Waiting for activity...</p>
        </div>
      </div>
    )
  }

  return (
    <section className="py-24 relative" id="about">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-5xl font-bold mb-16 text-center tracking-tight text-primary">About Me</h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Card className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <div className="relative glass p-8 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300">
              <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <h3 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></span>
                My Story
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
               I’m Notmod, a dedicated web developer passionate about turning ideas into meaningful digital experiences. 
               I love creating projects that are intuitive, visually engaging, and built with a focus on performance and
               usability. Whether it’s a personal experiment or a larger-scale project, I approach each one with creativity,
                problem-solving, and a drive to deliver something impactful.
              </p>
              <p className="text-muted-foreground leading-relaxed">
               I also enjoy exploring how different kinds of web applications are structured and how their processes 
               flow behind the scenes. For me, every new project is like a challenge—an opportunity to break down complex
                systems, understand how they work, and then rebuild them in my own way. This curiosity keeps me learning 
                constantly and motivates me to craft solutions that feel both innovative and purposeful.
              </p>
            </div>
          </Card>

          <Card className="relative overflow-hidden group bg-gradient-to-br from-slate-900/90 via-gray-900/95 to-slate-800/90 border-2 border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="absolute top-0 left-0 w-full h-[40%] overflow-hidden">
              <img
                src="/banner.png"
                alt="Profile Banner"
                className="w-full h-full object-cover"
              />

              <div className="absolute top-2 left-2 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
              <div className="absolute bottom-2 right-2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>

            <div className="bg-gradient-to-br from-slate-800/80 via-gray-800/90 to-slate-700/80 backdrop-blur-md" style={{marginTop: '40%'}}>
              <div className="space-y-0">
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20"></div>
                  <div className="relative bg-slate-800/60 p-6 border-b border-emerald-500/20 backdrop-blur-md">
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                      <div
                        className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                    </div>

                    {loading ? (
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full animate-pulse"></div>
                          <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-spin"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded animate-pulse w-32"></div>
                          <div className="h-3 bg-gradient-to-r from-accent/20 to-primary/20 rounded animate-pulse w-20"></div>
                        </div>
                      </div>
                    ) : discordData ? (
                      <div className="flex items-center space-x-4">
                        <div className="relative group/avatar">
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full opacity-0 group-hover/avatar:opacity-20 transition-opacity duration-300 animate-pulse"></div>
                          <img
                            src={`https://cdn.discordapp.com/avatars/${discordData.discord_user.id}/${discordData.discord_user.avatar}.png?size=128`}
                            alt="Discord Avatar"
                            className="relative w-20 h-20 rounded-full border-3 border-emerald-400/50 hover:border-cyan-400/70 transition-all duration-300 hover:scale-105 shadow-lg shadow-emerald-500/20"
                          />
                          <div
                            className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-3 border-slate-800 ${getStatusColor(discordData.discord_status)} shadow-lg animate-pulse`}
                          ></div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
                            {discordData.discord_user.global_name || discordData.discord_user.username}
                            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
                          </h4>
                          <p className="text-sm text-gray-300 capitalize flex items-center gap-2">
                            <span
                              className={`w-3 h-3 rounded-full ${getStatusColor(discordData.discord_status)} shadow-sm`}
                            ></span>
                            {discordData.discord_status === "dnd" ? "Do Not Disturb" : discordData.discord_status}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground">Failed to load Discord data</div>
                    )}
                  </div>
                </div>

                <div className="relative overflow-hidden group/activity">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-cyan-500/10 to-teal-500/5"></div>
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>

                  <div className="relative bg-slate-800/40 backdrop-blur-md p-6">{renderActivity()}</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
