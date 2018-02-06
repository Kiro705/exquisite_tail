import axios from 'axios'
import history from '../history'
import socket from '../socket.js'

/**
 * ACTION TYPES
 */
const CHAPTER_SUCCESS = 'CHAPTER_SUCCESS'
const CHAPTER_NO_CONTENT = 'CHAPTER_NO_CONTENT'
const CHAPTER_NO_NEXT = 'CHAPTER_NO_NEXT'
const RESET_CHAPTER_MESSAGE = 'RESET_CHAPTER_MESSAGE'

/**
 * INITIAL STATE
 */
const chapterMessage = {
	result: null
}

/**
 * ACTION CREATORS
 */

export const chapterSuccessAction = () => ({type: CHAPTER_SUCCESS})
export const noContentAction = () => ({type: CHAPTER_NO_CONTENT})
export const noNextAction = () => ({type: CHAPTER_NO_NEXT})
export const resetChapterMessage = () => ({type: RESET_CHAPTER_MESSAGE})


/**
 * REDUCER
 */
export default function (state = chapterMessage, action) {
	switch (action.type) {
	case CHAPTER_SUCCESS:
		return Object.assign({}, state, {result: null})
	case CHAPTER_NO_CONTENT:
		return Object.assign({}, state, {result: 'You need to write something!'})
	case CHAPTER_NO_NEXT:
		return Object.assign({}, state, {result: "You forgot select who's next!"})
	case RESET_CHAPTER_MESSAGE:
		return Object.assign({}, state, {result: null})
	default:
		return state
	}
}
