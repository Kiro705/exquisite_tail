import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user.jsx'
import newStory from './newStory.jsx'
import stories from './stories.jsx'
import friendRequest from './friendRequest.jsx'

const reducer = combineReducers({user, newStory, stories, friendRequest})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './user.jsx'
export * from './newStory.jsx'
export * from './stories.jsx'
export * from './friendRequest.jsx'
