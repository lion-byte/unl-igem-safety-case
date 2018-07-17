const { makeExecutableSchema } = require('graphql-tools')

const { diagram } = require('../db')

/**
 * @param {Array<any>} list
 * @param {NodeType} type
 */
const filterByType = (list, type = null) => {
  if (type === null) {
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

enum PublishStatus {
  DRAFT
  PRIVATE
  PUBLISHED
}

type Diagram {
  id: String!
  title: String!
  description: String!
  rootGoal: DiagramNode
  status: PublishStatus!
  height: Int!
  width: Int!
}

type DiagramNode {
  id: String!
  type: DiagramNodeType!
  name: String!
  statement: String!
  children (type: DiagramNodeType): [DiagramNode]
}

type Query {
  getDiagram (id: String!): Diagram

  getDiagrams: [Diagram]

  getNode (id: String!): DiagramNode

  getNodes (type: DiagramNodeType): [DiagramNode]
}

type Mutation {
  createDiagram (title: String!, description: String!, rootGoalId: String): String

  updateDiagram (id: String!, description: String, rootGoalId: String, status: PublishStatus, title: String, height: Int, width: Int): Boolean

  deleteDiagram (id: String!): Boolean

  createNode (type: DiagramNodeType!, name: String!, statement: String!): String

  updateNode (id: String!, name: String, statement: String): Boolean

  addChildNode (parentId: String!, childId: String!): Boolean

  removeChildeNode (parentId: String!, childId: String!): Boolean

  deleteNode (id: String!): Boolean
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

  PublishStatus: {
    DRAFT: 'draft',
    PRIVATE: 'private',
    PUBLISHED: 'published'
  },

  Diagram: {
    id: async obj => {
      return obj._id
    },

    rootGoal: async obj => {
      if (obj.rootGoalId === null) {
        return null
      }

      return diagram.getNodeById(obj.rootGoalId)
    }
  },

  DiagramNode: {
    id: async obj => {
      return obj._id
    },

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
    getDiagram: async (_, { id }, { user: userToken }) => {
      return diagram.getDiagramById(id)
    },

    getDiagrams: async (_, args, { user: userToken }) => {
      return diagram.getAllDiagrams()
    },

    getNode: async (_, { id }, { user: userToken }) => {
      return diagram.getNodeById(id)
    },

    getNodes: async (_, { type }, { user: userToken }) => {
      return filterByType(await diagram.getAllNodes(), type)
    }
  },

  Mutation: {
    addChildNode: async (_, { parentId, childId }, { user: userToken }) => {
      if (!userToken) {
        return null
      }

      return diagram.addChildNode(parentId, childId)
    },

    removeChildeNode: async (_, { parentId, childId }, { user: userToken }) => {
      if (!userToken) {
        return null
      }

      return diagram.removeChildNode(parentId, childId)
    },

    createDiagram: async (
      _,
      { title, description, rootGoalId },
      { user: userToken }
    ) => {
      if (!userToken) {
        return null
      }

      return diagram.createDiagram({ title, description, rootGoalId })
    },

    createNode: async (_, { type, name, statement }, { user: userToken }) => {
      if (!userToken) {
        return null
      }

      return diagram.createNode({ type, name, statement })
    },

    updateDiagram: async (_, { id, ...updateInfo }, { user: userToken }) => {
      if (!userToken) {
        return null
      }

      return diagram.updateDiagram(id, updateInfo)
    },

    updateNode: async (_, { id, ...updateInfo }, { user: userToken }) => {
      if (!userToken) {
        return null
      }

      return diagram.updateNode(id, updateInfo)
    },

    deleteDiagram: async (_, { id }, { user: userToken }) => {
      if (!userToken) {
        return null
      }

      return diagram.deleteDiagram(id)
    },

    deleteNode: async (_, { id }, { user: userToken }) => {
      if (!userToken) {
        return null
      }

      return diagram.deleteNode(id)
    }
  }
}

const diagramSchema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = { diagramSchema }
