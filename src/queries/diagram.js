import gql from 'graphql-tag'

export const DIAGRAM_LIST_QUERY = gql`
  query DiagramList {
    diagrams: getDiagrams {
      id
      title
      description
      rootGoal {
        id
        name
      }
      status
      height
      width
    }
  }
`

export const DIAGRAM_QUERY = gql`
  query Diagram($id: String!) {
    diagram: getDiagram(id: $id) {
      id
      title
      description
      rootGoal {
        id
        name
      }
      status
      height
      width
    }
  }
`

export const NODE_LIST_QUERY = gql`
  query NodeList($type: DiagramNodeType) {
    nodes: getNodes(type: $type) {
      id
      type
      name
      statement
      subNodes: children {
        id
        name
      }
    }
  }
`

export const NODE_QUERY = gql`
  query Node($id: String!) {
    node: getNode(id: $id) {
      id
      type
      name
      statement
      subNodes: children {
        id
        name
      }
    }
  }
`
