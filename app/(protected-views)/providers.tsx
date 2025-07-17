"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { ProtectedRoute } from "@/components/protected-route"
import { SidebarInset } from "@/components/ui/sidebar"
import { useIsMobile } from "@/components/hooks/use-mobile"
import { TrialBanner } from "@/components/ui/trial-banner"
import { usePathname } from "next/navigation"

import { SidebarProvider } from "@/components/ui/sidebar"

// Import the configured OpenAPI to ensure it's properly initialized
import '@/lib/api';

interface ProvidersProps {
  children: React.ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
  const isMobile = useIsMobile()
  const pathname = usePathname()

  // Only show feature sidebar for learn, scan, citations, history, success, leads, links, and GBP routes
  const shouldShowFeatureSidebar =
    pathname.startsWith('/learn') ||
    pathname.startsWith('/scan') ||
    pathname.startsWith('/citations') ||
    pathname.startsWith('/history') ||
    pathname.startsWith('/success') ||
    pathname.startsWith('/leads') ||
    pathname.startsWith('/links') ||
    pathname.startsWith('/gbp')

  // Collapse the primary sidebar when the secondary sidebar is visible (on desktop)
  // On mobile, preserve the default open/close logic
  const sidebarOpen = isMobile ? undefined : !shouldShowFeatureSidebar

  // OpenAPI is now configured immediately when the module loads
  // No need for useEffect configuration here

  return (
    <ProtectedRoute>
      <SidebarProvider defaultOpen={!isMobile} open={sidebarOpen}>
        <AppSidebar />
        <SidebarInset>
          <TrialBanner />
          {isMobile && <DashboardHeader />}
          {children}
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  )
}

export default Providers
