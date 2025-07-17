"use client"

import { Home, Palette, Rocket, FolderOpen, Sparkles, History, Paintbrush, MessageSquareText } from "lucide-react"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenu,
  SidebarRail,
  SidebarTrigger,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useIsMobile } from "./hooks/use-mobile"

export function AppSidebar() {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const { setOpenMobile } = useSidebar()
  
  // Function to close mobile sidebar
  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }
  
  // Define routes
  const routes = [
    {
      name: "Interior AI",
      path: "/interior",
      icon: Palette,
      description: "Transform spaces with AI"
    },
    // {
    //   name: "Projects",
    //   path: "/interior/projects", 
    //   icon: FolderOpen,
    //   description: "Manage your designs"
    // },
    // {
    //   name: "Templates",
    //   path: "/interior/templates",
    //   icon: Sparkles,
    //   description: "Design presets"
    // },
    {
      name: "Canvas Editor",
      path: "/interior/canvas",
      icon: Paintbrush,
      description: "Edit & refine designs"
    },
    {
      name: "Canvas Chat",
      path: "/interior/canvas-chat",
      icon: MessageSquareText,
      description: "Chat-style editor"
    },
    {
      name: "History",
      path: "/interior/history",
      icon: History,
      description: "Recent transformations"
    }
  ]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-col pl-4 group-data-[collapsible=icon]:pl-0 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:group-data-[hover-expanded=true]:pl-4 group-data-[collapsible=icon]:group-data-[hover-expanded=true]:items-start">
        <div className="my-2 flex items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:my-3 group-data-[collapsible=icon]:group-data-[hover-expanded=true]:justify-start group-data-[collapsible=icon]:group-data-[hover-expanded=true]:my-2">
          {isMobile && <SidebarTrigger className="mr-2" />}
          <div className="group-data-[collapsible=icon]:hidden group-data-[collapsible=icon]:group-data-[hover-expanded=true]:block">
            <Link href="/interior" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-black flex items-center justify-center">
                <Palette className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-lg font-semibold">Interior AI</h2>
            </Link>
          </div>
          <div className="hidden group-data-[collapsible=icon]:block group-data-[collapsible=icon]:group-data-[hover-expanded=true]:hidden">
            <Link href="/interior">
              <div className="h-8 w-8 rounded-lg bg-black flex items-center justify-center">
                <Palette className="h-4 w-4 text-white" />
              </div>
            </Link>
          </div>
        </div>
        <SidebarSeparator className="my-2"/>
      </SidebarHeader>
      <SidebarContent className="pl-4 pr-4 overflow-y-auto group-data-[collapsible=icon]:pl-0 group-data-[collapsible=icon]:pr-0 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:group-data-[hover-expanded=true]:pl-4 group-data-[collapsible=icon]:group-data-[hover-expanded=true]:pr-4 group-data-[collapsible=icon]:group-data-[hover-expanded=true]:items-start">
        {/* Navigation Routes */}
        <SidebarMenu className="space-y-1">
          {routes.map((route) => {
            const Icon = route.icon
            const isActive = pathname === route.path
            return (
              <SidebarMenuItem key={route.path}>
                <Link
                  href={route.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all group",
                    "hover:bg-gray-100",
                    "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:mx-auto",
                    isActive
                      ? "bg-gray-100 text-black shadow-sm"
                      : "text-gray-700 hover:text-gray-900"
                  )}
                  onClick={handleLinkClick}
                >
                  <Icon className={cn(
                    "h-5 w-5 shrink-0 transition-colors",
                    isActive ? "text-black" : "text-gray-500 group-hover:text-gray-700"
                  )} />
                  <div className="flex-1 group-data-[collapsible=icon]:hidden">
                    <span className="block truncate">{route.name}</span>
                    {!isActive && (
                      <span className="text-xs text-gray-500 truncate">{route.description}</span>
                    )}
                  </div>
                  {isActive && (
                    <div className="w-1 h-8 bg-black rounded-full group-data-[collapsible=icon]:hidden" />
                  )}
                </Link>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="px-4 w-full group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:group-data-[hover-expanded=true]:px-4 group-data-[collapsible=icon]:group-data-[hover-expanded=true]:items-start group-data-[collapsible=icon]:group-data-[hover-expanded=true]:w-full">
        <SidebarSeparator className="my-2" />
        
        {/* Upgrade Button */}
        <div className="mb-3 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
          <Link
            href="/upgrade"
            className="flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-md hover:shadow-lg group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:h-10"
            title="Upgrade to Pro"
          >
            <Rocket className="h-4 w-4" />
            <span className="group-data-[collapsible=icon]:hidden">Upgrade to Pro</span>
          </Link>
        </div>
        
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}