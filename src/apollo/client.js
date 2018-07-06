import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { isProduction } from '../utils'

const uri = isProduction() ? undefined : 'http://localhost:3000/graphql'

const httpLink = createHttpLink({ uri })

const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem('token')

  return {
    headers: {
      ...headers,
      authorization: token !== null ? `Bearer ${token}` : ''
    }
  }
})

// @ts-ignore
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})
