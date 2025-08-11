import type { PropsWithChildren } from 'react'

export interface DSGridProps extends PropsWithChildren {
  id?: string
}

export interface GridCellProps extends PropsWithChildren {
  height?: number
}
