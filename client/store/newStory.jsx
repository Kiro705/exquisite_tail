import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const POST_STORY = 'POST_STORY'
const WRITE_TITLE = 'WRITE_TITLE'
const WRITE_CHAPTER_LENGTH = 'WRITE_CHAPTER_LENGTH'
const WRITE_CHAPTER_AMOUNT = 'WRITE_CHAPTER_AMOUNT'


/**
 * INITIAL STATE
 */
const newStory = {
	title: '',
	chapterLength: 280,
	chapterAmount: 10
}

/**
 * ACTION CREATORS
 */

const postStoryAction = (story) => ({type: POST_STORY, story})
export const writeTitle = (title) => ({type: WRITE_TITLE, title})
export const writeChapterLength = (chapterLength) => ({type: WRITE_CHAPTER_LENGTH, chapterLength})
export const writeChapterAmount = (chapterAmount) => ({type: WRITE_CHAPTER_AMOUNT, chapterAmount})

// //THUNKS
export function postStory(story){
	return function thunk (dispatch) {
		return axios.post('/api/stories', {story})
			.then(res => res.data)
			.then(newStory => {
				dispatch(postStoryAction(newStory))
				history.push(`/story/${newStory.id}`)
			})
			.catch(err => console.log(err))
	}
}

/**
 * REDUCER
 */
export default function (state = newStory, action) {
	switch (action.type) {
	case POST_STORY:
		//reset state after story is created
		return newStory
	case WRITE_TITLE:
		return  Object.assign({}, state, {title: action.title})
	case WRITE_CHAPTER_LENGTH:
		return  Object.assign({}, state, {chapterLength: action.chapterLength})
	case WRITE_CHAPTER_AMOUNT:
		return  Object.assign({}, state, {chapterAmount: action.chapterAmount})
	default:
		return state
	}
}
