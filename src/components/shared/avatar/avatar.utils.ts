export const noop = () => {}

export const getInitials = (name?: string) => {
  if (!name) return ''
  const words = name.trim().split(/\s+/)
  const initials = words
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')

  return initials
}
