// type ContainmentFacility = 1 | 2 | 3 | 4

// type RiskGroup = 1 | 2 | 3 | 4

// type Hazard = 1 | 2 | 3 | 4

type SafetyMechanism =
  | 'Kill-switch'
  | 'Auxotrophy'
  | 'Degradation'
  | 'Sterility'

// type Usage = 'SEBO' | 'SEBO outputs'

// type Environment =
//   | 'Soil'
//   | 'Water table'
//   | 'specific habitat'
//   | 'Atmosphere'
//   | 'Rivers'
//   | 'Freshwater'
//   | 'Saltwater'
//   | 'Human body'
//   | 'Non-human body'

// type Parameter = ''

type Diagram = {
  description: string
  dimensions: {
    height: number
    width: number
  }
  rootGoal: Goal
  title: string
}

type NodeType =
  | 'assumption'
  | 'context'
  | 'goal'
  | 'insufficient'
  | 'justification'
  | 'solution'
  | 'strategy'

interface Assumption {
  type: 'assumption'
  name: string
  statement: string
}

interface Context {
  type: 'context'
  name: string
  statement: string
}

interface Goal {
  type: 'goal'
  name: string
  statement: string
  children:
    | Array<Assumption | Context | Goal | Justification | Strategy>
    | Array<Context | Insufficient | Solution>
}

interface Insufficient {
  type: 'insufficient'
  name: string
  statement: string
}

interface Justification {
  type: 'justification'
  name: string
  statement: string
}

interface Solution {
  type: 'solution'
  name: string
  statement: string
}

interface Strategy {
  type: 'strategy'
  name: string
  statement: string
  children: Array<Assumption | Context | Justification | Goal>
}
