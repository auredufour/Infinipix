import type { HTMLAttributes, LiHTMLAttributes, PropsWithChildren } from 'react'

export interface DSMenuProps extends PropsWithChildren {
  label?: string | React.ReactNode
  onClick?: () => void
}

export interface DSMenuItemProps
  extends PropsWithChildren,
    LiHTMLAttributes<HTMLLIElement> {
  href: string
}

export interface DSMenuListProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLUListElement> {
  menuId: string
}
