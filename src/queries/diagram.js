import gql from 'graphql-tag'

export const CREATE_DIAGRAM_MUTATION = gql`
  mutation CreateDiagram(
    $title: String!
    $description: String!
    $rootGoalId: String
  ) {
    createDiagram(
      title: $title
      description: $description
      rootGoalId: $rootGoalId
    )
  }
`

export const DIAGRAM_LIST_QUERY = gql`
  query DiagramList {
    diagrams: getDiagrams {
      id
      title
      description
      owner
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
      owner
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

export const UPDATE_DIAGRAM_MUTATION = gql`
  mutation UpdateDiagram(
    $id: String!
    $description: String
    $rootGoalId: String
    $status: PublishStatus
    $title: String
    $height: Int
    $width: Int
  ) {
    updateDiagram(
      id: $id
      description: $description
      rootGoalId: $rootGoalId
      status: $status
      title: $title
      height: $height
      width: $width
    )
  }
`

export const DELETE_DIAGRAM_MUTATION = gql`
  mutation DeleteDiagram($id: String!) {
    deleteDiagram(id: $id)
  }
`

export const CREATE_NODE_MUTATION = gql`
  mutation CreateNode(
    $type: DiagramNodeType!
    $name: String!
    $statement: String!
  ) {
    createNode(type: $type, name: $name, statement: $statement)
  }
`

export const NODE_LIST_QUERY = gql`
  query NodeList($type: DiagramNodeType) {
    nodes: getNodes(type: $type) {
      id
      type
      owner
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

export const NODE_QUERY = gql`
  query Node($id: String!) {
    node: getNode(id: $id) {
      id
      type
      owner
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

export const UPDATE_NODE_MUTATION = gql`
  mutation UpdateNode(
    $id: String!
    $name: String
    $statement: String
    $height: Int
    $width: Int
  ) {
    updateNode(
      id: $id
      name: $name
      statement: $statement
      height: $height
      width: $width
    )
  }
`

export const DELETE_NODE_DIAGRAM = gql`
  mutation DeleteNode($id: String!) {
    deleteNode(id: $id)
  }
`

export const ADD_CHILD_NODE_MUTATION = gql`
  mutation AddChildNode($parentId: String!, $childId: String!) {
    addChildNode(parentId: $parentId, childId: $childId)
  }
`
