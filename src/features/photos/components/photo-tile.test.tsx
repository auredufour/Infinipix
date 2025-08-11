import userEvent from '@testing-library/user-event'

import { renderWithTheme, screen } from '../../../../tests/test-utils'
import { PhotoTile } from './photo-tile.component'

describe('PhotoTile', () => {
  it('should render', async () => {
    renderWithTheme(
      <PhotoTile
        src="https://picsum.photos/200/300"
        width={200}
        author="John Doe"
        downloadUrl="https://picsum.photos/200/300"
      />,
    )

    expect(await screen.findByRole('img')).toBeTruthy()
  })

  it('should not render the download button when the image is not hovered', async () => {
    renderWithTheme(
      <PhotoTile
        src="https://picsum.photos/200/300"
        width={200}
        author="John Doe"
        downloadUrl="https://picsum.photos/200/300"
      />,
    )

    expect(screen.queryByRole('button', { name: 'Download' })).toBeFalsy()
  })

  it('should render the download button when the image is hovered', async () => {
    renderWithTheme(
      <PhotoTile
        src="https://picsum.photos/200/300"
        width={200}
        author="John Doe"
        downloadUrl="https://picsum.photos/200/300"
      />,
    )

    await userEvent.hover(screen.getByRole('figure'))

    expect(await screen.findByRole('button', { name: 'Download' })).toBeTruthy()
  })

  it('should render the author name when the image is hovered', async () => {
    renderWithTheme(
      <PhotoTile
        src="https://picsum.photos/200/300"
        width={200}
        author="John Doe"
        downloadUrl="https://picsum.photos/200/300"
      />,
    )

    await userEvent.hover(screen.getByRole('figure'))

    expect(await screen.findByText('John Doe')).toBeTruthy()
  })
})
