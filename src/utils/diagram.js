import { getClient } from '../client'
import { DIAGRAM_QUERY, NODE_QUERY } from '../queries'

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
