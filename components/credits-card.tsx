"use client"

import React, { useState, useEffect } from "react"
import { TrendingUp, Users, MapPin, Coins } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ServiceCard } from "@/components/ui/service-card"
import { LeadsService } from "@/lib/api/generated"
import type { LeadCredit } from "@/lib/api/generated"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useSubscriptionStore } from "@/app/(protected-views)/upgrade/store/subscriptionStore"

export function CreditsCard() {
  const { user } = useAuth()
  const router = useRouter()
  const { plansData } = useSubscriptionStore()
  const [leadCredits, setLeadCredits] = useState<LeadCredit | null>(null)
  const [loadingLeadCredits, setLoadingLeadCredits] = useState(true)

  useEffect(() => {
    if (!user) return

    // Create abort controller for cleanup
    const abortController = new AbortController()

    // Fetch lead credits
    LeadsService.getUserLeadCreditBalance()
      .then(data => {
        if (!abortController.signal.aborted) {
          setLeadCredits(data)
        }
      })
      .catch(error => {
        if (!abortController.signal.aborted) {
          console.error('Error fetching lead credits:', error)
        }
      })
      .finally(() => {
        if (!abortController.signal.aborted) {
          setLoadingLeadCredits(false)
        }
      })


    // Cleanup function to abort pending requests
    return () => {
      abortController.abort()
    }
  }, [user])

  if (!user) return null

  const credit_balance = user.subscription?.credit_balance || 0



  const handleCardClick = () => {
    router.push('/upgrade')
  }

  const handleRankTrackerClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push('/upgrade?tab=ranktracker')
  }

  const handleLeadsClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push('/upgrade?tab=leads')
  }

  const handleGrowthClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push('/upgrade?tab=growth')
  }

  return (
    <TooltipProvider>
      <div className="py-1">
        <div className="space-y-2">
        {/* Main Credit Display */}


        {/* Compact Services Overview */}
        <Card
          className="bg-blue-50/30 dark:bg-blue-900/10 border border-blue-200/50 dark:border-blue-700/30 rounded-lg cursor-pointer hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors"
          onClick={handleCardClick}
        >
          <CardContent className="p-3">
            <div className="">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="group flex items-center justify-between cursor-pointer hover:bg-blue-100/70 dark:hover:bg-blue-800/40 rounded-md py-1.5 px-2 -mx-2 transition-all duration-200 hover:shadow-sm"
                    onClick={handleGrowthClick}
                  >
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="size-3 text-blue-500 group-hover:text-blue-600 transition-colors" />
                      <span className="text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors font-medium">Growth</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className={cn(
                        "text-[10px] px-1 py-0.5 rounded font-medium",
                        plansData?.citations?.current_plan && plansData.citations.current_plan !== 'FREE'
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                      )}>
                        {plansData?.citations?.current_plan || "FREE"}
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={8} alignOffset={10} className="text-[10px] px-2 py-1 bg-gray-800/95 text-white border-0 shadow-lg rounded-md">
                  <p>Build local citations and directory listings</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="group flex items-center justify-between cursor-pointer hover:bg-blue-100/70 dark:hover:bg-blue-800/40 rounded-md py-1.5 px-2 -mx-2 transition-all duration-200 hover:shadow-sm"
                    onClick={handleRankTrackerClick}
                  >
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="size-3 text-blue-500 group-hover:text-blue-600 transition-colors" />
                      <span className="text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors font-medium">Tracker</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-1">
                        <Coins className="size-3 text-yellow-600" />
                        <span className="text-xs text-gray-900 dark:text-gray-100 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                          {credit_balance.toLocaleString()}
                        </span>
                      </div>
                      <div className={cn(
                        "text-[10px] px-1 py-0.5 rounded font-medium",
                        plansData?.ranktracker?.current_plan && plansData.ranktracker.current_plan !== 'FREE'
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                      )}>
                        {plansData?.ranktracker?.current_plan || "FREE"}
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={8} alignOffset={10} className="text-[10px] px-2 py-1 bg-gray-800/95 text-white border-0 shadow-lg rounded-md">
                  <p>Track keyword rankings across search engines</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="group flex items-center justify-between cursor-pointer hover:bg-blue-100/70 dark:hover:bg-blue-800/40 rounded-md py-1.5 px-2 -mx-2 transition-all duration-200 hover:shadow-sm"
                    onClick={handleLeadsClick}
                  >
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="size-3 text-blue-500 group-hover:text-blue-600 transition-colors" />
                      <span className="text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors font-medium">Leads</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-1">
                        <Coins className="size-3 text-yellow-600" />
                        <span className="text-xs text-gray-900 dark:text-gray-100 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                          {loadingLeadCredits ? "..." : (leadCredits?.balance || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={8} alignOffset={10} className="text-[10px] px-2 py-1 bg-gray-800/95 text-white border-0 shadow-lg rounded-md">
                  <p>Find and connect with potential clients</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="mt-1 pt-2 border-t border-gray-200 dark:border-gray-700">
              <Button
                onClick={() => {
                  router.push('/upgrade')
                }}
                size="sm"
                variant={
                  (!plansData?.citations?.current_plan || plansData.citations.current_plan === 'FREE') &&
                  (!plansData?.ranktracker?.current_plan || plansData.ranktracker.current_plan === 'FREE')
                    ? "default"
                    : "secondary"
                }
                className={cn(
                  "w-full text-xs",
                  (!plansData?.citations?.current_plan || plansData.citations.current_plan === 'FREE') &&
                  (!plansData?.ranktracker?.current_plan || plansData.ranktracker.current_plan === 'FREE')
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : ""
                )}
              >
                {(!plansData?.citations?.current_plan || plansData.citations.current_plan === 'FREE') &&
                 (!plansData?.ranktracker?.current_plan || plansData.ranktracker.current_plan === 'FREE')
                  ? "Upgrade Plan"
                  : "Manage Plan"}
              </Button>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}
