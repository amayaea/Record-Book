const Sequelize = require('sequelize')
const db = require('../db')

const Collection = db.define('collection', {
  type: {
    type: Sequelize.ENUM('collection', 'wantlist', 'custom')
  }
})

module.exports = Collection
