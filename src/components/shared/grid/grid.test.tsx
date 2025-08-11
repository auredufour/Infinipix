import { renderWithTheme, screen } from '../../../../tests/test-utils'
import { DSText } from '../text/text.component'
import { DSGridMansory } from './grid.component'

describe('DSGrid', () => {
  it('renders children', () => {
    renderWithTheme(
      <DSGridMansory
        data={[{ id: '1', text: 'Hello', width: 100, height: 100 }]}
        renderItem={(item) => <DSText>{item.text}</DSText>}
      />,
    )

    expect(screen.getByText('Hello')).toBeTruthy()
  })
})
