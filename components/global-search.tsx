"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { dashboardRoutes, rankTrackerRoutes, citationRoutes, utilityRoutes, gbpRoutes } from "@/config/routes"
import { Bot, Users } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog"
import { useAuth } from "@/contexts/auth-context"

export function GlobalSearch() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const { user } = useAuth()

  // Check if user should see GBP and new features
  const allowedEmails = ["aspdofiapoisdfpio@gmail.com", "jacky@indexsy.com", "wpeter+devin@vt.edu"]
  const showGbpFeatures = user?.email ? allowedEmails.includes(user.email) : false

  // Define new feature routes (only shown to specific users)
  const newFeatureRoutes = React.useMemo(() => [
    {
      name: "LocalLeads",
      path: "/leads/search",
      pathname: "/leads/search",
      icon: Users
    },
    {
      name: "LocalAgent", 
      path: "/agent",
      pathname: "/agent",
      icon: Bot
    }
  ], [])

  // Build routes array based on user permissions
  const allRoutes = React.useMemo(() => {
    const routes = [
      ...dashboardRoutes,
      ...rankTrackerRoutes,
      ...citationRoutes,
      ...utilityRoutes // Keep all utility routes including billing
    ]

    // Add GBP routes only for specific users
    if (showGbpFeatures) {
      routes.push(...gbpRoutes)
      routes.push(...newFeatureRoutes.map(route => ({ ...route, target: undefined })))
    }

    return routes
  }, [showGbpFeatures, newFeatureRoutes])

  React.useEffect(() => {
    console.log("GlobalSearch component mounted")
    
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log("Key pressed:", event.key, "Ctrl:", event.ctrlKey, "Meta:", event.metaKey)
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        console.log("Ctrl+K detected, toggling modal")
        event.preventDefault()
        setOpen((open) => !open)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const handleSelect = React.useCallback((route: typeof allRoutes[0]) => {
    setOpen(false)
    
    if (route.target === "_blank") {
      window.open(route.path, "_blank")
    } else {
      router.push(route.path)
    }
  }, [router])

  return (
    <>   
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 z-50 bg-black/20 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <DialogContent className="overflow-hidden p-0 shadow-lg">
            <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
              <CommandInput placeholder="Search pages..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                
                {dashboardRoutes.length > 0 && (
                  <CommandGroup heading="Dashboard">
                    {dashboardRoutes.map((route) => (
                      <CommandItem
                        key={route.path}
                        value={`${route.name} ${route.path}`}
                        onSelect={() => handleSelect(route)}
                      >
                        <route.icon />
                        <span>{route.name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
                
                {rankTrackerRoutes.length > 0 && (
                  <CommandGroup heading="Track Rankings">
                    {rankTrackerRoutes.map((route) => (
                      <CommandItem
                        key={route.path}
                        value={`${route.name} ${route.path}`}
                        onSelect={() => handleSelect(route)}
                      >
                        <route.icon />
                        <span>{route.name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
                
                {citationRoutes.length > 0 && (
                  <CommandGroup heading="Boost Rankings">
                    {citationRoutes.map((route) => (
                      <CommandItem
                        key={route.path}
                        value={`${route.name} ${route.path}`}
                        onSelect={() => handleSelect(route)}
                      >
                        <route.icon />
                        <span>{route.name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
                
                {showGbpFeatures && gbpRoutes.length > 0 && (
                  <CommandGroup heading="Manage GBP">
                    {gbpRoutes.map((route) => (
                      <CommandItem
                        key={route.path}
                        value={`${route.name} ${route.path}`}
                        onSelect={() => handleSelect(route)}
                      >
                        <route.icon />
                        <span>{route.name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
                
                {showGbpFeatures && newFeatureRoutes.length > 0 && (
                  <CommandGroup heading="New Features">
                    {allRoutes.filter(route => newFeatureRoutes.some(nfr => nfr.path === route.path)).map((route) => (
                      <CommandItem
                        key={route.path}
                        value={`${route.name} ${route.path}`}
                        onSelect={() => handleSelect(route)}
                      >
                        <route.icon />
                        <span>{route.name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
                
                {utilityRoutes.length > 0 && (
                  <CommandGroup heading="Tools & Settings">
                    {utilityRoutes.map((route) => (
                      <CommandItem
                        key={route.path}
                        value={`${route.name} ${route.path}`}
                        onSelect={() => handleSelect(route)}
                      >
                        <route.icon />
                        <span>{route.name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  )
}
