import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

export interface DSButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  variant?: 'plain' | 'high-emphasis' | 'low-emphasis'
}
