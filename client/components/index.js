/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main.jsx'
export {default as UserHome} from './user-home.jsx'
export {Login, Signup} from './auth-form.jsx'
export {default as NewStory} from './new-story.jsx'
export {default as AddFriend} from './add-friend.jsx'
export {default as Notifications} from './notifications.jsx'
export {default as SingleStory} from './single-story.jsx'
export {default as EditName} from './edit-name.jsx'
