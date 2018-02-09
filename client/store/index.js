import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user.jsx'
import newStory from './newStory.jsx'
import storySubmit from './storySubmit.jsx'
import newChapter from './newChapter.jsx'
import chapterSubmit from './chapterSubmit.jsx'
import stories from './stories.jsx'
import friendRequests from './friendRequests.jsx'
import notifications from './notifications.jsx'
import friends from './friends.jsx'
import currentStory from './currentStory.jsx'

const reducer = combineReducers({
	user,
 	newStory,
 	storySubmit,
 	newChapter,
 	chapterSubmit,
 	stories,
 	friendRequests,
 	notifications,
 	friends,
 	currentStory
 })

const middlewareArray = [thunkMiddleware];
const isLocal = ~location.href.indexOf('://localhost');
if (isLocal !== 0) {
  middlewareArray.push(createLogger({collapsed: true}));
}
const middleware = applyMiddleware.apply(null, middlewareArray)

const store = createStore(reducer, middleware)

export default store
export * from './user.jsx'
export * from './newStory.jsx'
export * from './storySubmit.jsx'
export * from './newChapter.jsx'
export * from './chapterSubmit.jsx'
export * from './stories.jsx'
export * from './friendRequests.jsx'
export * from './notifications.jsx'
export * from './friends.jsx'
export * from './currentStory.jsx'
