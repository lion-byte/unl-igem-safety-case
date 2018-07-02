const { createHmac, randomBytes } = require('crypto')

const { db } = require('./connection')

/**
 * @param {string} username
 * @returns {Promise<any>}
 */
const findByUsername = username => {
  const userCollection = db.get('users')

  return userCollection.findOne({ username })
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
 * @param {string} password
 * @returns {Promise<void>}
 */
const register = (username, password) => {
  const userCollection = db.get('users')

  const salt = genSalt(16)
  const passwordHash = hashPassword(password, salt)

  return userCollection.insert({
    username,
    passwordHash,
    salt
  })
}

/**
 * @param {string} username
 * @param {string} password
 * @returns {Promise<boolean>}
 */
const validate = (username, password) => {
  return findByUsername(username).then(user => {
    const { passwordHash, salt } = user

    return Promise.resolve(passwordHash === hashPassword(password, salt))
  })
}

module.exports = { register, validate }
