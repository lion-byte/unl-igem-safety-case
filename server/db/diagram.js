const { getConnection } = require('./connection')

/**
 * @typedef {object} DBDiagram
 * @property {string} [description]
 * @property {number} [height]
 * @property {any} [rootGoalId]
 * @property {PublishStatus} [status]
 * @property {string} [title]
 * @property {number} [width]
 */

/**
 * @typedef {object} DBDiagramNode
 * @property {NodeType} [type]
 * @property {string} [name]
 * @property {string} [statement]
 * @property {Array<any>} [children]
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

  await diagramCollection.insert({
    description,
    height,
    rootGoalId,
    status: 'draft',
    title,
    width
  })

  db.close()
  return true
}

/**
 * @param {DBDiagramNode} node
 */
const createNode = async node => {
  const { type, name = '', statement = '' } = node

  const db = getConnection()
  const nodeCollection = db.get('diagramNodes')

  await nodeCollection.insert({
    type,
    name,
    statement,
    children: type === 'goal' || type === 'strategy' ? [] : null
  })

  db.close()

  return true
}

/**
 * @returns {Promise<Array<DBDiagram>>}
 */
const getAllDiagrams = async () => {
  const db = getConnection()
  const diagramCollection = db.get('diagrams')

  const diagramList = await diagramCollection.find({})
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
 * @param {any} id
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
 * @param {any} id
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
 * @param {Array<any>} ids
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
 * @param {any} parentId
 * @param {any} childId
 */
const addChildNode = async (parentId, childId) => {
  const [parent, child] = await getNodeListByIds([parentId, childId])

  // Check for valid inputs
  if (!parent || !child) {
    return false
  } else if (parent.type !== 'goal' && parent.type !== 'strategy') {
    return false
  }

  const db = getConnection()
  const nodeCollection = db.get('diagramNodes')

  const newChildList =
    parent.children === null ? [childId] : [...parent.children, childId]

  await nodeCollection.update({ _id: parentId }, { children: newChildList })

  db.close()
  return true
}

/**
 * @param {any} parentId
 * @param {any} childId
 */
const removeChildNode = async (parentId, childId) => {
  const parent = await getNodeById(parentId)

  if (!parent) {
    return false
  } else if (parent.children === null) {
    return false
  }

  const db = getConnection()
  const nodeCollection = db.get('diagramNodes')

  const newChildList = parent.children.filter(node => node.id !== childId)

  await nodeCollection.update({ _id: parentId }, { children: newChildList })

  db.close()
  return true
}

/**
 * @param {any} id
 * @param {DBDiagram} updates
 */
const updateDiagram = async (id, updates) => {
  const diagram = await getDiagramById(id)

  if (!diagram) {
    return false
  }

  const db = getConnection()
  const diagramCollection = db.get('diagrams')

  const { description, height, rootGoalId, status, title, width } = diagram

  await diagramCollection.findOneAndUpdate(
    { _id: id },
    { description, height, rootGoalId, status, title, width }
  )

  db.close()
  return true
}

/**
 * @param {any} id
 * @param {DBDiagramNode} updates
 */
const updateNode = async (id, updates) => {
  const node = await getNodeById(id)

  if (!node) {
    return false
  }

  const db = getConnection()
  const nodeCollection = db.get('diagramNodes')

  const { name, statement } = node

  nodeCollection.findOneAndUpdate({ _id: id }, { name, statement })

  db.close()
  return true
}

/**
 * @param {any} id
 */
const deleteDiagram = async id => {
  const db = getConnection()
  const diagramCollection = db.get('diagrams')

  await diagramCollection.remove({ _id: id })

  db.close()
  return true
}

/**
 * @param {any} id
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
