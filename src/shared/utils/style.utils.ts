import { css } from 'styled-components'

export const visuallyHiddenCssRules = css`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`

export const interactiveElementHover = (colorBg?: string) => css`
  &:hover {
    ${colorBg && `background-color: ${colorBg};`}
  }
`

export const interactiveElementFocusVisible = ({
  colorBg,
  colorOutline,
}: {
  colorBg?: string
  colorOutline?: string
}) => css`
  &:focus-visible {
    outline-offset: 2px;
    outline: 2px solid ${colorOutline || 'var(--colorOutline)'};

    ${colorBg && `background-color: ${colorBg};`}
  }
`

export const interactiveElementStyles = ({
  colorBg,
  colorOutline,
}: {
  colorBg?: string
  colorOutline?: string
}) => css`
  ${interactiveElementHover(colorBg)}
  ${interactiveElementFocusVisible({ colorBg, colorOutline })}
`

export const smoothTransition = css`
  transition: ${({ theme }) => theme.motions['transition-base']};
`
