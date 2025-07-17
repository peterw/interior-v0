"use client"

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Loading } from "@/components/loading"
import { authRoutes } from '@/config/routes'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(authRoutes.signup.path)
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return <Loading size="full" />
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
