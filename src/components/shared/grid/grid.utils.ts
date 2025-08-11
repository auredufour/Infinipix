import type { Photo } from '../../../features/photos/photo.types'

const SMALL_SCREEN_WIDTH = 576
const MEDIUM_SCREEN_WIDTH = 992

export function getColumnCount(screenWidth: number): number {
  if (screenWidth < SMALL_SCREEN_WIDTH) return 1
  if (screenWidth < MEDIUM_SCREEN_WIDTH) return 2
  return 3
}

export function createEmptyColumns<T>(count: number): T[][] {
  return Array.from({ length: count }, () => [])
}

export function calculateColumnWidth(
  containerWidth: number,
  count: number,
  gap: number,
) {
  return Math.floor((containerWidth - gap * (count - 1)) / count)
}

export function distributePhotos(
  photos: Photo[],
  columnCount: number,
  columnWidth: number,
  gap: number,
): Photo[][] {
  const columns = createEmptyColumns<Photo>(columnCount)
  const heights = Array(columnCount).fill(0)

  photos.forEach((photo) => {
    const shortest = heights.indexOf(Math.min(...heights))
    columns[shortest].push(photo)

    const aspect = photo.height / photo.width
    heights[shortest] += columnWidth * aspect + gap
  })

  return columns
}
