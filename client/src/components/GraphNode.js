import React from 'react'
import { Group } from '@vx/group'

import SVGText from './styles/SVGText'
import SVGMultiLineText from './styles/SVGMultiLineText'

export const fontSize = 16

/**
 * @param {object} props
 * @param {object} props.node
 * @param {object} props.node.data
 * @param {string} props.node.data.type
 * @param {string} props.node.data.name
 * @param {string} props.node.data.statement
 * @param {number} [props.node.data.height]
 * @param {number} [props.node.data.width]
 * @param {number} props.node.x
 * @param {number} props.node.y
 */
const GraphNode = props => {
  const {
    node: { data, x, y }
  } = props

  const { type, name, statement, height = 80, width = 180 } = data

  const radius = Math.max(height, width) / 2
  const useRadius = type === 'INSUFFICIENT' || type === 'SOLUTION'

  const textHeightOffset = useRadius ? (-radius * 2) / 3 : -height / 2

  return (
    <Group left={x} top={y}>
      {type === 'ASSUMPTION' && (
        <ellipse
          fill='#1474d5'
          rx={width / 2}
          ry={height / 2}
          stroke='#ffffff'
          strokeWidth={1}
        />
      )}

      {type === 'CONTEXT' && (
        <rect
          fill='#550d04'
          x={-width / 2}
          y={-height / 2}
          height={height}
          width={width}
          stroke='#ffffff'
          strokeWidth={1}
        />
      )}

      {type === 'GOAL' && (
        <ellipse
          fill='#af52d1'
          rx={width / 2}
          ry={height / 2}
          stroke='#ffffff'
          strokeWidth={1}
        />
      )}

      {type === 'INSUFFICIENT' && (
        <rect
          fill='#000000'
          height={2 * radius}
          width={2 * radius}
          stroke='#ffffff'
          strokeWidth={1}
          transform='rotate(45)'
          x={-radius}
          y={-radius}
        />
      )}

      {type === 'JUSTIFICATION' && (
        <ellipse
          fill='#01c456'
          rx={width / 2}
          ry={height / 2}
          stroke='#ffffff'
          strokeWidth={1}
        />
      )}

      {type === 'SOLUTION' && (
        <circle r={radius} fill='#035155' stroke='#ffffff' strokeWidth={1} />
      )}

      {type === 'STRATEGY' && (
        <rect
          fill='#ff611f'
          x={-width / 2}
          y={-height / 2}
          height={height}
          width={width}
          stroke='#ffffff'
          strokeWidth={1}
        />
      )}

      <SVGText
        fontSize={fontSize}
        fontWeight='bold'
        textAnchor='middle'
        y={textHeightOffset + 2 * fontSize}
      >
        {name}
      </SVGText>

      <SVGText
        fontSize={fontSize}
        textAnchor='middle'
        y={textHeightOffset + 2.5 * fontSize}
      >
        <SVGMultiLineText text={statement} x={0} dy={fontSize} />
      </SVGText>
    </Group>
  )
}

export default GraphNode
