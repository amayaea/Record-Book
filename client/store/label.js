const dis = require('../../server/api/discogs')

/**
 * ACTION TYPES
 */
const SET_LABEL = 'SET_LABEL'

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * ACTION CREATORS
 */
const setLabel = label => ({
  type: SET_LABEL,
  label
})

export const getSingleAlbum = labelId => async dispatch => {
  try {
    const label = await dis.getLabelReleases(labelId)
    console.log('discogs result', label)
    // const newLabel = {test: 'test'}
    dispatch(setLabel(label))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LABEL:
      return action.label
    default:
      return state
  }
}
