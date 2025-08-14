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

// Optimized distribution algorithm - O(n) instead of O(n²)
export function distributeItems<T extends { width: number; height: number }>(
  items: T[],
  columnCount: number,
  columnWidth: number,
  gap: number,
): T[][] {
  const columns = createEmptyColumns<T>(columnCount)
  const heights = Array(columnCount).fill(0)

  items.forEach((item) => {
    // Find shortest column efficiently without Math.min + indexOf
    let shortestIndex = 0
    let shortestHeight = heights[0]

    for (let i = 1; i < heights.length; i++) {
      if (heights[i] < shortestHeight) {
        shortestHeight = heights[i]
        shortestIndex = i
      }
    }

    columns[shortestIndex].push(item)

    const aspect = item.height / item.width
    heights[shortestIndex] += columnWidth * aspect + gap
  })

  return columns
}
