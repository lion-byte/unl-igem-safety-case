const typeDefs = `
enum PermissionLevel {
  ADMIN
  USER
  GUEST
}

type Permissions {
  level: PermissionLevel!
  canRead: Boolean!
  canWrite: Boolean!
}

type User {
  username: String!
  email: String!
}

type Query {
  me: User
  permissions: Permissions!
}

type Mutation {
  register (username: String!, email: String!, password: String!): String
  login (email: String!, password: String!): String
}
`

module.exports = { typeDefs }
