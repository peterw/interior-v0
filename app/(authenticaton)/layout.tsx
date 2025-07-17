"use client"

import Providers from "./providers"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Providers>
      {children}
    </Providers>
  )
}
