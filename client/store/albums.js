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
    console.log(albums)
    dispatch(
      setAlbums(
        albums.filter(
          album => album.name !== '(null)' && album.image[0]['#text'] !== ''
        )
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
      console.log(' in sort')
      return _.sortBy(state, [action.sortKey])
    default:
      return state
  }
}
