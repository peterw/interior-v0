"use client"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  History,
  MapPin,
  Play,
  BarChart3,
  Users,
  Package,
  Map,
  Newspaper,
  MessageSquareText,
  ExternalLink,
  Zap,
  BookOpen,
  Trophy,
  FileText
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useIsMobile } from "@/components/hooks/use-mobile"

interface FeatureSidebarProps {
  className?: string
}

// Sidebar content component
function SidebarContent({ currentTabs, currentFeature, pathname }: {
  currentTabs: any[]
  currentFeature: string
  pathname: string
}) {
  return (
    <div className="flex h-full w-48 flex-col border-r bg-background">
      <div className="flex h-11 items-center border-b px-3">
        <h2 className="text-sm font-semibold text-foreground antialiased">{currentFeature}</h2>
      </div>
      
      <ScrollArea className="flex-1 px-2">
        <div className="py-2">
          <div className="space-y-0.5">
            {currentTabs.map((tab) => {
              // Active state logic with special handling for find-leads tab
              let isActive = pathname === tab.href
              
              // Special case: "Find Leads" should be active for both /leads and /leads/search
              if (tab.id === 'find-leads' && (pathname === '/leads' || pathname === '/leads/search')) {
                isActive = true
              }
              
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={cn(
                    "block rounded-md px-3 py-1.5 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground antialiased",
                    isActive 
                      ? "bg-accent text-accent-foreground font-semibold" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab.label}
                </Link>
              )
            })}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

// Mobile tabs component
function MobileTabs({ currentTabs, pathname }: { currentTabs: any[], pathname: string }) {
  return (
    <div className="w-full border-b bg-background md:hidden">
      <div className="flex overflow-x-auto scrollbar-hide">
        {currentTabs.map((tab) => {
          // Active state logic with special handling for find-leads tab
          let isActive = pathname === tab.href
          
          // Special case: "Find Leads" should be active for both /leads and /leads/search
          if (tab.id === 'find-leads' && (pathname === '/leads' || pathname === '/leads/search')) {
            isActive = true
          }
          
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={cn(
                "flex-1 min-w-fit flex items-center justify-center px-6 py-3.5 text-sm font-medium transition-all whitespace-nowrap border-b-2 antialiased",
                isActive 
                  ? "border-primary text-primary bg-primary/5 font-semibold" 
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              {tab.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export function FeatureSidebar({ className }: FeatureSidebarProps) {
  const pathname = usePathname()
  const isMobile = useIsMobile()

  // Define tabs based on the current route
  const scanTabs = [
    {
      id: "overview",
      label: "Overview",
      href: "/scan/overview",
      icon: BarChart3
    },
    {
      id: "start-scan", 
      label: "Start Scan",
      href: "/scan",
      icon: Play
    },
    {
      id: "history", 
      label: "History",
      href: "/history",
      icon: History
    },
    {
      id: "success",
      label: "Compare",
      href: "/success",
      icon: History
    }
  ]

  const citationTabs = [
    {
      id: "overview",
      label: "Overview", 
      href: "/citations/overview",
      icon: BarChart3
    },
    {
      id: "start-citation",
      label: "Create Citations",
      href: "/citations", 
      icon: MapPin
    },
    {
      id: "links",
      label: "Links",
      href: "/links",
      icon: ExternalLink
    }
  ]

  const leadsTabs = [
    {
      id: "overview",
      label: "Overview",
      href: "/leads/overview", 
      icon: BarChart3
    },
    {
      id: "find-leads",
      label: "Find Leads",
      href: "/leads",
      icon: Users
    },
    {
      id: "history",
      label: "History",
      href: "/leads/history",
      icon: History
    },
    {
      id: "lead-packs",
      label: "Lead Packs",
      href: "/leads/packs",
      icon: Package
    },
    {
      id: "dfy",
      label: "DFY",
      href: "/leads/dfy",
      icon: Zap
    }
  ]

  const gbpTabs = [
    {
      id: "overview",
      label: "Overview",
      href: "/gbp/overview",
      icon: BarChart3
    },
    {
      id: "gbp-connection",
      label: "GBP Connection", 
      href: "/gbp",
      icon: Map
    },
    {
      id: "gbp-posts",
      label: "GBP Posts",
      href: "/gbp-posts",
      icon: Newspaper
    },
    {
      id: "gbp-reviews",
      label: "GBP Reviews",
      href: "/gbp-reviews",
      icon: MessageSquareText
    }
  ]

  const learnTabs = [
    {
      id: "courses",
      label: "Courses",
      href: "/learn",
      icon: BookOpen
    },
    {
      id: "tutorials", 
      label: "Tutorials",
      href: "/learn/tutorials",
      icon: Play
    },
    {
      id: "certification",
      label: "Certification", 
      href: "/learn/certification",
      icon: Trophy
    },
    {
      id: "masterclass",
      label: "Masterclass", 
      href: "/learn/masterclass",
      icon: FileText
    }
  ]

  // Determine which tabs to show based on current route
  const isOnLearnRoute = pathname.startsWith('/learn')
  const isOnScanRoute = pathname.startsWith('/scan') || pathname.startsWith('/history') || pathname.startsWith('/success')
  const isOnCitationRoute = pathname.startsWith('/citations') || pathname.startsWith('/links')
  const isOnLeadsRoute = pathname.startsWith('/leads')
  const isOnGbpRoute = pathname.startsWith('/gbp')
  
  const currentTabs = isOnLearnRoute ? learnTabs : isOnScanRoute ? scanTabs : isOnCitationRoute ? citationTabs : isOnLeadsRoute ? leadsTabs : isOnGbpRoute ? gbpTabs : []
  const currentFeature = isOnLearnRoute
    ? 'Learn Local SEO'
    : isOnScanRoute 
    ? 'Track your Rankings' 
    : isOnCitationRoute 
    ? 'Boost Ranking' 
    : isOnLeadsRoute 
    ? 'Find More Clients' 
    : isOnGbpRoute 
    ? 'Manage GBP' 
    : ''

  if (!currentFeature) return null

  if (isMobile) {
    return <MobileTabs currentTabs={currentTabs} pathname={pathname} />
  }

  return (
    <div className={cn("hidden md:flex h-full", className)}>
      <SidebarContent 
        currentTabs={currentTabs} 
        currentFeature={currentFeature} 
        pathname={pathname}
      />
    </div>
  )
}
