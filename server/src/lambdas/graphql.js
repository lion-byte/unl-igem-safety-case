require('dotenv').config()

const { createLambdaServer } = require('../index')

const lambda = createLambdaServer()

exports.handler = lambda.handler
