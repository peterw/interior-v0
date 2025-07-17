"use client"

import React from "react"
import { Phone } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useRouter } from "next/navigation"

export function CustomerSuccessCard() {
  const { user } = useAuth()
  const router = useRouter()

  if (!user?.is_premium) return null

  const handleClick = () => {
    router.push('/customer-success')
  }

  return (
    <TooltipProvider>
      <div className="px-1.5">
        <Tooltip>
          <TooltipTrigger asChild>
            <div 
              className="group flex items-center justify-between cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-md py-1 px-1.5 transition-all duration-200"
              onClick={handleClick}
            >
              <div className="flex items-center gap-2 text-xs">
                <Phone className="size-3 text-gray-400 group-hover:text-gray-600 transition-colors" />
                <span className="text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">Need help?</span>
              </div>
              <div className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                PRO
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={5} className="text-[10px] px-2 py-1">
            <p>Get a personalized walkthrough</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
