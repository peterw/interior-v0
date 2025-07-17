"use client"

import { useState, useEffect, useCallback } from "react"
import { useDebounce } from "@/hooks/use-debounce"
import VideoService, { Video, VideoListParams } from "@/lib/video"
import { VideoStatus } from "@/types/video"

interface UseVideosOptions {
  pageSize?: number
  type?: 'user' | 'free'
  initialStatus?: VideoStatus | string
}

interface UseVideosReturn {
  videos: Video[]
  isLoading: boolean
  error: Error | null
  totalCount: number
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  search: string
  setSearch: (search: string) => void
  setCurrentPage: (page: number) => void
  setSortBy: (sortBy: string) => void
  setStatus: (status: string) => void
}

export function useVideos({
  pageSize = 8,
  type = 'user',
  initialStatus,
}: UseVideosOptions = {}): UseVideosReturn {
  const [videos, setVideos] = useState<Video[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [status, setStatus] = useState(initialStatus || '')

  const debouncedSearch = useDebounce(search, 500)

  // Function to fetch videos - memoized to prevent unnecessary re-renders
  const fetchVideos = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const params: VideoListParams = {
        page: currentPage,
        page_size: pageSize,
        sort_by: sortBy || undefined,
        status: status !== 'ALL' ? status : undefined,
        search: debouncedSearch || undefined,
      }

      const videoService = VideoService.getInstance()
      const response = type === 'free'
        ? await videoService.listFreeVideos(params)
        : await videoService.listVideos(params)

      setVideos(response.results)
      setTotalCount(response.count)
      setTotalPages(Math.ceil(response.count / pageSize))
    } catch (err) {
      console.error('Error fetching videos:', err)
      setError(err as Error)
      setVideos([])
      setTotalCount(0)
      setTotalPages(1)
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, pageSize, debouncedSearch, sortBy, status, type])

  // Effect for initial fetch and dependency changes
  useEffect(() => {
    fetchVideos()
  }, [fetchVideos])

  // Effect for handling video status update events
  useEffect(() => {
    const handleVideoStatusUpdate = (event: CustomEvent<Video>) => {
      const updatedVideo = event.detail
      setVideos(prevVideos =>
        prevVideos.map(video =>
          video.video_id === updatedVideo.video_id
            ? { ...video, ...updatedVideo }
            : video
        )
      )
    }

    window.addEventListener('video-status-update', handleVideoStatusUpdate as EventListener)

    return () => {
      window.removeEventListener('video-status-update', handleVideoStatusUpdate as EventListener)
    }
  }, [])

  return {
    videos,
    isLoading,
    error,
    totalCount,
    currentPage,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
    search,
    setSearch,
    setCurrentPage,
    setSortBy,
    setStatus,
  }
}

