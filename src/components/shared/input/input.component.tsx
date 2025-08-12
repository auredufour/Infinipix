import { forwardRef, useId } from 'react'
import styled from 'styled-components'

import type { DSInputProps } from './input.types'

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Label = styled.label<{ $state?: 'invisible' | 'visible' }>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors['strong-fg']};
  margin-bottom: ${({ theme }) => theme.spacings[8]};

  ${({ $state }) =>
    $state === 'invisible' &&
    `
    border: 0;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  `}
`

const InputContainer = styled.div<{
  $hasAccessoryLeft: boolean
  $hasAccessoryRight: boolean
  $hasIconLeft: boolean
  $hasIconRight: boolean
  $size: DSInputProps['size']
  $variant: DSInputProps['variant']
}>`
  align-items: center;
  background-color: ${({ theme }) => theme.colors['surface-bg']};
  border-radius: ${({ theme }) => theme.radius.surface};
  border: 2px solid ${({ theme }) => theme.colors['surface-bg']};
  display: flex;
  position: relative;
  transition:
    border-color 0.2s ease,
    color 0.2s ease;
  width: 100%;

  ${({ $size }) => {
    const sizeMap = {
      small: '40px',
      medium: '48px',
      large: '56px',
    }
    return `min-height: ${sizeMap[$size || 'medium']};`
  }}

  &:hover, &:focus-within {
    border-color: ${({ theme }) => theme.colors['strong-fg']};

    svg {
      color: ${({ theme }) => theme.colors['strong-fg']};
    }
  }

  ${({ $variant }) => {
    if ($variant === 'error') {
      return `
        border-color: #ef4444;
      `
    }

    return ''
  }}
`

const StyledInput = styled.input<{
  $hasAccessoryLeft: boolean
  $hasAccessoryRight: boolean
  $hasIconLeft: boolean
  $hasIconRight: boolean
  $size: DSInputProps['size']
  $variant: DSInputProps['variant']
}>`
  background: transparent;
  border: 0;
  color: ${({ theme }) => theme.colors['strong-fg']};
  flex: 1;
  font-family: inherit;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  outline: none;

  ${({ $size }) => {
    const sizeMap = {
      small: { padding: '8px 12px', fontSize: 'sm' },
      medium: { padding: '12px 16px', fontSize: 'md' },
      large: { padding: '16px 20px', fontSize: 'lg' },
    }
    const size = sizeMap[$size || 'medium']
    return `
      padding: ${size.padding};
    `
  }}

  ${({ $size, theme }) => {
    const fontSizeMap = {
      small: theme.fontSize.sm,
      medium: theme.fontSize.md,
      large: theme.fontSize.lg,
    }
    return `font-size: ${fontSizeMap[$size || 'medium']};`
  }}
  
  ${({ $hasIconLeft, $hasAccessoryLeft, $size }) => {
    if (!$hasIconLeft && !$hasAccessoryLeft) return ''
    const paddingMap = {
      small: $hasAccessoryLeft ? '8px' : '40px',
      medium: $hasAccessoryLeft ? '8px' : '48px',
      large: $hasAccessoryLeft ? '12px' : '56px',
    }
    return `padding-left: ${paddingMap[$size || 'medium']};`
  }}
  
  ${({ $hasIconRight, $hasAccessoryRight, $size }) => {
    if (!$hasIconRight && !$hasAccessoryRight) return ''
    const paddingMap = {
      small: $hasAccessoryRight ? '8px' : '40px',
      medium: $hasAccessoryRight ? '8px' : '48px',
      large: $hasAccessoryRight ? '12px' : '56px',
    }
    return `padding-right: ${paddingMap[$size || 'medium']};`
  }}

  &::placeholder {
    color: ${({ theme }) => theme.colors['soft-fg']};
  }
`

const IconWrapper = styled.div<{
  $position: 'left' | 'right'
  $size: DSInputProps['size']
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors['soft-fg']};
  pointer-events: none;
  z-index: 1;

  ${({ $position, $size }) => {
    const offsetMap = {
      small: '12px',
      medium: '16px',
      large: '20px',
    }
    const offset = offsetMap[$size || 'medium']
    return $position === 'left' ? `left: ${offset};` : `right: ${offset};`
  }}
`

const AccessoryWrapper = styled.div<{
  $position: 'left' | 'right'
  $size: DSInputProps['size']
}>`
  display: flex;
  align-items: center;

  ${({ $position, $size }) => {
    const paddingMap = {
      small: '8px',
      medium: '12px',
      large: '16px',
    }
    const padding = paddingMap[$size || 'medium']
    return $position === 'left'
      ? `padding-left: ${padding}; padding-right: 4px;`
      : `padding-right: ${padding}; padding-left: 4px;`
  }}
`

const MessageText = styled.div<{ $variant?: 'hint' | 'error' | 'success' }>`
  font-size: ${({ theme }) => theme.fontSize.xs};
  margin-top: 4px;

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'error':
        return `color: #ef4444;`
      default:
        return `color: ${theme.colors['soft-fg']};`
    }
  }}
`

// ============================================================================
// COMPONENT
// ============================================================================

export const DSInput = forwardRef<HTMLInputElement, DSInputProps>(
  (
    {
      iconLeft,
      iconRight,
      accessoryLeft,
      accessoryRight,
      size = 'medium',
      variant = 'default',
      className,
      label,
      hideLabel = false,
      hint,
      errorMessage,
      successMessage,
      ...props
    },
    ref,
  ) => {
    const id = useId()

    const message = errorMessage || successMessage || hint
    const messageVariant = errorMessage
      ? 'error'
      : successMessage
        ? 'success'
        : 'hint'

    const effectiveVariant = errorMessage
      ? 'error'
      : successMessage
        ? 'success'
        : variant

    return (
      <InputWrapper className={className}>
        <Label htmlFor={id} $state={hideLabel ? 'invisible' : 'visible'}>
          {label}
        </Label>

        <InputContainer
          $hasAccessoryLeft={!!accessoryLeft}
          $hasAccessoryRight={!!accessoryRight}
          $hasIconLeft={!!iconLeft}
          $hasIconRight={!!iconRight}
          $size={size}
          $variant={effectiveVariant}
        >
          {accessoryLeft && (
            <AccessoryWrapper $position="left" $size={size}>
              {accessoryLeft}
            </AccessoryWrapper>
          )}

          {iconLeft && !accessoryLeft && (
            <IconWrapper $position="left" $size={size}>
              {iconLeft}
            </IconWrapper>
          )}

          <StyledInput
            id={id}
            ref={ref}
            $size={size}
            $variant={effectiveVariant}
            $hasIconLeft={!!iconLeft}
            $hasIconRight={!!iconRight}
            $hasAccessoryLeft={!!accessoryLeft}
            $hasAccessoryRight={!!accessoryRight}
            {...props}
          />

          {iconRight && !accessoryRight && (
            <IconWrapper $position="right" $size={size}>
              {iconRight}
            </IconWrapper>
          )}

          {accessoryRight && (
            <AccessoryWrapper $position="right" $size={size}>
              {accessoryRight}
            </AccessoryWrapper>
          )}
        </InputContainer>

        {message && (
          <MessageText $variant={messageVariant}>{message}</MessageText>
        )}
      </InputWrapper>
    )
  },
)

DSInput.displayName = 'DSInput'
