import axios from 'axios'
require('../../secrets')
const _ = require('lodash')

const apiKey = process.env.LASTFM_API_KEY
const rootUrl = 'http://ws.audioscrobbler.com/2.0/'

/**
 * ACTION TYPES
 */
const SET_ALBUMS = 'SET_ALBUMS'
const SORT_ALBUMS = 'SORT_ALBUMS'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const setAlbums = albums => ({
  type: SET_ALBUMS,
  albums
})

export const sortAlbums = sortKey => ({
  type: SORT_ALBUMS,
  sortKey
})

/**
 * THUNK CREATORS
 */
export const searchAlbums = search => async dispatch => {
  try {
    const query = `${rootUrl}?method=album.search&album=${search}&api_key=${apiKey}&format=json&limit=26`
    const searchResults = await axios.get(query)
    const albums = searchResults.data.results.albummatches.album
    dispatch(
      setAlbums(
        // A lot going on here, just santizing the results to only store the data that we actually need in the app
        albums
          .filter(
            album => album.name !== '(null)' && album.image[0]['#text'] !== ''
          )
          .map(album => {
            const newAlbum = {
              name: album.name,
              artist: album.artist,
              imageUrl: album.image[3]['#text'],
              mbid: album.mbid
            }
            return newAlbum
          })
      )
    )
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ALBUMS:
      return action.albums
    case SORT_ALBUMS:
      return _.sortBy(state, [action.sortKey])
    default:
      return state
  }
}
