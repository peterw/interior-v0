"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Clock, Youtube, CheckCircle2, User } from "lucide-react"
import Link from "next/link"

interface ActivityItem {
  id: string
  type: "video" | "milestone" | "signup"
  title: string
  description: string
  timestamp: string
  youtubeUrl?: string
  timestampInVideo?: string
  user?: {
    name: string
    initials: string
    color: string
  }
}

const activityItems: ActivityItem[] = []

export function ActivityFeed() {
  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) return "just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    return `${Math.floor(diffInSeconds / 86400)}d ago`
  }

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {activityItems.map((item) => (
            <div key={item.id} className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full ${item.user?.color || 'bg-gray-200'} flex items-center justify-center text-white font-semibold`}>
                {item.type === "video" ? (
                  <Youtube className="h-4 w-4" />
                ) : item.type === "milestone" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{item.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{formatTimeAgo(item.timestamp)}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
                {item.youtubeUrl && item.timestampInVideo && (
                  <Link 
                    href={`${item.youtubeUrl}&t=${item.timestampInVideo}`}
                    target="_blank"
                    className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1 mt-1"
                  >
                    <Youtube className="h-3 w-3" />
                    <span>Watch at {item.timestampInVideo}</span>
                  </Link>
                )}
                {item.user && (
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-5 h-5 rounded-full ${item.user.color} flex items-center justify-center text-white text-xs`}>
                      {item.user.initials}
                    </div>
                    <span className="text-xs text-gray-500">{item.user.name}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 