import { createDiagram, createNode, createMultipleSubNodes } from '../freeform'
import {
  safetyFeatures,
  generalAssumptions,
  generalJustifications,
  generalEnvironments,
  specificAssumptions,
  specificJustifications
} from './constants'

/**
 * Creates the diagram and nodes based on a template
 * @param {object} opts
 * @param {string} opts.title
 * @param {string} opts.description
 * @param {number} opts.safetyFeature

 * @param {number} opts.generalAssumption
 * @param {number} opts.generalJustification
 * @param {number} opts.generalEnvironment

 * @param {number} opts.subGoal
 * @param {number} opts.specificAssumption
 * @param {number} opts.specificJustification

 * @returns {Promise<string>}
 */
export const createTemplate = async opts => {
  const {
    title,
    description,
    safetyFeature,
    generalAssumption,
    generalJustification,
    generalEnvironment,
    subGoal,
    specificAssumption,
    specificJustification
  } = opts

  const { root, argument, subGoals } = safetyFeatures[safetyFeature]

  const rootAssumption = generalAssumptions[generalAssumption]
  const rootJustification = generalJustifications[generalJustification]
  const rootEnv = generalEnvironments[generalEnvironment]

  const subGoalTemplate = subGoals[subGoal]
  const subAssumption = specificAssumptions[specificAssumption]
  const subJustification = specificJustifications[specificJustification]

  try {
    const rootGoalId = await createNode({
      type: 'GOAL',
      name: root.label || 'Safety Feature',
      statement: root.value.toString()
    })

    const diagramId = await createDiagram({
      title,
      description,
      rootGoalId,
      height: 760,
      width: 1080
    })

    const rootChildren = await createMultipleSubNodes({
      subNodes: [
        {
          type: 'ASSUMPTION',
          name: rootAssumption.label || 'General Assumption',
          statement: rootAssumption.value.toString()
        },
        {
          type: 'STRATEGY',
          name: argument.label || 'Argument',
          statement: argument.value.toString()
        },
        {
          type: 'CONTEXT',
          name: rootEnv.label || 'General Environment',
          statement: rootEnv.value.toString()
        },
        {
          type: 'JUSTIFICATION',
          name: rootJustification.label || 'General Justification',
          statement: rootJustification.value.toString()
        }
      ],
      parentId: rootGoalId
    })

    const strategyId = rootChildren[1]

    const subGoalId = await createNode({
      type: 'GOAL',
      name: subGoalTemplate.label || 'Sub-Goal',
      statement: subGoalTemplate.value.toString(),
      parentId: strategyId
    })

    await createMultipleSubNodes({
      subNodes: [
        {
          type: 'ASSUMPTION',
          name: subAssumption.label || 'Specific Assumption',
          statement: subAssumption.value.toString()
        },
        {
          type: 'JUSTIFICATION',
          name: subJustification.label || 'Specific Justification',
          statement: subJustification.value.toString()
        }
      ],
      parentId: subGoalId
    })

    return diagramId
  } catch (error) {
    console.error(error)

    return null
  }
}
