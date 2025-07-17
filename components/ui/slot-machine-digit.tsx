'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SlotMachineDigitProps {
  digit: string
  isLeadingZero?: boolean
}

export function SlotMachineDigit({ digit, isLeadingZero = false }: SlotMachineDigitProps) {
  return (
    <div className="relative h-4 w-3 overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={digit}
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 16, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 40 }}
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            isLeadingZero && "text-white/50 line-through"
          )}
        >
          {digit}
        </motion.div>
      </AnimatePresence>
    </div>
  )
} 