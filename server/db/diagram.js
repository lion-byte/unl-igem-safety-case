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
 * @property {Array<string>} [children]
 */

/**
 * @param {DBDiagram} diagram
 */
const createDiagram = async diagram => {
  const {
    ownerId,
    description = '',
    height = 960,
    rootGoalId = null,
    title = 'Diagram',
    width = 1260
  } = diagram

  if (!ownerId) {
    return false
  }

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

  db.close()

  return item ? item._id : null
}

/**
 * @param {DBDiagramNode} node
 */
const createNode = async node => {
  const { ownerId, type, name = '', statement = '' } = node

  if (!ownerId) {
    return false
  }

  const db = getConnection()
  const nodeCollection = db.get('diagramNodes')

  const item = await nodeCollection.insert({
    ownerId,
    type,
    name,
    statement,
    children: type === 'goal' || type === 'strategy' ? [] : null
  })

  db.close()

  return item ? item._id : null
}

/**
 * @param {object} opts
 * @param {string} opts.ownerId
 * @returns {Promise<Array<DBDiagram>>}
 */
const getAllDiagrams = async opts => {
  const { ownerId } = opts

  const db = getConnection()
  const diagramCollection = db.get('diagrams')

  const diagramList = await diagramCollection.find({ ownerId })
  db.close()

  return diagramList
}

/**
 * @param {object} opts
 * @param {string} opts.ownerId
 * @returns {Promise<Array<DBDiagramNode>>}
 */
const getAllNodes = async opts => {
  const { ownerId } = opts

  const db = getConnection()
  const nodeCollection = db.get('diagramNodes')

  const nodeList = await nodeCollection.find({ ownerId })
  db.close()

  return nodeList
}

/**
 * @param {object} opts
 * @param {string} opts.ownerId
 * @param {string} opts.id
 * @returns {Promise<DBDiagram>}
 */
const getDiagramById = async opts => {
  const { id, ownerId } = opts

  const db = getConnection()
  const diagramCollection = db.get('diagrams')

  const diagram = await diagramCollection.findOne({ _id: id, ownerId })
  db.close()

  return diagram
}

/**
 * @param {object} opts
 * @param {string} opts.ownerId
 * @param {string} opts.id
 * @returns {Promise<DBDiagramNode>}
 */
const getNodeById = async opts => {
  const { id, ownerId } = opts
  const db = getConnection()
  const nodeCollection = db.get('diagramNodes')

  const node = await nodeCollection.findOne({ _id: id, ownerId })
  db.close()

  return node
}

/**
 * @param {object} opts
 * @param {string} opts.ownerId
 * @param {Array<string>} opts.ids
 * @returns {Promise<Array<DBDiagramNode>>}
 */
const getNodeListByIds = async opts => {
  const { ids, ownerId } = opts

  const db = getConnection()
  const nodeCollection = db.get('diagramNodes')

  const nodeList = await Promise.all(
    ids.map(id => nodeCollection.findOne({ _id: id, ownerId }))
  )

  db.close()

  return nodeList.filter(node => node !== null)
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

  const db = getConnection()
  const nodeCollection = db.get('diagramNodes')

  const { _id, ...rest } = {
    ...parent,
    children: parent.children.concat([childId])
  }

  await nodeCollection.update({ _id: parentId }, { ...rest })

  db.close()

  return true
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

  const db = getConnection()
  const nodeCollection = db.get('diagramNodes')

  const { _id, ...rest } = {
    ...parent,
    children: parent.children.filter(nodeId => nodeId !== childId)
  }

  await nodeCollection.update({ _id: parentId }, { ...rest })

  db.close()
  return true
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

  const db = getConnection()
  const diagramCollection = db.get('diagrams')

  const { _id, ...rest } = {
    ...diagram,
    ...updates
  }

  await diagramCollection.findOneAndUpdate({ _id: id, ownerId }, { ...rest })

  db.close()

  return true
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

  const db = getConnection()
  const nodeCollection = db.get('diagramNodes')

  const { _id, ...rest } = { ...node, ...updates }

  nodeCollection.findOneAndUpdate({ _id: id, ownerId }, { ...rest })

  db.close()

  return true
}

/**
 * @param {object} opts
 * @param {string} opts.ownerId
 * @param {string} opts.id
 */
const deleteDiagram = async opts => {
  const { id, ownerId } = opts

  const db = getConnection()
  const diagramCollection = db.get('diagrams')

  const { result } = await diagramCollection.remove({ _id: id, ownerId })

  console.log(result)

  db.close()
  return true
}

/**
 * @param {object} opts
 * @param {string} opts.ownerId
 * @param {string} opts.id
 */
const deleteNode = async opts => {
  const { id, ownerId } = opts

  const db = getConnection()
  const diagramCollection = db.get('diagramNodes')

  await diagramCollection.remove({ _id: id, ownerId })

  db.close()
  return true
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
