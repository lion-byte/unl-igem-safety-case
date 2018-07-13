const { makeExecutableSchema } = require('graphql-tools')

const { diagram } = require('../db')

/**
 * @param {Array<any>} list
 * @param {NodeType} type
 */
const filterByType = (list, type) => {
  if (!type) {
    return list
  }

  return list.filter(item => item.type === type)
}

const typeDefs = `
enum DiagramNodeType {
  ASSUMPTION
  CONTEXT
  GOAL
  INSUFFICIENT
  JUSTIFICATION
  SOLUTION
  STRATEGY
}

type DiagramNode {
  type: DiagramNodeType!
  name: String!
  statement: String!
  children (type: DiagramNodeType): [DiagramNode]
}

type Query {
  getNodes (type: DiagramNodeType!): [DiagramNode]
}

type Mutation {
  createDiagram (title: String!, description: String!): Boolean

  createNode (type: DiagramNodeType!, name: String!, statement: String!): Boolean
}
`

const resolvers = {
  DiagramNodeType: {
    ASSUMPTION: 'assumption',
    CONTEXT: 'context',
    GOAL: 'goal',
    INSUFFICIENT: 'insufficient',
    JUSTIFICATION: 'justification',
    SOLUTION: 'solution',
    STRATEGY: 'strategy'
  },

  DiagramNode: {
    children: async (obj, { type }, { user: userToken }) => {
      if (!obj) {
        return null
      } else if (!Array.isArray(obj.children)) {
        return null
      }

      const childNodes = await diagram.getNodeListByIds(obj.children)

      switch (obj.type) {
        case 'goal':
        case 'strategy':
          return filterByType(childNodes, type)

        default:
          return null
      }
    }
  },

  Query: {
    getNodes: async (_, { type }, { user: userToken }) => {
      return filterByType(await diagram.getAllNodes(), type)
    }
  },

  Mutation: {
    createDiagram: async (_, { title, description }, { user: userToken }) => {
      if (!userToken) {
        return false
      }

      const confirmed = await diagram.createDiagram({ title, description })

      return confirmed
    },

    createNode: async (_, { type, name, statement }, { user: userToken }) => {
      if (!userToken) {
        return false
      }

      const confirmed = await diagram.createNode({ type, name, statement })

      return confirmed
    }
  }
}

const diagramSchema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = { diagramSchema }
