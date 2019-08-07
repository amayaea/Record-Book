require('../../secrets')

const Discogs = require('disconnect').Client
module.exports = new Discogs({
  consumerKey: process.env.DISCOGS_CONSUMER_KEY,
  consumerSecret: process.env.DISCOGS_CONSUMER_SECRET
}).database()
