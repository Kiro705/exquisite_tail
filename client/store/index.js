import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user.jsx'
import newStory from './newStory.jsx'
import stories from './stories.jsx'
import friendRequests from './friendRequests.jsx'
import notifications from './notifications.jsx'
import friends from './friends.jsx'

const reducer = combineReducers({user, newStory, stories, friendRequests, notifications, friends})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './user.jsx'
export * from './newStory.jsx'
export * from './stories.jsx'
export * from './friendRequests.jsx'
export * from './notifications.jsx'
export * from './friends.jsx'
