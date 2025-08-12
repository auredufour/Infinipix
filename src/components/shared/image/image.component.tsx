import styled from 'styled-components'

import { imageCssRules } from './image.styles'
import type { DSImageProps } from './image.types'

const StyledImage = styled.img.withConfig({
  shouldForwardProp: (prop) => !['borderRadius'].includes(prop),
})<DSImageProps>`
  ${imageCssRules}
`

export const DSImage = ({
  alt = '',
  borderRadius,
  fetchPriority,
  height,
  isLoaded,
  loading = 'lazy',
  onLoad,
  sizes,
  src,
  srcSet,
  width,
  ...rest
}: DSImageProps) => {
  return (
    <StyledImage
      alt={alt}
      borderRadius={borderRadius}
      decoding="auto"
      height={height}
      loading={loading}
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      fetchPriority={fetchPriority}
      onLoad={onLoad}
      isLoaded={isLoaded}
      {...rest}
    />
  )
}

DSImage.displayName = 'DSImage'
