export * from './diagram'
export * from './lazyload'
export * from './token'

export const isProduction = () => process.env.NODE_ENV === 'production'
