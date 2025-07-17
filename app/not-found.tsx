'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Home, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container flex min-h-screen flex-col items-center justify-center px-4 text-center">
        {/* Animated 404 Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <h1 className="text-[150px] font-bold leading-tight tracking-tighter text-gray-200 dark:text-gray-700 sm:text-[200px]">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl">
                  Page not found
                </h2>
                <p className="mx-auto max-w-xs text-sm text-gray-600 dark:text-gray-400 sm:text-base">
                  Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-32 flex flex-col gap-4 sm:flex-row"
        >
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="size-4" />
            Go back
          </Button>
          <Button
            variant="default"
            onClick={() => router.push('/')}
            className="gap-2"
          >
            <Home className="size-4" />
            Return home
          </Button>
        </motion.div>

        {/* Visual Elements */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-50 blur-3xl dark:bg-blue-900/20" />
          <div className="absolute left-1/3 top-1/3 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-50 blur-3xl dark:bg-red-900/20" />
        </div>

        {/* SEO and Accessibility Enhancement */}
        <div className="sr-only" role="status" aria-live="polite">
          404 - Page not found. Please use the navigation options to continue.
        </div>
      </div>
    </div>
  )
}

