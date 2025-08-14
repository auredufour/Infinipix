export interface DSGridMasonryProps<
  T extends { id: string; width: number; height: number },
> {
  data: T[]
  gap?: number
  renderItem: (item: T, columnWidth: number) => React.ReactNode
}
