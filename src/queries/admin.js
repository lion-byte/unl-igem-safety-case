import gql from 'graphql-tag'

export const ADMIN_DIAGRAM_LIST_QUERY = gql`
  query AdminDiagramList {
    diagrams: adminGetDiagrams {
      id
      owner
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

export const ADMIN_DIAGRAM_QUERY = gql`
  query AdminDiagram($id: String!) {
    diagram: adminGetDiagram(id: $id) {
      id
      owner
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

export const ADMIN_NODE_LIST_QUERY = gql`
  query AdminNodeList($type: DiagramNodeType) {
    nodes: adminGetNodes(type: $type) {
      id
      owner
      type
      name
      statement
      height
      width
      children {
        id
        name
      }
    }
  }
`

export const ADMIN_NODE_QUERY = gql`
  query AdminNode($id: String!) {
    node: adminGetNode(id: $id) {
      id
      owner
      type
      name
      statement
      height
      width
      parent {
        id
        type
        name
      }
      children {
        id
        type
        name
      }
    }
  }
`
