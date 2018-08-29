export { exportAsPNG, exportAsSVG } from './diagram'
export { isProduction } from './env'
export { asyncComponent, asyncPage } from './lazyload'
export { renderMd } from './text'
export { getToken, removeToken, setToken } from './token'

/**
 * @param {number} ms
 * @returns {Promise<void>}
 */
export const sleep = (ms = 0) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
