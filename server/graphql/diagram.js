const { gql, makeExecutableSchema } = require('apollo-server-express')

const { user, diagram } = require('../db')

const typeDefs = gql`
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
    owner: String!
    rootGoal: DiagramNode
    status: PublishStatus!
    height: Int!
    width: Int!
  }

  type DiagramNode {
    id: String!
    type: DiagramNodeType!
    name: String!
    owner: String!
    statement: String!
    height: Int!
    width: Int!
    children(type: DiagramNodeType): [DiagramNode]
  }

  type Query {
    getDiagram(id: String!): Diagram

    getDiagrams: [Diagram]

    getNode(id: String!): DiagramNode

    getNodes(type: DiagramNodeType): [DiagramNode]
  }

  type Mutation {
    createDiagram(
      title: String!
      description: String!
      rootGoalId: String
    ): String

    updateDiagram(
      id: String!
      description: String
      rootGoalId: String
      status: PublishStatus
      title: String
      height: Int
      width: Int
    ): Boolean

    deleteDiagram(id: String!): Boolean

    createNode(
      type: DiagramNodeType!
      name: String!
      statement: String!
    ): String

    updateNode(
      id: String!
      name: String
      statement: String
      height: Int
      width: Int
    ): Boolean

    addChildNode(parentId: String!, childId: String!): Boolean

    removeChildeNode(parentId: String!, childId: String!): Boolean

    deleteNode(id: String!): Boolean
  }
`

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
    id: async (obj, args, { user: userToken }) => {
      return obj._id
    },

    owner: async (obj, args, { user: userToken }) => {
      const { username } = await user.findById(obj.ownerId)

      return username
    },

    rootGoal: async (obj, args, { user: userToken }) => {
      if (obj.rootGoalId === null) {
        return null
      }

      return diagram.getNodeById({ id: obj.rootGoalId, ownerId: userToken.id })
    }
  },

  DiagramNode: {
    id: async (obj, args, { user: userToken }) => {
      return obj._id
    },

    owner: async (obj, args, { user: userToken }) => {
      const { username } = await user.findById(obj.ownerId)

      return username
    },

    children: async (obj, { type }, { user: userToken }) => {
      if (!obj) {
        return null
      } else if (!Array.isArray(obj.children)) {
        return null
      }

      const childNodes = await diagram.getNodeListByIds({
        ids: obj.children,
        ownerId: userToken.id
      })

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
      return diagram.getDiagramById({ id, ownerId: userToken.id })
    },

    getDiagrams: async (_, args, { user: userToken }) => {
      return diagram.getAllDiagrams({ ownerId: userToken.id })
    },

    getNode: async (_, { id }, { user: userToken }) => {
      return diagram.getNodeById({ id, ownerId: userToken.id })
    },

    getNodes: async (_, { type }, { user: userToken }) => {
      return filterByType(
        await diagram.getAllNodes({ ownerId: userToken.id }),
        type
      )
    }
  },

  Mutation: {
    addChildNode: async (_, { parentId, childId }, { user: userToken }) => {
      if (!userToken) {
        return null
      }

      return diagram.addChildNode({ parentId, childId, ownerId: userToken.id })
    },

    removeChildeNode: async (_, { parentId, childId }, { user: userToken }) => {
      if (!userToken) {
        return null
      }

      return diagram.removeChildNode({
        parentId,
        childId,
        ownerId: userToken.id
      })
    },

    createDiagram: async (
      _,
      { title, description, rootGoalId },
      { user: userToken }
    ) => {
      if (!userToken) {
        return null
      }

      return diagram.createDiagram({
        ownerId: userToken.id,
        title,
        description,
        rootGoalId
      })
    },

    createNode: async (_, { type, name, statement }, { user: userToken }) => {
      if (!userToken) {
        return null
      }

      return diagram.createNode({
        ownerId: userToken.id,
        type,
        name,
        statement
      })
    },

    updateDiagram: async (_, { id, ...updates }, { user: userToken }) => {
      if (!userToken) {
        return null
      }

      return diagram.updateDiagram({
        id,
        updates,
        ownerId: userToken.id
      })
    },

    updateNode: async (_, { id, ...updates }, { user: userToken }) => {
      if (!userToken) {
        return null
      }

      try {
        return diagram.updateNode({
          id,
          updates,
          ownerId: userToken.id
        })
      } catch (error) {
        console.error(error)

        return null
      }
    },

    deleteDiagram: async (_, { id }, { user: userToken }) => {
      if (!userToken) {
        return null
      }

      return diagram.deleteDiagram({ id, ownerId: userToken.id })
    },

    deleteNode: async (_, { id }, { user: userToken }) => {
      if (!userToken) {
        return null
      }

      return diagram.deleteNode({ id, ownerId: userToken.id })
    }
  }
}

const diagramSchema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = { diagramSchema }