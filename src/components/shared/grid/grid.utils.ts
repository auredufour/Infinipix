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

export function distributeItems<T extends { width: number; height: number }>(
  items: T[],
  columnCount: number,
  columnWidth: number,
  gap: number,
): Array<Array<T & { originalIndex: number }>> {
  const { columns } = items.reduce(
    (acc, item, index) => {
      // Find shortest column
      let shortestIndex = 0
      let shortestHeight = acc.heights[0]!

      for (let i = 1; i < acc.heights.length; i++) {
        const currentHeight = acc.heights[i]!
        if (currentHeight < shortestHeight) {
          shortestHeight = currentHeight
          shortestIndex = i
        }
      }

      // Add item to shortest column
      acc.columns[shortestIndex]!.push({ ...item, originalIndex: index })

      const aspectRatio = item.height / item.width
      acc.heights[shortestIndex]! += columnWidth * aspectRatio + gap

      return acc
    },
    {
      columns: createEmptyColumns<T & { originalIndex: number }>(columnCount),
      heights: Array(columnCount).fill(0),
    },
  )

  return columns
}
