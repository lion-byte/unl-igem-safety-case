export * from './diagram'
export * from './env'
export * from './lazyload'
export * from './text'
export * from './token'

/**
 * @param {number} ms
 * @returns {Promise<void>}
 */
export const sleep = (ms = 0) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
