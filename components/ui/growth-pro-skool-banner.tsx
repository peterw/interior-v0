'use client'

import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Star, Gift, X } from "lucide-react"
import { useAuth } from '@/contexts/auth-context'

export function GrowthProSkoolBanner() {
  const { user } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  const isGrowthPro = user?.subscription?.plan === "Growth - Professional"

  if (!isGrowthPro || dismissed) {
    return null
  }

  return (
    <>
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 via-white to-blue-50 shadow-sm">
        <CardContent className="p-6 relative">
          <Button 
            onClick={() => setDismissed(true)} 
            variant="ghost" 
            size="sm" 
            className="absolute top-3 right-3 h-8 w-8 p-0 rounded-full hover:bg-blue-100"
          >
            <X className="h-4 w-4 text-blue-600" />
          </Button>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Gift className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-xl text-blue-900 mb-1">
                  🎉 Growth Pro Exclusive: Free Skool Community Access!
                </h3>
                <p className="text-blue-700 text-sm">
                  Join 500+ local SEO experts sharing strategies, case studies, and networking opportunities
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm font-medium text-blue-700">500+ members</span>
              </div>
              
              <Button 
                onClick={() => setShowModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2"
              >
                <Users className="mr-2 h-4 w-4" />
                Learn More
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-blue-900">Welcome to the LocalRank Community!</h2>
              <Button 
                onClick={() => setShowModal(false)} 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-blue-700 mb-4">Your Growth Pro subscription includes free access</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-sm">500+ local SEO experts sharing strategies</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Exclusive case studies and insider tips</span>
              </div>
              <div className="flex items-center gap-3">
                <Gift className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Networking opportunities with professionals</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mt-4 mb-6">
              Join our exclusive Skool community where local SEO experts share advanced strategies, case studies, and networking opportunities. Get insider tips, ask questions, and connect with other professionals growing their agencies.
            </p>
            <Button 
              onClick={() => setShowModal(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Got it, thanks!
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
