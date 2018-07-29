import { asyncComponent } from '../utils'

export * from './diagram'
export * from './diagramNode'
export * from './permissions'
export * from './ui'

export const Graph = asyncComponent(() =>
  import(/* webpackChunkName: "graph" */ './graph')
)
