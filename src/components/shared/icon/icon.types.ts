import type { dynamicIconImports } from 'lucide-react/dynamic'
import type { SVGAttributes } from 'react'

type IconName = keyof typeof dynamicIconImports

export interface DSIconProps extends SVGAttributes<SVGSVGElement> {
  ariaLabel?: string
  color?: string
  name: IconName
  size?: number | string
}
