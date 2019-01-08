export { exportAsPNG, exportAsSVG } from './diagram'
export { isProduction } from './env'

/**
 * @param {number} ms
 * @returns {Promise<void>}
 */
export const sleep = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms))
