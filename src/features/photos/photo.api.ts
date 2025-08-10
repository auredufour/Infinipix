import type { PaginationParams } from './photo.types'

const BASE = import.meta.env.VITE_PHOTO_API_BASE ?? 'https://picsum.photos'

export async function fetchPhotoListResponse({
  page = 1,
  limit = 30,
}: PaginationParams): Promise<Response> {
  return fetch(`${BASE}/v2/list?page=${page}&limit=${limit}`)
}
