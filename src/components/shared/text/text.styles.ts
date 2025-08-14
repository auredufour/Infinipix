import styled from 'styled-components'

import type { AppTheme } from '../../../styles/themes/types'

const getColor = (theme: AppTheme, color: keyof AppTheme['colors']) =>
  theme.colors[color] || theme.colors['emphasis-low-fg']

const getSize = (theme: AppTheme, size: keyof AppTheme['fontSize']) =>
  theme.fontSize[size] || theme.fontSize.body

const getWeight = (theme: AppTheme, weight: keyof AppTheme['fontWeight']) =>
  theme.fontWeight[weight] || theme.fontWeight.regular

export const SCText = styled.p<{
  $color: keyof AppTheme['colors']
  $size: keyof AppTheme['fontSize']
  $weight: keyof AppTheme['fontWeight']
}>`
  color: ${({ theme, $color }) => getColor(theme, $color)};
  font-size: ${({ theme, $size }) => getSize(theme, $size)};
  font-weight: ${({ theme, $weight }) => getWeight(theme, $weight)};
`
