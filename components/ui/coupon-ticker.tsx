'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/hooks/use-toast'
import { SlotMachineDigit } from './slot-machine-digit'
import { AnimatePresence, motion } from 'framer-motion'

interface CouponTickerProps {
  className?: string
}

export function CouponTicker({ className }: CouponTickerProps) {
  const { toast } = useToast()
  const [isCopied, setIsCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {

    const calculateTimeLeft = () => {
      // Get current time
      const now = new Date().getTime()
      
      // Get stored start time or create new one
      let startTime = localStorage.getItem('couponStartTime')
      if (!startTime) {
        startTime = now.toString()
        localStorage.setItem('couponStartTime', startTime)
      }
      
      // Calculate 3 days from start time
      const threeDays = 3 * 24 * 60 * 60 * 1000 // 3 days in milliseconds
      const endTime = parseInt(startTime) + threeDays
      
      // If countdown is over, reset the cycle
      if (now >= endTime) {
        const newStartTime = now.toString()
        localStorage.setItem('couponStartTime', newStartTime)

        const newEndTime = now + threeDays
        const difference = newEndTime - now
        
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        }
      }
      
      // Calculate remaining time
      const difference = endTime - now
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      }
    }

    // Update timer immediately
    setTimeLeft(calculateTimeLeft())

    // Update timer every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])



  const handleCopyCode = () => {
    navigator.clipboard.writeText('WELCOME20PRIVATE')
    setIsCopied(true)
    
    toast({
      title: "Coupon Code Copied!",
      description: "WELCOME20PRIVATE has been copied to your clipboard. Use it at checkout for 20% off!",
    })
    
    // Reset to original text after 2 seconds
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <div className={cn(
      "relative border-b border-blue-200 py-4 px-4 overflow-hidden",
      "coupon-ticker-glow",
      className
    )}>
      {/* Content */}
      <div className="relative flex flex-col md:flex-row justify-center items-center gap-x-5 md:gap-y-0 gap-y-2">
        {/* First Row - Main Offer */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 text-center">
          <span className="text-blue-600 text-xs font-semibold hidden sm:inline">🎉 LIMITED TIME OFFER</span>
          <span className="text-blue-600 text-xs font-semibold sm:hidden">🎉</span>
                      <button 
            className={`${isCopied 
              ? 'bg-gradient-to-b from-green-500 to-green-600 border-green-400' 
              : 'bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-blue-400'
            } text-white px-2 sm:px-3 py-1 rounded-md text-xs font-mono shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
            onClick={handleCopyCode}
            title="Click to copy"
          >
            {isCopied ? 'COPIED!' : 'WELCOME20PRIVATE'}
          </button>
          <span className="text-blue-700 text-xs font-semibold hidden sm:inline">LIMITED: 20% off</span>
          <span className="text-blue-700 text-xs font-semibold sm:hidden">20% off</span>
        </div>
        
        {/* Second Row - Countdown Timer */}
        <div className="flex items-center justify-center gap-1 sm:gap-2">
          <span className="text-blue-600 text-xs font-medium hidden sm:inline">Expires in:</span>
          <span className="text-blue-600 text-xs font-medium sm:hidden">⏰</span>
          <div className="flex gap-0.5 sm:gap-1">
            {/* Days */}
            <div className="bg-gradient-to-b from-blue-400 to-blue-500 text-white px-1.5 sm:px-2 py-0.5 rounded text-xs font-mono shadow-md border border-blue-300 flex items-center">
              {timeLeft.days.toString().split('').map((digit, index) => (
                <SlotMachineDigit key={index} digit={digit} />
              ))}
              <span className="ml-0.5">d</span>
            </div>
            {/* Hours */}
            <div className="bg-gradient-to-b from-blue-400 to-blue-500 text-white px-1.5 sm:px-2 py-0.5 rounded text-xs font-mono shadow-md border border-blue-300 flex items-center">
              {timeLeft.hours.toString().padStart(2, '0').split('').map((digit, index) => (
                <SlotMachineDigit key={index} digit={digit} isLeadingZero={index === 0 && digit === '0'} />
              ))}
              <span className="ml-0.5">h</span>
            </div>
            {/* Minutes */}
            <div className="bg-gradient-to-b from-blue-400 to-blue-500 text-white px-1.5 sm:px-2 py-0.5 rounded text-xs font-mono shadow-md border border-blue-300 flex items-center">
              {timeLeft.minutes.toString().padStart(2, '0').split('').map((digit, index) => (
                <SlotMachineDigit key={index} digit={digit} isLeadingZero={index === 0 && digit === '0'} />
              ))}
              <span className="ml-0.5">m</span>
            </div>
            {/* Seconds */}
            <div className="bg-gradient-to-b from-blue-400 to-blue-500 text-white px-1.5 sm:px-2 py-0.5 rounded text-xs font-mono shadow-md border border-blue-300 flex items-center">
              {timeLeft.seconds.toString().padStart(2, '0').split('').map((digit, index) => (
                <SlotMachineDigit key={index} digit={digit} isLeadingZero={index === 0 && digit === '0'} />
              ))}
              <span className="ml-0.5">s</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Inject keyframe animations */}
      <style jsx global>{`
        .coupon-ticker-glow {
          background-image: linear-gradient(
            -45deg,
            #eff6ff,
            #dbeafe,
            #bfdbfe,
            #dbeafe,
            #eff6ff
          );
          background-size: 400% 400%;
          animation: glow-background 8s ease-in-out infinite;
        }

        @keyframes glow-background {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  )
} 