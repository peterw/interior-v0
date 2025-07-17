import React from "react"
import { cn } from "@/lib/utils"

interface ServiceCardProps {
  name: string
  icon: React.ReactNode
  planType: "Pro" | "Free"
  credits?: number
  isPlanBased?: boolean
  planDetails?: string
  description?: string
  className?: string
}

export function ServiceCard({ 
  name, 
  icon, 
  planType, 
  credits, 
  isPlanBased = false, 
  planDetails, 
  description,
  className 
}: ServiceCardProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num)
  }

  return (
    <div className={cn("flex items-center justify-between py-2", className)}>
      <div className="flex items-center gap-3">
        <div className="shrink-0">
          {icon}
        </div>
        <div className="grow">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-white">{name}</span>
            <div
              className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                planType === "Pro" 
                  ? "bg-green-500/90 text-white" 
                  : "bg-gray-500/90 text-white"
              )}
            >
              {planType}
            </div>
          </div>
          {isPlanBased ? (
            <div className="text-xs text-blue-300">
              {planDetails && <div>{planDetails}</div>}
              {description && <div>{description}</div>}
            </div>
          ) : (
            <div className="text-xs text-blue-300">
              {credits !== undefined ? `${formatNumber(credits)} credits` : "Loading..."}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
