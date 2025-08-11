import { color as COLOR } from '../tokens/color'
import { motion } from '../tokens/motion'
import { radius } from '../tokens/radius'
import { shadow } from '../tokens/shadow'
import { spacing } from '../tokens/spacing'
import typography from '../tokens/typography'
import type { AppTheme } from './types'

export const lightTheme: AppTheme = {
  mode: 'light',
  colors: COLOR.light,
  motions: motion,
  radius: radius,
  shadows: shadow,
  spacings: spacing,
  fontSize: typography.fontSize,
  fontWeight: typography.fontWeight,
}
