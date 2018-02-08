import axios from 'axios'
import history from '../history'
import {deleteNotification} from './notifications.jsx'
import socket from '../socket.js'

/**
 * ACTION TYPES
 */
const GET_FRIEDNS = 'GET_FRIEDNS'
const CONFIRM_FRIEND_REQUEST = 'CONFIRM_FRIEND_REQUEST'
const REJECT_FRIEND_REQUEST = 'REJECT_FRIEND_REQUEST'

/**
 * INITIAL STATE
 */
const friends = []

/**
 * ACTION CREATORS
 */

const getFriendsAction = (friends) => ({type: GET_FRIEDNS, friends})
const confrimAction = (friend) => ({type: CONFIRM_FRIEND_REQUEST, friend})
const rejectAction = () => ({type: REJECT_FRIEND_REQUEST})

// //THUNKS
export function getFriends(userId){
	return function thunk (dispatch) {
		return axios.get(`/api/friends/${userId}`)
			.then(res => res.data)
			.then(friendsList => {
				dispatch(getFriendsAction(friendsList))
			})
			.catch(err => console.log(err))
	}
}

export function confirmFriendRequest(userId, senderId){
	return function thunk (dispatch) {
		return axios.post(`/api/friends`, {userId, senderId})
			.then(res => res.data)
			.then(friendData => {
				const socketId = friendData[1]
				const newFriend = friendData[0]
				if(socketId !== 'logged-out'){
					socket.updateFriends(socketId, newFriend.id)
				}
				dispatch(confrimAction(newFriend))
			})
			.then(result => {
				dispatch(deleteNotification({senderId}))
			})
			.catch(err => console.log(err))
	}
}

export function rejectFriendRequest(userId, senderId){
	return function thunk (dispatch) {
		return axios.put(`/api/friends/reject`, {userId, senderId})
			.then(res => res.data)
			.then(senderArray => {
				dispatch(rejectAction())
				dispatch(deleteNotification(senderArray))
			})
			.catch(err => console.log(err))
	}
}

/**
 * REDUCER
 */
export default function (state = friends, action) {
	switch (action.type) {
	case GET_FRIEDNS:
		return action.friends
	case CONFIRM_FRIEND_REQUEST:
		return state.concat([action.friend])
	case REJECT_FRIEND_REQUEST:
		return state
	default:
		return state
	}
}
