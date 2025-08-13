import styled from 'styled-components'

import type { DSImageProps } from './image.types'

export const SCImageContainer = styled.div<{
  $aspectRatio?: number
  $borderRadius?: DSImageProps['borderRadius']
}>`
  border-radius: ${({ $borderRadius }) =>
    $borderRadius ? `${$borderRadius}px` : '0'};
  display: block;
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;

  ${({ $aspectRatio }) => $aspectRatio && `aspect-ratio: ${$aspectRatio};`}
`

export const SCImage = styled.img<{
  $aspectRatio?: number
  $borderRadius?: DSImageProps['borderRadius']
  $isLoaded?: DSImageProps['isLoaded']
}>`
  border-radius: ${({ $borderRadius }) =>
    $borderRadius ? `${$borderRadius}px` : '0'};
  display: block;
  height: 100%;
  object-fit: cover;
  width: 100%;

  opacity: ${({ $isLoaded }) => ($isLoaded ? 1 : 0)};
  transition: opacity 0.3s ease-out;
`

export const SCErrorFallback = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors['emphasis-low-bg']};
  color: ${({ theme }) => theme.colors['emphasis-medium-fg']};
  display: flex;
  font-size: ${({ theme }) => theme.fontSize.sm};
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`
