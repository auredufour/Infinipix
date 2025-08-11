import { forwardRef, memo } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'

import { PhotoTile } from '../../../features/photos/components/photo-tile.component'
import type { Photo } from '../../../features/photos/photo.types'
import { gridCssRules } from './grid.styles'
import type { DSGridProps } from './grid.types'
import { DSGridCell } from './subcomponents/grid-cell.component'

const StyledGrid = styled.div`
  ${gridCssRules}
  border: 1px solid blue;
`

const InternalDSGrid = memo(
  forwardRef<HTMLDivElement, DSGridProps>(({ children, ...rest }, ref) => (
    <StyledGrid ref={ref} {...rest}>
      {children}
    </StyledGrid> // ← pass the ref on
  )),
)

InternalDSGrid.displayName = 'DSGrid'

export const DSGrid = Object.assign(InternalDSGrid, {
  Cell: DSGridCell,
})

// Keyframes for animations
const shimmer = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 2rem;
`

const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 2rem;
  text-align: center;
`

const GridContainer = styled.div`
  width: 100%;
`

const ColumnsWrapper = styled.div<{ gap: number }>`
  display: flex;
  justify-content: center;
  gap: ${(props) => props.gap}px;
`

const Column = styled.div<{ gap: number; width: number }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap}px;
  width: ${(props) => props.width}px;
`

const ImageContainer = styled.div<{ width: number; height: number }>`
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  transition: transform 0.2s ease-out;

  &:hover {
    transform: scale(1.02);
  }
`

const SkeletonLoader = styled.div<{ isLoaded: boolean }>`
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  opacity: ${(props) => (props.isLoaded ? 0 : 1)};
  transition: opacity 0.3s ease;
`

const Image = styled.img<{ isLoaded: boolean }>`
  width: 100%;
  height: auto;
  border: 1px solid green;
  // opacity: ${(props) => (props.isLoaded ? 1 : 0)};
  // transition: opacity 0.5s ease;
`

// Masonry Image Component
const MasonryImage = ({
  src,
  width,
  height,
  alt,
  onLoad,
  columnWidth,
  author,
  downloadUrl,
}: {
  src: string
  width: number
  height: number
  alt: string
  onLoad: () => void
  columnWidth: number
  author: string
  downloadUrl: string
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.1,
      },
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleImageLoad = () => {
    setIsLoaded(true)
    if (onLoad) onLoad()
  }

  // Calculate aspect ratio for placeholder
  const aspectRatio = height / width
  const displayHeight = columnWidth * aspectRatio

  return (
    <ImageContainer ref={imgRef} width={columnWidth} height={displayHeight}>
      <SkeletonLoader isLoaded={isLoaded} />

      {isInView && (
        <PhotoTile
          src={src}
          width={width}
          height={height}
          alt={alt}
          author={author}
          downloadUrl={downloadUrl}
          onLoad={handleImageLoad}
          isLoaded={isLoaded}
        />
      )}
    </ImageContainer>
  )
}

// Main Masonry Component
export const MasonryGrid = ({
  images,
  gap = 16,
}: {
  images: Photo[]
  gap: number
}) => {
  const [columns, setColumns] = useState<Photo[][]>([])
  const [columnCount, setColumnCount] = useState(0)
  const [columnWidth, setColumnWidth] = useState(0)
  const containerRef = useRef(null)

  const calculateColumns = useCallback(() => {
    if (!containerRef.current) return

    const containerWidth = (containerRef.current as HTMLDivElement).offsetWidth
    const screenWidth = window.innerWidth

    let count = 3
    if (screenWidth < 576) count = 1
    else if (screenWidth < 992) count = 2

    setColumnCount((prev) => {
      if (prev !== count) {
        setColumns(Array.from({ length: count }, () => []))
      }
      return count
    })

    // Compute column width so items fit exactly including the gaps
    const computedWidth = Math.floor(
      (containerWidth - gap * (count - 1)) / count,
    )
    setColumnWidth(computedWidth)
  }, [gap])

  // Distribute images across columns
  useEffect(() => {
    if (columnCount === 0 || !images.length) return

    const newColumns: Photo[][] = Array.from({ length: columnCount }, () => [])
    const columnHeights = Array(columnCount).fill(0)

    images.forEach((image, index) => {
      // Find the shortest column
      const shortestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights),
      )

      // Add image to shortest column
      newColumns[shortestColumnIndex].push(image)

      // Update column height (approximate)
      const aspectRatio = image.height / image.width
      const imageHeight = columnWidth * aspectRatio
      columnHeights[shortestColumnIndex] += imageHeight + gap
    })

    setColumns(newColumns)
  }, [images, columnCount, columnWidth, gap])

  // Handle window resize
  useEffect(() => {
    calculateColumns()

    const handleResize = () => {
      calculateColumns()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [calculateColumns])

  // Handle image load (for potential reflow)
  const handleImageLoad = useCallback(() => {
    // Could trigger recalculation if needed
    // For now, we rely on pre-calculated dimensions
  }, [])

  return (
    <GridContainer ref={containerRef}>
      <ColumnsWrapper gap={gap}>
        {columns.map((column, columnIndex) => (
          <Column key={columnIndex} gap={gap} width={columnWidth}>
            {column.map((image: Photo) => (
              <MasonryImage
                key={image.id}
                src={image.download_url}
                width={image.width}
                height={image.height}
                alt={image.author}
                onLoad={handleImageLoad}
                columnWidth={columnWidth}
                author={image.author}
                downloadUrl={image.download_url}
              />
            ))}
          </Column>
        ))}
      </ColumnsWrapper>
    </GridContainer>
  )
}
