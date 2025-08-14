import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { SCColumn, SCColumnsWrapper, SCGridContainer } from './grid.styles'
import type { DSGridMasonryProps } from './grid.types'
import {
  calculateColumnWidth,
  createEmptyColumns,
  distributeItems,
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

  const calculateColumns = useCallback(() => {
    if (!containerRef.current) return

    const containerWidth = containerRef.current.offsetWidth
    const count = getColumnCount(window.innerWidth)

    if (columnCount !== count) {
      setColumnCount(count)
      setColumns(createEmptyColumns(count))
    }

    const newColumnWidth = Math.round(
      calculateColumnWidth(containerWidth, count, gap),
    )
    if (columnWidth !== newColumnWidth) {
      setColumnWidth(newColumnWidth)
    }
  }, [gap, columnCount, columnWidth])

  const handleOnResize = useCallback(() => {
    let requestAnimationFrameId: number | null = null

    return () => {
      if (requestAnimationFrameId) {
        cancelAnimationFrame(requestAnimationFrameId)
      }

      requestAnimationFrameId = requestAnimationFrame(() => {
        calculateColumns()
        requestAnimationFrameId = null
      })
    }
  }, [calculateColumns])()

  const distributedColumns = useMemo(
    () =>
      columnCount === 0 || !data.length
        ? []
        : distributeItems(data, columnCount, columnWidth, gap),
    [data, columnCount, columnWidth, gap],
  )

  useEffect(() => {
    setColumns(distributedColumns)
  }, [distributedColumns])

  useEffect(() => {
    calculateColumns()

    window.addEventListener('resize', handleOnResize)
    return () => window.removeEventListener('resize', handleOnResize)
  }, [calculateColumns, handleOnResize])

  const memoizedColumns = useMemo(
    () =>
      columns.map((column, columnIndex) => (
        <SCColumn key={`column-${columnIndex}`} $gap={gap} $width={columnWidth}>
          {column.map((item) => (
            <div key={item.id}>{renderItem(item, columnWidth)}</div>
          ))}
        </SCColumn>
      )),
    [columns, gap, columnWidth, renderItem],
  )

  return (
    <SCGridContainer ref={containerRef}>
      <SCColumnsWrapper $gap={gap}>{memoizedColumns}</SCColumnsWrapper>
    </SCGridContainer>
  )
}
