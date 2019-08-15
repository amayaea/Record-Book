const router = require('express').Router()
const {
  Collection,
  Album,
  Record,
  Genre,
  Style,
  Label,
  Format,
  albumStyle,
  albumLabel,
  albumFormat,
  albumGenre
} = require('../db/models')
const racoon = require('./racoon')

// Get all collections from a certain user
router.get('/', async (req, res, next) => {
  try {
    const collections = await Collection.findAll({
      where: {userId: req.user.id},
      include: [
        {
          model: Record,
          include: [
            {model: Album, include: [{model: Format, attributes: ['name']}]}
          ]
        }
      ],
      order: [['type', 'ASC']]
    })
    res.send(collections)
  } catch (err) {
    next(err)
  }
})

// Gets most popular albums across entire platform
router.get('/most-popular', async (req, res, next) => {
  try {
    const pop = await racoon.mostLiked()
    res.send(pop)
  } catch (err) {
    next(err)
  }
})

// Gets most best rated albums across entire platform
router.get('/best-rated', async (req, res, next) => {
  try {
    const best = await racoon.bestRated()
    res.send(best)
  } catch (err) {
    next(err)
  }
})

// Helper method to find the correct collection to add to
const findCollection = async (userId, collectionType) => {
  const collection = await Collection.findOne({
    where: {type: collectionType, userId: userId}
  })
  return collection
}

// Helper method to find or create album
// Also assigned all many-to-many associations for the album if created
const createAlbum = async (collection, album) => {
  const [instance, wasCreated] = await Album.findOrCreate({
    where: {id: album.id}
  })
  if (wasCreated) {
    await instance.update({
      masterId: album.masterId,
      name: album.name,
      artist: album.artist,
      imageUrl: album.imageUrl,
      country: album.country,
      year: album.year
    })

    // Assigning all the many-to-many relationships
    if (album.genre) {
      await Promise.all(
        album.genre.map(async genre => {
          const genreInstance = await Genre.findOrCreate({where: {name: genre}})
          await albumGenre.create({
            albumId: instance.id,
            genreId: genreInstance[0].dataValues.id
          })
        })
      )
    }
    if (album.styles) {
      await Promise.all(
        album.styles.map(async style => {
          const styleInstance = await Style.findOrCreate({where: {name: style}})
          await albumStyle.create({
            albumId: instance.id,
            styleId: styleInstance[0].dataValues.id
          })
        })
      )
    }
    if (album.label) {
      await Promise.all(
        album.label.map(async label => {
          const labelInstance = await Label.findOrCreate({where: {name: label}})
          await albumLabel.create({
            albumId: instance.id,
            labelId: labelInstance[0].dataValues.id
          })
        })
      )
    }
    if (album.format) {
      await Promise.all(
        album.format.map(async format => {
          const formatInstance = await Format.findOrCreate({
            where: {name: format}
          })
          await albumFormat.create({
            albumId: instance.id,
            formatId: formatInstance[0].dataValues.id
          })
        })
      )
    }
  }
  return instance
}

// Adds an album to a collection
router.put('/', async (req, res, next) => {
  try {
    const collection = await findCollection(req.user.id, req.body.collection)
    const album = await createAlbum(collection, req.body.album)
    const [instance, wasCreated] = await Record.findOrCreate({
      where: {
        albumId: album.id,
        collectionId: collection.id
      }
    })
    if (req.body.recordInfo) {
      await instance.update(req.body.recordInfo)
      // If record existed in wantlist and is moved to collection then delete from wantlist
      const wantlist = await findCollection(req.user.id, 'wantlist')
      await Record.destroy({
        where: {collectionId: wantlist.dataValues.id, albumId: instance.albumId}
      })
    }
    res.status(201).send('record added')
  } catch (err) {
    next(err)
  }
})

// Deletes a record from a collection
router.delete('/:recordId', async (req, res, next) => {
  try {
    await Record.destroy({
      where: {id: req.params.recordId}
    })
    res.status(204).send('record deleted')
  } catch (err) {
    next(err)
  }
})

module.exports = {router, createAlbum}
