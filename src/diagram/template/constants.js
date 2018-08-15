/**
 * @typedef {object} SafetyFeatureTemplate
 * @property {string} label
 * @property {Option} root
 * @property {Option} argument
 * @property {ReadonlyArray<Option>} subGoals
 */

/**
 * @type {ReadonlyArray<SafetyFeatureTemplate>}
 */
export const safetyFeatures = [
  {
    label: 'Kill-Switch',
    root: { value: 'Our kill-switch is safe,\nsecure, and effective.' },
    argument: {
      value:
        'Argument over the\neffectiveness of the\nhazard-migration\nstrategies for\nthe kill-switch.'
    },
    subGoals: [
      { value: 'Our kill-switch\noperates effectively\nand when intended.' },
      { value: 'Our kill-switch\noperates safely.' },
      {
        value:
          'Our kill-switch\noperates securely and\nis robust to\nexternal attacks.'
      }
    ]
  },
  {
    label: 'Auxotrophy',
    root: { value: 'Our auxotrophy design\nis safe, secure,\nand effective.' },
    argument: {
      value:
        'Argument over the\neffectiveness of the\nhazard-migration\nstrategies for our\nauxotrophy design.'
    },
    subGoals: [
      { value: 'Our auxotrophy\noperates effectively\nand when intended.' },
      { value: 'Our auxotrophy\noperates safely.' },
      {
        value:
          'Our auxotrophy\noperates securely and\nis robust to\nexternal attacks.'
      }
    ]
  },
  {
    label: 'Degradation',
    root: { value: 'Our degradation\ndesign is safe, secure,\nand effective.' },
    argument: {
      value:
        "Argument over the\neffectiveness of the\nhazard-migration\nstrategies of our\norganisms /\norganisms' outputs."
    },
    subGoals: [
      { value: 'Our degradation\noperates effectively\nand when intended.' },
      { value: 'Our degradation\noperates safely.' },
      {
        value:
          'Our degradation\noperates securely and\nis robust to\nexternal attacks.'
      }
    ]
  }
]

//
// -----
//

/**
 * @type {ReadonlyArray<Option>}
 */
export const generalAssumptions = [
  { value: 'All threats to the\nenvironment have\nbeen identified.' },
  { value: 'All threats to animal\nlife have\nbeen identified.' },
  { value: 'All threats to plant\nlife have\nbeen identified.' },
  {
    value:
      'It is possible to\ndetect evolution or\nmutation resulting\nin undesired or\nunwanted behavior.'
  }
]

/**
 * @type {ReadonlyArray<Option>}
 */
export const generalEnvironments = [
  { value: 'Only in the lab' },
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
 * @type {ReadonlyArray<Option>}
 */
export const generalJustifications = [
  { value: 'Our organisms only\nfunction in fresh\nwater.' },
  { value: 'Our organisms only\nfunction in salt\nwater.' },
  {
    value: 'Our organisms are\nnot intended for\nrelease into\nthe environment.'
  },
  { value: 'Our organisms are\ndesigned to live\nwithin the human gut.' },
  {
    value:
      'Only the outputs\nfrom our organisms\nare intended\nfor environmental\napplication.'
  }
]

//
// -----
//

/**
 * @type {ReadonlyArray<Option>}
 */
export const specificAssumptions = [
  { value: 'Our lab has adequate\nphysical security.' },
  { value: 'Everyone on our team\nhas proper safety training.' },
  {
    value:
      'Our organisms and their\noutputs will not be\nused except for their\nintended application.'
  }
]

/**
 * @type {ReadonlyArray<Option>}
 */
export const specificJustifications = [
  {
    value:
      'Our organisms could\nevolve and exhibit\nunintended or\nundesirable behavior.'
  },
  {
    value: 'Malicious actors\ncould attempt\nto alter our\norganisms behavior.'
  }
]
