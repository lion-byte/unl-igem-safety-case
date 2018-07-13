const { mergeSchemas } = require('graphql-tools')

const { accountSchema } = require('./account')
const { diagramSchema } = require('./diagram')

const schema = mergeSchemas({
  schemas: [accountSchema, diagramSchema]
})

module.exports = { schema }
