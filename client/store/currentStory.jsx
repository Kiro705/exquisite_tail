import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const FETCH_STORY = 'FETCH_STORY'
const UPDATE_STORY = 'UPDATE_STORY'

/**
 * INITIAL STATE
 */
const newStory = {
	id: 0,
	title: '',
	chapterAmount: 0,
	chapterLength: 0,
	currentChapter: 0,
	currentWriter: '',
	writerId: 0,
	public: true,
}

/**
 * ACTION CREATORS
 */

const fetchStoryAction = (story) => ({type: FETCH_STORY, story})
const updateStoryAction = (updateData) => ({type: UPDATE_STORY, updateData})

// //THUNKS
export function updateStory(newData, storyId){
	return function thunk (dispatch) {
		return axios.put('/api/stories/:storyId', newData)
			.then(res => res.data)
			.then(updatedStory => {
				dispatch(updateStoryAction(updatedStory))
				history.push(`/home/`)
			})
			.catch(err => console.log(err))
	}
}

export function fetchStory(storyId){
	return function thunk (dispatch) {
		return axios.get(`/api/stories/${storyId}`)
			.then(res => res.data)
			.then(story => {
				if(story === null){
					//No story matching this ID was found
					dispatch(fetchStoryAction({title: null, id: storyId}))
				} else {
					dispatch(fetchStoryAction(story))
				}
			})
			.catch(err => console.log(err))
	}
}

/**
 * REDUCER
 */
export default function (state = newStory, action) {
	switch (action.type) {
	case FETCH_STORY:
		return  Object.assign({}, state, action.story)
	case UPDATE_STORY:
		return  Object.assign({}, state, {currentChapter: state.currentChapter + 1, currentWriter: action.updateData.currentWriter, writerId: action.updateData.writerId})
	default:
		return state
	}
}
