import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_NOTIFICATIONS = 'GET_NOTIFICATIONS'
const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION'

/**
 * INITIAL STATE
 */
const notifications = []

/**
 * ACTION CREATORS
 */

const getNotificationsActions = (notifications) => ({type: GET_NOTIFICATIONS, notifications})
export const deleteNotification = (keyPropArray) => ({type: DELETE_NOTIFICATION, keyPropArray})

// //THUNKS
export function getNotifications(userId){
	return function thunk (dispatch) {
		return axios.get(`/api/notifications/${userId}`)
			.then(res => res.data)
			.then(notifications => {
				dispatch(getNotificationsActions(notifications))
			}
			)
			.catch(err => console.log(err))
	}
}

/**
 * REDUCER
 */
export default function (state = notifications, action) {
	switch (action.type) {
	case GET_NOTIFICATIONS:
		return action.notifications
	case DELETE_NOTIFICATION:
		const newState = state.filter(notification => {
			let array = action.keyPropArray
			if(notification[array[0]] === array[1]){
				return false
			} else {
				return true
			}
		})
		return newState
	default:
		return state
	}
}
