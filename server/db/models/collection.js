const Sequelize = require('sequelize')
const db = require('../db')

const Collection = db.define('collection', {
  name: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.ENUM('collection', 'wantlist', 'custom')
  }
})

module.exports = Collection
