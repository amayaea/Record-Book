const router = require('express').Router()
const {User, Collection, Format, Album} = require('../db/models')
module.exports = router
const Sequelize = require('sequelize')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'userName', 'name']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/recs', async (req, res, next) => {
  try {
    const recs = await req.user.getRecs()
    // console.log(recs)
    // const albums = await Album.findAll({
    //   where: {
    //     id: {
    //       [Sequelize.Op.in]: recs
    //     }
    //   },
    //   include: [{model: Format}]
    // })
    res.send(recs)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {id: req.params.userId},
      include: [{model: Collection}]
    })
    res.send(user)
  } catch (err) {
    next(err)
  }
})
