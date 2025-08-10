import {
  fireEvent,
  renderWithTheme,
  screen,
} from '../../../../tests/test-utils'
import { DSLink } from './link.component'

describe('DSLink', () => {
  it('should render', () => {
    renderWithTheme(<DSLink href="/">Hello</DSLink>)

    expect(screen.getByText('Hello')).toBeTruthy()
  })

  it('should navigate to the href when clicked', () => {
    renderWithTheme(<DSLink href="/">Hello</DSLink>)

    fireEvent.click(screen.getByText('Hello'))
    expect(window.location.pathname).toBe('/')
  })
})
