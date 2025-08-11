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
  height,
  src,
  width,
  onLoad,
  isLoaded,
}: DSImageProps) => {
  return (
    <StyledImage
      alt={alt}
      borderRadius={borderRadius}
      decoding="async"
      height={height}
      loading="lazy"
      src={src}
      width={width}
      onLoad={onLoad}
      isLoaded={isLoaded}
    />
  )
}

DSImage.displayName = 'DSImage'
