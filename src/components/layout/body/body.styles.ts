import { css } from 'styled-components'

export const bodyCssRules = css`
  --header-height: 80px;

  max-width: ${({ theme }) => theme.spacings['content-max-width']};
  padding: 0 ${({ theme }) => theme.spacings['page-gutter']}
    ${({ theme }) => theme.spacings['section-gap']};
  margin: ${({ theme }) =>
    `calc(var(--header-height) + ${theme.spacings['page-gutter']}) auto 0`};
`

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
