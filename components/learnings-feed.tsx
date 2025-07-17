"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Lightbulb, Target, TrendingUp } from "lucide-react"

interface LearningItem {
  id: string
  title: string
  description: string
  category: "strategy" | "tactics" | "mindset" | "results"
  author: {
    name: string
    initials: string
    color: string
  }
  date: string
}

const learningItems: LearningItem[] = []

const categoryIcons = {
  strategy: Lightbulb,
  tactics: Target,
  mindset: BookOpen,
  results: TrendingUp
}

const categoryColors = {
  strategy: "text-blue-500",
  tactics: "text-purple-500",
  mindset: "text-orange-500",
  results: "text-green-500"
}

export function LearningsFeed() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Key Learnings</h2>
        <div className="space-y-6">
          {learningItems.map((item) => {
            const Icon = categoryIcons[item.category]
            return (
              <div key={item.id} className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full ${item.author.color} flex items-center justify-center text-white font-semibold`}>
                    {item.author.initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{item.title}</h3>
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${categoryColors[item.category]}`} />
                        <span className="text-xs text-gray-500">{formatDate(item.date)}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className={`w-5 h-5 rounded-full ${item.author.color} flex items-center justify-center text-white text-xs`}>
                        {item.author.initials}
                      </div>
                      <span className="text-xs text-gray-500">{item.author.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
} 