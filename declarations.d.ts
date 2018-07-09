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

type NodeType =
  | 'assumption'
  | 'condition'
  | 'goal'
  | 'justification'
  | 'solution'
  | 'strategy'

interface Assumption {
  type: 'assumption'
  name: string
  message: string
}

interface Condition {
  type: 'condition'
  name: string
  message: string
}

interface Goal {
  type: 'goal'
  name: string
  message: string
  children?:
    | Array<Condition | Justification | Strategy>
    | Array<Condition | Solution>
}

interface Justification {
  type: 'justification'
  name: string
  message: string
}

interface Solution {
  type: 'solution'
  name: string
  message: string
}

interface Strategy {
  type: 'strategy'
  name: string
  message: string
  children?: Array<Assumption | Condition | Justification | Goal>
}
