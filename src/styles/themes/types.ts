import { color as COLOR } from '../tokens/color'
import { motion } from '../tokens/motion'
import { radius } from '../tokens/radius'
import { shadow } from '../tokens/shadow'
import { spacing } from '../tokens/spacing'

export type Mode = keyof typeof COLOR
export type ColorIntent = keyof (typeof COLOR)['light']

export type AppTheme = {
  mode: Mode
  colors: Record<ColorIntent, string>
  spacings: typeof spacing
  radius: typeof radius
  shadows: typeof shadow
  motions: typeof motion
}
