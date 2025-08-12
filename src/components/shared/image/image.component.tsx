import { SCImage } from './image.styles'
import type { DSImageProps } from './image.types'

export const DSImage = ({
  alt = '',
  borderRadius,
  fetchPriority,
  height,
  isLoaded,
  loading = 'lazy',
  onLoad,
  src,
  srcSet,
  width,
  ...props
}: DSImageProps) => {
  return (
    <SCImage
      $borderRadius={borderRadius}
      $isLoaded={isLoaded}
      alt={alt}
      decoding="auto"
      fetchPriority={fetchPriority}
      height={height}
      loading={loading}
      onLoad={onLoad}
      src={src}
      srcSet={srcSet}
      width={width}
      {...props}
    />
  )
}

DSImage.displayName = 'DSImage'
