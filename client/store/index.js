import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import albums from './albums'
import singleAlbum from './singleAlbum'
import collection from './collection'

const reducer = combineReducers({
  user,
  albums,
  singleAlbum,
  collection
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './albums'
export * from './singleAlbum'
export * from './collection'
