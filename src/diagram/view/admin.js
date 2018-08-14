import { getClient } from '../../client'
import { ADMIN_DIAGRAM_QUERY, ADMIN_NODE_QUERY } from '../../queries'

/**
 * Admin access to a diagram
 * @param {string} id
 * @returns {Promise<Diagram>}
 */
export const adminFetchFullDiagram = async id => {
  const client = await getClient()

  const {
    data: { diagram }
  } = await client.query({
    fetchPolicy: 'network-only',
    query: ADMIN_DIAGRAM_QUERY,
    variables: { id }
  })

  if (!diagram || !diagram.rootGoal) {
    return null
  } else {
    return {
      ...diagram,
      rootGoal: await adminFetchNodesRecursively(diagram.rootGoal.id)
    }
  }
}

/**
 * Admin access to nodes of a diagram
 * @param {string} id
 * @returns {Promise<DiagramNode>}
 */
export const adminFetchNodesRecursively = async id => {
  const client = await getClient()

  const {
    data: { node }
  } = await client.query({
    fetchPolicy: 'network-only',
    query: ADMIN_NODE_QUERY,
    variables: { id }
  })

  if (node === null || node.children === null) {
    return node
  } else {
    return {
      ...node,
      children: await Promise.all(
        node.children.map(sub => adminFetchNodesRecursively(sub.id))
      )
    }
  }
}
