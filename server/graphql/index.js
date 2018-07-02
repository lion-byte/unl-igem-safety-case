const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `
type Query {
  books: [Book]
}

type Book {
  title: String
  author: String
}
`

// Some fake data
const books = [
  {
    title: `Harry Potter and the Sorcerer's stone`,
    author: 'J.K. Rowling'
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  }
]

const resolvers = {
  Query: {
    books: () => books
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

module.exports = { schema }
