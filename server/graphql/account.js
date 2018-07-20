const { gql, makeExecutableSchema } = require('apollo-server-express')
const { sign } = require('jsonwebtoken')

const { user } = require('../db')

const typeDefs = gql`
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
    register(username: String!, email: String!, password: String!): String
    login(email: String!, password: String!): String
  }
`

const resolvers = {
  PermissionLevel: {
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'guest'
  },

  Query: {
    me: async (_, args, { user: userToken }) => {
      if (!userToken) {
        return null
      }

      const account = await user.findById(userToken.id)

      return account
    },

    permissions: async (_, args, { user: userToken }) => {
      const guestPermissions = {
        level: 'guest',
        canRead: true,
        canWrite: false
      }

      if (!userToken) {
        return guestPermissions
      }

      const account = await user.findById(userToken.id)

      if (account === null) {
        return guestPermissions
      }

      return account.permissions
    }
  },

  Mutation: {
    register: async (_, { username, email, password }) => {
      const success = await user.register(username, email, password)

      if (!success) {
        throw Error('Email already in use')
      }

      const account = await user.findByEmail(email)

      return sign(
        {
          id: account._id,
          email: account.email
        },
        process.env.TOKEN_SECRET,
        { expiresIn: '1y' }
      )
    },

    login: async (_, { email, password }) => {
      const { isValid, account } = await user.validate(email, password)

      if (!isValid) {
        throw Error('Email/Password is incorrect')
      }

      return sign(
        {
          id: account._id,
          email: account.email
        },
        process.env.TOKEN_SECRET,
        { expiresIn: '1y' }
      )
    }
  }
}

const accountSchema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = { accountSchema }
