import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const FRIEND_REQUEST_SUCCESS = 'FRIEND_REQUEST_SUCCESS'
const FRIEND_REQUEST_SELF = 'FRIEND_REQUEST_SELF'
const FRIEND_REQUEST_NOT_FOUND = 'FRIEND_REQUEST_NOT_FOUND'
const FRIEND_REQUEST_REPEAT = 'FRIEND_REQUEST_REPEAT'
const UKNOWN_ERROR = 'UKNOWN_ERROR'

/**
 * INITIAL STATE
 */
const friendRequest = {
	result: null
}

/**
 * ACTION CREATORS
 */

const successAction = () => ({type: FRIEND_REQUEST_SUCCESS})
const selfAction = () => ({type: FRIEND_REQUEST_SELF})
const notFoundAction = () => ({type: FRIEND_REQUEST_NOT_FOUND})
const repeatAction = () => ({type: FRIEND_REQUEST_REPEAT})
const unknownAction = () => ({type: UKNOWN_ERROR})

// //THUNKS
export function makeFriendRequest(email, userId){
	return function thunk (dispatch) {
		return axios.post(`/api/friendRequests/`, {email, userId})
			.then(res => res.data)
			.then(requestResult => {
				switch(requestResult){
					case 'success':
						dispatch(successAction())
						break
					case 'self-user-failure':
						dispatch(selfAction())
						break
					case 'user-not-found':
						dispatch(notFoundAction())
						break
					case 'SequelizeUniqueConstraintError':
						dispatch(repeatAction())
						break
					default:
						dispatch(unknownAction())
						break
				}
			})
			.catch(err => console.log(err))
	}
}

/**
 * REDUCER
 */
export default function (state = friendRequest, action) {
	switch (action.type) {
	case FRIEND_REQUEST_SUCCESS:
		return Object.assign({}, state, {result: 'Friend request sent!'})
	case FRIEND_REQUEST_SELF:
		return Object.assign({}, state, {result: "You're now your own friend ;)"})
	case FRIEND_REQUEST_NOT_FOUND:
		return Object.assign({}, state, {result: 'No such user.'})
	case FRIEND_REQUEST_REPEAT:
		return Object.assign({}, state, {result: "You've already requested this user."})
	case UKNOWN_ERROR:
		return Object.assign({}, state, {result: 'Unknown error'})
	default:
		return state
	}
}