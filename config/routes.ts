import {
  Home,
  Palette,
  Wand2,
  MessageSquareText,
  FolderOpen,
  Image,
  Settings
} from "lucide-react"
import { LucideIcon } from "lucide-react"

interface Route {
  name: string
  path: string
  pathname: string
  icon: LucideIcon
  target?: string
}

export const dashboardRoutes: Route[] = [
  {
    name: "Dashboard",
    path: "/dashboard", 
    pathname: "/dashboard",
    icon: Home
  }
]

export const interiorRoutes: Route[] = [
  {
    name: "Interior AI",
    path: "/interior",
    pathname: "/interior",
    icon: Palette
  },
  {
    name: "Canvas Editor",
    path: "/interior/canvas",
    pathname: "/interior/canvas",
    icon: Wand2
  },
  {
    name: "Canvas Chat",
    path: "/interior/canvas-chat",
    pathname: "/interior/canvas-chat",
    icon: MessageSquareText
  },
  {
    name: "Projects",
    path: "/interior/projects",
    pathname: "/interior/projects",
    icon: FolderOpen
  },
  {
    name: "History",
    path: "/interior/history",
    pathname: "/interior/history",
    icon: Image
  },
  {
    name: "Templates",
    path: "/interior/templates",
    pathname: "/interior/templates",
    icon: FolderOpen
  }
]

export const authRoutes = {
  login: {
    path: '/auth/login',
    label: 'Login',
  },
  signup: {
    path: '/auth/signup',
    label: 'Sign Up',
  },
} as const

export const dashboardMenuRoutes = {
  dashboard: {
    path: '/dashboard',
    label: 'Dashboard',
  }
} as const

// Keep empty arrays for compatibility
export const rankTrackerRoutes: Route[] = []
export const citationRoutes: Route[] = []
export const leadsRoutes: Route[] = []
export const gbpRoutes: Route[] = []
export const emailAgentRoutes: Route[] = []
export const utilityRoutes: Route[] = []
export const learnRoutes: Route[] = []
export const academyRoutes: Route[] = []
export const marketingAssetsRoutes: Route[] = []
export const projectsRoutes: Route[] = []
export const designToolRoutes: Route[] = []
export const fbAdsRoutes: Route[] = []

export const marketingRoutes = {
  home: {
    name: "Home",
    path: "/",
    pathname: "/",
    icon: Home,
  }
}