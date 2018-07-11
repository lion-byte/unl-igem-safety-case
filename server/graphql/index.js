const { mergeSchemas } = require('graphql-tools')

const { accountSchema } = require('./account')

const schema = mergeSchemas({
  schemas: [accountSchema]
})

module.exports = { schema }
