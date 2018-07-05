const typeDefs = `
type User {
  username: String!
  email: String!
}

type Query {
  me: User
}

type Mutation {
  register (username: String!, email: String!, password: String!): String
  login (email: String!, password: String!): String
}
`

module.exports = { typeDefs }
