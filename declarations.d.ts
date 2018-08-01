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

type NodeType =
  | 'assumption'
  | 'context'
  | 'goal'
  | 'insufficient'
  | 'justification'
  | 'solution'
  | 'strategy'

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
  type?: NodeType
  name?: string
  statement?: string
  parent?: string
  children?: Array<string>
  height?: number
  width?: number
}

// interface Assumption {
//   type: 'assumption'
//   name: string
//   statement: string
// }

// interface Context {
//   type: 'context'
//   name: string
//   statement: string
// }

// interface Goal {
//   type: 'goal'
//   name: string
//   statement: string
//   children:
//     | Array<Assumption | Context | Goal | Justification | Strategy>
//     | Array<Context | Insufficient>
//     | Array<Context | Solution>
// }

// interface Insufficient {
//   type: 'insufficient'
//   name: string
//   statement: string
// }

// interface Justification {
//   type: 'justification'
//   name: string
//   statement: string
// }

// interface Solution {
//   type: 'solution'
//   name: string
//   statement: string
// }

// interface Strategy {
//   type: 'strategy'
//   name: string
//   statement: string
//   children: Array<Assumption | Context | Justification | Goal>
// }
