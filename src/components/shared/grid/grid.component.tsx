import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { SCColumn, SCColumnsWrapper, SCGridContainer } from './grid.styles'
import type { DSGridMasonryProps } from './grid.types'
import {
  calculateColumnWidth,
  createEmptyColumns,
  distributeItems,
  getColumnCount,
} from './grid.utils'

const useDebounce = (callback: () => void, delay: number) => {
  const timeoutRef = useRef<number | undefined>(undefined)

  return useCallback(() => {
    if (timeoutRef.current !== undefined) {
      window.clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = window.setTimeout(callback, delay)
  }, [callback, delay])
}

export const DSGridMasonry = <
  T extends { id: string; width: number; height: number },
>({
  data,
  gap = 24,
  renderItem,
}: DSGridMasonryProps<T>) => {
  const [columns, setColumns] = useState<
    Array<Array<T & { originalIndex: number }>>
  >(() => [])
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

  const debouncedCalculateColumns = useDebounce(calculateColumns, 50)

  const distributedColumns = useMemo(
    () =>
      columnCount === 0 || !data.length
        ? []
        : distributeItems(data, columnCount, columnWidth, gap),
    [data, columnCount, columnWidth, gap],
  )

  const renderColumnItem = useCallback(
    (item: T & { originalIndex: number }) => (
      <div key={item.id}>
        {renderItem(item as T, columnWidth, item.originalIndex)}
      </div>
    ),
    [renderItem, columnWidth],
  )

  useEffect(() => {
    setColumns(distributedColumns)
  }, [distributedColumns])

  useEffect(() => {
    calculateColumns()

    window.addEventListener('resize', debouncedCalculateColumns)
    return () => window.removeEventListener('resize', debouncedCalculateColumns)
  }, [calculateColumns, debouncedCalculateColumns])

  const memoizedColumns = useMemo(
    () =>
      columns.map((column, columnIndex) => (
        <SCColumn key={`column-${columnIndex}`} $gap={gap} $width={columnWidth}>
          {column.map(renderColumnItem)}
        </SCColumn>
      )),
    [columns, gap, columnWidth, renderColumnItem],
  )

  return (
    <SCGridContainer ref={containerRef}>
      <SCColumnsWrapper $gap={gap}>{memoizedColumns}</SCColumnsWrapper>
    </SCGridContainer>
  )
}

DSGridMasonry.displayName = 'DSGridMasonry'
