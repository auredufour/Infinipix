export interface DSGridMasonryProps<
  T extends { id: string; width: number; height: number },
> {
  data: T[]
  gap?: number
  /**
   * Render callback for each item. Receives the item and computed column width
   * so the caller can size its content appropriately.
   */
  renderItem: (item: T, columnWidth: number) => React.ReactNode
}
