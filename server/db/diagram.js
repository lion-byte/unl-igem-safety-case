const { getConnection } = require('./connection')

/**
 * @typedef {object} DBDiagram
 * @property {string} [_id]
 * @property {string} [ownerId]
 * @property {string} [description]
 * @property {number} [height]
 * @property {string} [rootGoalId]
 * @property {PublishStatus} [status]
 * @property {string} [title]
 * @property {number} [width]
 */

/**
 * @typedef {object} DBDiagramNode
 * @property {string} [_id]
 * @property {string} [ownerId]
 * @property {NodeType} [type]
 * @property {string} [name]
 * @property {string} [statement]
 * @property {number} [height]
 * @property {number} [width]
 * @property {Array<string>} [children]
 */

/**
 * @param {DBDiagram} diagram
 */
const createDiagram = async diagram => {
  const {
    ownerId,
    description = '',
    height = 400,
    rootGoalId = null,
    title = 'Diagram',
    width = 400
  } = diagram

  if (!ownerId) {
    return false
  }

  try {
    const db = getConnection()
    const diagramCollection = db.get('diagrams')

    const item = await diagramCollection.insert({
      ownerId,
      description,
      height,
      rootGoalId,
      status: 'draft',
      title,
      width
    })

    await db.close()

    return item ? item._id : null
  } catch (error) {
    console.error(error)

    return null
  }
}

/**
 * @param {DBDiagramNode} node
 */
const createNode = async node => {
  const {
    ownerId,
    type,
    name = '',
    statement = '',
    height = 40,
    width = 120
  } = node

  if (!ownerId) {
    return false
  }

  try {
    const db = getConnection()
    const nodeCollection = db.get('diagramNodes')

    const item = await nodeCollection.insert({
      ownerId,
      type,
      name,
      statement,
      height,
      width,
      children: type === 'goal' || type === 'strategy' ? [] : null
    })

    await db.close()

    return item ? item._id : null
  } catch (error) {
    console.error(error)

    return null
  }
}

/**
 * @param {object} opts
 * @param {string} opts.ownerId
 * @returns {Promise<Array<DBDiagram>>}
 */
const getAllDiagrams = async opts => {
  const { ownerId } = opts

  try {
    const db = getConnection()
    const diagramCollection = db.get('diagrams')

    const diagramList = await diagramCollection.find({ ownerId })

    await db.close()

    return diagramList
  } catch (error) {
    console.error(error)

    return []
  }
}

/**
 * @param {object} opts
 * @param {string} opts.ownerId
 * @returns {Promise<Array<DBDiagramNode>>}
 */
const getAllNodes = async opts => {
  const { ownerId } = opts

  try {
    const db = getConnection()
    const nodeCollection = db.get('diagramNodes')

    const nodeList = await nodeCollection.find({ ownerId })

    await db.close()

    return nodeList
  } catch (error) {
    console.error(error)

    return []
  }
}

/**
 * @param {object} opts
 * @param {string} opts.ownerId
 * @param {string} opts.id
 * @returns {Promise<DBDiagram>}
 */
const getDiagramById = async opts => {
  const { id, ownerId } = opts

  try {
    const db = getConnection()
    const diagramCollection = db.get('diagrams')

    const diagram = await diagramCollection.findOne({ _id: id, ownerId })

    await db.close()

    return diagram
  } catch (error) {
    console.error(error)

    return null
  }
}

/**
 * @param {object} opts
 * @param {string} opts.ownerId
 * @param {string} opts.id
 * @returns {Promise<DBDiagramNode>}
 */
const getNodeById = async opts => {
  const { id, ownerId } = opts

  try {
    const db = getConnection()
    const nodeCollection = db.get('diagramNodes')

    const node = await nodeCollection.findOne({ _id: id, ownerId })

    await db.close()

    return node
  } catch (error) {
    console.error(error)

    return null
  }
}

/**
 * @param {object} opts
 * @param {string} opts.ownerId
 * @param {Array<string>} opts.ids
 * @returns {Promise<Array<DBDiagramNode>>}
 */
