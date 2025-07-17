"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { cf } from "@/lib/cf"

interface LoadingProps {
  className?: string
  size?: "default" | "lg" | "full" | "md"
  title?: string
  description?: string
  iconSize?: "sm" | "default" | "lg"
}

export function Loading({
  className,
  size = "default",
  title = "Loading LocalRank",
  description = "Preparing your creative workspace...",
  iconSize = "default"
}: LoadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 px-4 pb-12 pt-16",
        size === "full" && "min-h-screen",
        size === "lg" && "py-12",
        size === "md" && "pb-12 pt-16",
        className
      )}
    >
      <div className="relative">
        <Image 
          src={cf("/images/globe.png")}
          alt="Globe icon"
          width={iconSize === "sm" ? 32 : iconSize === "default" ? 40 : 48} 
          height={iconSize === "sm" ? 32 : iconSize === "default" ? 40 : 48}
          className={cn(
            "animate-pulse",
            iconSize === "sm" && "size-16",
            iconSize === "default" && "size-20",
            iconSize === "lg" && "size-24"
          )}
        />
        <div className={cn(
          "absolute left-0 top-0",
          iconSize === "sm" && "size-16",
          iconSize === "default" && "size-20",
          iconSize === "lg" && "size-24"
        )}>
          <div className="absolute inset-0 animate-spin">
            <div className="size-2 rounded-full border-2 border-primary" />
          </div>
        </div>
      </div>
      <div className="space-y-1.5 text-center">
        <h3 className="font-semibold tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      {/* Animated Progress Bar */}
      <div className="mt-2 w-32">
        <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="animate-progress h-full bg-primary transition-all"
            style={{
              animation: "progress 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </div>
  )
}
