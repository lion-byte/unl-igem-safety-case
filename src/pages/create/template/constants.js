/**
 * @typedef {object} SafetyFeatureTemplate
 * @property {string} label
 * @property {Option} root
 * @property {Option} argument
 * @property {Array<Option>} subGoals
 */

/**
 * @type {Array<SafetyFeatureTemplate>}
 */
export const safetyFeatures = [
  {
    label: 'Kill-Switch',
    root: { value: 'Our kill-switch is safe, secure, and effective.' },
    argument: {
      value:
        'Argument over the effectiveness of the hazard-migration strategies for the kill-switch.'
    },
    subGoals: [
      { value: 'Our kill-switch operates effectively and when intended.' },
      { value: 'Our kill-switch operates safely.' },
      {
        value:
          'Our kill-switch operates securely and is robust to external attacks.'
      }
    ]
  },
  {
    label: 'Auxotrophy',
    root: { value: 'Our auxotrophy design is safe, secure, and effective.' },
    argument: {
      value:
        'Argument over the effectiveness of the hazard-migration strategies for our auxotrophy design.'
    },
    subGoals: [
      { value: 'Our auxotrophy operates effectively and when intended.' },
      { value: 'Our auxotrophy operates safely.' },
      {
        value:
          'Our auxotrophy operates securely and is robust to external attacks.'
      }
    ]
  },
  {
    label: 'Degredation',
    root: { value: 'Our degredation design is safe, secure, and effective.' },
    argument: {
      value:
        "Argument over the effectiveness of the hazard-migration strategies of our organisms/organisms' outputs."
    },
    subGoals: [
      { value: 'Our degredation operates effectively and when intended.' },
      { value: 'Our degredation operates safely.' },
      {
        value:
          'Our degredation operates securely and is robust to external attacks.'
      }
    ]
  }
]

//
// -----
//

/**
 * @type {Array<Option>}
 */
export const generalAssumptions = [
  { value: 'All threats to the environment have been identified.' },
  { value: 'All threats to animal life have been identified.' },
  { value: 'All threats to plant life have been identified.' },
  {
    value:
      'It is possible to detect evolution or mutation resulting in undesired or unwanted behavior.'
  }
]

/**
 * @type {Array<Option>}
 */
export const generalEnvironments = [
  { value: 'Only in the lab.' },
  { value: 'An industrial bioractor' },
  { value: 'The general enviornment' },
  { value: 'Soil' },
  { value: 'The water table' },
  { value: 'The atmosphere' },
  { value: 'Freshwater rivers or lakes' },
  { value: 'Saltwater lakes or oceans' },
  { value: 'A human gut' }
]

/**
 * @type {Array<Option>}
 */
export const generalJustifications = [
  { value: 'Our organisms only function in fresh water.' },
  { value: 'Our organisms only function in salt water.' },
  { value: 'Our organisms are not intended for release into the environment.' },
  { value: 'Our organisms are designed to live within the human gut.' },
  {
    value:
      'Only the outputs from our organisms are intended for environmental application.'
  }
]

//
// -----
//

/**
 * @type {Array<Option>}
 */
export const specificAssumptions = [
  { value: 'Our lab has adequate physical security.' },
  { value: 'Everyone on our team has proper safety training.' },
  {
    value:
      'Our organisms and their outputs will not be used except for their intended application.'
  }
]

/**
 * @type {Array<Option>}
 */
export const specificJustifications = [
  {
    value:
      'Our organisms could evolve and exhibit unintended or undesireable behavior.'
  },
  { value: 'Malicious actors could attempt to alter our organisms behavior.' }
]
