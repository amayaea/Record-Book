const Sequelize = require('sequelize')
const db = require('../db')

const Label = db.define('label', {
  name: {
    type: Sequelize.STRING
  }
})

module.exports = Label
