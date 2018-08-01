const { getConnection } = require('./connection')

/**
 * @param {DBDiagram} diagram
 */
const createDiagram = async diagram => {
  const {
    ownerId,
    title = 'Diagram',
    description = '',
    rootGoalId = null,
    height = 400,
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
      title,
      rootGoalId,
      status: 'published',
      height,
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
    parent = null,
    height = 50,
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
      parent,
      children: type === 'goal' || type === 'strategy' ? [] : null,
      height,
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

    const { _id, ...restParent } = {
      ...parent,
      children: parent.children.concat([childId])
    }
    const { _id: __id, ...restChild } = { ...child, parent: parentId }

    const [parentResult, childResult] = await Promise.all([
      nodeCollection.update({ _id: parentId }, { ...restParent }),
      nodeCollection.update({ _id: childId }, { ...restChild })
    ])

    await db.close()

    return parentResult.ok === 1 && childResult.ok === 1
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

  const [parent, child] = await getNodeListByIds({
    ownerId,
    ids: [parentId, childId]
  })

  if (!parent || !child) {
    return false
  } else if (!Array.isArray(parent.children)) {
    return false
  }

  try {
    const db = getConnection()
    const nodeCollection = db.get('diagramNodes')

    const { _id, ...parentRest } = {
      ...parent,
      children: parent.children.filter(nodeId => nodeId !== childId)
    }

    const { _id: __id, ...childRest } = { ...child, parent: null }

    const [parentResult, childResult] = await Promise.all([
      nodeCollection.update({ _id: parentId }, { ...parentRest }),
      nodeCollection.update({ _id: childId }, { ...childRest })
    ])

    await db.close()

    return parentResult.ok === 1 && childResult.ok === 1
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

  const diagram = await getDiagramById({ ownerId, id })

  if (!diagram) {
    return false
  }

  if (diagram.rootGoalId) {
    // Delete the nodes associated with this diagram
    await deleteBranchRecursive({ ownerId, id: diagram.rootGoalId })
  }

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

  const { parent } = await getNodeById({ ownerId, id })

  if (typeof parent === 'string') {
    // Detaches branch from the diagram before deleting
    await removeChildNode({ ownerId, parentId: parent, childId: id })
  } else {
    // Deletes entire diagram if the root node is being deleted
    try {
      const db = getConnection()
      const diagramCollection = db.get('diagrams')

      await diagramCollection.remove({
        ownerId,
        rootGoalId: id
      })
    } catch (error) {
      console.error(error)
    }
  }

  return deleteBranchRecursive({ ownerId, id })
}

/**
 * Recursively deletes the node and any children below it
 * @param {object} opts
 * @param {string} opts.ownerId
 * @param {string} opts.id
 */
const deleteBranchRecursive = async opts => {
  const { id, ownerId } = opts

  const { children } = await getNodeById({ ownerId, id })

  if (Array.isArray(children)) {
    await Promise.all(
      children.map(childId => deleteBranchRecursive({ ownerId, id: childId }))
    )
  }

  try {
    const db = getConnection()
    const nodeCollection = db.get('diagramNodes')

    const { result } = await nodeCollection.remove({ _id: id, ownerId })

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
