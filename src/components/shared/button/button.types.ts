import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

export interface DSButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  accessoryLeft?: React.ReactNode
  accessoryRight?: React.ReactNode
  variant?: 'plain' | 'high' | 'medium' | 'low' | 'highlight'
}
