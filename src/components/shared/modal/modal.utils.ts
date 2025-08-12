import type { Ref, RefObject } from 'react'

/**
 * Utility to compose multiple React refs (object or callback) into a single ref callback.
 * Keeps typings strict while still accepting `undefined` refs.
 */
export const composedRefs = <T>(...refs: Array<Ref<T> | undefined>) => {
  return (node: T | null) => {
    refs.forEach((ref) => {
      if (!ref) return

      if (typeof ref === 'function') {
        ref(node)
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - overriding readonly to allow ref assignment
        ;(ref as RefObject<T | null>).current = node
      }
    })
  }
}
