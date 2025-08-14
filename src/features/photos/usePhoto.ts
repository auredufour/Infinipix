import type { RefObject } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { fetchPaginatedPhotos } from './photo.data'
import type { Photo } from './photo.types'
import type {
  PaginationLinks,
  PaginationParams,
  PhotoPage,
} from './photo.types'

type AsyncStatus = 'loading' | 'success' | 'error' | null

export type InfinitePhotoPage = { items: Photo[]; next?: number }

interface AsyncState<T> {
  data: T | null
  error: Error | null
  status: AsyncStatus
}

const LINK_REGEX = /<[^>]*[?&]page=(\d+)[^>]*>\s*;\s*rel="(\w+)"/g

function createInitialState<T>(): AsyncState<T> {
  return { status: null, data: null, error: null }
}

/**
 * Parses a link header and extracts pagination links.
 */
function parseLinkHeader(header: string | null): PaginationLinks {
  if (!header) {
    return {}
  }

  const links: PaginationLinks = {}

  for (const [, pageStr, rel] of header.matchAll(LINK_REGEX)) {
    links[rel as keyof PaginationLinks] = Number(pageStr)
  }
  return links
}

function getNextPage(header: string | null): number | undefined {
  if (!header) return
  // Example header:
  // <https://picsum.photos/v2/list?page=2&limit=30>; rel="next"
  const nextPart = header.split(',').find((p) => p.includes('rel="next"'))
  if (!nextPart) return
  const match = nextPart.match(/[?&]page=(\d+)/)
  return match ? Number(match[1]) : undefined
}

/**
 * Declarative wrapper around IntersectionObserver.
 * Automatically disconnects on unmount or when dependencies change.
 */
function useIntersectionObserver(
  targetRef: RefObject<Element | null>,
  callback: IntersectionObserverCallback,
  rootMargin: string,
  threshold = 0.1,
) {
  useEffect(() => {
    const node = targetRef.current
    if (!node) return

    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin,
      threshold,
    })

    observer.observe(node)
    return () => observer.disconnect()
  }, [targetRef, callback, rootMargin, threshold])
}

function appendUniquePhotos(
  prev: InfinitePhotoPage[],
  items: Photo[],
  next?: number,
): InfinitePhotoPage[] {
  const lastPage = prev[prev.length - 1]
  const lastPageIds = lastPage
    ? new Set(lastPage.items.map((i) => i.id))
    : new Set()

  const unique = items.filter((i) => !lastPageIds.has(i.id))

  return [...prev, { items: unique, next }]
}

/**
 * Fetches a single page of photos from the Picsum API.
 *
 * @param page - The page number to fetch.
 * @param limit - The number of photos to fetch per page.
 * @returns An object containing the photos and pagination links.
 */
export function usePhotoList({
  page = 1,
  limit = 30,
}: PaginationParams): AsyncState<PhotoPage> {
  const [state, setState] =
    useState<AsyncState<PhotoPage>>(createInitialState())

  useEffect(() => {
    let cancelled = false
    setState((prev) => ({ ...prev, status: 'loading', error: null }))

    const fetchData = async () => {
      try {
        const { items, linkHeader } = await fetchPaginatedPhotos({
          page,
          limit,
        })
        const { next, prev } = parseLinkHeader(linkHeader)
        const dataPage: PhotoPage = { items, links: { next, prev } }

        if (!cancelled) {
          setState({ status: 'success', data: dataPage, error: null })
        }
      } catch (error) {
        if (!cancelled) {
          setState({ status: 'error', data: null, error: error as Error })
        }
      }
    }

    fetchData()

    return () => {
      cancelled = true
    }
  }, [page, limit])

  return state
}

/**
 * Client-side infinite-scroll hook for Picsum photos list.
 * Keeps previously fetched pages in memory and exposes a bottom-sentinel ref that
 * loads the next page when scrolled into view.
 *
 * @param limit - The number of photos to fetch per page.
 * @returns An object containing the pages and a sentinel ref.
 */
export function useInfinitePhotos(limit = 30) {
  const nextPageRef = useRef<number | null>(1)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const rootMargin = '150% 0%'
  const [pages, setPages] = useState<InfinitePhotoPage[]>([])

  // Add loading state to prevent concurrent requests
  const isLoadingRef = useRef(false)
  const hasInitiallyLoadedRef = useRef(false)

  /**
   * Fetches the page referenced by `nextPageRef` and appends it to the list.
   * The ref is used so this callback doesn't change whenever pages are added,
   * preventing unnecessary teardown / re-creation of the IntersectionObserver.
   */
  const fetchNextPage = useCallback(async () => {
    const page = nextPageRef.current
    if (!page || isLoadingRef.current) {
      return
    }

    isLoadingRef.current = true

    try {
      const { items, linkHeader } = await fetchPaginatedPhotos({ page, limit })
      const next = getNextPage(linkHeader)
      nextPageRef.current = next ?? null

      setPages((prev) => appendUniquePhotos(prev, items, next))
    } finally {
      isLoadingRef.current = false
    }
  }, [limit])

  // Load the first page on mount - only once
  useEffect(() => {
    if (!hasInitiallyLoadedRef.current) {
      hasInitiallyLoadedRef.current = true
      fetchNextPage()
    }
  }, []) // Empty dependency array to run only once

  /** Callback fired by the IntersectionObserver */
  const handleIntersection = useCallback<IntersectionObserverCallback>(
    (entries) => {
      const entry = entries[0]
      if (entry && entry.isIntersecting && !isLoadingRef.current) {
        fetchNextPage()
      }
    },
    [fetchNextPage],
  )

  // Observe the sentinel
  useIntersectionObserver(sentinelRef, handleIntersection, rootMargin)

  return { pages, sentinel: sentinelRef }
}
