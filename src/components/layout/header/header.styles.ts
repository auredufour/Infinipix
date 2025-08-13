import { css } from 'styled-components'

export const headerContainerCssRules = css`
  border-bottom: 1px solid ${({ theme }) => theme.colors['outline']};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: ${({ theme }) => theme.colors['app-bg']};
`

export const headerCssRules = css`
  --header-height: 80px;

  align-items: center;
  color: ${({ theme }) => theme.colors['emphasis-high-fg']};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${({ theme }) =>
    `${theme.spacings['12']} ${theme.spacings['page-gutter']}`};
  min-height: var(--header-height);
  max-width: ${({ theme }) => theme.spacings['content-max-width']};
  margin: 0 auto;
`

export const headerMenuCssRules = css`
  @media (min-width: 768px) {
    display: none;
  }
`
export const headerNavListCssRules = css`
  column-gap: ${({ theme }) => theme.spacings['element-gap-lg']};
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    display: none;
  }
`

export const headerLogoCssRules = css`
  height: 40px;
`
