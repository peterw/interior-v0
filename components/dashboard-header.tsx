import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { useIsMobile } from "@/components/hooks/use-mobile"
import Image from "next/image"
import { cf } from "@/lib/cf"

export function DashboardHeader() {
  const isMobile = useIsMobile()
  
  return (
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-1 items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center">
          <Image 
            src={cf("/images/logo/local-rank-tracker-logo.svg")}
            alt="Local Rank Tracker"
            width={120}
            height={30}
            className="h-auto"
          />
        </div>
      </div>
    </header>
  )
} 