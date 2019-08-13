const Sequelize = require('sequelize')
const db = require('../db')

const Record = db.define('record', {
  sleeveCondition: {
    type: Sequelize.ENUM('M', 'NM', 'VG+', 'VG', 'G+', 'G', 'P', 'F')
  },
  mediaCondition: {
    type: Sequelize.ENUM('M', 'NM', 'VG+', 'VG', 'G+', 'G', 'P', 'F')
  },
  datePurchased: {
    type: Sequelize.DATE
  },
  like: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = Record
