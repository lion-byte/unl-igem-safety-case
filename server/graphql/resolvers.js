const { sign } = require('jsonwebtoken')

const { user } = require('../db')

const resolvers = {
  Query: {
    me: async (_, args, { user: userToken }) => {
      if (!userToken) {
        throw Error('You are not authenticated')
      }

      const account = await user.findByEmail(userToken.email)

      return account
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
          id: account.id,
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
          id: account.id,
          email: account.email
        },
        process.env.TOKEN_SECRET,
        { expiresIn: '1d' }
      )
    }
  }
}

module.exports = { resolvers }
