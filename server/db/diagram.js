const { getConnection } = require('./connection')

/**
 * @typedef {object} DBDiagram
 * @property {string} [_id]
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
    description = '',
    height = 960,
    rootGoalId = null,
    title = 'Diagram',
    width = 1260
  } = diagram

  const db = getConnection()
  const diagramCollection = db.get('diagrams')

  const item = await diagramCollection.insert({
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
  const { type, name = '', statement = '' } = node

  const db = getConnection()
  const nodeCollection = db.get('diagramNodes')

  const item = await nodeCollection.insert({
    type,
    name,
    statement,
    children: type === 'goal' || type === 'strategy' ? [] : null
  })

  db.close()

  return item ? item._id : null
}

/**
 * @returns {Promise<Array<DBDiagram>>}
 */
const getAllDiagrams = async () => {
  const db = getConnection()
  const diagramCollection = db.get('diagrams')

  const diagramList = await diagramCollection.find()
  db.close()

  return diagramList
}

/**
 * @returns {Promise<Array<DBDiagramNode>>}
 */
const getAllNodes = async () => {
  const db = getConnection()
  const nodeCollection = db.get('diagramNodes')

  const nodeList = await nodeCollection.find()
  db.close()

  return nodeList
}

/**
 * @param {string} id
 * @returns {Promise<DBDiagram>}
 */
const getDiagramById = async id => {
  const db = getConnection()
  const diagramCollection = db.get('diagrams')

  const diagram = await diagramCollection.findOne({ _id: id })
  db.close()

  return diagram
}

/**
 * @param {string} id
 * @returns {Promise<DBDiagramNode>}
 */
const getNodeById = async id => {
  const db = getConnection()
  const nodeCollection = db.get('diagramNodes')

  const node = await nodeCollection.findOne({ _id: id })
  db.close()

  return node
}

/**
 * @param {Array<string>} ids
 * @returns {Promise<Array<DBDiagramNode>>}
 */
const getNodeListByIds = async ids => {
  const db = getConnection()
  const nodeCollection = db.get('diagramNodes')

  const nodeList = await Promise.all(
    ids.map(id => nodeCollection.findOne({ _id: id }))
  )

  db.close()

  return nodeList.filter(node => node !== null)
}

/**
 * @param {string} parentId
 * @param {string} childId
 */
const addChildNode = async (parentId, childId) => {
  const [parent, child] = await getNodeListByIds([parentId, childId])

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
 * @param {string} parentId
 * @param {string} childId
 */
const removeChildNode = async (parentId, childId) => {
  const parent = await getNodeById(parentId)

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
 * @param {string} id
 * @param {DBDiagram} updates
 */
const updateDiagram = async (id, updates) => {
  const diagram = await getDiagramById(id)

  if (!diagram) {
    return false
  }

  const db = getConnection()
  const diagramCollection = db.get('diagrams')

  const { _id, ...rest } = {
    ...diagram,
    ...updates
  }

  await diagramCollection.findOneAndUpdate({ _id: id }, { ...rest })

  db.close()

  return true
}

/**
 * @param {string} id
 * @param {DBDiagramNode} updates
 */
const updateNode = async (id, updates) => {
  const node = await getNodeById(id)

  if (!node) {
    return false
  }

  const db = getConnection()
  const nodeCollection = db.get('diagramNodes')

  const { _id, ...rest } = { ...node, ...updates }

  nodeCollection.findOneAndUpdate({ _id: id }, { ...rest })

  db.close()

  return true
}

/**
 * @param {string} id
 */
const deleteDiagram = async id => {
  const db = getConnection()
  const diagramCollection = db.get('diagrams')

  const { result } = await diagramCollection.remove({ _id: id })

  console.log(result)

  db.close()
  return true
}

/**
 * @param {string} id
 */
const deleteNode = async id => {
  const db = getConnection()
  const diagramCollection = db.get('diagramNodes')

  await diagramCollection.remove({ _id: id })

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
