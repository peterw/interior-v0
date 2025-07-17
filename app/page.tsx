"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loading } from "@/components/loading"

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/interior")
  }, [router])

  return (
    <Loading 
      size="full" 
      title="Redirecting to Interior Designer" 
      description="Please wait..."
    />
  )
} 