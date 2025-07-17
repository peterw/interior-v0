'use client'

import React from 'react'

export default function ResetPasswordPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-green-500">Reset</span> your password
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to receive a password reset link
          </p>
        </div>
        
        <div className="w-full h-[500px] border rounded-md overflow-hidden">
          <iframe 
            src="https://api.localrank.so/accounts/password/reset/"
            className="w-full h-full border-0"
            title="Password Reset Form"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
} 