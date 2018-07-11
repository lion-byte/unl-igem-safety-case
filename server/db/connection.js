const { default: Monk } = require('monk')

const getConnection = () => Monk(process.env.DB_HOST)

module.exports = { getConnection }
