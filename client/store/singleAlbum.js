import axios from 'axios'
require('../../secrets')

const apiKey = process.env.LASTFM_API_KEY
const rootUrl = 'http://ws.audioscrobbler.com/2.0/'

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

export const getSingleAlbum = album => async dispatch => {
  try {
    let query = `${rootUrl}?method=album.getinfo&api_key=${apiKey}`
    if (album.mbid !== '') query = `${query}&mbid=${album.mbid}&format=json`
    else
      query = `${query}&artist=${album.artist}&album=${album.name}&format=json`
    const searchResult = await axios.get(query)
    const albumInfo = searchResult.data.album
    const newAlbum = {
      name: albumInfo.name,
      artist: albumInfo.artist,
      mbid: albumInfo.mbid,
      imageUrl: albumInfo.image[3]['#text'],
      genre: albumInfo.tags.tag[0],
      summary: albumInfo.wiki.summary
    }
    console.log(newAlbum)
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
