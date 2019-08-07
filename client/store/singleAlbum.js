const dis = require('../../server/api/discogs')

/**
 * ACTION TYPES
 */
const SET_ALBUM = 'SET_ALBUM'

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * ACTION CREATORS
 */
const setAlbum = album => ({
  type: SET_ALBUM,
  album
})

export const getSingleAlbum = albumId => async dispatch => {
  try {
    const album = await dis.getRelease(albumId)
    const newAlbum = {
      id: album.id,
      name: album.title,
      artist: album.artists_sort,
      imageUrl: album.images[0],
      genre: album.genres[0],
      styles: album.styles,
      country: album.country,
      label: album.labels[0],
      tracklist: album.tracklist, // Albums store doesn't have this field only in single album
      year: album.year
    }
    dispatch(setAlbum(newAlbum))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ALBUM:
      return action.album
    default:
      return state
  }
}
