const { forwardTo } = require('prisma-binding')

const Query = {
  diagrams: forwardTo('db')
}

module.exports = { Query }
