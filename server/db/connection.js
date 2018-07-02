const { default: Monk } = require('monk')

const db = Monk(process.env.DB_URL)

module.exports = { db }
