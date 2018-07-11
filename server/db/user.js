const { createHmac, randomBytes } = require('crypto')

const { getConnection } = require('./connection')

/**
 * @param {string} email
 * @returns {Promise<any>}
 */
const findByEmail = async email => {
  const db = getConnection()
  const userCollection = db.get('users')

  const account = await userCollection.findOne({ email })
  db.close()

  return account
}

/**
 * @param {string} username
 * @returns {Promise<any>}
 */
const findByUsername = async username => {
  const db = getConnection()
  const userCollection = db.get('users')

  const account = await userCollection.findOne({ username })
  db.close()

  return account
}

/**
 * @param {number} length
 * @returns {string}
 */
const genSalt = length =>
  randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length)

/**
 * @param {string} password
 * @param {string} salt
 * @returns {string}
 */
const hashPassword = (password, salt) => {
  const hash = createHmac('sha512', salt)
  hash.update(password)

  return hash.digest('hex')
}

/**
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @returns {Promise<boolean>}
 */
const register = async (username, email, password) => {
  if ((await findByEmail(email)) !== null) {
    return false
  }

  const db = getConnection()
  const userCollection = db.get('users')

  const salt = genSalt(16)
  const passwordHash = hashPassword(password, salt)

  const permissions = {
    level: 'USER',
    canRead: true,
    canWrite: true
  }

  await userCollection.insert({
    username,
    email,
    passwordHash,
    salt,
    permissions
  })

  db.close()

  return true
}

/**
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{isValid: boolean, account: any}>}
 */
const validate = async (email, password) => {
  const user = await findByEmail(email)

  if (user === null) {
    return { isValid: false, account: null }
  }

  const { passwordHash, salt } = user

  if (passwordHash === hashPassword(password, salt)) {
    return { isValid: true, account: user }
  } else {
    return { isValid: false, account: null }
  }
}

module.exports = { findByEmail, findByUsername, register, validate }
