'use strict'

const db = require('../server/db')
const {User, Record, Collection, Album} = require('../server/db/models')
const {createAlbum} = require('../server/api/collection')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // Seed file does not give true album data but is used to test racoon.

  const users = await Promise.all([
    User.create({email: '1@email.com', password: '123'}),
    User.create({email: '2@email.com', password: '123'}),
    User.create({email: '3@email.com', password: '123'}),
    User.create({email: '4@email.com', password: '123'}),
    User.create({email: '5@email.com', password: '123'}),
    User.create({email: '6@email.com', password: '123'})
  ])

  // jimi hendrix like albums
  const hendrix = [
    1435384,
    2237319,
    399579,
    367104,
    526319,
    1182335,
    5734419,
    2498807,
    7097051,
    499497
  ]

  // houses of the holy like albums
  const houses = [
    577498,
    1182335,
    5734419,
    2704479,
    526569,
    463597,
    495664,
    556030,
    3492494,
    409199
  ]

  // magical mystery tour like albums
  const magical = [
    464292,
    377554,
    2498807,
    526351,
    1044287,
    2911293,
    1108650,
    1436445
  ]

  // congratulations by MGMT like albums
  const congrats = [
    2591885,
    4570366,
    1304590,
    3937552,
    2440818,
    667892,
    623525,
    6900583,
    2606952
  ]

  // demon days like albums
  const demon = [
    474703,
    4570366,
    10175557,
    152332,
    3975953,
    6932044,
    204021,
    242785,
    2606952
  ]

  // to pimp a butterfly like albums
  const tpab = [
    7557957,
    10689178,
    8329749,
    4570366,
    5174308,
    242785,
    233445,
    5528785,
    4842692
  ]
  const collections = [hendrix, houses, magical, congrats, demon, tpab]

  for (let i = 0; i < collections.length; i++) {
    const user = await User.findByPk(i + 1)
    const collection = await Collection.findOne({
      where: {userId: user.id, type: 'wantlist'}
    })
    for (let j = 0; j < collections[i].length; j++) {
      const album = {id: collections[i][j]}
      await createAlbum(null, album)
      await Record.create({
        collectionId: collection.id,
        albumId: collections[i][j]
      })
    }
  }

  // Testing racoon
  for (let i = 1; i < 2; i++) {
    const user = await User.findByPk(i)
    const recs = await user.getRecs()
    console.log(
      recs.map(item => {
        return item.id
      })
    )
  }
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
