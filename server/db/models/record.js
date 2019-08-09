const Sequelize = require('sequelize')
const db = require('../db')

const Record = db.define('record', {
  sleeveCondition: {
    type: Sequelize.ENUM(
      'mint',
      'nearMint',
      'veryGoodPlus',
      'veryGood',
      'goodPlus',
      'good',
      'poor',
      'fair'
    )
  },
  mediaCondition: {
    type: Sequelize.ENUM(
      'mint',
      'nearMint',
      'veryGoodPlus',
      'veryGood',
      'goodPlus',
      'good',
      'poor',
      'fair'
    )
  },
  datePurchased: {
    type: Sequelize.DATE
  },
  format: {
    type: Sequelize.ENUM('vinyl', 'CD', 'cassette')
  }
})

module.exports = Record
