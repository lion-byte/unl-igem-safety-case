const { ApolloServer } = require('apollo-server-express')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const jwt = require('express-jwt')
const logger = require('morgan')

const { schema } = require('./graphql')

const app = express()

const auth = jwt({
  credentialsRequired: false,
  secret: process.env.TOKEN_SECRET
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(auth)

const server = new ApolloServer({
  schema,

  context: ({ req }) => ({
    user: req.user
  }),

  playground: {
    settings: {
      'editor.theme': 'light'
    }
  }
})

server.applyMiddleware({
  app
})

app.use((req, res, next) => {
  const err = new Error('Not found')
  err.stack = '404'
  next(err)
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  const errorCode = Number.parseInt(err.stack)

  res.status(Number.isNaN(errorCode) ? 500 : errorCode)
  res.send('Error')
})

module.exports = { app }
