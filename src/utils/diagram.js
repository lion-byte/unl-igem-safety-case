const saveSvgLib = () =>
  import(/* webpackChunkName: "save-svg-as-png" */ 'save-svg-as-png')

/**
 * @param {SVGSVGElement} svg
 * @param {string} filename
 */
export const exportAsSVG = async (svg, filename = 'diagram.svg') => {
  const {
    default: { saveSvg }
  } = await saveSvgLib()

  saveSvg(svg, filename)
}

/**
 * @param {SVGSVGElement} svg
 * @param {string} filename
 */
export const exportAsPNG = async (svg, filename = 'diagram.png') => {
  const {
    default: { saveSvgAsPng }
  } = await saveSvgLib()

  saveSvgAsPng(svg, filename)
}
