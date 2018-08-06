import { getClient } from '../client'
import {
  DIAGRAM_QUERY,
  NODE_QUERY,
  ADMIN_DIAGRAM_QUERY,
  ADMIN_NODE_QUERY
} from '../queries'

const saveSvgLib = () =>
  import(/* webpackChunkName: "save-svg-as-png" */ 'save-svg-as-png')

/**
 * @param {SVGSVGElement} svg
 * @param {string} filename
 */
export const exportAsSVG = async (svg, filename = 'diagram.svg') => {
  const {
    default: { saveSvg }
  } = await saveSvgLib()

  saveSvg(svg, filename)
}

/**
 * @param {SVGSVGElement} svg
 * @param {string} filename
 */
export const exportAsPNG = async (svg, filename = 'diagram.png') => {
  const {
    default: { saveSvgAsPng }
  } = await saveSvgLib()

  saveSvgAsPng(svg, filename, { scale: 2 })
}

/**
 * Admin access to a diagram
 * @param {string} id
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
    return diagram
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

  if (!node || !node.children) {
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

/**
 * Access to a diagram
 * @param {string} id
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

  if (diagram === null || diagram.rootGoal === null) {
    return diagram
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

  if (node === null || node.children === null) {
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