const getNodeListByIds = async opts => {
  const { ids, ownerId } = opts

  try {
    const db = getConnection()
    const nodeCollection = db.get('diagramNodes')

    const nodeList = await Promise.all(
      ids.map(id => nodeCollection.findOne({ _id: id, ownerId }))
    )

    await db.close()

    return nodeList.filter(node => node !== null)
  } catch (error) {
    console.error(error)

    return []
  }
}

/**
 * @param {object} opts
 * @param {string} opts.ownerId
 * @param {string} opts.parentId
 * @param {string} opts.childId
 */
const addChildNode = async opts => {
  const { parentId, childId, ownerId } = opts

  const [parent, child] = await getNodeListByIds({
    ownerId,
    ids: [parentId, childId]
  })

  // Check for valid inputs
  if (!parent || !child) {
    return false
  } else if (!Array.isArray(parent.children)) {
    return false
  }

  try {
    const db = getConnection()
    const nodeCollection = db.get('diagramNodes')

    const { _id, ...rest } = {
      ...parent,
      children: parent.children.concat([childId])
    }

    await nodeCollection.update({ _id: parentId }, { ...rest })

    await db.close()

    return true
  } catch (error) {
    console.error(error)

    return false
  }
}

/**
 * @param {object} opts
 * @param {string} opts.ownerId
 * @param {string} opts.parentId
 * @param {string} opts.childId
 */
const removeChildNode = async opts => {
  const { parentId, childId, ownerId } = opts

  const parent = await getNodeById({ ownerId, id: parentId })

  if (!parent) {
    return false
  } else if (!Array.isArray(parent.children)) {
    return false
  }

  try {
    const db = getConnection()
    const nodeCollection = db.get('diagramNodes')

    const { _id, ...rest } = {
      ...parent,
      children: parent.children.filter(nodeId => nodeId !== childId)
    }

    await nodeCollection.update({ _id: parentId }, { ...rest })

    await db.close()

    return true
  } catch (error) {
    console.error(error)

    return false
  }
}

/**
 * @param {object} opts
 * @param {string} opts.ownerId
 * @param {string} opts.id
 * @param {DBDiagram} opts.updates
 */
const updateDiagram = async opts => {
  const { id, updates, ownerId } = opts

  const diagram = await getDiagramById({ ownerId, id })

  if (!diagram) {
    return false
  }

  const { _id, ...rest } = {
    ...diagram,
    ...updates
  }

  try {
    const db = getConnection()
    const diagramCollection = db.get('diagrams')

    await diagramCollection.update({ _id: id, ownerId }, { ...rest })

    await db.close()

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

/**
 * @param {object} opts
 * @param {string} opts.ownerId
 * @param {string} opts.id
 * @param {DBDiagramNode} opts.updates
 */
const updateNode = async opts => {
  const { id, updates, ownerId } = opts

  const node = await getNodeById({ ownerId, id })

  if (!node) {
    return false
  }

  const { _id, ...rest } = { ...node, ...updates }

  try {
    const db = getConnection()
    const nodeCollection = db.get('diagramNodes')

    await nodeCollection.update({ _id: id, ownerId }, { ...rest })

    await db.close()

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

/**
 * @param {object} opts
 * @param {string} opts.ownerId
 * @param {string} opts.id
 */
const deleteDiagram = async opts => {
  const { id, ownerId } = opts

  try {
    const db = getConnection()
    const diagramCollection = db.get('diagrams')

    const { result } = await diagramCollection.remove({ _id: id, ownerId })

    await db.close()

    return result.ok === 1
  } catch (error) {
    console.error(error)

    return false
  }
}

/**
 * @param {object} opts
 * @param {string} opts.ownerId
 * @param {string} opts.id
 */
const deleteNode = async opts => {
  const { id, ownerId } = opts

  try {
    const db = getConnection()
    const diagramCollection = db.get('diagramNodes')

    const { result } = await diagramCollection.remove({ _id: id, ownerId })

    await db.close()

    return result.ok === 1
  } catch (error) {
    console.error(error)

    return false
  }
}

module.exports = {
  addChildNode,
  createDiagram,
  createNode,
  deleteDiagram,
  deleteNode,
  getAllDiagrams,
  getAllNodes,
  getDiagramById,
  getNodeById,
  getNodeListByIds,
  removeChildNode,
  updateDiagram,
  updateNode
}
