"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

interface LanyardData {
  discord_user: {
    id: string
    username: string
    avatar: string
    discriminator: string
    global_name: string | null
  }
  discord_status: "online" | "idle" | "dnd" | "offline"
  activities: Array<{
    id: string
    name: string
    type: number
    state?: string
    details?: string
    timestamps?: {
      start?: number
      end?: number
    }
    assets?: {
      large_image?: string
      large_text?: string
      small_image?: string
      small_text?: string
    }
  }>
  listening_to_spotify: boolean
  spotify?: {
    track_id: string
    timestamps: {
      start: number
      end: number
    }
    song: string
    artist: string
    album_art_url: string
    album: string
  }
}

export function DiscordStatus() {
  const [discordData, setDiscordData] = useState<LanyardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(Date.now())

  useEffect(() => {
    // Replace with your Discord user ID
    const DISCORD_USER_ID = "587709425708695552" // You'll need to replace this with actual Discord ID

    const fetchDiscordStatus = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`)
        const data = await response.json()

        if (data.success) {
          setDiscordData(data.data)
        }
      } catch (error) {
        console.error("Failed to fetch Discord status:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDiscordStatus()
    const interval = setInterval(fetchDiscordStatus, 30000) // Update every 30 seconds
    const timeInterval = setInterval(() => setCurrentTime(Date.now()), 1000) // Update time every second

    return () => {
      clearInterval(interval)
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

  const getStatusText = (status: string) => {
    switch (status) {
      case "online":
        return "Online"
      case "idle":
        return "Away"
      case "dnd":
        return "Do Not Disturb"
      default:
        return "Offline"
    }
  }

  const formatElapsedTime = (startTime: number) => {
    const elapsed = currentTime - startTime
    const hours = Math.floor(elapsed / (1000 * 60 * 60))
    const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((elapsed % (1000 * 60)) / 1000)
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  if (loading) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Card className="p-4 glass animate-pulse">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-muted rounded-full"></div>
            <div className="space-y-2">
              <div className="w-24 h-4 bg-muted rounded"></div>
              <div className="w-16 h-3 bg-muted rounded"></div>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  if (!discordData) {
    return null
  }

  const currentActivity = discordData.activities.find((activity) => activity.type === 0 && activity.name !== "Spotify")

  return (
    <div className="fixed top-4 right-4 z-50">
      <Card className="p-4 glass hover:scale-105 transition-transform duration-300">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={`https://cdn.discordapp.com/avatars/${discordData.discord_user.id}/${discordData.discord_user.avatar}.png?size=128`}
              alt="Discord Avatar"
              className="w-12 h-12 rounded-full"
            />
            <div
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${getStatusColor(discordData.discord_status)}`}
            ></div>
          </div>
          <div className="space-y-1">
            <div className="font-semibold text-sm">
              {discordData.discord_user.global_name || discordData.discord_user.username}
            </div>
            <div className="text-xs text-muted-foreground">{getStatusText(discordData.discord_status)}</div>
            {currentActivity && (
              <div className="text-xs text-accent">
                Playing {currentActivity.name}
                {currentActivity.timestamps?.start && (
                  <div className="text-xs text-muted-foreground">
                    {formatElapsedTime(currentActivity.timestamps.start)}
                  </div>
                )}
              </div>
            )}
            {discordData.listening_to_spotify && discordData.spotify && (
              <div className="text-xs text-green-400 flex items-center space-x-1">
                <span>🎵</span>
                <span>{discordData.spotify.song}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
