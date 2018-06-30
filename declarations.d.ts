// type ContainmentFacility = 1 | 2 | 3 | 4

// type RiskGroup = 1 | 2 | 3 | 4

// type Hazard = 1 | 2 | 3 | 4

// type SafetyMechanism =
//   | 'Kill-switch'
//   | 'Auxotrophy'
//   | 'Degradation'
//   | 'Sterility'

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
  | 'justification'
  | 'solution'
  | 'argument'
  | 'goal'

interface Info {
  message: string
  name: string
  type: NodeType
}

interface Assumption extends Info {
  type: 'assumption'
}

interface Condition extends Info {
  type: 'condition'
}

interface Justification extends Info {
  type: 'justification'
}

interface Solution extends Info {
  type: 'solution'
}

interface Argument extends Info {
  type: 'argument'
  children?: Array<Assumption | Condition | Justification | Goal>
}

interface Goal extends Info {
  type: 'goal'
  children?:
    | Array<Argument | Condition | Justification>
    | Array<Condition | Solution>
}
