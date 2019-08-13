const Sequelize = require('sequelize')
const db = require('../db')
const raccoon = require('../../api/racoon')

const Album = db.define('album', {
  masterId: {
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  },
  artist: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  country: {
    type: Sequelize.STRING
  },
  year: {
    type: Sequelize.INTEGER
  }
})

module.exports = Album
