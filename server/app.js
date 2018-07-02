const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')

const { schema } = require('./graphql')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.use((req, res, next) => {
  const err = new Error('Not found')
  err.stack = '404'
  next(err)
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  const { stack } = err

  res.status(stack !== undefined ? Number.parseInt(stack) : 500)
  res.send('Error')
})

module.exports = { app }
