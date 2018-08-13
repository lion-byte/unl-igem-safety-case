interface DBUser {
  _id: string
  username: string
  email: string
  passwordHash: string
  salt: string
  permissions: UserPermissions
}

interface UserPermissions {
  level: 'guest' | 'user' | 'admin'
  canRead: boolean
  canWrite: boolean
}

type PublishStatus = 'private' | 'published' | 'draft'

interface Diagram {
  description: string
  height: number
  rootGoal: Goal
  status: PublishStatus
  title: string
  width: number
}

type DBNodeType =
  | 'assumption'
  | 'context'
  | 'goal'
  | 'insufficient'
  | 'justification'
  | 'solution'
  | 'strategy'

type NodeType =
  | 'ASSUMPTION'
  | 'CONTEXT'
  | 'GOAL'
  | 'INSUFFICIENT'
  | 'JUSTIFICATION'
  | 'SOLUTION'
  | 'STRATEGY'

interface DBDiagram {
  _id?: string
  ownerId?: string
  title?: string
  description?: string
  rootGoalId?: string
  status?: PublishStatus
  height?: number
  width?: number
}

interface DBDiagramNode {
  _id?: string
  ownerId?: string
  type?: DBNodeType
  name?: string
  statement?: string
  parent?: string
  children?: Array<string>
  height?: number
  width?: number
}

interface Diagram {
  id?: string
  owner?: string
  title?: string
  description?: string
  rootGoal?: DiagramNode
  status?: PublishStatus
  height?: number
  width?: number
}

interface DiagramNode {
  id?: string
  owner?: string
  type?: NodeType
  name?: string
  statement?: string
  parent?: DiagramNode
  children?: Array<DiagramNode>
  height?: number
  width?: number
}

type Option = {
  label?: string
  value?: string | number
}
