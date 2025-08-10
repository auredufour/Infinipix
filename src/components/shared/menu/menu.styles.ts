import { css } from 'styled-components'

export const menuListCssRules = css`
  background-color: ${({ theme }) => theme.colors['app-bg']};
  border-radius: ${({ theme }) => theme.radius.surface};
  box-shadow: ${({ theme }) => theme.shadows.overlay};
  margin-top: ${({ theme }) => -theme.spacings[8]};
  padding: ${({ theme }) => theme.spacings[12]}
    ${({ theme }) => theme.spacings[16]};
  position: absolute;
  right: ${({ theme }) => theme.spacings[12]};
  z-index: 110;
`
