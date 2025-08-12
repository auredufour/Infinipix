import type { dynamicIconImports } from 'lucide-react/dynamic'
import type { SVGAttributes } from 'react'

type IconName = keyof typeof dynamicIconImports

export interface DSIconProps extends SVGAttributes<SVGSVGElement> {
  name: IconName
  size?: number | string
  ariaLabel?: string
}
