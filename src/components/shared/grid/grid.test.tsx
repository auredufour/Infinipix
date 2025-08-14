import { renderWithTheme, screen } from '../../../../tests/test-utils'
import { DSText } from '../text/text.component'
import { DSGridMasonry } from './grid.component'
import {
  calculateColumnWidth,
  createEmptyColumns,
  distributeItems,
  getColumnCount,
} from './grid.utils'

describe('DSGrid', () => {
  it('renders children', () => {
    renderWithTheme(
      <DSGridMasonry
        data={[{ id: '1', text: 'Hello', width: 100, height: 100 }]}
        renderItem={(item) => <DSText>{item.text}</DSText>}
      />,
    )

    expect(screen.getByText('Hello')).toBeTruthy()
  })
})

describe('utils', () => {
  describe('getColumnCount', () => {
    it('should return the correct number of columns', () => {
      expect(getColumnCount(1000)).toBe(3)
    })
  })

  describe('createEmptyColumns', () => {
    it('should return the correct number of columns', () => {
      expect(createEmptyColumns(3)).toEqual([[], [], []])
    })
  })

  describe('calculateColumnWidth', () => {
    it('should return the correct column width', () => {
      expect(calculateColumnWidth(950, 3, 24)).toBeCloseTo(300, 2)
    })
  })

  describe('distributeItems', () => {
    const items = [
      { id: '1', text: 'Hello', width: 100, height: 200 },
      { id: '2', text: 'World', width: 100, height: 100 },
      { id: '3', text: 'Hello', width: 100, height: 100 },
      { id: '4', text: 'World', width: 100, height: 100 },
    ]
    it('should return the correct number of columns', () => {
      expect(distributeItems(items, 3, 300, 24)).toEqual([
        [{ id: '1', text: 'Hello', width: 100, height: 200 }],
        [
          { id: '2', text: 'World', width: 100, height: 100 },
          { id: '4', text: 'World', width: 100, height: 100 },
        ],
        [{ id: '3', text: 'Hello', width: 100, height: 100 }],
      ])
    })
  })
})
