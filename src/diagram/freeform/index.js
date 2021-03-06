import { getClient } from '../../client'
import {
  CREATE_NODE_MUTATION,
  CREATE_DIAGRAM_MUTATION
} from '../../queries/diagram'

/**
 * @param {object} opts
 * @param {string} opts.title
 * @param {string} opts.description
 * @param {string} opts.rootGoalId
 * @param {number} [opts.height]
 * @param {number} [opts.width]
 * @returns {Promise<string>}
 */
export const createDiagram = async opts => {
  const { title, description, rootGoalId, height, width } = opts

  const client = await getClient()

  try {
    const {
      data: { createDiagram: resultId }
    } = await client.mutate({
      mutation: CREATE_DIAGRAM_MUTATION,
      variables: { title, description, rootGoalId, height, width }
    })

    return resultId
  } catch (error) {
    console.error(error)

    return null
  }
}

/**
 * @typedef {object} CreateNodeOptions
 * @property {NodeType} type
 * @property {string} name
 * @property {string} statement
 * @property {string} [parentId]
 * @property {number} [height]
 * @property {number} [width]
 */

/**
 * @param {CreateNodeOptions} opts
 * @returns {Promise<string>}
 */
export const createNode = async opts => {
  const { type, name, statement, parentId, height, width } = opts

  const client = await getClient()

  try {
    const {
      data: { createNode: resultId }
    } = await client.mutate({
      mutation: CREATE_NODE_MUTATION,
      variables: {
        type,
        name,
        statement,
        parentId,
        height,
        width
      }
    })

    return resultId
  } catch (error) {
    console.error(error)

    return null
  }
}

/**
 * @param {object} opts
 * @param {string} opts.parentId
 * @param {Array<CreateNodeOptions>} opts.subNodes
 * @returns {Promise<Array<string>>} IDs created for each subNode
 */
export const createMultipleSubNodes = async opts => {
  const { parentId, subNodes } = opts

  const nodeIdList = []

  for (const node of subNodes) {
    const id = await createNode({ ...node, parentId })

    nodeIdList.push(id)
  }

  return nodeIdList
}
