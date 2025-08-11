import { renderWithTheme, screen } from '../../../../tests/test-utils.tsx'
import { DSText } from './text.component'

describe('DSText', () => {
  it('renders children', () => {
    renderWithTheme(<DSText>Hello</DSText>)

    expect(screen.getByText('Hello')).toBeTruthy()
  })
})
