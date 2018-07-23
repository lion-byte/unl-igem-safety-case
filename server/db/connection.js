const { default: Monk } = require('monk')

const getConnection = () =>
  Monk(process.env.DB_HOST, {
    poolSize: 20
  })

module.exports = { getConnection }
