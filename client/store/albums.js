const _ = require('lodash')
const dis = require('../../server/api/discogs')

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
    const data = await dis.search(search)
    const results = data.results
    dispatch(
      setAlbums(
        // A lot going on here, just santizing the results to only store the data that we actually need in the app
        results.filter(result => result.type === 'release').map(album => {
          const artistName = album.title.substring(
            0,
            album.title.indexOf('-') - 1
          )

          const albumName = album.title.substring(album.title.indexOf('-') + 2)
          const newAlbum = {
            id: album.id,
            masterId: album.master_id,
            name: albumName,
            artist: artistName,
            imageUrl: album.cover_image,
            genre: album.genre,
            styles: album.style,
            country: album.country,
            label: album.label,
            year: album.year,
            format: album.format
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
