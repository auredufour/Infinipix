import '@testing-library/jest-dom'

import userEvent from '@testing-library/user-event'

import { renderWithTheme, screen } from '../../../../../tests/test-utils'
import { PhotoCard } from './photo-card.component'
import { PhotoCardContent } from './subcomponents/photo-card-content.component'

// Mock photo props
const defaultProps = {
  id: 'test-photo-1',
  src: 'https://picsum.photos/200/300',
  width: 200,
  height: 300,
  author: 'John Doe',
  downloadUrl: 'https://picsum.photos/200/300',
  alt: 'Test photo',
  columnWidth: 250,
}

describe('PhotoCard', () => {
  it('should render skeleton initially', () => {
    renderWithTheme(<PhotoCard {...defaultProps} />)

    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
  })
})

describe('PhotoCardContent', () => {
  const contentProps = {
    ...defaultProps,
    isLoaded: true,
    onLoad: jest.fn(),
    onOpen: jest.fn(),
  }

  it('should render image and author name', () => {
    renderWithTheme(<PhotoCardContent {...contentProps} />)

    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('should render download button', async () => {
    renderWithTheme(<PhotoCardContent {...contentProps} />)

    await userEvent.hover(screen.getByRole('figure'))
    expect(screen.getByRole('button', { name: 'Download' })).toBeInTheDocument()
  })

  it('should call onOpen when image is clicked', async () => {
    const onOpen = jest.fn()
    renderWithTheme(<PhotoCardContent {...contentProps} onOpen={onOpen} />)

    const trigger = screen.getByRole('button', {
      name: 'Open preview: Test photo',
    })
    await userEvent.click(trigger)

    expect(onOpen).toHaveBeenCalled()
  })
})
