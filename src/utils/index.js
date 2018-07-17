export * from './diagram'
export * from './lazyload'
export * from './token'

export const isProduction = () => process.env.NODE_ENV === 'production'

/**
 * @param {number} ms
 * @returns {Promise<void>}
 */
export const sleep = (ms = 0) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
