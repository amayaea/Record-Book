const Sequelize = require('sequelize')
const db = require('../db')

const Collection = db.define('collection', {
  name: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.ENUM('album', 'record')
  }
})

module.exports = Collection
