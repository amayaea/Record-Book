const Sequelize = require('sequelize')
const db = require('../db')
const raccoon = require('../../api/racoon')

const Record = db.define('record', {
  sleeveCondition: {
    type: Sequelize.ENUM('M', 'NM', 'VG+', 'VG', 'G+', 'G', 'P', 'F')
  },
  mediaCondition: {
    type: Sequelize.ENUM('M', 'NM', 'VG+', 'VG', 'G+', 'G', 'P', 'F')
  },
  like: {
    type: Sequelize.BOOLEAN
  }
})

// Sequelize hooks to implement racoon recommendation engine
Record.afterCreate(async record => {
  const collection = await record.getCollection()
  const user = await collection.getUser()
  if (record.like === true || undefined)
    await raccoon.liked(user.id, record.albumId)
  else await raccoon.disliked(user.id, record.albumId)
})

Record.afterUpdate(async record => {
  const collection = await record.getCollection()
  const user = await collection.getUser()
  const prev = record._previousDataValues
  if (prev.like === false && record.like === true) {
    // undislike and like
    await raccoon.undisliked(user.id, record.albumId)
    await raccoon.liked(user.id, record.albumId)
  }
  if ((prev.like === true || undefined) && record.like === false) {
    // unlike and dislike
    await raccoon.unliked(user.id, record.albumId)
    await raccoon.disliked(user.id, record.albumId)
  }
})

Record.afterDestroy(async record => {
  const collection = await record.getCollection()
  const user = await collection.getUser()
  if (record.like === true || undefined) {
    //unlike
    await raccoon.unliked(user.id, record.albumId)
  } else {
    //undislike
    await raccoon.undisliked(user.id, record.albumId)
  }
})

module.exports = Record
