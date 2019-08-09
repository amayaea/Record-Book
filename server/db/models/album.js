const Sequelize = require('sequelize')
const db = require('../db')

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
  genre: {
    type: Sequelize.STRING
  },
  country: {
    type: Sequelize.STRING
  },
  year: {
    type: Sequelize.INTEGER
  },
  identifier: {
    type: Sequelize.INTEGER
  },
  notes: {
    type: Sequelize.TEXT
  }
})

module.exports = Album
