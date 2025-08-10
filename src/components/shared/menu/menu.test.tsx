import {
  fireEvent,
  renderWithTheme,
  screen,
} from '../../../../tests/test-utils'
import { DSMenu } from './menu.component'

describe('DSMenu', () => {
  it('renders children', () => {
    renderWithTheme(<DSMenu>Hello</DSMenu>)
    expect(screen.getByText('Hello')).toBeTruthy()
  })

  it('does not render a menu on initial render', () => {
    renderWithTheme(<DSMenu>Hello</DSMenu>)

    expect(screen.queryByRole('menu')).toBeFalsy()
  })

  it('renders a menu on click', () => {
    renderWithTheme(<DSMenu>Hello</DSMenu>)
    fireEvent.click(screen.getByRole('button', { name: 'Hello' }))

    expect(screen.getByRole('menu')).toBeTruthy()
  })

  it('renders a menu item on click', () => {
    renderWithTheme(<DSMenu>Hello</DSMenu>)
    fireEvent.click(screen.getByRole('button', { name: 'Hello' }))

    expect(screen.getByRole('link', { name: 'Home' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'About' })).toBeTruthy()
  })
})
