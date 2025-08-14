import styled from 'styled-components'

export { visuallyHiddenCssRules } from '../../../shared/utils/style.utils'

export const SCBodyContainer = styled.main`
  --header-height: 80px;

  max-width: ${({ theme }) => theme.spacings['content-max-width']};
  padding: ${({ theme }) => theme.spacings['section-gap']};
  margin: ${({ theme }) =>
    `calc(var(--header-height) + ${theme.spacings['page-gutter']}) auto 0`};
`
