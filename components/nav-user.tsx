"use client"

import {
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Coins,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
export function NavUser() {
  const { user, logout } = useAuth()
  const { isMobile } = useSidebar()
  const router = useRouter()

  if (!user) return null

  const userInitials = user.first_name && user.last_name
    ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
    : user.email[0].toUpperCase()

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:group-data-[hover-expanded=true]:justify-start group-data-[collapsible=icon]:group-data-[hover-expanded=true]:px-3 group-data-[collapsible=icon]:group-data-[hover-expanded=true]:mx-0"
              >
                <Avatar className="size-8 rounded-lg group-data-[collapsible=icon]:size-9">
                  <AvatarFallback className="rounded-lg">{userInitials}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden group-data-[collapsible=icon]:group-data-[hover-expanded=true]:grid">
                  <span className="truncate font-semibold">
                    {user.first_name ? `${user.first_name} ${user.last_name}` : 'User'}
                  </span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden group-data-[collapsible=icon]:group-data-[hover-expanded=true]:block" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="size-8 rounded-lg">
                    <AvatarFallback className="rounded-lg">{userInitials}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user.first_name ? `${user.first_name} ${user.last_name}` : 'User'}
                    </span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {user.is_premium && (
                <DropdownMenuItem onClick={() => router.push("/upgrade")}>
                  <CreditCard className="mr-2 size-4" />
                  Manage Subscription
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => router.push("/credits-history")}>
                <Coins className="mr-2 size-4" />
                Credits History
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => logout()}>
                <LogOut className="mr-2 size-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  )
}
