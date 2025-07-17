"use client"

import * as React from "react"
import { cn } from "@/components/lib/utils"

interface SidebarSectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function SidebarSectionHeader({
  className,
  children,
  ...props
}: SidebarSectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex h-6 shrink-0 items-center px-2 text-xs font-medium text-gray-500 mb-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
