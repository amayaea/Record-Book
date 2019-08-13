const User = require('./user')
const Collection = require('./collection')
const Record = require('./record')
const Album = require('./album')
const Style = require('./style')
const Label = require('./label')
const Format = require('./format')
const Genre = require('./genre')
const albumGenre = require('./albumGenre')
const albumFormat = require('./albumFormat')
const albumLabel = require('./albumLabel')
const albumStyle = require('./albumStyle')

User.hasMany(Collection)
Collection.belongsTo(User)

Collection.hasMany(Record)
Record.belongsTo(Collection)

Album.hasMany(Record)
Record.belongsTo(Album)

Album.belongsToMany(Style, {through: albumStyle})
Style.belongsToMany(Album, {through: albumStyle})
Album.belongsToMany(Label, {through: albumLabel})
Label.belongsToMany(Album, {through: albumLabel})
Album.belongsToMany(Format, {through: albumFormat})
Format.belongsToMany(Album, {through: albumFormat})
Album.belongsToMany(Genre, {through: albumGenre})
Genre.belongsToMany(Album, {through: albumGenre})

module.exports = {
  User,
  Collection,
  Record,
  Album,
  Style,
  Label,
  Format,
  Genre,
  albumStyle,
  albumLabel,
  albumFormat,
  albumGenre
}
