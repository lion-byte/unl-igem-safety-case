import { getClient } from '../../client'
import { DIAGRAM_QUERY, NODE_QUERY } from '../../queries'
import { sleep } from '../../utils'

export * from './admin'

/**
 * Access to a diagram
 * @param {string} id
 * @returns {Promise<Diagram>}
 */
export const fetchFullDiagram = async id => {
  const client = await getClient()

  const {
    data: { diagram }
  } = await client.query({
    fetchPolicy: 'network-only',
    query: DIAGRAM_QUERY,
    variables: { id }
  })

  if (!diagram || !diagram.rootGoal) {
    return null
  } else {
    return {
      ...diagram,
      rootGoal: await fetchNodesRecursively(diagram.rootGoal.id)
    }
  }
}

/**
 * Access to nodes and subnodes
 * @param {string} id
 * @returns {Promise<DiagramNode>}
 */
export const fetchNodesRecursively = async id => {
  const client = await getClient()

  const {
    data: { node }
  } = await client.query({
    fetchPolicy: 'network-only',
    query: NODE_QUERY,
    variables: { id }
  })

  await sleep()

  if (!node || !node.children) {
    return node
  } else {
    return {
      ...node,
      children: await Promise.all(
        node.children.map(sub => fetchNodesRecursively(sub.id))
      )
    }
  }
}
