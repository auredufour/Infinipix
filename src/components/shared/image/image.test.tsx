import { renderWithTheme, screen } from '../../../../tests/test-utils'
import { DSImage } from './image.component'

describe('DSImage', () => {
  it('renders children', () => {
    renderWithTheme(
      <DSImage src="https://picsum.photos/200/300" alt="John Doe" />,
    )

    expect(screen.getByRole('img')).toBeTruthy()
  })

  it('renders with the correct alt', () => {
    renderWithTheme(
      <DSImage src="https://picsum.photos/200/300" alt="John Doe" />,
    )

    expect(screen.getByAltText('John Doe')).toBeTruthy()
  })

  it('renders with the correct src', () => {
    renderWithTheme(
      <DSImage src="https://picsum.photos/200/300" alt="John Doe" />,
    )

    const img = screen.getByRole('img')
    expect(img.getAttribute('src')).toBe('https://picsum.photos/200/300')
  })
})
