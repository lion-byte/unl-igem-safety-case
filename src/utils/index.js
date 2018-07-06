export const isProduction = () => process.env.NODE_ENV === 'production'

export const setToken = token => window.localStorage.setItem('token', token)
export const getToken = () => window.localStorage.getItem('token')
export const removeToken = () => window.localStorage.removeItem('token')
