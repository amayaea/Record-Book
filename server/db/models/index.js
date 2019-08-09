const User = require('./user')
const Collection = require('./collection')
const Record = require('./record')
const Album = require('./album')
const Style = require('./style')
const Label = require('./label')
const Format = require('./format')

User.hasMany(Collection)
Collection.belongsTo(User)

Collection.hasMany(Record)
Record.belongsTo(Collection)

Album.hasMany(Record)
Record.belongsTo(Album)

Album.belongsToMany(Style, {through: 'albumStyle'})
Style.belongsToMany(Album, {through: 'albumStyle'})
Album.belongsToMany(Label, {through: 'albumLabel'})
Label.belongsToMany(Album, {through: 'albumLabel'})
Album.belongsToMany(Format, {through: 'albumFormat'})
Format.belongsToMany(Album, {through: 'albumFormat'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Collection,
  Record,
  Album,
  Style,
  Label,
  Format
}
