const { GraphQLServerLambda } = require('graphql-yoga')

const { Query } = require('./resolvers/query')
const { Mutation } = require('./resolvers/mutation')
const { db } = require('./db')

const createLambdaServer = () => {
  return new GraphQLServerLambda({
    typeDefs: 'src/schema.graphql',
    resolvers: {
      Query,
      Mutation
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    options: {
      debug: false
    },
    context: req => ({ ...req, db })
  })
}

module.exports = { createLambdaServer }
