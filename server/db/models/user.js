const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const Collection = require('./collection')
const raccoon = require('../../api/racoon')
const Album = require('./album')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  userName: {
    type: Sequelize.STRING
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

const createCollections = async (user, options) => {
  console.log(options)
  console.log('user', user.id)
  // console.log('req', req.user.id)
  const collections = [
    {userId: user.id, type: 'collection'},
    {userId: user.id, type: 'wantlist'}
  ]
  const {transaction} = options
  await Collection.create(collections[0], {transaction})
  await Collection.create(collections[1], {transaction})
}

User.beforeCreate(setSaltAndPassword)
User.afterCreate(createCollections)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})

// Prototype method to get reccomendations for user
User.prototype.getRecs = async function() {
  const albumIds = await raccoon.recommendFor(this.id, 20)
  return Album.findAll({
    where: {
      id: {
        [Sequelize.Op.in]: albumIds
      }
    }
  })
}
