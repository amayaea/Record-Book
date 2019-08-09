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

// Helper function to get identifiers like barcode
// const getIdenentifiers = array => {
//   const filter = array.filter(iden => {
//     return iden.type.toLowerCase() === 'barcode'
//   })
//   if (filter.length === 0 || filter.length > 1) return array[0]
//   else return filter
// }

export const getSingleAlbum = (albumId, master) => async dispatch => {
  try {
    let album = {}
    if (master) {
      album = await dis.getMaster(albumId)
    } else album = await dis.getRelease(albumId)
    let identifier
    if (album.identifiers.length > 0) identifier = album.identifiers[0].value
    else identifier = undefined
    const newAlbum = {
      id: album.id,
      masterId: album.master_id,
      identifier: identifier,
      name: album.title,
      artist: album.artists_sort,
      imageUrl: album.images[0].resource_url,
      genre: album.genres[0],
      styles: album.styles,
      country: album.country,
      labels: album.labels,
      // Albums store doesn't have this field only in single album
      // Also we aren't going to store tracklist in our database when users add records to collection
      // Will have to make a request to see the tracklist if the user cares to view it from their
      tracklist: album.tracklist,
      year: album.year,
      formats: album.formats[0].descriptions,
      notes: album.notes
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
