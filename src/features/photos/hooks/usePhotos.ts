import { useCallback, useEffect, useState } from 'react'

import { fetchPaginatedPhotos } from '../photo.data'
import type { PaginationParams, Photo } from '../photo.types'

interface UsePhotosReturn {
  photos: Photo[]
  loading: boolean
  error: string | null
  hasMore: boolean
  loadMore: () => Promise<void>
  refresh: () => Promise<void>
}

export const usePhotos = (
  initialParams: PaginationParams = {},
): UsePhotosReturn => {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const loadPhotos = useCallback(
    async (params: PaginationParams, append = false) => {
      try {
        setLoading(true)
        setError(null)

        const result = await fetchPaginatedPhotos(params)

        if (append) {
          setPhotos((prev) => [...prev, ...result.items])
        } else {
          setPhotos(result.items)
        }

        // If we got less than the limit, we've reached the end
        if (result.items.length < (params.limit || 30)) {
          setHasMore(false)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load photos')
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return

    const nextPage = currentPage + 1
    await loadPhotos({ ...initialParams, page: nextPage }, true)
    setCurrentPage(nextPage)
  }, [currentPage, initialParams, loading, hasMore, loadPhotos])

  const refresh = useCallback(async () => {
    setCurrentPage(1)
    setHasMore(true)
    await loadPhotos(initialParams, false)
  }, [initialParams, loadPhotos])

  // Load initial photos
  useEffect(() => {
    loadPhotos(initialParams)
  }, [loadPhotos, initialParams])

  return {
    photos,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
  }
}
