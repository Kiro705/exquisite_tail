import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const FETCH_MY_STORIES = 'FETCH_MY_STORIES'

/**
 * INITIAL STATE
 */
const stories = {
	completed: [],
	inProgress: []
}

/**
 * ACTION CREATORS
 */

const getStoriesAction = (stories) => ({type: FETCH_MY_STORIES, stories})

// //THUNKS
export function fetchMyStories(userId){
	return function thunk (dispatch) {
		return axios.get(`/api/stories/myStories/${userId}`)
			.then(res => res.data)
			.then(stories => {
				dispatch(getStoriesAction(stories))
			})
			.catch(err => console.log(err))
	}
}

/**
 * REDUCER
 */
export default function (state = stories, action) {
	switch (action.type) {
	case FETCH_MY_STORIES:
		return Object.assign({}, state, action.stories)
	default:
		return state
	}
}
