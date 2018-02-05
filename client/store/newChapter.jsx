import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const POST_CHAPTER = 'POST_CHAPTER'
const WRITE_CONTENT = 'WRITE_CONTENT'
const TAG_NEXT_FRIEND = 'TAG_NEXT_FRIEND'

/**
 * INITIAL STATE
 */
const newChapter = {
	content: '',
	nextFriendId: 0,
}

/**
 * ACTION CREATORS
 */

const postChapterAction = (chapter) => ({type: POST_CHAPTER, chapter})
export const writeContent = (content) => ({type: WRITE_CONTENT, content})
export const tagNextFriend = (nextId) => ({type: TAG_NEXT_FRIEND, nextId})

// //THUNKS
export function postChapter(chapter, storyId){
	return function thunk (dispatch) {
		return axios.post('/api/chapters', {chapter, storyId})
			.then(res => res.data)
			.then(newChapter => {
				dispatch(postStoryAction(newChapter))
				history.push(`/home/`)
			})
			.catch(err => console.log(err))
	}
}

/**
 * REDUCER
 */
export default function (state = newChapter, action) {
	switch (action.type) {
	case POST_CHAPTER:
		//reset state after chapter is created
		return newStory
	case WRITE_CONTENT:
		return  Object.assign({}, state, {content: action.content})
	case TAG_NEXT_FRIEND:
		return  Object.assign({}, state, {nextFriendId: action.nextId})
	default:
		return state
	}
}
