import axios from 'axios'
import history from '../history'
import socket from '../socket.js'

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
	nextFriendInfo: [0, ''],
}

/**
 * ACTION CREATORS
 */

const postChapterAction = () => ({type: POST_CHAPTER})
export const writeContent = (content) => ({type: WRITE_CONTENT, content})
export const tagNextFriend = (nextArr) => ({type: TAG_NEXT_FRIEND, nextArr: [+nextArr[0], nextArr[1]]})

// //THUNKS
export function postChapter(content, nextArr, story, userId){
	return function thunk (dispatch) {
		return axios.post('/api/chapters', {content, nextArr, story, userId})
			.then(res => res.data)
			.then(nextUser => {
				if(nextUser && nextUser.socketId !== 'logged-out'){
					socket.sendNotification(nextUser.socketId, nextUser.id)
				}
				dispatch(postChapterAction())
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
		return newChapter
	case WRITE_CONTENT:
		return  Object.assign({}, state, {content: action.content})
	case TAG_NEXT_FRIEND:
		return  Object.assign({}, state, {nextFriendInfo: action.nextArr})
	default:
		return state
	}
}
