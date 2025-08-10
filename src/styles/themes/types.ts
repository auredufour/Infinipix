import { color as COLOR } from '../tokens/color'
import { motion } from '../tokens/motion'
import { radius } from '../tokens/radius'
import { shadow } from '../tokens/shadow'
import { spacing } from '../tokens/spacing'


export type Mode = keyof typeof COLOR
export type ColorIntent = keyof (typeof COLOR)['light']

export type AppTheme = {
  color: Record<ColorIntent, string>
  spacing: typeof spacing
  radius: typeof radius
  shadow: typeof shadow
  motion: typeof motion
}