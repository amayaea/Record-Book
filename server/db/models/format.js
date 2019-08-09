const Sequelize = require('sequelize')
const db = require('../db')

const Format = db.define('format', {
  name: {
    type: Sequelize.STRING
  }
})

module.exports = Format
