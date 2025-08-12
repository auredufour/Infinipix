import styled from 'styled-components'

import type { DSImageProps } from './image.types'

type TransientImageProps = Omit<DSImageProps, 'borderRadius' | 'isLoaded'> & {
  $borderRadius?: DSImageProps['borderRadius']
  $isLoaded?: DSImageProps['isLoaded']
}

export const SCImage = styled.img<TransientImageProps>`
  border-radius: ${({ $borderRadius }) => $borderRadius || '0'};
  display: block;
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height || 'auto'};
  width: ${({ width }) =>
    typeof width === 'number' ? `${width}px` : width || '100%'};
  opacity: ${({ $isLoaded }) => ($isLoaded ? 1 : 0)};
  transition: opacity 0.3s ease-out;
`
