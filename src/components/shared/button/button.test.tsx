import {
  fireEvent,
  renderWithTheme,
  screen,
} from '../../../../tests/test-utils'
import { DSButton } from './button.component'

describe('renders children', () => {
  it('should render', () => {
    const mockOnClick = jest.fn()
    renderWithTheme(<DSButton onClick={mockOnClick}>Hello</DSButton>)

    expect(screen.getByText('Hello')).toBeTruthy()
  })

  it('should call onClick when clicked', () => {
    const mockOnClick = jest.fn()
    renderWithTheme(<DSButton onClick={mockOnClick}>Hello</DSButton>)

    fireEvent.click(screen.getByText('Hello'))
    expect(mockOnClick).toHaveBeenCalled()
  })
})
