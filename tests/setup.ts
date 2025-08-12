import '@testing-library/jest-dom'
import 'jest-styled-components'

// Mock IntersectionObserver for all tests
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: class {
    observe = jest.fn()
    unobserve = jest.fn()
    disconnect = jest.fn()
  },
})

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: class {
    observe = jest.fn()
    unobserve = jest.fn()
    disconnect = jest.fn()
  },
})
