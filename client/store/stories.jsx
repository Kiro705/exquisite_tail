import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_AUTHORED_STORIES = 'GET_AUTHORED_STORIES'
const GET_CONTRIBUTED_STORIES = 'GET_CONTRIBUTED_STORIES'

/**
 * INITIAL STATE
 */
const stories = {
	authoredStories: [],
	contribStories: []
}

/**
 * ACTION CREATORS
 */

const getAuthoredStoriesAction = (authoredStories) => ({type: GET_AUTHORED_STORIES, authoredStories})
const getContributedStoriesAction = (contribStories) => ({type: GET_CONTRIBUTED_STORIES, contribStories})

// //THUNKS
export function getUsersStories(userId){
	return function thunk (dispatch) {
		return axios.get(`/api/stories/myAuthoredStories/${userId}`)
			.then(res => res.data)
			.then(authoredStories => {
				dispatch(getAuthoredStoriesAction(authoredStories))
			})
			.catch(err => console.log(err))
	}
}

/**
 * REDUCER
 */
export default function (state = stories, action) {
	switch (action.type) {
	case GET_AUTHORED_STORIES:
		return Object.assign({}, state, {authoredStories: action.authoredStories})
	default:
		return state
	}
}
