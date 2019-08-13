import axios from 'axios'
const _ = require('lodash')

/**
 * ACTION TYPES
 */
const SET_COLLECTIONS = 'SET_COLLECTIONS'
const SORT_COLLECTIONS = 'SORT_COLLECTIONS'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const setCollections = collections => ({
  type: SET_COLLECTIONS,
  collections
})

export const sortAlbums = sortKey => ({
  type: SORT_COLLECTIONS,
  sortKey
})

/**
 * THUNK CREATORS
 */
export const getCollections = () => async dispatch => {
  try {
    const collections = await axios.get('/api/collection')
    dispatch(setCollections(collections.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_COLLECTIONS:
      return action.collections
    case SORT_COLLECTIONS:
      return _.sortBy(state, [action.sortKey])
    default:
      return state
  }
}
