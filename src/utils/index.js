export const isProduction = () => process.env.NODE_ENV === 'production'

export const getToken = () => window.localStorage.getItem('token')

export const setToken = token => window.localStorage.setItem('token', token)
