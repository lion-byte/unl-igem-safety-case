import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { concat } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { isProduction, getToken } from '../utils'

const uri = isProduction() ? undefined : 'http://localhost:3000/graphql'

const httpLink = new HttpLink({ uri })

const authLink = setContext((_, { headers }) => {
  const token = getToken()

  return {
    headers: {
      ...headers,
      authorization: typeof token === 'string' ? `Bearer ${token}` : ''
    }
  }
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  // @ts-ignore
  link: concat(authLink, httpLink)
})
