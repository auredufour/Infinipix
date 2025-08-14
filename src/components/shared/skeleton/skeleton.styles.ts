import styled, { css, keyframes } from 'styled-components'

import type { DSSkeletonProps } from './skeleton.types'

const modernShimmer = keyframes`
  0% {
    transform: translate3d(-100%, 0, 0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate3d(100%, 0, 0);
    opacity: 0;
  }
`

const breathe = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.02);
  }
`

const modernPulse = keyframes`
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.8;
  }
`

export const SCSkeletonLoader = styled.div<{
  $height?: DSSkeletonProps['height']
  $state: DSSkeletonProps['state']
  $width?: DSSkeletonProps['width']
}>`
  ${({ $height }) =>
    $height &&
    `height: ${typeof $height === 'number' ? `${$height}px` : $height};`}
  ${({ $width }) =>
    $width && `width: ${typeof $width === 'number' ? `${$width}px` : $width};`}
  
  /* ✨ MODERN: Subtle rounded corners and modern background */
  background: ${({ theme }) => theme.colors['surface-bg']};
  border-radius: 8px;
  inset: 0;
  opacity: ${({ $state }) => ($state === 'loading' ? 1 : 0)};
  overflow: hidden;
  pointer-events: none;
  position: absolute;

  /* ✨ PERFORMANCE: Layer promotion and hardware acceleration */
  transform: translateZ(0);
  will-change: opacity;
  contain: layout style paint;
  content-visibility: auto;

  /* ✨ MODERN: Smooth spring-like transition */
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;

  /* ✨ MODERN: Base gradient overlay */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;

    /* ✨ MODERN: Contemporary gradient with multiple stops */
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${({ theme }) => `${theme.colors['outline']}15`} 25%,
      ${({ theme }) => `${theme.colors['outline']}30`} 50%,
      ${({ theme }) => `${theme.colors['outline']}15`} 75%,
      transparent 100%
    );

    /* ✨ PERFORMANCE: Hardware acceleration */
    transform: translateZ(0);
    will-change: transform, opacity;
    contain: layout style paint;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 100%;
    border-radius: inherit;

    /* ✨ MODERN: Sophisticated shimmer gradient */
    background: linear-gradient(
      90deg,
      transparent 0%,
      transparent 40%,
      ${({ theme }) => `${theme.colors['emphasis-high-fg']}08`} 45%,
      ${({ theme }) => `${theme.colors['emphasis-high-fg']}20`} 50%,
      ${({ theme }) => `${theme.colors['emphasis-high-fg']}08`} 55%,
      transparent 60%,
      transparent 100%
    );

    /* ✨ MODERN: Smooth, contemporary animation */
    animation: ${({ $state }) =>
      $state === 'loading'
        ? css`
            ${modernShimmer} 2s cubic-bezier(0.4, 0, 0.2, 1) infinite
          `
        : 'none'};

    /* ✨ PERFORMANCE: Hardware acceleration */
    transform: translateZ(0);
    will-change: transform, opacity;
    contain: layout style paint;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: ${({ $state }) =>
        $state === 'loading'
          ? css`
              ${breathe} 3s cubic-bezier(0.4, 0, 0.2, 1) infinite
            `
          : 'none'};
    }
  }

  @media (max-width: 768px) {
    &::after {
      animation: ${({ $state }) =>
        $state === 'loading'
          ? css`
              ${modernPulse} 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite
            `
          : 'none'};
    }
  }

  @media (prefers-color-scheme: dark) {
    &::before {
      background: linear-gradient(
        90deg,
        transparent 0%,
        ${({ theme }) => `${theme.colors['outline']}20`} 25%,
        ${({ theme }) => `${theme.colors['outline']}40`} 50%,
        ${({ theme }) => `${theme.colors['outline']}20`} 75%,
        transparent 100%
      );
    }

    &::after {
      background: linear-gradient(
        90deg,
        transparent 0%,
        transparent 40%,
        ${({ theme }) => `${theme.colors['emphasis-high-fg']}15`} 45%,
        ${({ theme }) => `${theme.colors['emphasis-high-fg']}35`} 50%,
        ${({ theme }) => `${theme.colors['emphasis-high-fg']}15`} 55%,
        transparent 60%,
        transparent 100%
      );
    }
  }
`
