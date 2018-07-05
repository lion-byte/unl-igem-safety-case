const { default: Monk } = require('monk')

const db = Monk(process.env.DB_HOST)

module.exports = { db }
