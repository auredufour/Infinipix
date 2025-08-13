import styled from 'styled-components'

import type { AppTheme } from '../../../styles/themes/types'
import type { DSTextProps } from './text.types'

const getColor = (theme: AppTheme, color?: keyof AppTheme['colors']) => {
  return color && Object.prototype.hasOwnProperty.call(theme.colors, color)
    ? theme.colors[color as keyof typeof theme.colors]
    : theme.colors['emphasis-low-fg']
}

const getSize = (theme: AppTheme, size?: keyof AppTheme['fontSize']) => {
  const sizeMap = theme?.fontSize
  return size && size in sizeMap
    ? sizeMap[size as keyof typeof sizeMap]
    : sizeMap.body
}

const getWeight = (theme: AppTheme, weight?: keyof AppTheme['fontWeight']) => {
  const weightMap = theme?.fontWeight
  return weight && weight in weightMap
    ? weightMap[weight as keyof typeof weightMap]
    : weightMap.regular
}

export const SCText = styled.p.withConfig({
  shouldForwardProp: (prop) =>
    !['color', 'size', 'weight'].includes(prop as string),
})<DSTextProps>`
  color: ${({ theme, color }) => getColor(theme, color)};
  font-size: ${({ theme, size }) => getSize(theme, size)};
  font-weight: ${({ theme, weight }) => getWeight(theme, weight)};
`
