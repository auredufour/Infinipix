import type { InputHTMLAttributes } from 'react'

export interface DSInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  accessoryLeft?: React.ReactNode
  accessoryRight?: React.ReactNode
  size?: 'small' | 'medium' | 'large'
  variant?: 'default' | 'error'
  isLoading?: boolean
  label?: string
  hideLabel?: boolean
  hint?: string
}
