const markedLib = () => import(/* webpackChunkName: "marked" */ 'marked')

/**
 *
 * @param {string} md
 * @returns {Promise<string>} html string
 */
export const renderMd = md => {
  return markedLib().then(
    ({ parse }) =>
      new Promise((resolve, reject) => {
        parse(md, (err, result) => {
          if (err) reject(err)

          resolve(result)
        })
      })
  )
}
