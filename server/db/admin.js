const { getConnection } = require('./connection')
const { findById } = require('./user')

/**
 * Confirm the user is an admin
 * @param {string} id
 * @returns {Promise<boolean>}
 */
const isAdmin = async id => {
  const user = await findById(id)

  if (!user) {
    return false
  } else {
    return user.permissions.level === 'admin'
  }
}

/**
 * Get diagrams of all users
 * @returns {Promise<Array<DBDiagram>>}
 */
const getAllDiagrams = async () => {
  try {
    const db = getConnection()
    const diagramCollection = db.get('diagrams')

    const diagramList = await diagramCollection.find()

    await db.close()

    return diagramList
  } catch (error) {
    console.error(error)

    return []
  }
}

/**
 * Get nodes of all users
 * @returns {Promise<Array<DBDiagramNode>>}
 */
const getAllNodes = async () => {
  try {
    const db = getConnection()
    const nodeCollection = db.get('diagramNodes')

    const nodeList = await nodeCollection.find()

    await db.close()

    return nodeList
  } catch (error) {
    console.error(error)

    return []
  }
}

/**
 * Admin access to any diagram by its id
 * @param {string} id
 * @returns {Promise<DBDiagram>}
 */
const getDiagramById = async id => {
  try {
    const db = getConnection()
    const diagramCollection = db.get('diagrams')

    const diagram = await diagramCollection.findOne({ _id: id })

    await db.close()

    return diagram
  } catch (error) {
    console.error(error)

    return null
  }
}

/**
 * Admin access to any node by its id
 * @param {string} id
 * @returns {Promise<DBDiagramNode>}
 */
const getNodeById = async id => {
  try {
    const db = getConnection()
    const nodeCollection = db.get('diagramNodes')

    const node = await nodeCollection.findOne({ _id: id })

    await db.close()

    return node
  } catch (error) {
    console.error(error)

    return null
  }
}

/**
 * Admin access to any list of nodes by their ids
 * @param {Array<string>} ids
 * @returns {Promise<Array<DBDiagramNode>>}
 */
const getNodeListByIds = async ids => {
  try {
    const db = getConnection()
    const nodeCollection = db.get('diagramNodes')

    const nodeList = await Promise.all(
      ids.map(id => nodeCollection.findOne({ _id: id }))
    )

    await db.close()

    return nodeList.filter(node => node !== null)
  } catch (error) {
    console.error(error)

    return []
  }
}

module.exports = {
  isAdmin,
  getAllDiagrams,
  getAllNodes,
  getDiagramById,
  getNodeById,
  getNodeListByIds
}
