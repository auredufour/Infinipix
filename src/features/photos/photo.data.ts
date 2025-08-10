import { fetchPhotoListResponse } from './photo.api'
import type { PaginationParams, Photo } from './photo.types'

const listCache = new Map<
  string,
  { items: Photo[]; linkHeader: string | null }
>()

export async function fetchPaginatedPhotos({
  page = 1,
  limit = 30,
}: PaginationParams): Promise<{ items: Photo[]; linkHeader: string | null }> {
  const cacheKey = JSON.stringify({ page, limit })

  if (listCache.has(cacheKey)) {
    return listCache.get(cacheKey)!
  }

  const res = await fetchPhotoListResponse({ page, limit })
  if (!res.ok) throw new Error(`Photo list request failed: ${res.status}`)

  const items: Photo[] = await res.json()
  const linkHeader = res.headers.get('Link') || res.headers.get('link')

  const payload = { items, linkHeader }

  listCache.set(cacheKey, payload)

  return payload
}
