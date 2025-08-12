import { useCallback, useEffect, useRef, useState } from 'react'

import { SCColumn, SCColumnsWrapper, SCGridContainer } from './grid.styles'
import type { DSGridMasonryProps } from './grid.types'
import {
  calculateColumnWidth,
  createEmptyColumns,
  distributePhotos,
  getColumnCount,
} from './grid.utils'

export const DSGridMansory = <
  T extends { id: string; width: number; height: number },
>({
  data,
  gap = 24,
  renderItem,
}: DSGridMasonryProps<T>) => {
  const [columns, setColumns] = useState<T[][]>(() => [])
  const [columnCount, setColumnCount] = useState(0)
  const [columnWidth, setColumnWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Calculate number of columns based on screen width
  const calculateColumns = useCallback(() => {
    if (!containerRef.current) return

    const containerWidth = containerRef.current.offsetWidth
    const count = getColumnCount(window.innerWidth)

    setColumnCount((prev) => {
      if (prev !== count) setColumns(createEmptyColumns<T>(count))
      return count
    })

    setColumnWidth(calculateColumnWidth(containerWidth, count, gap))
  }, [gap])

  // Distribute items across columns
  useEffect(() => {
    if (columnCount === 0 || !data.length) return

    setColumns(distributePhotos(data, columnCount, columnWidth, gap))
  }, [data, columnCount, columnWidth, gap])

  // Handle window resize
  useEffect(() => {
    calculateColumns()

    const handleResize = () => {
      calculateColumns()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [calculateColumns])

  return (
    <SCGridContainer ref={containerRef}>
      <SCColumnsWrapper $gap={gap}>
        {columns.map((column, columnIndex) => (
          <SCColumn key={columnIndex} $gap={gap} $width={columnWidth}>
            {column.map((item) => renderItem(item as T, columnWidth))}
          </SCColumn>
        ))}
      </SCColumnsWrapper>
    </SCGridContainer>
  )
}
