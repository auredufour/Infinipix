import { DynamicIcon } from 'lucide-react/dynamic'

import type { DSIconProps } from './icon.types'

export const DSIcon = ({
  name,
  size = 24,
  ariaLabel,
  ...props
}: DSIconProps) => {
  const accessibilityProps = ariaLabel
    ? { role: 'img', 'aria-hidden': false }
    : { 'aria-hidden': true }

  return (
    <DynamicIcon
      name={name}
      width={size}
      height={size}
      {...props}
      {...accessibilityProps}
    />
  )
}

DSIcon.displayName = 'DSIcon'
