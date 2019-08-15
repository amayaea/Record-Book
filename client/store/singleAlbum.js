const dis = require('../../server/api/discogs')
import axios from 'axios'
const _ = require('lodash/array')
import {getCollections} from '../store'

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

export const getSingleAlbum = (albumId, master) => async dispatch => {
  try {
    let album = {}
    if (master) {
      album = await dis.getMaster(albumId)
    } else album = await dis.getRelease(albumId)

    let identifiers
    if (album.identifiers.length > 0) identifiers = album.identifiers
    else identifiers = undefined

    let notes
    if (album.notes) notes = album.notes.substring(0, 1500)
    else notes = undefined

    let labels = album.labels.map(label => {
      return label.name
    })

    const newAlbum = {
      id: album.id,
      masterId: album.master_id,
      identifiers: identifiers,
      name: album.title,
      artist: album.artists_sort,
      imageUrl: album.images[0].resource_url,
      genre: album.genres,
      styles: album.styles,
      country: album.country,
      label: labels,
      tracklist: album.tracklist,
      year: album.year,
      format: album.formats[0].descriptions,
      notes: notes
    }
    dispatch(setAlbum(newAlbum))
  } catch (err) {
    console.error(err)
  }
}

export const addTo = (album, collectionName, recordInfo) => async dispatch => {
  try {
    const labels = _.uniq(album.label)
    const request = {
      collection: collectionName,
      album: {
        id: album.id,
        masterId: album.masterId,
        name: album.name,
        artist: album.artist,
        imageUrl: album.imageUrl,
        genre: album.genre,
        styles: album.styles,
        country: album.country,
        label: labels,
        year: album.year,
        format: album.format
      }
    }
    if (recordInfo) {
      request.recordInfo = recordInfo
    }
    await axios.put('/api/collection', request)
    dispatch(getCollections())
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
