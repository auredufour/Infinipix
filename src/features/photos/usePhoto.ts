import { useEffect, useState } from 'react'

import { fetchPaginatedPhotos } from './photo.data'
import type {
  PaginationLinks,
  PaginationParams,
  PhotoPage,
} from './photo.types'

type AsyncStatus = 'loading' | 'success' | 'error' | null

interface AsyncState<T> {
  data: T | null
  error: Error | null
  status: AsyncStatus
}

function createInitialState<T>(): AsyncState<T> {
  return { status: null, data: null, error: null }
}

const LINK_REGEX = /<[^>]*[?&]page=(\d+)[^>]*>\s*;\s*rel="(\w+)"/g

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
