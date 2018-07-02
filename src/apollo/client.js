import ApolloClient from 'apollo-boost'

import { isProduction } from '../utils'

export const client = new ApolloClient({
  uri: isProduction() ? undefined : 'localhost:3000/graphql'
})
